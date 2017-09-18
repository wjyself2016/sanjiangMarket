define([],function(){
	
	return {

			str :

			`<div class="body_left">
				<h2><a href="#"><%=data.a.name%></a></h2>
				<div class="tip"><%=data.a.tip%></div>
				<div class="price">
					<b><%=data.a.price%></b>
					<a href="#"><%=data.a.btn%></a>
				</div>
				<a href="#"><img src="<%=data.a.img%>"></a>
			</div>
			<ul class="body_right">
			
			<%if(data.b.length>8){%>
				<%data.b.length = 8;%>
			<%}%>
			
			<% for(var i=0;i<data.b.length;i++){ %>
				<li>
					<h2><a href="#"><%=data.b[0].name%></a></h2>
					<div class="tip"><%=data.b[0].tip%></div>
					<b><%=data.b[0].price%></b>
					<a class="buy" href="#"><%=data.b[0].btn%></a>
					<a href="#"><img src="<%=data.b[0].img%>"></a>
				</li>
			<% } %>
			
			</ul>`

	}
});