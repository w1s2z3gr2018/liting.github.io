/*
 *	@author:liting
 * 	@update:2018/05/19
 * 
 */
"use strict";
$(function() {
	//获取时间轴；
	let nums = 10;

	function formatterDateTime() {
		var date = new Date()
		var month = date.getMonth() + 1
		var datetime = date.getFullYear() +
			"" // "年"
			+
			(month >= 10 ? month : "0" + month) +
			"" // "月"
			+
			(date.getDate() < 10 ? "0" + date.getDate() : date
				.getDate()) +
			"" +
			(date.getHours() < 10 ? "0" + date.getHours() : date
				.getHours()) +
			"" +
			(date.getMinutes() < 10 ? "0" + date.getMinutes() : date
				.getMinutes()) +
			"" +
			(date.getSeconds() < 10 ? "0" + date.getSeconds() : date
				.getSeconds());
		return datetime;
	}

	//数据获取;
	let pages;
	loadData();
	function loadData(page='1') {
		$.ajax({
			type: 'post',
			url: 'http://route.showapi.com/341-1',
			dataType: 'json',
			async: false,
			data: {
				"showapi_timestamp": formatterDateTime(),
				"showapi_appid": '59844', //这里需要改成自己的appid
				"showapi_sign": '2698a383b1b04651af4c3e5020b5c8f8', //这里需要改成自己的应用的密钥secret
				"page": page,
				"maxResult": nums
			},
			error: function(XmlHttpRequest, textStatus, errorThrown) {
				alert("操作失败!");
			},
			success: function(result) {
				let data = result.showapi_res_body,
					total = data.allPages;
				let dataList = data.contentlist;
				pages = Math.ceil(total / nums); //得到总页数
				//调用分页
				$('.fokeMain').html('');
				if(!result.showapi_res_code) {
					data.contentlist.map((item) => {
						$('.fokeMain').append(`
							<div class="panel panel-default">
								<div class="panel-body">
								      <h4>${item.title}<time>${item.ct}</time></h4>
								      <p>${item.text}</p>
								</div>
							</div>
						`)
					})
					$('.total').text(`共${total}条`)
				}
			}
		});
	}
	page(pages);
	function page(pages=100) {
		laypage({
			cont: 'biuuu_city',
			pages: pages,
			jump: function(obj) {
				loadData(obj.curr)
			}
		})
	}
})