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
	let dataInt={"data":[]};
	loadData();
	function loadData(page = '1') {
		$.ajax({
			type: 'post',
			url: 'http://route.showapi.com/341-2',
			dataType: 'json',
			async: false,
			data: {
				"showapi_timestamp": formatterDateTime(),
				"showapi_appid": '59844', //这里需要改成自己的appid
				"showapi_sign": '2698a383b1b04651af4c3e5020b5c8f8', //这里需要改成自己的应用的密钥secret
				"page": 1,
				"maxResult": 1000
			},
			error: function(XmlHttpRequest, textStatus, errorThrown) {
				alert("操作失败!");
			},
			success: function(result) {
				let data = result.showapi_res_body,
					total = data.allPages;
				let dataList = data.contentlist;
				
				//调用分页
				$('#main').html('');
				if(!result.showapi_res_code) {
					data.contentlist.map((item) => {
						dataInt.data.push({"src":item.img});
						$('#main').append(`
							<div class="item">
						        <div class="pic" class="thumbnail">
						            <img src="${item.img}" alt="">
						            <p>${item.title}</p>
						        </div>
						    </div>
						`)
					})
					$('.total').text(`共${total}条`)
				}
			}
		});
	}
	waterFall('main', 'item'); //调用函数
	window.onresize = function() {
		waterFall('main', 'item');
	}; //网页大小改变时同样调用函数
	window.onscroll = function() { //滚动事件
		if(fnScroll()) { //当满足条件时触发
			var oParent = document.getElementById('main');
			for(var i = 0; i < dataInt.data.length; i++) {
				var aChild = document.createElement('div');
				aChild.className = 'item';
				oParent.appendChild(aChild);
				var oBox = document.createElement('div');
				oBox.className = 'pic';
				aChild.appendChild(oBox);
				var oImg = document.createElement('img');
				oImg.src = dataInt.data[i].src;
				oBox.appendChild(oImg)
			}
			waterFall('main', 'item'); //调用函数
		}
	};

	function waterFall(parent, child) {
		var oParent = document.getElementById(parent), //父级
			aChild = oParent.getElementsByClassName(child), //子集（IE9以下不支持getElementsByClassName）
			oneWidth = aChild[0].offsetWidth, //原生offsetWidth,包括padding。
			cols = Math.floor((document.documentElement.clientWidth || document.body.clientWidth) / oneWidth), // 网页宽度/一个元素宽度=列数，Math.floor()表示向下取整。
			aHeight = []; //声明一个空数组来存储每一列的高度
		for(var i = 0; i < aChild.length; i++) {
			if(i < cols) { //i < cols表示是第一行的元素
				aChild[i].style.top = 0; // 第一行top为0
				aChild[i].style.left = i * oneWidth + 'px'; // 第一行left=下标*一个元素的宽度
				aHeight[i] = aChild[i].offsetHeight; // 把第一行每个的高度存进aHeight数组中
			} else {
				var minHeight = Math.min.apply(null, aHeight), // 使用Math.min.apply()得到数组中的最小数，即第一行高度最矮的
					minIdx = aHeight.indexOf(minHeight); // 获取对应的下标（IE8以上）
				aChild[i].style.top = minHeight + 'px'; // 定位，top为上一行最小的高度值
				aChild[i].style.left = minIdx * oneWidth + 'px'; // left为对应下标*一个元素宽度
				aHeight[minIdx] += aChild[i].offsetHeight; //更新数组，总是最小高度的一列加上后面的元素的高度。
			} //样式布局完成
		}
		var maxHeight = Math.max.apply(null, aHeight);
		oParent.style.height = maxHeight + 'px'; //因为是绝对定位absolute，所以父级没有高度，需要取最高的一列的高度给父级
		oParent.style.width = cols * oneWidth + 'px'; //设置父级宽度
	}

	function fnScroll() {
		var oParent = document.getElementById('main'), //父级
			aChild = oParent.getElementsByClassName('item');
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, //兼容写法，获取scrollTop
			viewHeight = document.documentElement.clientHeight, //视窗高度（即看到的一屏的高度）
			lastTop = aChild[aChild.length - 1].offsetTop + Math.floor(aChild[aChild.length - 1].offsetHeight / 2); //最后一个子元素距离网页顶部+自身高度的一半，实现未滚动到底就开始加载
		return(lastTop < scrollTop + viewHeight) ? true : false; //到达指定高度后 返回true，触发waterfall()函数 //如果满足条件返回true，否则返回false
	}

})