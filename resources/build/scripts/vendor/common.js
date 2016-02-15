
var initSlider = function() {
	console.log("initSlider"); 
	var owl = $("#owl-demo");
	
	owl.owlCarousel({
	  autoPlay: false, //Set AutoPlay to 3 seconds
	  items : 4,
	  itemsDesktop : [1199,3],
	  itemsDesktopSmall : [979,3]
	});

	// Custom Navigation Events
	$(".next").click(function(){
		owl.trigger('owl.next');
	});
	$(".prev").click(function(){
		owl.trigger('owl.prev');
	});

};
