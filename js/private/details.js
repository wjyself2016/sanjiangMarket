require(["../config"], function(m) {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common"], function($,com) {
		
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
			goodsleft();
			kindchose();
		})
		
		/*------------------商品详情-----------------------------------*/
		
		var small = $(".small_img");
		var big = $(".big_img").find("img");
		var drag = $(".drag");
		
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
						
						console.log(small.width());
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
		
		function kindchose(){
			$(".kind_list li").mouseenter(function(){
				console.log($(this));
				small.find("img").attr("src","../img/index/center"+($(this).index()+1)+".jpg");
				big.attr("src","../img/index/center"+($(this).index()+1)+".jpg");
				$(this).css("border","1px solid #e53b34");
				$(this).siblings().css("border","1px solid #ffffff");
			})
		}
		
		
	});
});