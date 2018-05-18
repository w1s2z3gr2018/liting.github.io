		/*
		 * @update:2018/5/18
		 * @author:liting
		 * 登录框操作
		 * 
		 */
		
		/*
		 *	本地存储判断是否为登陆状态
		 */
		//设置头像的宽度自适应；
		let avaHeight = $('.avatar').css('height');
		$('.avatar').css('width', avaHeight)
		var login = document.querySelector('.modal');
		console.log(window.localStorage)
		if(window.localStorage.length){
			let data = 	localStorage.getItem('data')
			console.log(data)
			let dataJson = JSON.parse(data);
			$('.loginAdmin span').text(dataJson.user)
		}else{
			login.style.display = "block";
			document.querySelector('#user').focus();
		}
		/*
		 * 提示消息
		 */
		function showTxt(data) {
			var x = document.getElementById("showTxt");
			x.innerHTML = data;
			x.className = "show";
			setTimeout(function() {
				x.className = x.className.replace("show", "");
			}, 3000);
		};
		// 获取模型
		var modal = document.getElementById('id01');
		// 鼠标点击模型外区域关闭登录框
		window.onclick = function(event) {
			if(event.target == modal) {
				var txt = "登录后才可进入首页";
				showTxt(txt);
			};
		}
		/*
		 * 登录操作
		 */
		var subBtn = document.querySelector(".subBtn");
		subBtn.onclick = function(e) {
			e.preventDefault();
			var user = document.querySelector("#user").value;
			var passW = document.querySelector("#passW").value;
			let obj={};
			obj.user=user;
			if(user == 'admin' && passW == '123456') {
				login.classList.add('loginHide');
				let welTxt = "欢迎 [\n" + user + "\n] 进入首页!"
				document.querySelector(".http").style.height = "100%";
				showTxt(welTxt);
				//本地存储登陆状态
				localStorage.setItem('data',JSON.stringify(obj));
			} else {
				showTxt("请输入正确的用户名/密码!");
			};
			
		};
		var returnTop = document.querySelector('.returnTop');
		window.onscroll = function() {
			let y = window.scrollY;
			if(y > 200) {
				setTimeout(function() {
					returnTop.classList.add("moveTop");
				}, 100);
			} else {
				setTimeout(function() {
					returnTop.classList.remove("moveTop");
				}, 100);
			}
		};
		returnTop.onclick = function() {
			let scrollTop = window.scrollY;
			let time = function() {
				scrollTop -= 20;
				if(scrollTop <= 0) {
					clearInterval(times);
				}
				window.scrollTo(0, scrollTop);
			}
			let times = setInterval(time, 0.01);
		}
		
