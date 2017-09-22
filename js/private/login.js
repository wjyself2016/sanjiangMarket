require(["../config"], function(m) {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common"], function($,com) {
		
		//加载脚部
		$("#foot2").load("foot2.html",function(){
			com.foot();
		})
		
		$(function() {
			var $tip = $(".error_tip");
			$(".input,.input2").focus(function(){
				$tip.hide();
			})
			
			$(".btn-entry").click(function(){
				var name = $("#userName").val();
				var passw = $("#password").val();
				$.ajax({
					type : "get",
					url : "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+name+"&password="+passw,
					success : function(data){
						console.log(data);
						if(data == 0 || data == 2){
							
							$tip.show();
						}else{
							alert("登陆成功");
						}
					}
				})
			})
		})
	});
});