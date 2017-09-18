require(["../config"], function(m) {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","floorNav","template","hotgoodmodel","hotgoods","stairmodel","stairs","common"], function($,flo,tem,model1,hot,model2,sta,com) {

		//加载头部
		$("#head").load("head.html",function(){
			com.head();
		})
		//加载脚部
		$("#foot").load("foot.html",function(){
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
				ele : ".left_nav",
				sele : ".left_nav li",
				firsttop : 1345,
				itemheight : 635
			});
			
		})
		
	/*------------------轮播图-----------------------------------*/	
	/*------------------新闻版块-----------------------------------*/
	/*------------------热销好货-----------------------------------*/
		function hotgoods(data){
			
			var str = model1.str;
			var htmlstr = tem.template(str,data);
			$(".newgoods_body").html(htmlstr);
		}
		hot.hot(hotgoods);
	
	/*------------------入口-----------------------------------*/
		function enter(){
			$(".four_enter_icon").find("div").on("mouseenter mouseleave",function(e){
				if(e.type == "mouseenter"){
					$(this).find("img").animate({left:10},200);
				}else{
					$(this).find("img").animate({left:0},200);
				}
			})
		}
	
	/*------------------楼梯-----------------------------------*/
		function stair(){
			$(".centerlist").each(function(){
				
				$(this).width($(this).find("ul").length*816)
			})
			$(".stair_top ul").each(function(){
				$(this).find("li").on("mouseenter",function(){
					var _left = (-$(this).index()*816);
					$(this).parent().parent().next().find(".centerlist").animate({"left":_left},200);
				})
			})
		}
		var data = null;
		var str = model2.str;
		function stairs(arr){
			data = arr;
		}
		sta.sta(stairs);
		
		function everystairs(data,str,i){
			
			data = data[i];
			var htmlstr = tem.template(str,data);
			$(".stair").eq(i).html(htmlstr);
		}
		
		everystairs(data,str,0);
		everystairs(data,str,1);
		everystairs(data,str,2);
		everystairs(data,str,3);
		everystairs(data,str,4);
		everystairs(data,str,5);
		everystairs(data,str,6);
		everystairs(data,str,7);
		everystairs(data,str,8);
	
	/*------------------右侧固定栏-----------------------------------*/
		function rightFixed(){
			$(".right_fixed").height($(window).innerHeight());
			$(window).resize(function(){
				$(".right_fixed").height($(window).innerHeight());
			})
			
			$(".mc a").each(function(index){
				$(this).attr("style","background: #E6E6E6 url(../img/spriteSheet/index.png) 0 "+(-index*46)+"px no-repeat");
			})
			
			var mcstr=[-322,-368,-414,-460];
			$(".right_fixed_box1 .mc").on("mouseenter mouseleave",function(e){
				if(e.type == "mouseenter"){
					$(this).find("a").attr("style","background: #F03838 url(../img/spriteSheet/index.png) 0 "+mcstr[$(this).index()]+"px no-repeat");
					$(this).find(".slide_item").animate({left:-81,opacity:1},200);
					$(this).find("b").css({background:"#fff",color:"#f03838"});
				}else{
					$(this).find("a").attr("style","background: #E6E6E6 url(../img/spriteSheet/index.png) 0 "+(-$(this).index()*46)+"px no-repeat");
					$(this).find(".slide_item").animate({left:0,opacity:0},200);
					$(this).find("b").css({background:"#f03838",color:"#fff"});
				}
			})
			
			var mcstr2 = [-506,-552,-598]
			$(".right_fixed_box2 .mc").on("mouseenter mouseleave",function(e){
				if(e.type == "mouseenter"){
					$(this).find("a").attr("style","background: #F03838 url(../img/spriteSheet/index.png) 0 "+mcstr2[$(this).index()]+"px no-repeat");
					$(this).find(".slide_item").animate({left:-81,opacity:1},200);
					$(this).find("b").css({background:"#fff",color:"#f03838"});
				}else{
					$(this).find("a").attr("style","background: #E6E6E6 url(../img/spriteSheet/index.png) 0 "+(-($(this).index()+4)*46)+"px no-repeat");
					$(this).find(".slide_item").animate({left:0,opacity:0},200);
					$(this).find("b").css({background:"#f03838",color:"#fff"});
				}
			})
			
			$(".backtop").click(function(){
				$("html,body").animate({scrollTop: 0}, 1000);
			})
			
			$(".right_fixed_box2 .mc:eq(0)").on("mouseenter mouseleave",function(e){
				if(e.type == "mouseenter"){
					if(e.target == $(this).find("a").get(0)){
						$(this).find(".slide_item2").animate({left:-164,opacity:1},200);
					}
				}else{
					$(this).find(".slide_item2").animate({left:36,opacity:0},100);
				}
			})
		}
	
	});
});