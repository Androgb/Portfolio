$(document).ready(function(){

	$('.up').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 700 ){
			$('.up').slideDown(300);
		} else {
			$('.up').slideUp(300);
		}
	});

});



	$(document).ready(function() {
		var countCalled = false;
	
		$(window).scroll(function() {
			if ($(this).scrollTop() > 1950 && !countCalled) {
				function count() {
					var counter = { var: 0 };
					var counter1 = { var: 0 };
	
					var tween1 = TweenMax.to(counter, 3, {
						var: 2,
						onUpdate: function () {
							var number = Math.ceil(counter.var);
							$('.counter').html(number);
						},
						onComplete: function () {
							$('.counter').html(counter.var); // Establece el número final
						},
						ease: Circ.easeOut
					});
	
					var tween2 = TweenMax.to(counter1, 3, {
						var: 3,
						onUpdate: function () {
							var number = Math.ceil(counter1.var);
							$('.counter1').html(number);
						},
						onComplete: function () {
							$('.counter1').html(counter1.var); // Establece el número final
						},
						ease: Circ.easeOut
					});
				}
	
				count();
				countCalled = true;
			}
		});
	});

	document.addEventListener('DOMContentLoaded', function () {
		const mostrarBtn = document.getElementById('toggle');
		const cerrarBtn = document.getElementById('menu-close');
		const menu = document.getElementById('menu-toggle');
	
		mostrarBtn.addEventListener('click', function () {
			menu.style.display = 'flex';
			cerrarBtn.style.display = 'block';
			mostrarBtn.style.display = 'none';
		});
	
		cerrarBtn.addEventListener('click', function () {
			cerrarMenu();
		});
	
		document.addEventListener('keydown', function (event) {
			if (event.key === 'x' || event.key === 'X') {
				cerrarMenu();
			}
		});
	
		function cerrarMenu() {
			menu.style.display = 'none';
			mostrarBtn.style.display = 'block';
			cerrarBtn.style.display = 'none';
		}
	});
	
	const ACTION_ADD = 'ACTION_ADD';
	const ACTION_REPLACE = 'ACTION_REPLACE';
	
	class AsyncWritter {
		textContentArr;
		numTicks = 2;
		isInfiniteLoop = true;
	
		constructor(selector, messages){
		  let element = document.querySelector(selector);
		  
		  this.textContentArr = messages;
	
		  Rx.Observable.concat(
			...this.textContentArr.map( (x) => 
			  this.write(x).finally( ()=> element.textContent = '')
			)
		  )
		  .repeat( this.isInfiniteLoop ? null : 1)
		  .subscribe(
			(val) => {
			  //console.log(val)
			  switch(val.action){
				case ACTION_ADD : element.textContent += val.value; break;
				case ACTION_REPLACE : element.textContent = element.textContent.slice(0, element.textContent.length - 1); break;
			  }
			}
		  )
		}
	
		write(text){
		  return Rx.Observable
			.concat(
			  ...Array
				.from(text).map( (val) =>{
	
				  let { 
					  action = ACTION_ADD
					, value = val
				  } = val;
	
				  let obs = (action === ACTION_ADD 
					? this.add(value) : this.replace() )
	
				  return Rx.Observable
					.concat( obs, this.add('|'), this.replace() )
				}), 
			  this.tick().repeat(this.numTicks),
			  this.replaceWithTick().repeat(text.length)
			)
		}
	
		randomDelay(bottom, top) {
		  return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
		}
	
		tick(start = 1200, end = 1200){
		  return Rx.Observable.concat(
			this.add('|'),
			this.replace(start, end)
		  )
		}
	
		add(value, start = 10, end = 100){
		  return Rx.Observable
			.of({ action : ACTION_ADD, value })
			.delay( this.randomDelay(start, end) );
		}
	
		replace(start = 10, end = 100){
		  return Rx.Observable
			.of({ action : ACTION_REPLACE })
			.delay( this.randomDelay(start, end) );
		}
	
		replaceWithTick(){
		  return Rx.Observable.concat(
			this.replace(), this.tick(10, 100)
		  )
		}
	
	}
	
	
	let messages = [
		'Alejandro',
	 [
		  ...Array.from('Desarrollador'),
		]
	  ];
	
	new AsyncWritter('.creator', messages);