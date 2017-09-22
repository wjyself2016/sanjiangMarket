require(["../config"], function(m) {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common","goodsdata","cookie"], function($,com,detail,coo) {
		
		//加载头部
		$("#head").load("head.html",function(){
			com.head();
			$(".nav2_first").on("mouseenter mouseleave",function(e){
				if(e.type == "mouseenter"){
					$(this).find(".nav2list").show();
				}else{
					$(this).find(".nav2list").hide();
				}
			});
			$(".nav2list").css("display","none");
		})
		//加载脚部
		$("#foot").load("foot.html",function(){
			com.foot();
		})
		
		//本页面加载完成
		$(function() {
			
			var id = GetQueryString("listId");
			var data = detail;
			
			
			//进行数据加载的方法
			function detailcreate(data){
				var obj = data[id];
				//修改商品路径
				$.ajax({
					url : obj.category,
					dataFilter : function(data){
						data = JSON.parse(data);
						$(data).each(function(index){
							$(".nav li").eq(index+1).find("a").html($(this).get(0).name+"&nbsp;&nbsp;&gt;");
						})
						$(".nav li:last").html(obj.content.name);
					}
				});
				//修改左侧图片
				$(".small_img,.big_img,.kind_list li:first").find("img").attr("src",obj.content.img);
				function kindchose(){
					$(".kind_list li").mouseenter(function(){
						if($(this).index() == 0){
							small.find("img").attr("src",obj.content.img);
							big.attr("src",obj.content.img);
							$(this).css("border","1px solid #e53b34");
							$(this).siblings().css("border","1px solid #ffffff");
						}else{
							small.find("img").attr("src","../img/index/center2.jpg");
							big.attr("src","../img/index/center2.jpg");
							$(this).css("border","1px solid #e53b34");
							$(this).siblings().css("border","1px solid #ffffff");
						}
					})
				}
				kindchose();
				//修改中部数据
				$(".itemname h1").text(obj.content.name);
				$(".vip").find("b").text(obj.content.vprice);
				$(".normal").find("b").text(obj.content.nprice);
				$(".name").text(obj.content.brand);
				$(".num").find("span").text(obj.content.have);
				//修改下方参数
				$("table").find("tr:gt(0)").each(function(index){
					$(this).find("td:last").text(obj.params[index]);
				})
				
			}
			//进行cookie储存
			function setcoo(){
				$(".shopping").click(function(){
					var count = $(".txt:last").val();
					coo.setgood2coo(id,count);
					com.headShop();
					alert("已加入豪华午餐(￣ε(#￣)");
				})
			}
			/*--------- 方法调用-----------------*/
			//生成数据
			detailcreate(data);
			//业务逻辑
			goodsleft();
			shareItem();
			seeMore();
			paramsOption();
			//加减
			add();
			reduce();
			//cookie储存
			setcoo();
		})
		
		/*------------------商品详情-----------------------------------*/
		
		var small = $(".small_img");
		var big = $(".big_img").find("img");
		var drag = $(".drag");
		//货物左侧放大镜
		function goodsleft(){
			$(".small_img").on("mouseenter mouseleave",function(e){
				if(e.type == "mouseenter"){
					$(document).on("mousemove",function(e){
						
						var mousexy = {
							x:e.pageX,
							y:e.pageY
						}
						
						var _left = Math.max(14,Math.min(small.width()-drag.width()+14,mousexy.x-small.offset().left-drag.width()/2));
						var _top = Math.max(14,Math.min(small.height()-drag.height()+14,mousexy.y-small.offset().top-drag.height()/2));
						
						big.parent().show();
						drag.show();
						drag.css("left",_left);
						drag.css("top",_top);
						
						big.css("left",-2*(_left-14));
						big.css("top",-2*(_top-14));
					})
				}else{
					$(document).off("mousemove");
					drag.hide();
					big.parent().hide();
				}
			})
		}
		
		//分享板块
		function shareItem(){
			var sharearr = [-1612,-2652,-104,-52,-260];
			$(".share_item").find("a").each(function(index){
				$(this).attr("style","background:url(../img/spriteSheet/icons_0_16.png) 0 "+sharearr[index]+"px no-repeat");
			})
			//点击事件
			var flag = false;
			$(".share_a").click(function(e){
				if(!flag){
					$(".share_item").show();
					$(".share_box").css({
						"height" : 61,
						"width" : 111,
						"border" : "1px solid #f03838",
						"background" : "white"
					})
					flag = true;
				}else{
					$(".share_item").hide();
					flag = false;
					$(".share_box").css({
						"height" : 63,
						"width" : 113,
						"border" : 0,
						"background" : "none"
					})
				}
			})
		}
		//商品数量+-
		function add(){
			
			$(".btn:last").click(function(){
				var num = parseInt($(".txt:last").val());
				if(num<999){
					num+=1;
					$(".txt:last").attr("value",num);
				}
			})
		}
		function reduce(){
			
			$(".btn:first").click(function(){
				var num = parseInt($(".txt:last").val());
				if(num>1){
					num-=1;
					$(".txt:last").attr("value",num);
				}
			})
		}
		//看了又看
		function seeMore(){
			$(".right").clone().appendTo(".detail_left");
			$(".right").clone().appendTo(".detail_left");
		}
		//参数选项卡
		function paramsOption(){
			
			$(".params_name li").click(function(e){
				$(".params_body").eq($(this).index()).show();
				$(".params_body").eq($(this).index()).siblings().not(".params_name").hide();
			
				$(this).addClass("clickli");
				$(this).siblings().removeClass("clickli");
			})
		}
		/*------------------数据获取-----------------------------------*/
		//获取url参数
		function GetQueryString(name)
		{
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
		}

	});
});