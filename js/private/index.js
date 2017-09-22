require(["../config"], function(m) {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery", "floorNav", "template", "stairmodel", "stairs", "common", "swiper","goodsdata","cookie","shoppingmodel"], function($, flo, tem, model2, sta, com, swiper,goo,coo,model3) {

		//加载头部
		$("#head").load("head.html", function() {
			var arr = com.head();
		})
		//加载脚部
		$("#foot").load("foot.html", function() {
			com.foot();
		})

		$(function() {

			//热销
			//入口
			enter();
			//楼梯
			stair();
			//右侧固定栏
			rightFixed();
			//左侧固定导航栏
			flo.floorNav({
				ele: ".left_nav",
				sele: ".left_nav li",
				firsttop: 1345,
				itemheight: 635
			});
			
			//轮播
			banner();
			
			//将商品编号保存到cookie中，然后在购物车显示
			shopping();
			shoppingSetData();
			shoppingBtn();
			shopImgClick();
		})

		/*------------------轮播图-----------------------------------*/
		function banner() {
			
			$(".news .swiper-slide").each(function(index) {
				$(this).attr("style", "background:url(../img/index/pro0"+(index+1)+".jpg) center no-repeat");
			})
			var swiper2 = new Swiper('.news .swiper-container', {
				pagination: '.swiper-pagination',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				slidesPerView: 3,
				paginationClickable: true,
				spaceBetween: 1,
				autoplay: 4000,
				autoplayDisableOnInteraction: false
			});
			
			$(".banner .swiper-slide").each(function(index) {
				$(this).attr("style", "background:url(../img/index/banner0"+(index+1)+".jpg) center no-repeat");
			})
			var swiper = new Swiper('.banner .swiper-container', {
				pagination: '.swiper-pagination',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				paginationClickable: true,
				spaceBetween: 0,
				centeredSlides: true,
				autoplay: 2500,
				autoplayDisableOnInteraction: false
			});
		}
		/*------------------新闻版块-----------------------------------*/
		/*------------------热销好货-----------------------------------*/
//		function hotgoods(data) {
//
//			var str = model1.str;
//			var htmlstr = tem.template(str, data);
//			console.log(htmlstr);
//			$(".newgoods_body").html(htmlstr);
//		}
//		hot.hot(hotgoods);

		/*------------------入口-----------------------------------*/
		function enter() {
			$(".four_enter_icon").find("div").on("mouseenter mouseleave", function(e) {
				if(e.type == "mouseenter") {
					$(this).find("img").animate({
						left: 10
					}, 200);
				} else {
					$(this).find("img").animate({
						left: 0
					}, 200);
				}
			})
		}

		/*------------------楼梯-----------------------------------*/
		//每层楼的模板生成
		function stair() {
			$(".centerlist").each(function() {

				$(this).width($(this).find("ul").length * 816)
			})
			$(".stair_top ul").each(function() {
				$(this).find("li").on("mouseenter", function() {
					var _left = (-$(this).index() * 816);
					$(this).parent().parent().next().find(".centerlist").animate({
						"left": _left
					}, 200);
				})
			})
		}
		var data = null;
		var str = model2.str;
		function stairs(arr) {
			data = arr;
		}
		sta.sta(stairs);
		function everystairs(data, str, i) {
			data = data[i];
			var htmlstr = tem.template(str, data);
			$(".stair").eq(i).html(htmlstr);
		}
		//实例化
		everystairs(data, str, 0);
		everystairs(data, str, 1);
		everystairs(data, str, 2);
		everystairs(data, str, 3);
		everystairs(data, str, 4);
		everystairs(data, str, 5);
		everystairs(data, str, 6);
		everystairs(data, str, 7);
		everystairs(data, str, 8);

		//点击购物车小图标加入购物车
		function shopImgClick(){
			$(".center .tip_box").find("a").click(function(e){
				e.stopPropagation();
				var thr = $(this).parent().parent().index();
				var two = $(this).parent().parent().parent().index();
				var one = $(this).parent().parent().parent().parent().parent().parent().parent().index();
				var id = data[one].bottom.center[two][thr].listId;
				coo.setgood2coo(id,1);
				com.headShop();
				//小车漂移
				var leftself = $(this).offset().left;
				var lefttarget = $(".right_fixed_box1 .mc:last").offset().left;
				var topself = $(this).offset().top;
				var toptarget = $(".right_fixed_box1 .mc:last").offset().top;
				var newa = $(this).clone(true);
				$(newa).css({
					position : "absolute",
					left : leftself,
					top : topself
				});
				$(newa).addClass("shop_item");
				$("body").append(newa);
				$(newa).animate({left:lefttarget,top:toptarget},500,function(){
					$(newa).remove();
					shoppingSetData();
					shoppingBtn();
				});
				
			})
		}
		
		/*------------------右侧固定栏-----------------------------------*/
		//固定栏逻辑
		function rightFixed() {
			$(".right_fixed").height($(window).innerHeight());
			$(window).resize(function() {
				$(".right_fixed").height($(window).innerHeight());
			})

			$(".mc a").each(function(index) {
				$(this).attr("style", "background: #E6E6E6 url(../img/spriteSheet/index.png) 0 " + (-index * 46) + "px no-repeat");
			})

			var mcstr = [-322, -368, -414, -460];
			$(".right_fixed_box1 .mc").on("mouseenter mouseleave", function(e) {
				if(e.type == "mouseenter") {
					$(this).find("a").attr("style", "background: #F03838 url(../img/spriteSheet/index.png) 0 " + mcstr[$(this).index()] + "px no-repeat");
					$(this).find(".slide_item").animate({
						left: -81,
						opacity: 1
					}, 200);
					$(this).find("b").css({
						background: "#fff",
						color: "#f03838"
					});
				} else {
					$(this).find("a").attr("style", "background: #E6E6E6 url(../img/spriteSheet/index.png) 0 " + (-$(this).index() * 46) + "px no-repeat");
					$(this).find(".slide_item").animate({
						left: 0,
						opacity: 0
					}, 200);
					$(this).find("b").css({
						background: "#f03838",
						color: "#fff"
					});
				}
			})

			var mcstr2 = [-506, -552, -598]
			$(".right_fixed_box2 .mc").on("mouseenter mouseleave", function(e) {
				if(e.type == "mouseenter") {
					$(this).find("a").attr("style", "background: #F03838 url(../img/spriteSheet/index.png) 0 " + mcstr2[$(this).index()] + "px no-repeat");
					$(this).find(".slide_item").animate({
						left: -81,
						opacity: 1
					}, 200);
					$(this).find("b").css({
						background: "#fff",
						color: "#f03838"
					});
				} else {
					$(this).find("a").attr("style", "background: #E6E6E6 url(../img/spriteSheet/index.png) 0 " + (-($(this).index() + 4) * 46) + "px no-repeat");
					$(this).find(".slide_item").animate({
						left: 0,
						opacity: 0
					}, 200);
					$(this).find("b").css({
						background: "#f03838",
						color: "#fff"
					});
				}
			})

			$(".backtop").click(function() {
				$("html,body").animate({
					scrollTop: 0
				}, 1000);
			})

			$(".right_fixed_box2 .mc:eq(0)").on("mouseenter mouseleave", function(e) {
				if(e.type == "mouseenter") {
					if(e.target == $(this).find("a").get(0)) {
						$(this).find(".slide_item2").animate({
							left: -164,
							opacity: 1
						}, 200);
					}
				} else {
					$(this).find(".slide_item2").animate({
						left: 36,
						opacity: 0
					}, 100);
				}
			})
			//点击出购物车
			$(".mc").eq(3).click(function(){
				$(".shopping").animate({right:36},500);
			})
		}
		
		//右侧购物车
		function shopping(){
			//设置高度自适应
			$(".shop_body").height($(window).height()-100);
			$(window).resize(function(){
				$(".shop_body").height($(window).height()-100);
			})
			//关闭按钮
			$(".shop_close").click(function(){
				$(".shopping").animate({right:-500},500);
			})
		}
		
		//右侧购物车每件物品关闭按钮
		function deleteitem(){
			$(".item_box").on("mouseenter mouseleave",function(e){
				if(e.type == "mouseenter"){
					$(this).find(".shop_delete").show();
				}else{
					$(this).find(".shop_delete").hide();
				}
			})
			$(".shop_delete").click(function(){
				var arr = coo.getCookie("goods");
				arr = JSON.parse(arr);
				arr.splice($(this).parent().parent().parent().index(),1);
				console.log(arr)
				arr = JSON.stringify(arr);
				coo.setCookie({
				key:"goods",
				value:arr
				});
				$(this).parent().parent().parent().remove();
				com.headShop();
				clcShopData();
			})
		}
		
		//将右侧购物车初始化数据
		function shoppingSetData(){
			var arr = coo.getCookie("goods");
			arr = JSON.parse(arr);
			var htmlstr = "";
			$(arr).each(function(index){
				var data = goo[this.listId];
				data.content.count = this.count;
				var str = model3.str2;
				htmlstr += tem.template(str,data);
			})
			$(".shop_body").html(htmlstr);
			clcShopData();
			deleteitem();
		}
		//计算两个购物车头顶的数字
		function clcShopData(){
			var num = 0;
			var num2 = 0;
			$(".item_box").each(function(index){
				num += parseFloat($(this).find("b").text())*parseFloat($(this).find(".shop_txt").val());
				num2 += parseInt($(this).find(".shop_txt").val())
			})
			num = Math.floor(num*100)/100;
			$(".foot_left").find("span:first").find("b").text(num2);
			$(".foot_left").find("span:last").find("b").text("￥"+num);
			
			//修改右侧购物车头顶数字
			$(".mc:eq(3) b").text(num2);
		}
		
		//右侧购物车每个商品的加减按钮
		function shoppingBtn(){
			$(".shop_reduce").click(function(){
				if($(this).next().val()>1){
					var count = parseInt($(this).next().val())-1;
					$(this).next().val(count);
					var arr = coo.getCookie("goods");
					arr = JSON.parse(arr);
					var id = arr[$(this).parent().parent().parent().parent().index()].listId;
					coo.setgood2coo(id,-1);
					com.headShop();
					clcShopData();
				}
			})
			$(".shop_add").click(function(){
				if($(this).prev().val() < 999){
					var count = parseInt($(this).prev().val())+1;
					$(this).prev().val(count);
					var arr = coo.getCookie("goods");
					arr = JSON.parse(arr);
					var id = arr[$(this).parent().parent().parent().parent().index()].listId;
					coo.setgood2coo(id,1);
					com.headShop();
					clcShopData();
				}
			})
		}
	});
});