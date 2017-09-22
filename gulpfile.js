
/********************
 *  var concat = require("gulp-concat"); //合并文件
 *	var connect = require("gulp-connect"); //热部署（即时刷新）
 *	var sass = require("gulp-ruby-sass"); //编译sass
 *	var rename = require("gulp-rename"); //重命名文件
 *	var babel = require("gulp-babel"); //编译ES6
 *  var webserver = require("gulp-webserver")//网络服务
 *	var proxy = require('http-proxy-middleware')//中间件-代理
 *******************/

//加载gulp
var gulp = require("gulp");
//加载压缩模块
var uglify = require("gulp-uglify");
//编译ES6
var babel = require("gulp-babel"); 
//编译sass
var sass = require("gulp-ruby-sass");
//网络服务
var webserver = require("gulp-webserver")
//中间件-代理
var proxy = require('http-proxy-middleware')


//兼容ES6并压缩
//gulp.task("reducejs",function(){
//	//任务要执行的代码
//	gulp.src("./js/*.js")  //从指定目录读取js文件
//		.pipe(babel({
//			presets : ["es2015"]
//		}))
//		.pipe(uglify())
//		.pipe(gulp.dest("./reducejs/")); //通过pipe输送到 目标位置
//});

//预编译
gulp.task("compilesass",function(){
	sass("./scss/*.scss", {
		style : "expanded"
	}).pipe( gulp.dest("./css/") )
})
//浏览器刷新
//gulp.task("refresh", function(){
//	gulp.src("./html/*.html").pipe(webserver.reload());
//});

//web服务器
gulp.task("webserver", function () {
	gulp.src('./')
		.pipe(
			webserver({
				host: 'localhost',
				port: 8000,
				livereload: true,
				directoryListing: {
					enable: true,
					path: './'
				},
				//中间件代理
				middleware: [
					proxy('/api',{
						target: 'http://www.sanjiang.com/', // target host
		        		changeOrigin: true,  
		        		pathRewrite: {
		        			"^/api": ""
		        		}// needed for virtual hosted sites
					})
					
				]
				
			})
		)
})

//监听
gulp.task("listening", function(){
	
	gulp.watch("./scss/*.scss", ["compilesass"]);
//	gulp.watch("./js/*.js", ["reducejs"]);
//	gulp.watch("./css/*.css", ["refresh"]);
})

gulp.task('default', ["listening", "webserver"], function () {
	console.log('done.');
})
