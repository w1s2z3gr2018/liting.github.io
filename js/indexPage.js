/*
 *
 * 	@update:2018/05/18  12:30:00
 *  
 * 
 */
"use strict";
$(function(){
	//page2特效代码
	let pageImgNav = $('.pageImg-nav li');
	
	init();
	function init(){
		pageImg();
	};
	function pageImg(){
		pageImgNav.on('click',function(){
			var index= $(this).index();
			$(this).addClass('show').siblings().removeClass('show');
			$('.pageT-warpper li.show .imgs').removeClass('actImg');
			$('.pageT-warpper li.show .texts').removeClass('actTxt');
			pageT(index);
		})
	};
	function pageT(index){
		for (var i = 0; i < $('.pageT-warpper ol li').length; i++) {
			$('.pageT-warpper ol li')[i].className='';
		}
		$('.pageT-warpper ol li')[index].className='show';
		$('.pageT-warpper li.show .imgs').addClass('actImg');
		$('.pageT-warpper li.show .texts').addClass('actTxt');
	};
});
