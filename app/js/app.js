

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