$(function(){
	$('body,html').mousemove(function(e){
		var  e = e||window.event;
		if(e.clientY<54){
			$('.indexNav').addClass('navShow');
		}
	})
	$(window).scroll(function(){
		$('.indexNav').removeClass('navShow');
	})
})
