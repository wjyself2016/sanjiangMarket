require(["../config"], function(m) {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common"], function($,com) {
		
		//加载脚部
		$("#foot2").load("foot2.html",function(){
			com.foot();
		})
		//加载头部
		$("#head2").load("head2.html",function(){
			com.head();
		})
		
		$(function() {
			//用户名
			var arr = [];
			var name = "";
			var passw = "";
			
			$(".reg_item").eq(0).find(".input").focus(function(){
				if($(this).val() == ""){
					$(this).parent().next().find(".tip").show();
					$(this).parent().next().find(".error").hide();
					$(this).next().hide();
				}
			})
	
			$(".reg_item").eq(0).find(".input").on("blur",function(e){
				$(this).parent().next().find(".tip").hide();
				if(/^[0-9a-zA-Z-_]{4,20}$/.test($(this).val())){
					$(this).parent().next().find(".error").hide();
					arr[0] = true;
					name = $(this).val();
				}else{
					if($(this).val() != ""){
						$(this).parent().next().find(".error").find("span").text("您输入的用户名格式不正确，请重新输入");
						$(this).parent().next().find(".error").show();
						arr[0] = false;
					}
				}
			})
			var pass = "";
			//密码
			$(".reg_item").eq(1).find(".input").focus(function(){
				if($(this).val() == ""){
					$(this).parent().next().find(".tip").show();
					$(this).parent().next().find(".error").hide();
					$(this).next().hide();
				}
			})
	
			$(".reg_item").eq(1).find(".input").on("blur",function(e){
				$(this).parent().next().find(".tip").hide();
				if(/^.{6,18}$/.test($(this).val())){
					$(this).next().show();
					$(this).parent().next().find(".error").hide();
					pass = $(this).val();
					arr[1] = true;
					passw = $(this).val();
				}else{
					if($(this).val() != ""){
						$(this).parent().next().find(".error").show();
						$(this).next().hide();
						arr[1] = false;
					}
				}
			})
			
			//重复密码
			$(".reg_item").eq(2).find(".input").focus(function(){
				if($(this).val() == ""){
					$(this).parent().next().find(".tip").show();
					$(this).parent().next().find(".error").hide();
					$(this).next().hide();
				}
			})
			$(".reg_item").eq(2).find(".input").on("blur",function(e){
				$(this).parent().next().find(".tip").hide();
				if($(this).val() == pass){
					$(this).next().show();
					$(this).parent().next().find(".error").hide();
					arr[2] = true;
				}else{
					if($(this).val() != ""){
						$(this).parent().next().find(".error").show();
						$(this).next().hide();
						arr[2] = false;
					}
				}
			})
			
			//手机号
			$(".reg_item").eq(3).find(".input").focus(function(){
				if($(this).val() == ""){
					$(this).parent().next().find(".tip").show();
					$(this).parent().next().find(".error").hide();
					$(this).next().hide();
				}
			})
	
			$(".reg_item").eq(3).find(".input").on("blur",function(e){
				$(this).parent().next().find(".tip").hide();
				if(/^1(3|5|8|7|4)\d{9}$/.test($(this).val())){
					$(this).next().show();
					$(this).parent().next().find(".error").hide();
					arr[3] = true;
				}else{
					if($(this).val() != ""){
						$(this).parent().next().find(".error").show();
						$(this).next().hide();
						arr[3] = false;
					}
				}
			})
			
			//验证码
			$(".reg_item").eq(4).find(".input").on("blur",function(e){
				if($(this).val() == "M0AS"){
					$(this).next().next().next().show();
					arr[4] = true;
					return;
				}
				arr[4] = false;
			})
			//协议
			arr[5] = true;
			$(".reg-xy").find("#xy3").click(function(){
				if($(".reg-xy").find("#xy3").get(0).checked == true){
					console.log("选中");
					arr[5] = true;
				}else{
					console.log("未选中");
					arr[5] = false;
				}
			})
			
			
			
			//提交
			$(".res_btn").click(function(){
				var flag = arr.every(function(value,index){
					return arr[index] == true; 
				});
				console.log(arr)
				console.log(flag)
				
				
				if(arr.length >= 6 && flag ){
					console.log("ok");
					$.ajax({
						type:"get",
						url:"http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID="+name+"&password="+passw,
						async:true,
						success : function(data){
							if(data == 0){
								alert("用户名已存在");
							}
							if(data == 1){
								alert("注册成功");
							}
							if(data == 2){
								alert("注册失败");
							}
						}
					});
				}
			})
		})
	});
});