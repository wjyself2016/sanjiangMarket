define([],function(){
	
	return {

			str :

				`<div class="stair_top">
					<h2>
						<i><%=data.top.logo[0]%></i>
						<span><%=data.top.logo[1]%></span>
					</h2>
					<ul>
						<% for(var i=0;i<data.top.nav.length;i++){ %>
							<li><a href="#"><%=data.top.nav[i]%></a></li>
						<%}%>
					</ul>
				</div>
				<div class="stair_bottom">
					<div class="side">
						<img src="<%=data.bottom.side.img%>">
						<div class="side_list1">
							<ul>
								<% for(var i=0;i<data.bottom.side.list1.length;i++){ %>
									<li><a href="#"><%=data.bottom.side.list1[i]%></a></li>
								<%}%>
							</ul>
						</div>
						<div class="side_list2">
							<ul>
								<% for(var i=0;i<data.bottom.side.list2.length;i++){ %>
									<li><a href="#"><%=data.bottom.side.list2[i]%></a></li>
								<%}%>
							</ul>
						</div>
					</div>
					<div class="center">
						<div class="centerlist">
						
						<% for(var i=0;i<data.bottom.center.length;i++){ %>
							<ul>
							<% for(var j=0;j<data.bottom.center[i].length;j++){ %>
								<li>
									<a class="img_box" href="details.html?listId=<%=data.bottom.center[i][j].listId%>"><img src="<%=data.bottom.center[i][j].img%>"></a>
									<h2><a href="#"><%=data.bottom.center[i][j].name%></a></h2>
									<div class="tip_box">
										<b><%=data.bottom.center[i][j].price%></b>
										<a href="javascript:;" class="shop_item"></a>
									</div>
								</li>
							<%}%>
							</ul>
						<%}%>
					
						</div>
					</div>
					<div class="side_right">
						<a href="#"><img src="<%=data.bottom.right[0]%>"></a>
						<a href="#"><img src="<%=data.bottom.right[1]%>"></a>
					</div>
				</div>
				<div class="stair_foot">
					<% for(var i=0;i<data.foot.length;i++){ %>
						<a href="#"><img src="<%=data.foot[i]%>"></a>
					<%}%>
				</div>`
				
					
	}
});