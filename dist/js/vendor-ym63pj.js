function FastClick(t,e){"use strict";function i(t,e){return function(){return t.apply(e,arguments)}}var n;if(e=e||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=e.touchBoundary||10,this.layer=t,this.tapDelay=e.tapDelay||200,!FastClick.notNeeded(t)){for(var o=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],r=this,s=0,c=o.length;c>s;s++)r[o[s]]=i(r[o[s]],r);deviceIsAndroid&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,i,n){var o=Node.prototype.removeEventListener;"click"===e?o.call(t,e,i.hijacked||i,n):o.call(t,e,i,n)},t.addEventListener=function(e,i,n){var o=Node.prototype.addEventListener;"click"===e?o.call(t,e,i.hijacked||(i.hijacked=function(t){t.propagationStopped||i(t)}),n):o.call(t,e,i,n)}),"function"==typeof t.onclick&&(n=t.onclick,t.addEventListener("click",function(t){n(t)},!1),t.onclick=null)}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;FastClick.prototype.needsClick=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(deviceIsIOS&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},FastClick.prototype.needsFocus=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!deviceIsAndroid;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},FastClick.prototype.sendClick=function(t,e){"use strict";var i,n;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),n=e.changedTouches[0],i=document.createEvent("MouseEvents"),i.initMouseEvent(this.determineEventType(t),!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),i.forwardedTouchEvent=!0,t.dispatchEvent(i)},FastClick.prototype.determineEventType=function(t){"use strict";return deviceIsAndroid&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(t){"use strict";var e;deviceIsIOS&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},FastClick.prototype.updateScrollParent=function(t){"use strict";var e,i;if(e=t.fastClickScrollParent,!e||!e.contains(t)){i=t;do{if(i.scrollHeight>i.offsetHeight){e=i,t.fastClickScrollParent=i;break}i=i.parentElement}while(i)}e&&(e.fastClickLastScrollTop=e.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(t){"use strict";return t.nodeType===Node.TEXT_NODE?t.parentNode:t},FastClick.prototype.onTouchStart=function(t){"use strict";var e,i,n;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),i=t.targetTouches[0],deviceIsIOS){if(n=window.getSelection(),n.rangeCount&&!n.isCollapsed)return!0;if(!deviceIsIOS4){if(i.identifier&&i.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=i.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=i.pageX,this.touchStartY=i.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(t){"use strict";var e=t.changedTouches[0],i=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>i||Math.abs(e.pageY-this.touchStartY)>i?!0:!1},FastClick.prototype.onTouchMove=function(t){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(t){"use strict";return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(t){"use strict";var e,i,n,o,r,s=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,i=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,deviceIsIOSWithBadTarget&&(r=t.changedTouches[0],s=document.elementFromPoint(r.pageX-window.pageXOffset,r.pageY-window.pageYOffset)||s,s.fastClickScrollParent=this.targetElement.fastClickScrollParent),n=s.tagName.toLowerCase(),"label"===n){if(e=this.findControl(s)){if(this.focus(s),deviceIsAndroid)return!1;s=e}}else if(this.needsFocus(s))return t.timeStamp-i>100||deviceIsIOS&&window.top!==window&&"input"===n?(this.targetElement=null,!1):(this.focus(s),this.sendClick(s,t),deviceIsIOS&&"select"===n||(this.targetElement=null,t.preventDefault()),!1);return deviceIsIOS&&!deviceIsIOS4&&(o=s.fastClickScrollParent,o&&o.fastClickLastScrollTop!==o.scrollTop)?!0:(this.needsClick(s)||(t.preventDefault(),this.sendClick(s,t)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(t){"use strict";return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},FastClick.prototype.onClick=function(t){"use strict";var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},FastClick.prototype.destroy=function(){"use strict";var t=this.layer;deviceIsAndroid&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(t){"use strict";var e,i,n;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!deviceIsAndroid)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(i>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(deviceIsBlackBerry10&&(n=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),n[1]>=10&&n[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction?!0:!1},FastClick.attach=function(t,e){"use strict";return new FastClick(t,e)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick;
// lib/handlebars/base.js
/*jshint eqnull:true*/this.Handlebars={},function(e){e.VERSION="1.0.rc.1",e.helpers={},e.partials={},e.registerHelper=function(e,t,n){n&&(t.not=n),this.helpers[e]=t},e.registerPartial=function(e,t){this.partials[e]=t},e.registerHelper("helperMissing",function(e){if(arguments.length===2)return undefined;throw new Error("Could not find property '"+e+"'")});var t=Object.prototype.toString,n="[object Function]";e.registerHelper("blockHelperMissing",function(r,i){var s=i.inverse||function(){},o=i.fn,u="",a=t.call(r);return a===n&&(r=r.call(this)),r===!0?o(this):r===!1||r==null?s(this):a==="[object Array]"?r.length>0?e.helpers.each(r,i):s(this):o(r)}),e.K=function(){},e.createFrame=Object.create||function(t){e.K.prototype=t;var n=new e.K;return e.K.prototype=null,n},e.registerHelper("each",function(t,n){var r=n.fn,i=n.inverse,s=0,o="",u;n.data&&(u=e.createFrame(n.data));if(t&&typeof t=="object")if(t instanceof Array)for(var a=t.length;s<a;s++)u&&(u.index=s),o+=r(t[s],{data:u});else for(var f in t)t.hasOwnProperty(f)&&(u&&(u.key=f),o+=r(t[f],{data:u}),s++);return s===0&&(o=i(this)),o}),e.registerHelper("if",function(r,i){var s=t.call(r);return s===n&&(r=r.call(this)),!r||e.Utils.isEmpty(r)?i.inverse(this):i.fn(this)}),e.registerHelper("unless",function(t,n){var r=n.fn,i=n.inverse;return n.fn=i,n.inverse=r,e.helpers["if"].call(this,t,n)}),e.registerHelper("with",function(e,t){return t.fn(e)}),e.registerHelper("log",function(t){e.log(t)})}(this.Handlebars);var handlebars=function(){function n(){this.yy={}}var e={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,statements:6,simpleInverse:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,inMustache:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,OPEN_PARTIAL:24,params:25,hash:26,DATA:27,param:28,STRING:29,INTEGER:30,BOOLEAN:31,hashSegments:32,hashSegment:33,ID:34,EQUALS:35,pathSegments:36,SEP:37,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",27:"DATA",29:"STRING",30:"INTEGER",31:"BOOLEAN",34:"ID",35:"EQUALS",37:"SEP"},productions_:[0,[3,2],[4,3],[4,1],[4,0],[6,1],[6,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[7,2],[17,3],[17,2],[17,2],[17,1],[17,1],[25,2],[25,1],[28,1],[28,1],[28,1],[28,1],[28,1],[26,1],[32,2],[32,1],[33,3],[33,3],[33,3],[33,3],[33,3],[21,1],[36,3],[36,1]],performAction:function(t,n,r,i,s,o,u){var a=o.length-1;switch(s){case 1:return o[a-1];case 2:this.$=new i.ProgramNode(o[a-2],o[a]);break;case 3:this.$=new i.ProgramNode(o[a]);break;case 4:this.$=new i.ProgramNode([]);break;case 5:this.$=[o[a]];break;case 6:o[a-1].push(o[a]),this.$=o[a-1];break;case 7:this.$=new i.BlockNode(o[a-2],o[a-1].inverse,o[a-1],o[a]);break;case 8:this.$=new i.BlockNode(o[a-2],o[a-1],o[a-1].inverse,o[a]);break;case 9:this.$=o[a];break;case 10:this.$=o[a];break;case 11:this.$=new i.ContentNode(o[a]);break;case 12:this.$=new i.CommentNode(o[a]);break;case 13:this.$=new i.MustacheNode(o[a-1][0],o[a-1][1]);break;case 14:this.$=new i.MustacheNode(o[a-1][0],o[a-1][1]);break;case 15:this.$=o[a-1];break;case 16:this.$=new i.MustacheNode(o[a-1][0],o[a-1][1]);break;case 17:this.$=new i.MustacheNode(o[a-1][0],o[a-1][1],!0);break;case 18:this.$=new i.PartialNode(o[a-1]);break;case 19:this.$=new i.PartialNode(o[a-2],o[a-1]);break;case 20:break;case 21:this.$=[[o[a-2]].concat(o[a-1]),o[a]];break;case 22:this.$=[[o[a-1]].concat(o[a]),null];break;case 23:this.$=[[o[a-1]],o[a]];break;case 24:this.$=[[o[a]],null];break;case 25:this.$=[[new i.DataNode(o[a])],null];break;case 26:o[a-1].push(o[a]),this.$=o[a-1];break;case 27:this.$=[o[a]];break;case 28:this.$=o[a];break;case 29:this.$=new i.StringNode(o[a]);break;case 30:this.$=new i.IntegerNode(o[a]);break;case 31:this.$=new i.BooleanNode(o[a]);break;case 32:this.$=new i.DataNode(o[a]);break;case 33:this.$=new i.HashNode(o[a]);break;case 34:o[a-1].push(o[a]),this.$=o[a-1];break;case 35:this.$=[o[a]];break;case 36:this.$=[o[a-2],o[a]];break;case 37:this.$=[o[a-2],new i.StringNode(o[a])];break;case 38:this.$=[o[a-2],new i.IntegerNode(o[a])];break;case 39:this.$=[o[a-2],new i.BooleanNode(o[a])];break;case 40:this.$=[o[a-2],new i.DataNode(o[a])];break;case 41:this.$=new i.IdNode(o[a]);break;case 42:o[a-2].push(o[a]),this.$=o[a-2];break;case 43:this.$=[o[a]]}},table:[{3:1,4:2,5:[2,4],6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{1:[3]},{5:[1,16]},{5:[2,3],7:17,8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,19],20:[2,3],22:[1,13],23:[1,14],24:[1,15]},{5:[2,5],14:[2,5],15:[2,5],16:[2,5],19:[2,5],20:[2,5],22:[2,5],23:[2,5],24:[2,5]},{4:20,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{4:21,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{17:22,21:23,27:[1,24],34:[1,26],36:25},{17:27,21:23,27:[1,24],34:[1,26],36:25},{17:28,21:23,27:[1,24],34:[1,26],36:25},{17:29,21:23,27:[1,24],34:[1,26],36:25},{21:30,34:[1,26],36:25},{1:[2,1]},{6:31,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{5:[2,6],14:[2,6],15:[2,6],16:[2,6],19:[2,6],20:[2,6],22:[2,6],23:[2,6],24:[2,6]},{17:22,18:[1,32],21:23,27:[1,24],34:[1,26],36:25},{10:33,20:[1,34]},{10:35,20:[1,34]},{18:[1,36]},{18:[2,24],21:41,25:37,26:38,27:[1,45],28:39,29:[1,42],30:[1,43],31:[1,44],32:40,33:46,34:[1,47],36:25},{18:[2,25]},{18:[2,41],27:[2,41],29:[2,41],30:[2,41],31:[2,41],34:[2,41],37:[1,48]},{18:[2,43],27:[2,43],29:[2,43],30:[2,43],31:[2,43],34:[2,43],37:[2,43]},{18:[1,49]},{18:[1,50]},{18:[1,51]},{18:[1,52],21:53,34:[1,26],36:25},{5:[2,2],8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,2],22:[1,13],23:[1,14],24:[1,15]},{14:[2,20],15:[2,20],16:[2,20],19:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,7],14:[2,7],15:[2,7],16:[2,7],19:[2,7],20:[2,7],22:[2,7],23:[2,7],24:[2,7]},{21:54,34:[1,26],36:25},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{18:[2,22],21:41,26:55,27:[1,45],28:56,29:[1,42],30:[1,43],31:[1,44],32:40,33:46,34:[1,47],36:25},{18:[2,23]},{18:[2,27],27:[2,27],29:[2,27],30:[2,27],31:[2,27],34:[2,27]},{18:[2,33],33:57,34:[1,58]},{18:[2,28],27:[2,28],29:[2,28],30:[2,28],31:[2,28],34:[2,28]},{18:[2,29],27:[2,29],29:[2,29],30:[2,29],31:[2,29],34:[2,29]},{18:[2,30],27:[2,30],29:[2,30],30:[2,30],31:[2,30],34:[2,30]},{18:[2,31],27:[2,31],29:[2,31],30:[2,31],31:[2,31],34:[2,31]},{18:[2,32],27:[2,32],29:[2,32],30:[2,32],31:[2,32],34:[2,32]},{18:[2,35],34:[2,35]},{18:[2,43],27:[2,43],29:[2,43],30:[2,43],31:[2,43],34:[2,43],35:[1,59],37:[2,43]},{34:[1,60]},{14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,17],14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]},{18:[1,61]},{18:[1,62]},{18:[2,21]},{18:[2,26],27:[2,26],29:[2,26],30:[2,26],31:[2,26],34:[2,26]},{18:[2,34],34:[2,34]},{35:[1,59]},{21:63,27:[1,67],29:[1,64],30:[1,65],31:[1,66],34:[1,26],36:25},{18:[2,42],27:[2,42],29:[2,42],30:[2,42],31:[2,42],34:[2,42],37:[2,42]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]},{18:[2,36],34:[2,36]},{18:[2,37],34:[2,37]},{18:[2,38],34:[2,38]},{18:[2,39],34:[2,39]},{18:[2,40],34:[2,40]}],defaultActions:{16:[2,1],24:[2,25],38:[2,23],55:[2,21]},parseError:function(t,n){throw new Error(t)},parse:function(t){function v(e){r.length=r.length-2*e,i.length=i.length-e,s.length=s.length-e}function m(){var e;return e=n.lexer.lex()||1,typeof e!="number"&&(e=n.symbols_[e]||e),e}var n=this,r=[0],i=[null],s=[],o=this.table,u="",a=0,f=0,l=0,c=2,h=1;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,typeof this.lexer.yylloc=="undefined"&&(this.lexer.yylloc={});var p=this.lexer.yylloc;s.push(p);var d=this.lexer.options&&this.lexer.options.ranges;typeof this.yy.parseError=="function"&&(this.parseError=this.yy.parseError);var g,y,b,w,E,S,x={},T,N,C,k;for(;;){b=r[r.length-1];if(this.defaultActions[b])w=this.defaultActions[b];else{if(g===null||typeof g=="undefined")g=m();w=o[b]&&o[b][g]}if(typeof w=="undefined"||!w.length||!w[0]){var L="";if(!l){k=[];for(T in o[b])this.terminals_[T]&&T>2&&k.push("'"+this.terminals_[T]+"'");this.lexer.showPosition?L="Parse error on line "+(a+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+k.join(", ")+", got '"+(this.terminals_[g]||g)+"'":L="Parse error on line "+(a+1)+": Unexpected "+(g==1?"end of input":"'"+(this.terminals_[g]||g)+"'"),this.parseError(L,{text:this.lexer.match,token:this.terminals_[g]||g,line:this.lexer.yylineno,loc:p,expected:k})}}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+b+", token: "+g);switch(w[0]){case 1:r.push(g),i.push(this.lexer.yytext),s.push(this.lexer.yylloc),r.push(w[1]),g=null,y?(g=y,y=null):(f=this.lexer.yyleng,u=this.lexer.yytext,a=this.lexer.yylineno,p=this.lexer.yylloc,l>0&&l--);break;case 2:N=this.productions_[w[1]][1],x.$=i[i.length-N],x._$={first_line:s[s.length-(N||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(N||1)].first_column,last_column:s[s.length-1].last_column},d&&(x._$.range=[s[s.length-(N||1)].range[0],s[s.length-1].range[1]]),S=this.performAction.call(x,u,f,a,this.yy,w[1],i,s);if(typeof S!="undefined")return S;N&&(r=r.slice(0,-1*N*2),i=i.slice(0,-1*N),s=s.slice(0,-1*N)),r.push(this.productions_[w[1]][0]),i.push(x.$),s.push(x._$),C=o[r[r.length-2]][r[r.length-1]],r.push(C);break;case 3:return!0}}return!0}},t=function(){var e={EOF:1,parseError:function(t,n){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,n)},setInput:function(e){return this._input=e,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var e=this._input[0];this.yytext+=e,this.yyleng++,this.offset++,this.match+=e,this.matched+=e;var t=e.match(/(?:\r\n?|\n).*/g);return t?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),e},unput:function(e){var t=e.length,n=e.split(/(?:\r\n?|\n)/g);this._input=e+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-t-1),this.offset-=t;var r=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===r.length?this.yylloc.first_column:0)+r[r.length-n.length].length-n[0].length:this.yylloc.first_column-t},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-t]),this},more:function(){return this._more=!0,this},less:function(e){this.unput(this.match.slice(e))},pastInput:function(){var e=this.matched.substr(0,this.matched.length-this.match.length);return(e.length>20?"...":"")+e.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var e=this.match;return e.length<20&&(e+=this._input.substr(0,20-e.length)),(e.substr(0,20)+(e.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var e=this.pastInput(),t=(new Array(e.length+1)).join("-");return e+this.upcomingInput()+"\n"+t+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var e,t,n,r,i,s;this._more||(this.yytext="",this.match="");var o=this._currentRules();for(var u=0;u<o.length;u++){n=this._input.match(this.rules[o[u]]);if(n&&(!t||n[0].length>t[0].length)){t=n,r=u;if(!this.options.flex)break}}if(t){s=t[0].match(/(?:\r\n?|\n).*/g),s&&(this.yylineno+=s.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:s?s[s.length-1].length-s[s.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],e=this.performAction.call(this,this.yy,this,o[r],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1);if(e)return e;return}return this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return typeof t!="undefined"?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)}};return e.options={},e.performAction=function(t,n,r,i){var s=i;switch(r){case 0:n.yytext.slice(-1)!=="\\"&&this.begin("mu"),n.yytext.slice(-1)==="\\"&&(n.yytext=n.yytext.substr(0,n.yyleng-1),this.begin("emu"));if(n.yytext)return 14;break;case 1:return 14;case 2:return n.yytext.slice(-1)!=="\\"&&this.popState(),n.yytext.slice(-1)==="\\"&&(n.yytext=n.yytext.substr(0,n.yyleng-1)),14;case 3:return n.yytext=n.yytext.substr(0,n.yyleng-4),this.popState(),15;case 4:return 24;case 5:return 16;case 6:return 20;case 7:return 19;case 8:return 19;case 9:return 23;case 10:return 23;case 11:this.popState(),this.begin("com");break;case 12:return n.yytext=n.yytext.substr(3,n.yyleng-5),this.popState(),15;case 13:return 22;case 14:return 35;case 15:return 34;case 16:return 34;case 17:return 37;case 18:break;case 19:return this.popState(),18;case 20:return this.popState(),18;case 21:return n.yytext=n.yytext.substr(1,n.yyleng-2).replace(/\\"/g,'"'),29;case 22:return n.yytext=n.yytext.substr(1,n.yyleng-2).replace(/\\'/g,"'"),29;case 23:return n.yytext=n.yytext.substr(1),27;case 24:return 31;case 25:return 31;case 26:return 30;case 27:return 34;case 28:return n.yytext=n.yytext.substr(1,n.yyleng-2),34;case 29:return"INVALID";case 30:return 5}},e.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[} ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@[a-zA-Z]+)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:[0-9]+(?=[}\s]))/,/^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],e.conditions={mu:{rules:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[3],inclusive:!1},INITIAL:{rules:[0,1,30],inclusive:!0}},e}();return e.lexer=t,n.prototype=e,e.Parser=n,new n}();typeof require!="undefined"&&typeof exports!="undefined"&&(exports.parser=handlebars,exports.Parser=handlebars.Parser,exports.parse=function(){return handlebars.parse.apply(handlebars,arguments)},exports.main=function(t){if(!t[1])throw new Error("Usage: "+t[0]+" FILE");var n,r;return typeof process!="undefined"?n=require("fs").readFileSync(require("path").resolve(t[1]),"utf8"):n=require("file").path(require("file").cwd()).join(t[1]).read({charset:"utf-8"}),exports.parser.parse(n)},typeof module!="undefined"&&require.main===module&&exports.main(typeof process!="undefined"?process.argv.slice(1):require("system").args)),Handlebars.Parser=handlebars,Handlebars.parse=function(e){return Handlebars.Parser.yy=Handlebars.AST,Handlebars.Parser.parse(e)},Handlebars.print=function(e){return(new Handlebars.PrintVisitor).accept(e)},Handlebars.logger={DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(e,t){}},Handlebars.log=function(e,t){Handlebars.logger.log(e,t)},function(){Handlebars.AST={},Handlebars.AST.ProgramNode=function(e,t){this.type="program",this.statements=e,t&&(this.inverse=new Handlebars.AST.ProgramNode(t))},Handlebars.AST.MustacheNode=function(e,t,n){this.type="mustache",this.escaped=!n,this.hash=t;var r=this.id=e[0],i=this.params=e.slice(1),s=this.eligibleHelper=r.isSimple;this.isHelper=s&&(i.length||t)},Handlebars.AST.PartialNode=function(e,t){this.type="partial",this.id=e,this.context=t};var e=function(e,t){if(e.original!==t.original)throw new Handlebars.Exception(e.original+" doesn't match "+t.original)};Handlebars.AST.BlockNode=function(t,n,r,i){e(t.id,i),this.type="block",this.mustache=t,this.program=n,this.inverse=r,this.inverse&&!this.program&&(this.isInverse=!0)},Handlebars.AST.ContentNode=function(e){this.type="content",this.string=e},Handlebars.AST.HashNode=function(e){this.type="hash",this.pairs=e},Handlebars.AST.IdNode=function(e){this.type="ID",this.original=e.join(".");var t=[],n=0;for(var r=0,i=e.length;r<i;r++){var s=e[r];s===".."?n++:s==="."||s==="this"?this.isScoped=!0:t.push(s)}this.parts=t,this.string=t.join("."),this.depth=n,this.isSimple=e.length===1&&!this.isScoped&&n===0},Handlebars.AST.DataNode=function(e){this.type="DATA",this.id=e},Handlebars.AST.StringNode=function(e){this.type="STRING",this.string=e},Handlebars.AST.IntegerNode=function(e){this.type="INTEGER",this.integer=e},Handlebars.AST.BooleanNode=function(e){this.type="BOOLEAN",this.bool=e},Handlebars.AST.CommentNode=function(e){this.type="comment",this.comment=e}}();var errorProps=["description","fileName","lineNumber","message","name","number","stack"];Handlebars.Exception=function(e){var t=Error.prototype.constructor.apply(this,arguments);for(var n=0;n<errorProps.length;n++)this[errorProps[n]]=t[errorProps[n]]},Handlebars.Exception.prototype=new Error,Handlebars.SafeString=function(e){this.string=e},Handlebars.SafeString.prototype.toString=function(){return this.string.toString()},function(){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},t=/[&<>"'`]/g,n=/[&<>"'`]/,r=function(t){return e[t]||"&amp;"};Handlebars.Utils={escapeExpression:function(e){return e instanceof Handlebars.SafeString?e.toString():e==null||e===!1?"":n.test(e)?e.replace(t,r):e},isEmpty:function(e){return typeof e=="undefined"?!0:e===null?!0:e===!1?!0:Object.prototype.toString.call(e)==="[object Array]"&&e.length===0?!0:!1}}}(),Handlebars.Compiler=function(){},Handlebars.JavaScriptCompiler=function(){},function(e,t){e.prototype={compiler:e,disassemble:function(){var e=this.opcodes,t,n=[],r,i;for(var s=0,o=e.length;s<o;s++){t=e[s];if(t.opcode==="DECLARE")n.push("DECLARE "+t.name+"="+t.value);else{r=[];for(var u=0;u<t.args.length;u++)i=t.args[u],typeof i=="string"&&(i='"'+i.replace("\n","\\n")+'"'),r.push(i);n.push(t.opcode+" "+r.join(" "))}}return n.join("\n")},guid:0,compile:function(e,t){this.children=[],this.depths={list:[]},this.options=t;var n=this.options.knownHelpers;this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0};if(n)for(var r in n)this.options.knownHelpers[r]=n[r];return this.program(e)},accept:function(e){return this[e.type](e)},program:function(e){var t=e.statements,n;this.opcodes=[];for(var r=0,i=t.length;r<i;r++)n=t[r],this[n.type](n);return this.isSimple=i===1,this.depths.list=this.depths.list.sort(function(e,t){return e-t}),this},compileProgram:function(e){var t=(new this.compiler).compile(e,this.options),n=this.guid++,r;this.usePartial=this.usePartial||t.usePartial,this.children[n]=t;for(var i=0,s=t.depths.list.length;i<s;i++){r=t.depths.list[i];if(r<2)continue;this.addDepth(r-1)}return n},block:function(e){var t=e.mustache,n=e.program,r=e.inverse;n&&(n=this.compileProgram(n)),r&&(r=this.compileProgram(r));var i=this.classifyMustache(t);i==="helper"?this.helperMustache(t,n,r):i==="simple"?(this.simpleMustache(t),this.opcode("pushProgram",n),this.opcode("pushProgram",r),this.opcode("pushLiteral","{}"),this.opcode("blockValue")):(this.ambiguousMustache(t,n,r),this.opcode("pushProgram",n),this.opcode("pushProgram",r),this.opcode("pushLiteral","{}"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(e){var t=e.pairs,n,r;this.opcode("push","{}");for(var i=0,s=t.length;i<s;i++)n=t[i],r=n[1],this.accept(r),this.opcode("assignToHash",n[0])},partial:function(e){var t=e.id;this.usePartial=!0,e.context?this.ID(e.context):this.opcode("push","depth0"),this.opcode("invokePartial",t.original),this.opcode("append")},content:function(e){this.opcode("appendContent",e.string)},mustache:function(e){var t=this.options,n=this.classifyMustache(e);n==="simple"?this.simpleMustache(e):n==="helper"?this.helperMustache(e):this.ambiguousMustache(e),e.escaped&&!t.noEscape?this.opcode("appendEscaped"):this.opcode("append")},ambiguousMustache:function(e,t,n){var r=e.id,i=r.parts[0];this.opcode("getContext",r.depth),this.opcode("pushProgram",t),this.opcode("pushProgram",n),this.opcode("invokeAmbiguous",i)},simpleMustache:function(e,t,n){var r=e.id;r.type==="DATA"?this.DATA(r):r.parts.length?this.ID(r):(this.addDepth(r.depth),this.opcode("getContext",r.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperMustache:function(e,t,n){var r=this.setupFullMustacheParams(e,t,n),i=e.id.parts[0];if(this.options.knownHelpers[i])this.opcode("invokeKnownHelper",r.length,i);else{if(this.knownHelpersOnly)throw new Error("You specified knownHelpersOnly, but used the unknown helper "+i);this.opcode("invokeHelper",r.length,i)}},ID:function(e){this.addDepth(e.depth),this.opcode("getContext",e.depth);var t=e.parts[0];t?this.opcode("lookupOnContext",e.parts[0]):this.opcode("pushContext");for(var n=1,r=e.parts.length;n<r;n++)this.opcode("lookup",e.parts[n])},DATA:function(e){this.options.data=!0,this.opcode("lookupData",e.id)},STRING:function(e){this.opcode("pushString",e.string)},INTEGER:function(e){this.opcode("pushLiteral",e.integer)},BOOLEAN:function(e){this.opcode("pushLiteral",e.bool)},comment:function(){},opcode:function(e){this.opcodes.push({opcode:e,args:[].slice.call(arguments,1)})},declare:function(e,t){this.opcodes.push({opcode:"DECLARE",name:e,value:t})},addDepth:function(e){if(isNaN(e))throw new Error("EWOT");if(e===0)return;this.depths[e]||(this.depths[e]=!0,this.depths.list.push(e))},classifyMustache:function(e){var t=e.isHelper,n=e.eligibleHelper,r=this.options;if(n&&!t){var i=e.id.parts[0];r.knownHelpers[i]?t=!0:r.knownHelpersOnly&&(n=!1)}return t?"helper":n?"ambiguous":"simple"},pushParams:function(e){var t=e.length,n;while(t--)n=e[t],this.options.stringParams?(n.depth&&this.addDepth(n.depth),this.opcode("getContext",n.depth||0),this.opcode("pushStringParam",n.string)):this[n.type](n)},setupMustacheParams:function(e){var t=e.params;return this.pushParams(t),e.hash?this.hash(e.hash):this.opcode("pushLiteral","{}"),t},setupFullMustacheParams:function(e,t,n){var r=e.params;return this.pushParams(r),this.opcode("pushProgram",t),this.opcode("pushProgram",n),e.hash?this.hash(e.hash):this.opcode("pushLiteral","{}"),r}};var n=function(e){this.value=e};t.prototype={nameLookup:function(e,n,r){return/^[0-9]+$/.test(n)?e+"["+n+"]":t.isValidJavaScriptVariableName(n)?e+"."+n:e+"['"+n+"']"},appendToBuffer:function(e){return this.environment.isSimple?"return "+e+";":"buffer += "+e+";"},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(e,t,n,r){this.environment=e,this.options=t||{},Handlebars.log(Handlebars.logger.DEBUG,this.environment.disassemble()+"\n\n"),this.name=this.environment.name,this.isChild=!!n,this.context=n||{programs:[],aliases:{}},this.preamble(),this.stackSlot=0,this.stackVars=[],this.registers={list:[]},this.compileStack=[],this.compileChildren(e,t);var i=e.opcodes,s;this.i=0;for(o=i.length;this.i<o;this.i++)s=i[this.i],s.opcode==="DECLARE"?this[s.name]=s.value:this[s.opcode].apply(this,s.args);return this.createFunctionContext(r)},nextOpcode:function(){var e=this.environment.opcodes,t=e[this.i+1];return e[this.i+1]},eat:function(e){this.i=this.i+1},preamble:function(){var e=[];if(!this.isChild){var t=this.namespace,n="helpers = helpers || "+t+".helpers;";this.environment.usePartial&&(n=n+" partials = partials || "+t+".partials;"),this.options.data&&(n+=" data = data || {};"),e.push(n)}else e.push("");this.environment.isSimple?e.push(""):e.push(", buffer = "+this.initializeBuffer()),this.lastContext=0,this.source=e},createFunctionContext:function(e){var t=this.stackVars.concat(this.registers.list);t.length>0&&(this.source[1]=this.source[1]+", "+t.join(", "));if(!this.isChild){var n=[];for(var r in this.context.aliases)this.source[1]=this.source[1]+", "+r+"="+this.context.aliases[r]}this.source[1]&&(this.source[1]="var "+this.source[1].substring(2)+";"),this.isChild||(this.source[1]+="\n"+this.context.programs.join("\n")+"\n"),this.environment.isSimple||this.source.push("return buffer;");var i=this.isChild?["depth0","data"]:["Handlebars","depth0","helpers","partials","data"];for(var s=0,o=this.environment.depths.list.length;s<o;s++)i.push("depth"+this.environment.depths.list[s]);if(e)return i.push(this.source.join("\n  ")),Function.apply(this,i);var u="function "+(this.name||"")+"("+i.join(",")+") {\n  "+this.source.join("\n  ")+"}";return Handlebars.log(Handlebars.logger.DEBUG,u+"\n\n"),u},blockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var e=["depth0"];this.setupParams(0,e),this.replaceStack(function(t){return e.splice(1,0,t),t+" = blockHelperMissing.call("+e.join(", ")+")"})},ambiguousBlockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var e=["depth0"];this.setupParams(0,e);var t=this.topStack();e.splice(1,0,t),this.source.push("if (!"+this.lastHelper+") { "+t+" = blockHelperMissing.call("+e.join(", ")+"); }")},appendContent:function(e){this.source.push(this.appendToBuffer(this.quotedString(e)))},append:function(){var e=this.popStack();this.source.push("if("+e+" || "+e+" === 0) { "+this.appendToBuffer(e)+" }"),this.environment.isSimple&&this.source.push("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){var e=this.nextOpcode(),t="";this.context.aliases.escapeExpression="this.escapeExpression",e&&e.opcode==="appendContent"&&(t=" + "+this.quotedString(e.args[0]),this.eat(e)),this.source.push(this.appendToBuffer("escapeExpression("+this.popStack()+")"+t))},getContext:function(e){this.lastContext!==e&&(this.lastContext=e)},lookupOnContext:function(e){this.pushStack(this.nameLookup("depth"+this.lastContext,e,"context"))},pushContext:function(){this.pushStackLiteral("depth"+this.lastContext)},resolvePossibleLambda:function(){this.context.aliases.functionType='"function"',this.replaceStack(function(e){return"typeof "+e+" === functionType ? "+e+".apply(depth0) : "+e})},lookup:function(e){this.replaceStack(function(t){return t+" == null || "+t+" === false ? "+t+" : "+this.nameLookup(t,e,"context")})},lookupData:function(e){this.pushStack(this.nameLookup("data",e,"data"))},pushStringParam:function(e){this.pushStackLiteral("depth"+this.lastContext),this.pushString(e)},pushString:function(e){this.pushStackLiteral(this.quotedString(e))},push:function(e){this.pushStack(e)},pushLiteral:function(e){this.pushStackLiteral(e)},pushProgram:function(e){e!=null?this.pushStackLiteral(this.programExpression(e)):this.pushStackLiteral(null)},invokeHelper:function(e,t){this.context.aliases.helperMissing="helpers.helperMissing";var n=this.lastHelper=this.setupHelper(e,t);this.register("foundHelper",n.name),this.pushStack("foundHelper ? foundHelper.call("+n.callParams+") "+": helperMissing.call("+n.helperMissingParams+")")},invokeKnownHelper:function(e,t){var n=this.setupHelper(e,t);this.pushStack(n.name+".call("+n.callParams+")")},invokeAmbiguous:function(e){this.context.aliases.functionType='"function"',this.pushStackLiteral("{}");var t=this.setupHelper(0,e),n=this.lastHelper=this.nameLookup("helpers",e,"helper");this.register("foundHelper",n);var r=this.nameLookup("depth"+this.lastContext,e,"context"),i=this.nextStack();this.source.push("if (foundHelper) { "+i+" = foundHelper.call("+t.callParams+"); }"),this.source.push("else { "+i+" = "+r+"; "+i+" = typeof "+i+" === functionType ? "+i+".apply(depth0) : "+i+"; }")},invokePartial:function(e){var t=[this.nameLookup("partials",e,"partial"),"'"+e+"'",this.popStack(),"helpers","partials"];this.options.data&&t.push("data"),this.context.aliases.self="this",this.pushStack("self.invokePartial("+t.join(", ")+");")},assignToHash:function(e){var t=this.popStack(),n=this.topStack();this.source.push(n+"['"+e+"'] = "+t+";")},compiler:t,compileChildren:function(e,t){var n=e.children,r,i;for(var s=0,o=n.length;s<o;s++){r=n[s],i=new this.compiler,this.context.programs.push("");var u=this.context.programs.length;r.index=u,r.name="program"+u,this.context.programs[u]=i.compile(r,t,this.context)}},programExpression:function(e){this.context.aliases.self="this";if(e==null)return"self.noop";var t=this.environment.children[e],n=t.depths.list,r,i=[t.index,t.name,"data"];for(var s=0,o=n.length;s<o;s++)r=n[s],r===1?i.push("depth0"):i.push("depth"+(r-1));return n.length===0?"self.program("+i.join(", ")+")":(i.shift(),"self.programWithDepth("+i.join(", ")+")")},register:function(e,t){this.useRegister(e),this.source.push(e+" = "+t+";")},useRegister:function(e){this.registers[e]||(this.registers[e]=!0,this.registers.list.push(e))},pushStackLiteral:function(e){return this.compileStack.push(new n(e)),e},pushStack:function(e){return this.source.push(this.incrStack()+" = "+e+";"),this.compileStack.push("stack"+this.stackSlot),"stack"+this.stackSlot},replaceStack:function(e){var t=e.call(this,this.topStack());return this.source.push(this.topStack()+" = "+t+";"),"stack"+this.stackSlot},nextStack:function(e){var t=this.incrStack();return this.compileStack.push("stack"+this.stackSlot),t},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),"stack"+this.stackSlot},popStack:function(){var e=this.compileStack.pop();return e instanceof n?e.value:(this.stackSlot--,e)},topStack:function(){var e=this.compileStack[this.compileStack.length-1];return e instanceof n?e.value:e},quotedString:function(e){return'"'+e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r")+'"'},setupHelper:function(e,t){var n=[];this.setupParams(e,n);var r=this.nameLookup("helpers",t,"helper");return{params:n,name:r,callParams:["depth0"].concat(n).join(", "),helperMissingParams:["depth0",this.quotedString(t)].concat(n).join(", ")}},setupParams:function(e,t){var n=[],r=[],i,s,o;n.push("hash:"+this.popStack()),s=this.popStack(),o=this.popStack();if(o||s)o||(this.context.aliases.self="this",o="self.noop"),s||(this.context.aliases.self="this",s="self.noop"),n.push("inverse:"+s),n.push("fn:"+o);for(var u=0;u<e;u++)i=this.popStack(),t.push(i),this.options.stringParams&&r.push(this.popStack());return this.options.stringParams&&n.push("contexts:["+r.join(",")+"]"),this.options.data&&n.push("data:data"),t.push("{"+n.join(",")+"}"),t.join(", ")}};var r="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),i=t.RESERVED_WORDS={};for(var s=0,o=r.length;s<o;s++)i[r[s]]=!0;t.isValidJavaScriptVariableName=function(e){return!t.RESERVED_WORDS[e]&&/^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(e)?!0:!1}}(Handlebars
.Compiler,Handlebars.JavaScriptCompiler),Handlebars.precompile=function(e,t){t=t||{};var n=Handlebars.parse(e),r=(new Handlebars.Compiler).compile(n,t);return(new Handlebars.JavaScriptCompiler).compile(r,t)},Handlebars.compile=function(e,t){function r(){var n=Handlebars.parse(e),r=(new Handlebars.Compiler).compile(n,t),i=(new Handlebars.JavaScriptCompiler).compile(r,t,undefined,!0);return Handlebars.template(i)}t=t||{};var n;return function(e,t){return n||(n=r()),n.call(this,e,t)}},Handlebars.VM={template:function(e){var t={escapeExpression:Handlebars.Utils.escapeExpression,invokePartial:Handlebars.VM.invokePartial,programs:[],program:function(e,t,n){var r=this.programs[e];return n?Handlebars.VM.program(t,n):r?r:(r=this.programs[e]=Handlebars.VM.program(t),r)},programWithDepth:Handlebars.VM.programWithDepth,noop:Handlebars.VM.noop};return function(n,r){return r=r||{},e.call(t,Handlebars,n,r.helpers,r.partials,r.data)}},programWithDepth:function(e,t,n){var r=Array.prototype.slice.call(arguments,2);return function(n,i){return i=i||{},e.apply(this,[n,i.data||t].concat(r))}},program:function(e,t){return function(n,r){return r=r||{},e(n,r.data||t)}},noop:function(){return""},invokePartial:function(e,t,n,r,i,s){var o={helpers:r,partials:i,data:s};if(e===undefined)throw new Handlebars.Exception("The partial "+t+" could not be found");if(e instanceof Function)return e(n,o);if(!Handlebars.compile)throw new Handlebars.Exception("The partial "+t+" could not be compiled when running in runtime-only mode");return i[t]=Handlebars.compile(e,{data:s!==undefined}),i[t](n,o)}},Handlebars.template=Handlebars.VM.template;

var flour = flour || {};

/*
|
| flour app core : class
|
*/
flour.app = function(appName, options)
{
  // Return an instance if the new keyword wasn't used
  if (!(this instanceof flour.app)) 
  {
    return new flour.app(name, options);
  }

  // Self keyword
  var self = this;

  // Setup some app params
  self.el = $('<div class="flour-app"></div>');

  self.currentView = undefined;
  self.currentParams = undefined;
  self.view = undefined;


  /*
  |
  | Capture link clicks and use js to push the url
  |
  */
  self.el.on('click', 'a', function(event)
  {
    if(event.button === 1)
    {
      return;
    }

    if(event.metaKey)
    {
      return;
    }

    $target = $(event.currentTarget);

    if($target.hasClass('classic') || $target.hasClass('ignore'))
    {
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    var url = $target.attr('href');

    if(url === undefined)
    {
      return;
    }

    // check for silent class
    var silent = false;
    if($target.hasClass('silent'))
    {
      silent = true;
    }

    // compile the data
    var data = {
      silent: silent
    };

    // push 
    flour.pushState(url, data);
  });


  /*
  |
  | Removes the last view and places the new one in it's place when ready
  |
  */
  self.displayView = function()
  {
    if(self.view.ready === false)
    {
      var onReady = function()
      {
        self.el.empty();
        self.el.append(self.view.el);
        self.view.off('ready', onReady); // stop listening for this as we only need it first time
      };

      self.view.on('ready', onReady);
    }
    else
    {
      self.el.empty();
      self.el.append(self.view.el);
    }
  };

  
  /*
  |
  | Create new router and listen to route change event
  |
  */
  var router = new flour.router(options.routes, options.base_path);

  flour.subscribe('route:change', function(route)
  { 
    // place the view into our app element
    if(flour.views[route.view] !== undefined)
    {
      if(route.view !== self.currentView || JSON.stringify(route.params) !== JSON.stringify(self.currentParams))
      {
        if(self.currentView !== undefined)
        {
          self.view.destroy();
        }

        self.view = flour.getView(route.view, route.params);
        self.displayView();
        
        self.currentView = route.view;
        self.currentParams = route.params;
      }

      if(route.action !== undefined)
      {
        if(self.view[route.action] !== undefined)
        {
          self.view[route.action](route.params);
        }
      }
    }    
  });




  /*
  |
  | On init
  |
  */
  router.matchCurrentRequest();

};

var flour = flour || {};


/*
|
| Our flour.bind name space, everything goes in 'ere
|
*/
flour.bind = {};

flour.bind.binders = {};

flour.bind.prefix = 'flour';



/*
|
| Add a binder method to our object
|
*/
flour.addBinder = function(name, methods)
{
  flour.bind.binders[name] = methods;
};




/*
|
| Bind a view
|
*/
flour.bindView = function(view)
{
  var $elements = [];
  var listeners = [];
  var bindingPrefix = flour.bind.prefix;


  view.on('render', function()
  {
    // Clear any previous listeners added
    for(var i = 0, n = listeners.length; i < n; i ++)
    {
      var listener = listeners[i];
      view.off(listener.eventName, listener.eventCallback);
    }

    // Find elements matching our binders
    for(var bindingName in flour.bind.binders)
    {
      (function(){

        var options = flour.bind.binders[bindingName];
        var attribute = bindingPrefix + '-' + bindingName;
        $elements.length = 0;
        $elements = view.find('[' + attribute + ']');

        //
        // Itterate over our bound elements
        //
        $elements.each(function(index, el)
        {
          var $el = $(el);
          var bindOn = $el.attr(attribute);
          var filter = false;
          var filterParams = undefined;
        
          //
          // Check for load
          //
          if(options.attach)
          {
            options.attach($el, bindOn, view);
          }


          //
          // Listen for changes to the bindOn value
          //
          bindOn = bindOn.replace(/\s/g, "");
          var hasFilter = bindOn.indexOf('|') === -1 ? false : true;

          // Parse filter and filter params
          if(hasFilter)
          {
            var pieces = bindOn.split('|');
            bindOn = pieces[0];
            filter = pieces[1];

            if(filter.indexOf(':') !== -1)
            {
              var pieces = filter.split(':');
              filter = pieces[0];
              filterParams = pieces[1];

              var lastCharIndex = filterParams.length - 1;
              if((filterParams[0] === '\'' || filterParams[0] === '"') && (filterParams[lastCharIndex] === '\'' || filterParams[lastCharIndex] === '"'))
              {
                filterParams = filterParams.substring(1, lastCharIndex);
              }
              
              // {
              //   filterParams = view.get(filterParams);
              // }
            }
          }


          // on model change
          var changeEvent = 'model.' + bindOn + ':change';
          var onChangeCallback = function(data)
          {
            data = filterData(data);
            options.update($el, data);
          };


          // filter
          var filterData = function(data)
          {
            if(filter)
            {
              if(flour.filters[filter] !== undefined)
              {
                data = flour.filters[filter](data, filterParams);
              }
              else if(view[filter] !== undefined)
              {
                data = view[filter](data, filterParams);
              }
            }

            return data;
          };


          //
          // Update element and listen for model changes
          //
          if(options.update)
          {
            // listen to changes
            listeners.push({
              'eventName': changeEvent,
              'eventCallback': onChangeCallback
            });

            view.on(changeEvent, onChangeCallback);

            // set initial
            var data = view.get(bindOn);
            data = filterData(data);
            
            options.update($el, data);
          }

        });

      }());
    }
  });
}





/*
|
| Bind a list, parses an empty template for bindings
|
*/
flour.bindList = function(list, template)
{
  var $elements = [];
  var listeners = [];
  var bindingPrefix = flour.bind.prefix;


  
  var $template = $(flour.getTemplate(template)({}));

  // Find elements matching our binders
  for(var bindingName in flour.bind.binders)
  {
    (function(){
      
      var options = flour.bind.binders[bindingName];
      var attribute = bindingPrefix + '-' + bindingName;
      $elements.length = 0;
      $elements = $template.find('[' + attribute + ']');

      $elements.each(function(index, el)
      {
        var $el = $(el);
        var bindOn = $el.attr(attribute);
        var filter = false;

        bindOn = bindOn.replace(/\s/g, "");
        var hasFilter = bindOn.indexOf('|') === -1 ? false : true;
      
        var bindOn = $el.attr(attribute);
        var updateSelector = '[' + attribute + '="' + bindOn + '"]';

        list.addBinding(bindingName, bindOn, updateSelector);
      });

    }());
  }
}

var flour = flour || {};



//
//  Sets passed elements innerHTML to the data
//
flour.addBinder('html', 
{
  update: function($el, data)
  {
    $el.html(data);
  }
});




//
//  Sets passed elements text to the data
//
flour.addBinder('text', 
{
  update: function($el, data)
  {
    $el.text(data);
  }
});




//
//  Sets the value of a form element to the data and also
//  adds change event listeners and updates the model
//
flour.addBinder('value', 
{
  attach: function($el, binding, view)
  {
    var type = $el[0].nodeName;

    if(type === 'INPUT' || type === 'TEXTAREA')
    {
      var inputType = $el[0].type;

      if(inputType === 'checkbox')
      {
        $el.on('change', function(event)
        {             
          var val = ($el.prop('checked'));
          view.set(binding, val, false);
        });
      }
      else if(inputType === 'radio')
      {
        $el.on('change', function(event)
        {
          var val = $el.val();
          view.set(binding, val, false);
        });
      }
      else
      {
        $el.on('keypress change keyup', function(event)
        {
          var val = $el.val();
          view.set(binding, val, false);
        });
      }
    }

    if(type === 'SELECT')
    {
      $el.on('change', function(event)
      {
        var val = $el.val();
        view.set(binding, val, false);
      });
    }
  },
  

  update: function($el, data)
  {
    var $type = $el[0].nodeName;
    var $inputType = $el[0].type;

    if($inputType === 'checkbox')
    {
      $el.prop('checked', data);
    }
    else if($el.attr('type') === 'radio')
    {
      if($el.val() === data)
      {
        $el.prop('checked', true);
      }
    }
    else
    {
      if($el.val() !== data)
      {
        $el.val(data);
      }
    }
  }
});




//
//  Shows and hides the passed element depending on the data
//
flour.addBinder('show', 
{
  update: function($el, data)
  {
    if(data)
    {
      $el.css('display', 'block');
    }
    else
    {
      $el.css('display', 'none');
    }
  }
});




//
//  Hides and shows the passed element depending on the data
//
flour.addBinder('hide', 
{
  update: function($el, data)
  {
    if(data)
    {
      $el.css('display', 'none');
    }
    else
    {
      $el.css('display', 'block');
    }
  }
});




//
//  Straight up adds the class to the passed element from the data
//
flour.addBinder('class', 
{
  update: function($el, data)
  {
    var lastClass = $el.data('last-class');
    if(lastClass)
    {
      $el.removeClass(lastClass);
    }

    $el.data('last-class', data);
    $el.addClass(data);
  }
});



var flour = flour || {};


/*
|
| Store our filter in here
|
*/
flour.filters = {};



/*
|
| Add our filter to our filters object
|
*/
flour.addFilter = function(name, filter)
{
  flour.filters[name] = filter;
};








var flour = flour || {};



//
//  Formats a json string
//
flour.addFilter('json_format', function(json, params)
{
  var spaces = params === undefined ? 2 : parseInt(params);

  return JSON.stringify(json, undefined, spaces)
});
/*
|
|  Return href with base url prepended
|
*/
Handlebars.registerHelper('link_to', function(context, options) 
{  
  return flour.config('base_url') + '/' + context;
});



/*
|
|  Render a specified template with passed data
|
*/
Handlebars.registerHelper('render_template', function(template, data) 
{
  return flour.getTemplate(template)({'data': data});
});

var flour = flour || {};


/*
|
| Store our helpers in this object
|
*/
flour.helpers = {};


/*
|
| Add a helper to our object
|
*/
flour.addHelper = function(name, helper)
{
  flour.helpers[name] = helper;
};


/*
|
| Create instance and or return the helper
|
*/
flour.getHelper = function(name)
{
  if(flour.isFunction(flour.helpers[name]))
  {
    flour.helpers[name] = new flour.helpers[name]();
  }
  
  return flour.helpers[name];
}

var flour = flour || {};


/*
|
| Default request handler
|
*/
flour.requestHandler = function(response, status, options)
{
  if(options[status])
  {
    options[status](response);
  }
};




/*
|
| Ajax request wrapper method
|
*/
flour.request = {
  
  get: function(url, data, options)
  {
    this.doRequest(url, data, options, 'get');
  },

  put: function(url, data, options)
  {
    this.doRequest(url, data, options, 'put');
  },

  post: function(url, data, options)
  {
    this.doRequest(url, data, options, 'post');
  },

  delete: function(url, data, options)
  {
    this.doRequest(url, data, options, 'delete');
  },

  doRequest: function(url, data, options, method) 
  {
    if(options.silent !== true)
    {
      flour.publish('http-request:start');
    }


    $.ajax({
      url: url,
      type: method,
      data: data,

      success: function(response, status)
      {
        if(options.silent !== true)
        {
          flour.publish('http-request:end');
        }

        flour.requestHandler(response, status, options);
      }
    });
  }
};




/*
|
| HTTP class, returns a simple function that accepts data and callback options
|
*/
flour.http = function(url, method, requestOptions)
{
  if(method === undefined)
  {
    method = 'get';
  }


  //
  //  Returns the url with variables in place
  //
  var parseURL = function(data, originalURL)
  {
    if(data !== undefined)
    {
      // replace any url strings with the data key
      for(var key in data)
      {
        if(originalURL.indexOf(':' + key) !== -1)
        {
          var replaceString = ':' + key;
          originalURL = originalURL.replace(replaceString, data[key]);
          delete(data[key]);
        }
      }
    }

    return originalURL;
  }


  //
  //  Callable return function
  //
  return function(data, options)
  {
    var data = flour.clone(data);
    var parsedURL = parseURL(data, url);

    // publish http
    if(options.silent !== true)
    {
      flour.publish('http-request:start');
    }

    // create our request options
    var request = {
      url: parsedURL,
      type: method,
      data: data,

      success: function(response, status)
      {
        if(options.silent !== true)
        {
          flour.publish('http-request:end');
        }

        flour.requestHandler(response, status, options);
      }
    };

    // overide with custom $.ajax options
    if(requestOptions !== undefined)
    {
      for(var option in requestOptions)
      {
        request[option] = requestOptions[option];
      }
    }

    // do the request
    $.ajax(request);

  };
};

var flour = flour || {};


/*
|
| Store our lists in here
|
*/
flour.lists = {};



/*
|
| Add our list to our lists object
|
*/
flour.addList = function(name, list)
{
  list.prototype = new flour.baseList();
  flour.lists[name] = list;
};




/*
|
| Returns an instance of a list
|
*/
flour.getList = function(name, params)
{
  var list = new flour.lists[name]();
  
  // set these on the list
  list.eventListeners = {};
  list.subscriptions = [];
  list.lookup = {};
  list.views = [];
  list.list = [];
  list.raw = [];
  list.el = null;

  // init
  list.initialize(params);

  return list;
};





/*
|
| Base list class
|
*/
flour.baseList = function()
{
  

  /*
  |
  | View class variables
  |
  */
  var self = this;
  

  


  /*
  |
  | Set up our default el and add delegated events
  |
  */
  self.initialize = function(params)
  {
    var self = this;

    // default vals
    self.key = self.key ? self.key : false;
    self.events = self.events ? self.events : {};
    
    self.itemElClass = self.itemElClass ? self.itemElClass : '';
    self.itemElType = self.itemElType ? self.itemElType : 'div';
    self.wrapElType = self.wrapElType ? self.wrapElType : 'div';

    // our list el
    self.el = $('<' + self. wrapElType + ' class="flour-list"></' + self. wrapElType + '>');

    // bring helpers into view name space
    self.addHelpers();

    // add events to our wrapper el
    self.addEvents();

    // init our view
    self.init(params);
  };




  /*
  |
  | itterates our items and creates a lookup
  |
  */ 
  self.generateLookup = function()
  {
    var self = this;

    self.raw.length = 0;
    self.lookup = {};

    if(!self.key)
    {
      for(var i = 0, n = self.list.length; i < n; i ++)
      {
        var itemData = self.list[i].data;
        self.raw.push(itemData);
      }

      self.trigger('change', self.raw);
      return;
    }

    for(var i = 0, n = self.list.length; i < n; i ++)
    {
      var itemData = self.list[i].data;
      self.raw.push(itemData);
      self.lookup[itemData[self.key]] = i;
    }


    self.trigger('change', self.raw);
  };




  /*
  |
  | returns item from lookup
  |
  */
  self.getItem = function(id)
  {
    var self = this;

    return self.list[self.getItemIndex(id)];
  }

  self.getItemIndex = function(id)
  {
    var self = this;

    if(!self.key)
    {
      return id;
    }

    return self.lookup[id];
  }




  /*
  |
  | Adds our delegated events to our el
  |
  */
  self.addEvents = function()
  {
    var self = this;

    if(self.events !== undefined)
    {
      for(var e in self.events)
      {
        (function(){
          var eventCallback = self.events[e];
          var eventOptions = e.split(' ');
          var eventSelector = eventOptions.pop();
          var eventType = eventOptions.join(' ');

          if(self[eventCallback] !== undefined)
          {
            self.el.on(eventType, eventSelector, function(event)
            {
              var $target = $(event.currentTarget);
              self[eventCallback](event, $target);
            });
          }
          else
          {
            if(flour.isFunction(eventCallback))
            {
              self.el.on(eventType, eventSelector, function(event)
              {
                var $target = $(event.currentTarget);
                eventCallback(event, $target);
              });
            }
          }
        }());
      }
    }
  };


  // self.addEvent = function(eventType, eventSelector, eventCallback)
  // {
  //   var self = this;
    
  //   if(flour.isFunction(eventCallback))
  //   {
  //     self.el.on(eventType, eventSelector, function(event)
  //     {
  //       var $target = $(event.currentTarget);
  //       eventCallback(event, $target);
  //     });
  //   }
  // };




  /*
  |
  | Adds selected helpers into our view prototype name space
  |
  */
  self.addHelpers = function()
  {
    var self = this;

    if(self.helpers !== undefined)
    {
      for(var i = 0, n = self.helpers.length; i < n; i ++)
      {
        var helperName = self.helpers[i];
        self[helperName] = flour.getHelper(helperName);

        if(self[helperName].init !== undefined)
        {
          self[helperName].init(self);
        }
      }
    }
  };




  /*
  |
  | Returns an array of elements that match the selector within the view parent el
  |
  */
  self.find = function(selector)
  {
    var self = this;
    return self.el.find(selector);
  };






  /*
  |
  | Add an item to the list
  |
  */
  self.add = function(item, index)
  {
    var self = this;

    var createItem = function(item)
    {
      // check if this item already exists
      if(self.lookup[item[self.key]] !== undefined)
      {
        return;
      }

      // set item index and check in range
      if(index === undefined)
      {
        item['index'] = self.list.length;
      }
      else
      {
        if(index > self.list.length)
        {
          index = undefined;
          item['index'] = self.list.length;
        }
        else
        {
          item['index'] = index;
        }
      }

      // create element with rendered html
      var el = $('<' + self.itemElType + '>');
      el.attr('class', self.itemElClass);
      //el.html(flour.getTemplate(template)(item));

      var newItem = {
        data: item,
        el: el
      };

      self.renderItem(newItem);

      if(index === undefined)
      {
        // add to end of self.list
        self.list.push(newItem);
        self.el.append(el);
      }
      else
      {
        // add at specific spot
        if(index > 0)
        {
          var item = self.list[index - 1];
          self.list.splice(index, 0, newItem);
          item.el.after(el);
        }
        else
        {
          self.list.splice(0, 0, newItem);
          self.el.prepend(el);
        }

        // update all indexes on items > the one we added
        // for(var i = (index + 1), n = self.list.length; i < n; i ++)
        // {
        //   item = self.list[i];
        //   var itemIndex = item.data.index;
        //   self.setItem(item, 'index', itemIndex + 1);
        // }
      }
    }
    

    // create all items if array
    if(flour.isArray(item))
    {
      for(var i = 0, n = item.length; i < n; i ++)
      {
        createItem(item[i]);
        if(index !== undefined)
        {
          index ++;
        }
      }
    }
    else
    {
      createItem(item);
    }

    self.generateLookup();
  };



  /*
  |
  | Remove an item from the list
  |
  */
  self.remove = function(index)
  {
    var self = this;
    var index = self.getItemIndex(index);
    var item = self.list[index];
    
    item.el.remove();
    item.data = null;
    self.list.splice(index, 1);

    // update all indexes on items > the one we removed
    // for(var i = index, n = self.list.length; i < n; i ++)
    // {
    //   item = self.list[i];
    //   var itemIndex = item.data.index;
    //   self.setItem(item, 'index', itemIndex - 1);
    // }

    self.generateLookup();
  };



  /*
  |
  | Updates an item in the list
  |
  */
  self.set = function(index, key, value)
  {
    var self = this;
    var item = self.getItem(index);
    self.setItem(item, key, value);
  };

  self.setItem = function(item, key, value)
  {
    var self = this;

    var data = item.data;
    var doRender = true;
    var objectChain = flour.setObjectKeyValue(data, key, value);


  

    // Check for bindings
    // if(objectChain)
    // {
    //   var len = objectChain.length;
    //   for(var i = 0; i < len; i ++)
    //   {
    //     var bindingKey = objectChain.join('.');
    //     if(listeners[bindingKey] !== undefined)
    //     {
    //       var value = flour.getObjectKeyValue(data, bindingKey);

    //       for(var i = 0, n = listeners[bindingKey].length; i < n; i ++)
    //       {
    //         var bindingInfo = listeners[bindingKey][i];
    //         var options = flour.bind.binders[bindingInfo.name];
    //         var $el = item.el.find(bindingInfo.selector);


    //         options.change($el, value);
    //         doRender = false;
    //       }
    //     }
    //     objectChain.pop();
    //   }
    // }

    // if nothing was bound to that value, re-render?
    if(doRender)
    {
      if(key !== 'index' && self.key)
      {
        self.renderItem(item);
      }
    }

    // trigger callback
    self.trigger('change', self.raw);
  };






  /*
  |
  | Return an item's value
  |
  */
  self.get = function(index, key)
  {
    var self = this;
    var item = self.getItem(index);
    
    return flour.getObjectKeyValue(item.data, key);
  };






  /*
  |
  | Render item
  |
  */
  self.renderItem = function(item)
  {
    var self = this;

    item.el.html(flour.getTemplate(self.template)(item.data));

    // populate bound elements
    // for(var key in self.eventListeners)
    // {
    //   var bindings = self.eventListeners[key];
    //   for(var i = 0, n = bindings.length; i < n; i ++)
    //   {
    //     var bindingInfo = bindings[i];
    //     var $el = item.el.find(bindingInfo.selector);
    //     var value = flour.getObjectKeyValue(item.data, key);

    //     flour.bind.binders[bindingInfo.name].change($el, value);
    //   }
    // }
  };






  /*
  |
  | View event trigger and listeners
  |
  */
  self.on = function(event, callback)
  {
    var self = this;

    if(self.eventListeners[event] === undefined)
    {
      self.eventListeners[event] = [];
    }
    
    self.eventListeners[event].push(callback);
  };

  self.off = function(event, callback)
  {
    var self = this;
    var events = self.eventListeners[event];

    if(events === undefined)
    {
      return;
    }

    if(callback !== undefined)
    {
      for(var i = 0, n = events.length; i < n; i ++)
      {
        if(callback === events[i])
        {
          events[i] = null;
          break;
        }
      }
    }
    else
    {
      events.length = 0; // this properly empties an array from memory
    }
  }

  self.trigger = function(event, data)
  {
    var self = this;
    var eventListeners = self.eventListeners[event];

    if(eventListeners === undefined || eventListeners === null)
    {
      return;
    }

    for(var i = 0, n = eventListeners.length; i < n; i ++)
    {
      var listenerCallback = eventListeners[i];
      if(listenerCallback !== null && listenerCallback !== undefined)
      {
        listenerCallback(data);
      }
    }
  };






  /*
  |
  | Subscribe to events, handled by view so subscriptions can be destroyed
  |
  */
  self.subscribe = function(eventName, callback)
  {
    var self = this;
    var subscription = flour.subscribe(eventName, callback);
    
    self.subscriptions.push(
    {
      eventName: eventName,
      callback: callback
    });
  };





  /*
  |
  | Gets a view and keeps a copy of it to destroy on 
  |
  */
  self.getView = function(viewName, params)
  {
    var self = this;
    var view = flour.getView(viewName, params);
    self.views.push(view);

    return view;
  };




  
  /*
  |
  | Gets a list and keeps a copy of it to destroy on 
  |
  */
  self.getList = function(listName, params)
  {
    var self = this;
    var list = flour.getList(listName, params);
    self.views.push(list);

    return list;
  };





  /*
  |
  | Destroy this view, remove events, subscriptions etc
  |
  */
  self.destroy = function()
  {
    var self = this;

    // Trigger destroy event
    self.trigger('destroy');

    // Remove element events
    self.el.off();

    // Remove all subscriptions
    for(var i = 0, n = self.subscriptions.length; i < n; i ++)
    {
      var subscription = self.subscriptions[i];
      flour.unsubscribe(subscription.eventName, subscription.callback);
    }

    // Destroy all sub views created
    for(var i = 0, n = self.views.length; i < n; i ++)
    {
      var view = self.views[i];
      view.destroy();
    }

    // Remove all event listeners
    for(var eventName in self.eventListeners)
    {
      self.eventListeners[eventName] = null;
    }

    // Call post destroy
    if(self.postDestroy !== undefined)
    {
      self.postDestroy();
    }
  };

};





var flour = flour || {};

/*
|
| Store subsciption event callbacks here
|
*/
flour.subscriptions = {};



/*
|
| Publish events
|
*/
flour.publish = function(eventName, data)
{
  var subscriptions = flour.subscriptions[eventName];

  if(subscriptions !== undefined)
  {
    for(var i = 0, n = subscriptions.length; i < n; i ++)
    {
      subscriptions[i](data);
    }
  }
};



/*
|
| Subscribe to an event
|
*/
flour.subscribe = function(eventName, callback)
{
  if(flour.subscriptions[eventName] === undefined)
  {
    flour.subscriptions[eventName] = [];
  }

  flour.subscriptions[eventName].push(callback);
}





/*
|
| Unsubscribe from an event
|
*/
flour.unsubscribe = function(eventName, callback)
{
  if(flour.subscriptions[eventName] !== undefined)
  {
    for(var i = 0, n = flour.subscriptions[eventName].length; i < n; i ++)
    {
      if(callback === flour.subscriptions[eventName][i])
      {
        flour.subscriptions[eventName].splice(i, 1);
      }
    }
  }
}

var flour = flour || {};

/*
|
| flour router : class
|
*/
flour.router = function(routes, basePath)
{
  // Return an instance if the new keyword wasn't used
  if (!(this instanceof flour.router)) 
  {
    return new flour.router(name, options);
  }

  // defaults
  basePath = basePath || '';

  // Self keyword
  var self = this;




  /*
  |
  | Listen for window state change and react
  |
  */
  flour.subscribe('history:state_change', function(data)
  {
    if(data.silent !== true)
    {
      self.matchCurrentRequest();
    }
  });

  window.addEventListener('popstate', function(e)
  {
    flour.publish('history:state_change', {});
  });




  /*
  |
  | Match the current request
  |
  */
  self.matchCurrentRequest = function()
  {
    var bits = false;
    var params = {};
    var getVariables = [];
    var hash = false;

    requestURL = document.URL;

    // Pull out get variables from the url
    if(requestURL.indexOf('?') !== -1) 
    {
      bits = requestURL.split('?');
      params = {};
      getVariables = bits[1].split('&');
      requestURL = bits[0];
    }

    // Pull out hash variables from the url
    if(requestURL.indexOf('#') !== -1) 
    {
      bits = requestURL.split('#');
      hash = bits[1];
      requestURL = bits[0];
    }

    var strippedRequestURL = requestURL.replace(flour.config('base_url') + basePath, '');
    var routeDetails = self.match(strippedRequestURL);
    routeDetails.requestURL = strippedRequestURL;

    // add hash value
    routeDetails.hash = hash;

    // add get vars to the params
    if(getVariables)
    {
      for(var i = 0, n = getVariables.length; i < n; i ++)
      {
        var keyValue = getVariables[i].split('=');
        routeDetails.params[keyValue[0]] = keyValue[1];
      }
    }
    
    flour.store.set('route', routeDetails);
  };


  // find match
  self.match = function(requestURL)
  {
    var params = {};
    var paramNames = false;

    for(var i in routes)
    {
      var route = i;
      var routeDetails = routes[i];
      
      // Create the regular expression
      var routeRegex = new RegExp('^' + self.getRegex(route) + '*$', 'i');

      // Test for a match against our current URL
      if(routeRegex.test(requestURL))
      {
        var routeSections = route.split('/');
        var routeValues = requestURL.split('/');

        var paramName = '';
        for(var i = 0; i < routeSections.length; i ++)
        {
          if(paramName = routeSections[i].match(/:([\w-]+)/))
          {
            params[paramName[1]] = routeValues[i];
          }
        }

        routeDetails['route'] = route;
        routeDetails['params'] = params;

        return routeDetails;
      }
    }

    return false;
  };


  // create reg ex
  self.getRegex = function(route)
  {
    return route.replace(/:(\w+)/g, "([\\w-=\.]+)");
  };

};

var flour = flour || {};


/*
|
| flour store, stores values used across a project
|
*/
flour.store = {
  
  values: {},

  set: function(name, value, silent)
  {
    var self = this;
    var objectChain = flour.setObjectKeyValue(self.values, name, value);

    if(silent !== false)
    {
      var rootKey = objectChain[0];
      var rootValue = self.values[rootKey];

      flour.publish(rootKey + ':change', rootValue);
    }
  },

  get: function(name)
  {
    var self = this;

    if(!name)
    {
      return self.values;
    }

    var property = flour.getObjectKeyValue(self.values, name);

    return flour.clone(property);
  }

};

var flour = flour || {};


/*
|
| Store our templates in this object
|
*/
flour.templates = {};


/*
|
| Add and compile a template
|
*/
flour.addTemplate = function(name, template)
{
  flour.templates[name] = Handlebars.compile(template);
};


/*
|
| Return a template
|
*/
flour.getTemplate = function(name)
{
  if(name !== undefined)
  {
    if(flour.templates[name] !== undefined)
    {
      return flour.templates[name];
    }
  }


  if(flour.templates['flour:missing_template'] === undefined)
  {
    flour.addTemplate('flour:missing_template', '<div>Missing template.</div>');
  }

  return flour.templates['flour:missing_template'];
}


var flour = flour || {};




/*
|
|	Push state
|
*/
flour.pushState = function(url, data, title)
{
	title = title === undefined ? flour.config('title') : title;
	data = data === undefined ? {} : data;

	history.pushState(data, title, url);
	flour.publish('history:state_change', data);
};




/*
|
|	Returns true if passed param is an object, else false
|
*/
flour.isObject = function(obj)
{
	if((typeof obj == "object") && (obj !== null))
	{
	  return true;
	}
	
	return false;
};



/*
|
|	Returns true if passed param is an array, else false
|
*/
flour.isArray = function(arr)
{
	if( Object.prototype.toString.call( arr ) === '[object Array]' ) {
	  return true;
	}
	return false;
};




/*
|
|	Returns true if passed param is an object, else false
|
*/
flour.isFunction = function(func) 
{
 var getType = {};
 return func && getType.toString.call(func) === '[object Function]';
};



/*
|
|	Returns true is passed param is a string, else false
|
*/
flour.isString = function(str)
{
	if (typeof str == 'string' || str instanceof String)
	{
		return true;
	}
	else
	{
		return false;
	}
};




/*
|
|	Returns a clone
|
| This method was found here - http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
|
*/
flour.clone = function(obj)
{
	var copy;

	// Handle the 3 simple types, and null or undefined
	if(null == obj || "object" != typeof obj) return obj;

	// Handle Date
	if(obj instanceof Date)
	{
	    copy = new Date();
	    copy.setTime(obj.getTime());
	    return copy;
	}

	// Handle Array
	if(obj instanceof Array)
	{
	    copy = [];
	    for(var i = 0, len = obj.length; i < len; i++)
	    {
	      copy[i] = flour.clone(obj[i]);
	    }
	    return copy;
	}

	// Handle Object
	if(obj instanceof Object) 
	{
    copy = {};
    for(var attr in obj) 
    {
      if (obj.hasOwnProperty(attr)) copy[attr] = flour.clone(obj[attr]);
    }
    return copy;
	}

	throw new Error("Unable to copy obj! Its type isn't supported.");
};






/*
|
|	Returns the string with an s if it's more than 1
|
*/
flour.pluralize = function(string, number)
{
	return number === 1 ? string : string + 's';
};




/*
|
|	Converts a rgb to hex
|
*/
flour.rgb2hex = function(rgb)
{
  if (/^#[0-9A-F]{6}$/i.test(rgb))
  {
    return rgb;
  }

  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) 
  {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }

  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};




/*
|
|	Filter and return a readable file size format
|
*/
flour.readableBytes = function(bytes) 
{
	bytes = parseInt(bytes);
	if(bytes === 0){ return 0; }
  var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e]; 
};




/*
|
|	Truncates a string
|
*/
flour.truncate = function(str, len)
{	
	if(str && str.length > len && str.length > 0) 
  {
    var new_str = str + " ";
    new_str = str.substr (0, len);
    new_str = str.substr (0, new_str.lastIndexOf(" "));
    new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

    return new_str;
  }

  return str;
};




/*
|
|	Defer execution
|
*/
flour.defer = function(callback)
{
	setTimeout(callback, 0);
};




/*
|
|	Map a string value to an object
|
| var re = /\[(['"\w]+)\]/g;
|
*/
flour.setObjectKeyValue = function(object, key, value)
{
	// Create booleans
	var hasFullstop = key.indexOf('.') === -1 ? false : true;
	var hasSquareBrace = key.indexOf('[') === -1 ? false : true;
	

	// Split if we have either of these
	if(hasSquareBrace || hasFullstop)
	{
		key = key.replace(/\]|'|"/g, '');
		var pieces = key.split(/\.|\[/g);
		var objectPoint = object;

		var length = pieces.length;
		var lastIndex = length - 1;
		
		for(var i = 0; i < length; i ++)
		{
			var nextPoint = pieces[i];

			if(i === lastIndex)
			{
				objectPoint[nextPoint] = value;
			}
			else
			{
				if(objectPoint[nextPoint] === undefined)
				{
					objectPoint[nextPoint] = {};
				}

				objectPoint = objectPoint[nextPoint];
			}
		}

		return pieces;
	}
	else
	{
		object[key] = value;
		return[key];
	}
};


/*
|
|	Return an object value from a string key
|
*/
flour.getObjectKeyValue = function(object, key)
{
	// Create booleans
	var hasFullstop = key.indexOf('.') === -1 ? false : true;
	var hasSquareBrace = key.indexOf('[') === -1 ? false : true;
	

	// Split if we have either of these
	if(hasSquareBrace || hasFullstop)
	{
		key = key.replace(/\]|'|"/g, '');
		var pieces = key.split(/\.|\[/g);
		var objectPoint = object;

		var length = pieces.length;
		var lastIndex = length - 1;

		for(var i = 0; i < length; i ++)
		{
			var nextPoint = pieces[i];

			if(i === lastIndex)
			{
				return objectPoint[nextPoint];
			}
			else
			{
				if(objectPoint[nextPoint] === undefined)
				{
					return undefined;
				}

				objectPoint = objectPoint[nextPoint];
			}
		}
	}
	else
	{
		return object[key];
	}
};




/*
|
| Set flour app config vars : TODO
|
*/
flour.configValues = {};

flour.config = function(param, value)
{
	if(param === undefined)
	{
		return flour.configValues;
	}

	// If object, set all object key -> values
	if(flour.isObject(param))
	{
		for(var paramName in param)
		{
			flour.configValues[paramName] = param[paramName];
		}
	}
	else
	{
		// Setter getter behaviour
		if(value === undefined)
		{
			return flour.configValues[param];
		}
		else
		{
			flour.configValues[param] = value;
		}
	}
};




/*
|
|	Generates a lookup hash table
|
*/
flour.generateLookup = function(data, key)
{
	if(flour.isArray(data))
	{
		var lookup = {};
		for(var i = 0, n = data.length; i < n; i ++)
		{
			var item = data[i];
			if(item[key])
			{
				lookup[item[key]] = i;
			}
		}

		return lookup;
	}

	return false;
}




/*
|
|	Extracts and analysis a form submission, returns a formatted object with errors
|
*/
flour.validateFormData = function(form)
{
	var formData = {};
	var errors = {};
	var hasErrors = false;
	var inputs = form.find('input, textarea, select');


	// retrieve input data
	$.each(inputs, function(index, input)
	{
		// input name
		$input = $(input);

		var name = $input.attr('name');

		// $input value
		if($input[0].type === 'select-multiple')
		{
			var value = [];
			var options = $input.find('option');
			
			$.each(options, function(index, option)
			{
				var $option = $(option);
				if($option.data('selected'))
				{
					value.push($option.attr('value'));
				}
			});
			
			formData[name] = value;
		}
		else if($input[0].type === 'checkbox') 
		{
			var value = $input[0].checked ? true : false;
			formData[name] = value;
		}
		else if($input[0].type === 'radio') 
		{
			//var value = $input[0].checked ? true : false;
			if($input[0].checked)
			{
				var value = $input.val();
				formData[name] = value;
			}
		}
		else
		{
			var value = $input.val();	
			formData[name] = value;
		}


		// check for not blank
		if($input.hasClass('validate'))
		{
			if($input[0].type === 'select-multiple')
			{
				if(value.length === 0)
				{
					errors[name] = 'empty';
					hasErrors = true;
				}	
			}
			else
			{
				if(value === '' || value === false)
				{
					errors[name] = 'empty';
					hasErrors = true;
				}
			}
		}

		// check for valid email
		if($input.hasClass('validate-email'))
		{
			if(!flour.test.email(value))
			{
				errors[name] = 'invalid';
				hasErrors = true;
			}
		}
	});


	return {
		data: formData,
		errors: hasErrors ? errors : false
	};
};




var flour = flour || {};





/*
|
| Test module
|
*/
flour.test = {

  //
  //  Test for legit email
  //
  email: function(email)
  {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

};

var flour = flour || {};


/*
|
| Store our views in this object
|
*/
flour.views = {};


/*
|
| Add a view to our object
|
*/
flour.addView = function(name, view)
{
  view.prototype = new flour.baseView();
  flour.views[name] = view;
};


/*
|
| Returns an instance of a view
|
*/
flour.getView = function(name, params)
{
  var view = new flour.views[name]();
  
  // set these on the view
  view.eventListeners = {};
  view.subscriptions = [];
  view.model = {};
  view.views = [];
  view.el = null;

  // init
  view.initialize(params);

  return view;
}


/*
|
| Base view class
|
*/
flour.baseView = function()
{
  

  /*
  |
  | View class variables
  |
  */
  var self = this;



  /*
  |
  | Set up our default el and add delegated events
  |
  */
  self.initialize = function(params)
  {
    var self = this;

    // some view defaults
    self.events = self.events ? self.events : {};

    // view element container
    self.el = $('<div class="flour-view"></div>');

    // bring helpers into view name space
    self.addHelpers();

    // add events to our wrapper el
    self.addEvents();

    // create bindings
    flour.bindView(self);

    // init our view
    self.init(params);
  };



  /*
  |
  | Adds our delegated events to our el
  |
  */
  self.addEvents = function()
  {
    var self = this;

    if(self.events !== undefined)
    {
      for(var e in self.events)
      {
        (function(){
          var eventCallback = self.events[e];
          var eventOptions = e.split(' ');
          var eventSelector = eventOptions.pop();
          var eventType = eventOptions.join(' ');

          if(self[eventCallback] !== undefined)
          {
            self.el.on(eventType, eventSelector, function(event)
            {
              var $target = $(event.currentTarget);
              self[eventCallback](event, $target);
            });
          }
          else
          {
            if(flour.isFunction(eventCallback))
            {
              self.el.on(eventType, eventSelector, function(event)
              {
                var $target = $(event.currentTarget);
                eventCallback(event, $target);
              });
            }
          }
        }());
      }
    }
  };




  /*
  |
  | Adds selected helpers into our view prototype name space
  |
  */
  self.addHelpers = function()
  {
    var self = this;

    if(self.helpers !== undefined)
    {
      for(var i = 0, n = self.helpers.length; i < n; i ++)
      {
        var helperName = self.helpers[i];
        self[helperName] = flour.getHelper(helperName);

        if(self[helperName].init !== undefined)
        {
          self[helperName].init(self);
        }
      }
    }
  };




  /*
  |
  | Returns an array of elements that match the selector within the view parent el
  |
  */
  self.find = function(selector)
  {
    var self = this;

    return self.el.find(selector);
  };



  /*
  |
  | Empties view el, inserts template - users self.template and self.model
  |
  */
  self.render = function()
  {
    var self = this;

    self.adoptTemplate();

    self.trigger('render');

    if(self.postRender !== undefined)
    {
      self.postRender();
    }
  };




  /*
  |
  | Empties view el, inserts template - users self.template and self.model
  |
  */
  self.adoptTemplate = function()
  {
    var self = this;

    // remove children views
    for(var i = 0, n = self.views.length; i < n; i ++)
    {
      self.views[i].el.detach();
    }


    // self.el.empty();
    var template = flour.getTemplate(self.template);
    self.el.html(template(self.model));
  };




  /*
  |
  | Get and set methods for manipulating our model object
  |
  */
  self.get = function(property)
  {
    var self = this;

    if(property === undefined)
    {
      return self.model;
    }

    return flour.getObjectKeyValue(self.model, property);
  };

  self.set = function(property, value, doRender)
  {
    var self = this;
    var objectChain;

    if(flour.isObject(property))
    {
      for(var propertyName in property)
      {
        self.model[propertyName] = property[propertyName];
      }
    }
    else
    {
      var temp = flour.getObjectKeyValue(self.model, property);
      if(value !== temp || flour.isArray(value) || flour.isObject(value))
      {
        objectChain = flour.setObjectKeyValue(self.model, property, value);
      }
      else
      {
        doRender = false;
      }
    }
    
    // major doRender (re-render)
    if(doRender !== false)
    {
      self.render();
    }

    // change events
    if(objectChain)
    {
      var len = objectChain.length;
      for(var i = 0; i < len; i ++)
      {
        var bindingKey = objectChain.join('.');
        self.trigger('model.' + bindingKey + ':change', self.get(bindingKey));

        objectChain.pop();
      }
    }
  };






  /*
  |
  | View event trigger and listeners
  |
  */
  self.on = function(event, callback)
  {
    var self = this;

    if(self.eventListeners[event] === undefined)
    {
      self.eventListeners[event] = [];
    }
    
    self.eventListeners[event].push(callback);
  };

  self.off = function(event, callback)
  {
    var self = this;

    var events = self.eventListeners[event];

    if(events === undefined)
    {
      return;
    }

    if(callback !== undefined)
    {
      for(var i = 0, n = events.length; i < n; i ++)
      {
        if(callback === events[i])
        {
          events[i] = null;
          break;
        }
      }
    }
    else
    {
      events.length = 0; // this properly empties an array from memory
    }
  }

  self.trigger = function(event, data)
  {
    var self = this;
    var eventListeners = self.eventListeners[event];

    if(eventListeners === undefined || eventListeners === null)
    {
      return;
    }

    for(var i = 0, n = eventListeners.length; i < n; i ++)
    {
      var listenerCallback = eventListeners[i];
      if(listenerCallback !== null && listenerCallback !== undefined)
      {
        listenerCallback(data);
      }
    }
  };




  /*
  |
  | Subscribe to events, handled by view so subscriptions can be destroyed
  |
  */
  self.subscribe = function(eventName, callback)
  {
    var self = this;
    var subscription = flour.subscribe(eventName, callback);
    
    self.subscriptions.push(
    {
      eventName: eventName,
      callback: callback
    });
  };





  /*
  |
  | Gets a view and keeps a copy of it to destroy on 
  |
  */
  self.getView = function(viewName, params)
  {
    var self = this;
    var view = flour.getView(viewName, params);
    self.views.push(view);

    return view;
  };





  /*
  |
  | Gets a list and keeps a copy of it to destroy on 
  |
  */
  self.getList = function(listName, params)
  {
    var self = this;
    var list = flour.getList(listName, params);
    self.views.push(list);

    return list;
  };





  /*
  |
  | Destroy this view, remove events, subscriptions etc
  |
  */
  self.destroy = function()
  {
    var self = this;

    // Trigger destroy event
    self.trigger('destroy');

    // Remove element events
    self.el.off();

    // Remove all subscriptions
    for(var i = 0, n = self.subscriptions.length; i < n; i ++)
    {
      var subscription = self.subscriptions[i];
      flour.unsubscribe(subscription.eventName, subscription.callback);
    }

    // Destroy all sub views created
    for(var i = 0, n = self.views.length; i < n; i ++)
    {
      var view = self.views[i];
      view.destroy();
    }

    // Remove all event listeners
    for(var eventName in self.eventListeners)
    {
      self.eventListeners[eventName] = null;
    }

    // Call post destroy
    if(self.postDestroy !== undefined)
    {
      self.postDestroy();
    }
    
    // console.log('destroy view');
  };

};




