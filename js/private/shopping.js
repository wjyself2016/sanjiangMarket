require(["../config"], function(m) {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common","goodsdata","cookie","shoppingmodel","template"], function($,com,data,coo,model,tem) {
		
		//加载脚部
		$("#foot").load("foot.html",function(){
			com.foot();
		})
		//加载头部
		$("#head2").load("head2.html",function(){
			com.head();
		})
		
		$(function() {
			createItem();
			itemBtn();
			updateData();
			shopDeleBtn();
			checkBtn();
			//设置选中颜色
			$(".cart_box").each(function(){
				$(this).attr("style","background:#E7F6FF");
			})
		})
		
		//生成产品并添加到页面
		function createItem(){
			var arr = coo.getCookie("goods");
			arr = JSON.parse(arr);
			var htmlstr = "";
			$(arr).each(function(){
				data[this.listId].content.count = this.count;
				htmlstr += tem.template(model.str,data[this.listId])
			})
			$(".cart_box_all").html(htmlstr);
		}
		//加减按钮
		function itemBtn(){
			$(".btn_reduce").click(function(){
				if($(this).next().val()>1){
					var count = parseInt($(this).next().val())-1;
					$(this).next().val(count);
					var arr = coo.getCookie("goods");
					arr = JSON.parse(arr);
					var id = arr[$(this).parent().parent().parent().index()].listId;
					coo.setgood2coo(id,-1);
					updateData(count,$(this).parent().parent().prev().prev());
				}
			})
			$(".btn_add").click(function(){
				if($(this).prev().val() < 999){
					var count = parseInt($(this).prev().val())+1;
					$(this).prev().val(count);
					var arr = coo.getCookie("goods");
					arr = JSON.parse(arr);
					var id = arr[$(this).parent().parent().parent().index()].listId;
					coo.setgood2coo(id,1);
					updateData(count,$(this).parent().parent().prev().prev());
				}
			})
		}
		
		//更新数据
		function updateData(num,ele){
			if(ele){
				ele.next().next().next().text(num*parseFloat(ele.text()));
			}
			
			var price = 0;
			var weight = 0;
			$(".cart_box").each(function(){
				price += parseFloat($(this).find(".retail").text())*parseFloat($(this).find(".num").val());
				weight += parseFloat($(this).find(".weight").text())*parseFloat($(this).find(".num").val());
			})
			price = Math.floor(price*100)/100;
			$(".bottom_up b:first").text(price);
			$(".bottom_down strong").text(price);
			$(".bottom_up span").text(weight+"g");
		}
		
		//删除按钮
		function shopDeleBtn(){
			$(".a_cancel").click(function(){
				console.log("点了")
				var arr = coo.getCookie("goods");
				arr = JSON.parse(arr);
				arr.splice($(this).parent().parent().index(),1);
				console.log(arr)
				arr = JSON.stringify(arr);
				coo.setCookie({
				key:"goods",
				value:arr
				});
				$(this).parent().parent().remove();
			})
		}
		
		//复选框按钮
		function checkBtn(){
			$(".all_sel").click(function(){
				$(".single_sel").prop("checked",$(".all_sel:last").prop("checked"));
				//改变背景颜色
				$(".cart_box").each(function(){
					if($(this).find(".single_sel").prop("checked") == false){
						$(this).attr("style","background:#ffffff");
					}else{
						$(this).attr("style","background:#E7F6FF");
					}
				})
			})
			
			$(".single_sel").click(function(){
				//改变背景颜色
				console.log($(this));
				if($(this).prop("checked") == false){
					$(this).parent().parent().attr("style","background:#ffffff");
				}else{
					$(this).parent().parent().attr("style","background:#E7F6FF");
				}
				//全选勾中选择
				var all = true;
				$(".single_sel").each(function(index){
					if($(this).prop("checked") == false){
						all = false;
					}
				})
				if(all){
					$(".all_sel:last").prop("checked",true);
				}else{
					$(".all_sel:last").prop("checked",false);
				}
				
			});
			
			
			
		}
	});
});