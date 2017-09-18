//轮播图
define(["jquery","swiper"],function($,Swiper){
	function Banner(){
		this.init = function(){
			var mySwiper = new Swiper('.swiper-container',{
				autoplay : 5000,//可选选项，自动滑动
				speed : 1000, //可选选项，动画运行时间
				loop : true,//可选选项，开启循环
			})
			console.log("轮播图初始化完成了！"+$().jquery);
		}
	}
	return new Banner();
});