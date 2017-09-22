define([],function(){
	
	return {

			str : 
				
				`<div class="cart_box">
					<div class="c_checkbox">
						<input type="checkbox" class="single_sel" value="1" checked="checked" />
					</div>
					<div class="c_goods">
						<a href="details.html?listId=<%=data.content.listId%>" target="_blank">
							<img src="<%=data.content.img%>" alt="<%=data.content.name%>" title="<%=data.content.name%>" />
							<p>
								<a href="details.html?listId=<%=data.content.listId%>" target="_blank"><%=data.content.name%></a>
							</p>
						</a>
					</div>
					<div class="c_price retail">
						<%=data.content.nprice%>
					</div>
					<div class="c_price">
						<b class="member_price"><%=data.content.vprice%></b>
					</div>
					<div class="c_price">
                        <input type="hidden" value="1"/>
                        <div class="choose_amount">
                            <a class="btn_reduce" href="javascript:;">-</a>
                            <input class="num" type="text" value="<%=data.content.count%>" maxlength="3"/>
                            <a class="btn_add" href="javascript:;">+</a>
                        </div>
                	</div>
                	<div class="c_price price1">
                        <b><%=Math.floor(parseFloat(data.content.count)*parseFloat(data.content.nprice)*100)/100%></b>
                    </div>
                    <div class="c_price weight"><%=data.content.weight%></div>
                    <div class="c_price">
                    	<a href="#" class="a_put">加入收藏</a>
               			<a href="javascript:;" class="a_cancel">删除</a>
                    </div>
				</div>`
				,
				str2 : 
				
					`<div class="item_box">
						<img src="<%=data.content.img%>">
						<ul>
							<li class="shop_name"><a href="details.html?listId=<%=data.content.listId%>"><%=data.content.name%></a></li>
							<li class="shop_price">
								<b><%=data.content.nprice%></b>
								<span>x</span>
								<div class="shop_btn">
									<div class="shop_reduce">-</div>
									<input type="text" value="<%=data.content.count%>" class="shop_txt"/>
									<div class="shop_add">+</div>
								</div>
								<div class="shop_delete">删除</div>
							</li>
						</ul>
					</div>`
	}
});