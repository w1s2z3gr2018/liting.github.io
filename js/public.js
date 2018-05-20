/*
 * @update:2018/05/20;
 * @description:"没有情人的情人节，那就是光棍节！";
 * 
 */

function time(){
		let times = new Date().toLocaleString();
		document.querySelector('.time').innerHTML = times
	}
setInterval("time()",1000)