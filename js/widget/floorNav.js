//楼梯导航
define(["jquery"],function($){
	return {
		floorNav : function({ele,sele,firsttop,itemheight}){
			
			this.leftnav(sele,firsttop,itemheight);
			this.scroll(ele,sele,firsttop,itemheight);
		},
		
		leftnav : function (sele,firsttop,itemheight){
			var $leftnav = $(sele);
			$leftnav.click(function(){
				var index = $(this).index();
				$("body,html").animate({scrollTop: firsttop+index*itemheight}, 1000);
			});
		},
		
		scroll : function (ele,sele,firsttop,itemheight){
			var $UL = $(ele);
			
			$(window).scroll(function(){
				
				var _scrollTop = $(this).scrollTop();
				if(_scrollTop >= firsttop){
					$UL.fadeIn(300);
				}else{
					$UL.fadeOut(300);
				}
			})
			
			$(window).scroll(function(){
				
				var _scrollTop = $(this).scrollTop();
				var flIndex = parseInt((_scrollTop-firsttop)/itemheight);
				
				var $currentNav = $(sele).eq(flIndex);
				$currentNav.siblings().find("span").removeClass("active");
				$currentNav.find("span").addClass("active");
			})
		}
	}
});