require(["../config"], function(m) {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery"], function($) {

		$(function() {
			console.log("signin ok!!");
		})
	});
});