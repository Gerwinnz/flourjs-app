

/*
|
|
| Flourjs boilerplate
|
|
*/
var startApp = function(){

  //
  //  Base url
  //
  if(!location.origin){
   location.origin = location.protocol + "//" + location.host;
  }


  //
	// Init flour js
  //
  flour.config({
    base_url: location.origin,
    title: 'Flourjs boilerplate'
  });


  //
  // Override the default http response handler here
  //
  flour.requestHandler = function(response, status, options){
    var unhandled = false;

    if(options[response.status]){
      if(response.status === 'error'){
        options[response.status](response.error);  
      }else{
        options[response.status](response.pkg);
      }
    }else{
      unhandled = true;
    }

    if(options.done){
      options.done(response);
    }else{
      if(unhandled){
        console.log('Unhandled response: ' + response.status);
      }
    }
  };


  //
  // Create and append our main app view
  //
  var $app = $('#flourjs-app');
  var mainView = flour.getView('main');


  //
  // Append
  //
  $app.empty();
  $app.append(mainView.el);


  //
  // Attach fast click
  //
  $(function() {
    FastClick.attach(document.body);
  });

};
flour.addTemplate('home', '<div class=\"container\"><div class=\"row\"><div class=\"eight columns\"><h1>Welcome to flourjs</h1><p>Welcome.</p></div><div class=\"four columns\"></div></div></div>');
flour.addTemplate('main', '<div class=\"top-bar\"></div><div class=\"content\"></div>');


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