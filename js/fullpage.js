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
			$('.indexNav').addClass('navShow')
		}
		console.log('滚动到了第 ' + (index + 1) + ' 屏');
	}
});