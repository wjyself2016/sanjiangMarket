//通用逻辑
define(["jquery","cookie"], function($,coo) {

	return {

		head: function() {
			/*------------------top-bar-----------*/
			//导航-选项卡
			function topbarOp() {
				//获取所有地区信息，并初始化选项卡，每一项都为第一个地区
				$.ajax({
					url: "/api/area",
					dataFilter: function(data) {
						data = JSON.parse(data);
						for(var i = 0; i < data.length; i++) {
							var oLi = document.createElement("li");
							var a = document.createElement("a");
							$(a).text(data[i].areaName);
							$(a).attr("href", "#");
							$(oLi).append($(a));
							$(".card").eq(0).append($(oLi));
						}
						for(var i = 0; i < data[0].areaViewModels.length; i++) {
							var oLi = document.createElement("li");
							var a = document.createElement("a");
							$(a).text(data[0].areaViewModels[i].areaName);
							$(a).attr("href", "#");
							$(oLi).append($(a));
							$(".card").eq(1).append($(oLi));
						}
						for(var i = 0; i < data[0].areaViewModels[0].areaViewModels.length; i++) {
							var oLi = document.createElement("li");
							var a = document.createElement("a");
							$(a).text(data[0].areaViewModels[0].areaViewModels[i].areaName);
							$(a).attr("href", "#");
							$(oLi).append($(a));
							$(".card").eq(2).append($(oLi));
						}

						//为选项卡添加点击事件
						$(".top_bar p span").click(function() {
							$(".top_bar_nav").show();
							$(".top_bar p").addClass("top_bar_p_on");
							//点击卡头切换
							$("#navUL li").click(function() {
								$("#navUL li").removeClass("cur");
								$(this).addClass("cur");
								$(".card").eq($(this).index()).show();
								$(".card").eq($(this).index()).siblings().hide();
							});
							//卡身切换
							var twonum = 0;
							
							$(".card").click(function(e) {
								if(e.target.nodeName == "A") {
									if($(this).index() > 1) {
										$(".top_bar_p_on span").text(e.target.innerText);
										$(".top_bar p").removeClass("top_bar_p_on");
										$("#navUL li").removeClass("cur");
										$("#navUL li").eq(0).addClass("cur");
										$("#navUL li").eq(0).click();
										$(".top_bar_nav").hide();
									} else {
										$("#navUL li").eq($(this).index()).find("a").text(e.target.innerText);
										$("#navUL li").removeClass("cur");
										$("#navUL li").eq($(this).index() + 1).addClass("cur");
										$(this).hide();
										$(this).next().show();

										//清除下一个卡身
										$(this).next().text("");
										//如果是加载第二个卡身
										if($(this).index() == 0) {
											twonum = $(e.target).parent().index();
											//加载数据
											for(var i = 0; i < data[$(e.target).parent().index()].areaViewModels.length; i++) {
												var oLi = document.createElement("li");
												var a = document.createElement("a");
												$(a).text(data[$(e.target).parent().index()].areaViewModels[i].areaName);
												$(a).attr("href", "#");
												$(oLi).append($(a));
												$(this).next().append($(oLi));
											}
										}
										//如果是加载第三个卡身
										if($(this).index() == 1) {
											for(var i = 0; i < data[twonum].areaViewModels[$(e.target).parent().index()].areaViewModels.length; i++) {
												var oLi = document.createElement("li");
												var a = document.createElement("a");
												$(a).text(data[twonum].areaViewModels[$(e.target).parent().index()].areaViewModels[i].areaName);
												$(a).attr("href", "#");
												$(oLi).append($(a));
												$(this).next().append($(oLi));
											}
										}
									}
								}
							})
						});
					}
				})
				//X按钮
				$("#navUL div").click(function(){
					console.log("ok");
					$(".top_bar p").removeClass("top_bar_p_on");
					$("#navUL li").removeClass("cur");
					$("#navUL li").eq(0).addClass("cur");
					$("#navUL li").eq(0).click();
					$(".top_bar_nav").hide();
				})
			}
			//导航-导航栏
			function topbarNav() {

				$(".top_bar_right a").not($("#color-red")).on("mouseenter mouseleave", function(e) {
					if(e.type == "mouseenter") {
						$(this).css("color", "#F03838");
					} else {
						$(this).css("color", "#666666");
					}
				})

				$(".top_bar_right li").has("em").on("mouseenter mouseleave", function(e) {
					if(e.type == "mouseenter") {
						$(this).find(".top_bar_right_nav").show();
						$(this).find("a,span").addClass("ahover");
					} else {
						$(this).find(".top_bar_right_nav").hide();
						$(this).find("a,span").removeClass("ahover");
					}
				})

				$(".top_bar_right li").has("em").each(function() {
					$(this).find(".top_bar_right_nav").not($(".item2 .top_bar_right_nav")).width($(this).width() - 1);
				})

			}

			/*-------搜索框----------*/
			//搜索框
			//购物车
//			function headShop(){
//				var arr = coo.getCookie("goods");
//				var num = 0;
//				arr = JSON.parse(arr);
//				$(arr).each(function(){
//					num += parseInt(this.count);
//				})
//				$(".shopnum span").text(num);
//			}
			//热门导航
			function hotword() {
				$(".hotword li:eq(1) a").css("color", "#F03838");
				$(".hotword li:gt(1) a").on("mouseenter mouseleave", function(e) {
					if(e.type == "mouseenter") {
						$(this).css("color", "#F03838");
					} else {
						$(this).css("color", "#999999");
					}
				})
				//给热门导航添加数据
				$.ajax({
					url: "/api/hotSearch",
					dataFilter: function(data) {
						data = JSON.parse(data);
						data.sort(function(a, b) {
							return a.id - b.id;
						})
						$(".hotword").find("li").not(":first").each(function(index) {
							$(this).find("a").text(data[index].name);
						})
					}
				});
//					$.ajax({
//						url : "http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID:hahaha&password:123321",
//						dataFilter : function(data){
//							console.log(data);
//						}
//					})
			}
			/*-----------------导航2---------------------*/
			//左侧
			function nav2left() {
				//左侧导航栏
				var str = [-273, -592, -315, -294, -357, -336, -210, -252, -399, -231, -378];
				var strWhite = [-65, -570, -108, -86, -149, -128, -2, -44, -191, -23, -170];
				$(".nav2list li b").each(function(index) {
					$(this).attr("style", "background:url(../img/spriteSheet/nav_i.png) 0" + str[index] + "px no-repeat;");
				});

				//右侧显示板
				$(".list_table").each(function(index) {
					$(this).css("top", -index * 47);
				})
				//滑入滑出效果
				$(".nav2list li").on("mouseenter mouseleave", function(e) {
					if(e.type == "mouseenter") {
						$(this).css("background", "#F03838");
						$(this).find("a").css("color", "white");
						$(this).find("s").attr("style", "background:url(../img/spriteSheet/index.png) 0 -644px no-repeat;");
						$(this).find("b").attr("style", "background:url(../img/spriteSheet/nav_i.png) 0" + strWhite[$(this).index()] + "px no-repeat;");
						$(this).find(".list_table").show();
					} else {
						$(this).css("background", "white");
						$(this).find("a").css("color", "#333333");
						$(this).find("s").attr("style", "background:url(../img/spriteSheet/index.png) 0 -666px no-repeat;");
						$(this).find("b").attr("style", "background:url(../img/spriteSheet/nav_i.png) 0" + str[$(this).index()] + "px no-repeat;");
						$(this).find(".list_table").hide();
					}
				})

			}
			//右侧
			function nav2right() {
				$(".nav2_right li:first a").css("color", "#F03838");
				$(".nav2_right li:gt(0) a").on("mouseenter mouseleave", function(e) {
					if(e.type == "mouseenter") {
						$(this).css("color", "#F03838");
					} else {
						$(this).css("color", "#000000");
					}
				})

			}

			//导航1
			var arr = topbarOp();
			topbarNav();
			//搜索
			hotword();
			//导航2
			nav2right();
			nav2left();
			//购物车
			this.headShop();
		},

		foot: function() {
			/*------------------页脚-----------------------------------*/
			function foot() {
				var footstr = [0, -193, -384, -572, -761, -948];
				$(".service_logo").each(function(index, item) {
					$(this).attr("style", "background:url(../img/spriteSheet/footer.png) " + footstr[index] + "px 0 no-repeat");
				});
			}

			foot();
		}
		,
		
		headShop : function(){
			var arr = coo.getCookie("goods");
			var num = 0;
			arr = JSON.parse(arr);
			$(arr).each(function(){
				num += parseInt(this.count);
			})
			$(".shopnum span").text(num);
		}

	}

});