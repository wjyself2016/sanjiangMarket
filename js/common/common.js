//通用逻辑
define(["jquery"], function($) {
		
		return{
			
			head : function(){
				/*------------------top-bar-----------*/
				//导航-选项卡
				function topbarOp() {
			
					$(".top_bar p span").click(function() {
						$(".top_bar_nav").show();
						$(".top_bar p").addClass("top_bar_p_on");
						//区县点击事件
						$("#navUL li").click(function() {
		
							$("#navUL li").removeClass("cur");
							$(this).addClass("cur");
							$(".card").eq($(this).index()).show();
							$(".card").eq($(this).index()).siblings().hide();
		
						});
						//街道点击事件，委托
						$(".card").click(function(e){
							if(e.target.nodeName == "A"){
								$(".top_bar p span").text(e.target.innerText);
								$("#navUL>div").click();
							}
						})
					});
					$("#navUL>div").click(function() {
						$(".top_bar_nav").hide();
						$(".top_bar p").removeClass("top_bar_p_on");
					})
				}
				//导航-导航栏
				function topbarNav(){
					
					$(".top_bar_right a").not($("#color-red")).on("mouseenter mouseleave",function(e){
						if(e.type == "mouseenter"){
							$(this).css("color","#F03838");
						}else{
							$(this).css("color","#666666");
						}
					})
					
					$(".top_bar_right li").has("em").on("mouseenter mouseleave",function(e){
						if(e.type == "mouseenter"){
							$(this).find(".top_bar_right_nav").show();
							$(this).find("a,span").addClass("ahover");
						}else{
							$(this).find(".top_bar_right_nav").hide();
							$(this).find("a,span").removeClass("ahover");
						}
					})
					
					$(".top_bar_right li").has("em").each(function(){
						$(this).find(".top_bar_right_nav").not($(".item2 .top_bar_right_nav")).width($(this).width()-1);
					})
				}
				
				/*-------搜索框----------*/
				//搜索框
				//购物车
				//热门导航
				function hotword(){
					$(".hotword li:eq(1) a").css("color","#F03838");
					$(".hotword li:gt(1) a").on("mouseenter mouseleave",function(e){
						if(e.type == "mouseenter"){
							$(this).css("color","#F03838");
						}else{
							$(this).css("color","#999999");
						}
					})
				}
				
				/*-----------------导航2---------------------*/
				//左侧
				function nav2left(){
					//左侧导航栏
					var str=[-273,-592,-315,-294,-357,-336,-210,-252,-399,-231,-378];
					var strWhite = [-65,-570,-108,-86,-149,-128,-2,-44,-191,-23,-170];
					$(".nav2list li b").each(function(index){
						$(this).attr("style","background:url(../img/spriteSheet/nav_i.png) 0"+str[index]+"px no-repeat;");
					});
					
					//右侧显示板
					$(".list_table").each(function(index){
						$(this).css("top",-index*47);
					})
					//滑入滑出效果
					$(".nav2list li").on("mouseenter mouseleave",function(e){
						if(e.type == "mouseenter"){
							$(this).css("background","#F03838");
							$(this).find("a").css("color","white");
							$(this).find("s").attr("style","background:url(../img/spriteSheet/index.png) 0 -644px no-repeat;");
							$(this).find("b").attr("style","background:url(../img/spriteSheet/nav_i.png) 0"+strWhite[$(this).index()]+"px no-repeat;");
							$(this).find(".list_table").show();
						}else{
							$(this).css("background","white");
							$(this).find("a").css("color","#333333");
							$(this).find("s").attr("style","background:url(../img/spriteSheet/index.png) 0 -666px no-repeat;");
							$(this).find("b").attr("style","background:url(../img/spriteSheet/nav_i.png) 0"+str[$(this).index()]+"px no-repeat;");
							$(this).find(".list_table").hide();
						}
					})
					
					
				}
				//右侧
				function nav2right(){
					$(".nav2_right li:first a").css("color","#F03838");
					$(".nav2_right li:gt(0) a").on("mouseenter mouseleave",function(e){
						if(e.type == "mouseenter"){
							$(this).css("color","#F03838");
						}else{
							$(this).css("color","#000000");
						}
					})
					
					
				}
				
				//导航1
				topbarOp();
				topbarNav();
				//搜索
				hotword();
				//导航2
				nav2right();
				nav2left();
			},
			
			foot : function(){
				/*------------------页脚-----------------------------------*/
				function foot(){
					var footstr=[0,-193,-384,-572,-761,-948];
					$(".service_logo").each(function(index,item){
						$(this).attr("style","background:url(../img/spriteSheet/footer.png) "+footstr[index]+"px 0 no-repeat");
					});
				}
				
				foot();
			}
			
		}
		
	});