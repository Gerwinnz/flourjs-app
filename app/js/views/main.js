

/*
|
|
|	Our main view
|
|
*/
flour.addView('main', function(){

	var view = this;


	//
	//	View options
	//
	view.template = 'main';
	view.helpers = [];
	view.events = {
		
	};



	//
	//	Private vars
	//
	var app = false;


	//
	//	Init
	//
	view.init = function(){
		view.createApp();
	};



	//
	//	Create app!
	//
	view.createApp = function(){

		//	Create our router
		app = new flour.app('flourjs boilerplate', {
			routes: {
				'/home': {view: 'home'},
				'/': {view: 'home'}
			}
		});

		// Render
		view.render();
	};



	//
	//	Post render
	//
	view.postRender = function(){
		view.find('.content').append(app.el);
	};


});