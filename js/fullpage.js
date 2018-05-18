$('body,html').mousemove(function(e) {
	var e = e || window.event;
	if(e.clientY < 54) {
		$('.indexNav').addClass('navShow');
	}
})

var runPage;
runPage = new FullPage({
	id: 'pageContain',
	slideTime: 800,
	effect: {
		transform: {
			translate: 'Y'
		},
		opacity: [0, 1]
	},
	mode: 'wheel, touch, nav:navBar',
	easing: 'ease',
	callback: function(index, thisPage) {
		if(index){
			$('.indexNav').removeClass('navShow');
		} else{
			$('.indexNav').addClass('navShow');
		};
		if(index==1){
			$('.pageT-warpper').addClass('pageShow');
			$('.pageImg').addClass('pageShow');
			$('.pageImg-nav li')[0].className='show'
			setTimeout(function(){
				$('.pageT-warpper li')[0].className='show';
			},400)
			setTimeout(function(){
				$('.pageT-warpper li.show .imgs').addClass('actImg');
				$('.pageT-warpper li.show .texts').addClass('actTxt');
			},900)
		}else{
			for (var i = 0; i < $('.pageImg-nav li').length; i++) {
				$('.pageImg-nav li')[i].className='';
			}
			$('.pageT-warpper').removeClass('pageShow');
			$('.pageImg').removeClass('pageShow');
			$('.pageT-warpper li.show .imgs').removeClass('actImg');
			$('.pageT-warpper li.show .texts').removeClass('actTxt');
			for (var i = 0; i < $('.pageT-warpper li').length; i++) {
				$('.pageT-warpper li')[i].className='';
			}
		};
		if(index==2){
			$('.pageS').addClass('show');
		}else{
			$('.pageS').removeClass('show');
		}
	}
});