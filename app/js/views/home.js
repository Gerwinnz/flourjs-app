

/*
|
|
|	Our home view
|
|
*/
flour.addView('home', function(){

	var view = this;


	//
	//	View options
	//
	view.template = 'home';
	view.helpers = [];
	view.events = {
		
	};


	//
	//	Init
	//
	view.init = function(){
		view.render();
	};


});