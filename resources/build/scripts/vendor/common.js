
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

$(window).scroll(function() {
	if ($(this).scrollTop() > 1){  
		$('header').addClass("sticky");
	}
	else{
		$('header').removeClass("sticky");
	}

	$('.bottomOfSet').each( function(i){            
        var bottom_of_object = $(this).offset().top + $(this).outerHeight() - 300;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        
        /* If the object is completely visible in the window, fade it */
        if( bottom_of_window > bottom_of_object ){
            
            $(this).animate({'opacity':'1'},700);
                
        }
        
    }); 

});


$('#myModal').on('shown.bs.modal', function () {
  $('header').removeClass("sticky"); 
}); 


$('#myModal').on('hide.bs.modal', function () {
	$('header').addClass("sticky"); 
}); 