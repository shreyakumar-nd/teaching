
function loadSliders() {
	$(function() {
		var select = $( "#pLength" );
		var sliderPLength = $( "<div id='sliderPLength'></div>" ).insertAfter( select ).slider({
		  min: 1,
		  max: 6,
		  range: "min",
		  value: select[ 0 ].selectedIndex + 1,
		  slide: function( event, ui ) {
			select[ 0 ].selectedIndex = ui.value - 1;
		  }
		});
		$( "#pLength" ).change(function() {
		  sliderPLength.slider( "value", this.selectedIndex + 1 );
		});
	  });
	  
	  
	  $(function() {
		var select = $( "#guesses" );
		var sliderGuesses = $( "<div id='sliderGuesses'></div>" ).insertAfter( select ).slider({
		  min: 1,
		  max: 6,
		  range: "min",
		  value: select[ 0 ].selectedIndex + 1,
		  slide: function( event, ui ) {
			select[ 0 ].selectedIndex = ui.value - 1;
		  }
		});
		$( "#guesses" ).change(function() {
		  sliderGuesses.slider( "value", this.selectedIndex + 1 );
		});
	  });
	  
	}


window.onload = function() {
	loadSliders();
}