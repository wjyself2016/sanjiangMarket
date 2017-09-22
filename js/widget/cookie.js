
//cookie
define([],function(){
	return {
		getCookie : function(key){
			var cookiestr = document.cookie;
			var list = cookiestr.split("; ");
			for(var i=0; i<list.length; i++){
				var kvs = list[i].split("=");
				if(kvs[0]==key) {
					return kvs[1];
				}
			}
			return null;
		},
		
		setCookie : function({key,value,day,path}){
			var d = new Date();
			d.setDate(d.getDate()+day);
			document.cookie = key+"="+value+";"+(day?"expires="+d+";":"") + (path?"path="+path+";":"");
		},
		
		//进行cookie储存
		setgood2coo : function (id,count){
				
			if(this.getCookie("goods") == null || this.getCookie("goods") == ""){
				arr = [{listId:id,count:count}];
			}else{
				arr = JSON.parse(this.getCookie("goods"));
				var resarr = arr.filter(function(value,index){
					return value.listId == id;
				})
				if(resarr.length>0){
					resarr[0].count = parseInt(resarr[0].count)+parseInt(count);
				}else{
					arr.push({listId:id,count:count});
				}
			}
			arr = JSON.stringify(arr);
			this.setCookie({
				key:"goods",
				value:arr
			});
		}
	}
});

