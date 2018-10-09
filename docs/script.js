!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){
/*!
 * PEP v0.4.3 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */
t.exports=function(){"use strict";var t=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],e=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0];function n(n,i){i=i||Object.create(null);var o=document.createEvent("Event");o.initEvent(n,i.bubbles||!1,i.cancelable||!1);for(var r,s=2;s<t.length;s++)r=t[s],o[r]=i[r]||e[s];o.buttons=i.buttons||0;var a=0;return a=i.pressure&&o.buttons?i.pressure:o.buttons?.5:0,o.x=o.clientX,o.y=o.clientY,o.pointerId=i.pointerId||0,o.width=i.width||0,o.height=i.height||0,o.pressure=a,o.tiltX=i.tiltX||0,o.tiltY=i.tiltY||0,o.twist=i.twist||0,o.tangentialPressure=i.tangentialPressure||0,o.pointerType=i.pointerType||"",o.hwTimestamp=i.hwTimestamp||0,o.isPrimary=i.isPrimary||!1,o}var i=window.Map&&window.Map.prototype.forEach?Map:o;function o(){this.array=[],this.size=0}o.prototype={set:function(t,e){if(void 0===e)return this.delete(t);this.has(t)||this.size++,this.array[t]=e},has:function(t){return void 0!==this.array[t]},delete:function(t){this.has(t)&&(delete this.array[t],this.size--)},get:function(t){return this.array[t]},clear:function(){this.array.length=0,this.size=0},forEach:function(t,e){return this.array.forEach(function(n,i){t.call(e,n,i,this)},this)}};var r=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp"],s=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0],a={pointerover:1,pointerout:1,pointerenter:1,pointerleave:1},u="undefined"!=typeof SVGElementInstance,c={pointermap:new i,eventMap:Object.create(null),captureInfo:Object.create(null),eventSources:Object.create(null),eventSourceList:[],registerSource:function(t,e){var n=e,i=n.events;i&&(i.forEach(function(t){n[t]&&(this.eventMap[t]=n[t].bind(n))},this),this.eventSources[t]=n,this.eventSourceList.push(n))},register:function(t){for(var e,n=this.eventSourceList.length,i=0;i<n&&(e=this.eventSourceList[i]);i++)e.register.call(e,t)},unregister:function(t){for(var e,n=this.eventSourceList.length,i=0;i<n&&(e=this.eventSourceList[i]);i++)e.unregister.call(e,t)},contains:function(t,e){try{return t.contains(e)}catch(t){return!1}},down:function(t){t.bubbles=!0,this.fireEvent("pointerdown",t)},move:function(t){t.bubbles=!0,this.fireEvent("pointermove",t)},up:function(t){t.bubbles=!0,this.fireEvent("pointerup",t)},enter:function(t){t.bubbles=!1,this.fireEvent("pointerenter",t)},leave:function(t){t.bubbles=!1,this.fireEvent("pointerleave",t)},over:function(t){t.bubbles=!0,this.fireEvent("pointerover",t)},out:function(t){t.bubbles=!0,this.fireEvent("pointerout",t)},cancel:function(t){t.bubbles=!0,this.fireEvent("pointercancel",t)},leaveOut:function(t){this.out(t),this.propagate(t,this.leave,!1)},enterOver:function(t){this.over(t),this.propagate(t,this.enter,!0)},eventHandler:function(t){if(!t._handledByPE){var e=t.type,n=this.eventMap&&this.eventMap[e];n&&n(t),t._handledByPE=!0}},listen:function(t,e){e.forEach(function(e){this.addEvent(t,e)},this)},unlisten:function(t,e){e.forEach(function(e){this.removeEvent(t,e)},this)},addEvent:function(t,e){t.addEventListener(e,this.boundHandler)},removeEvent:function(t,e){t.removeEventListener(e,this.boundHandler)},makeEvent:function(t,e){this.captureInfo[e.pointerId]&&(e.relatedTarget=null);var i=new n(t,e);return e.preventDefault&&(i.preventDefault=e.preventDefault),i._target=i._target||e.target,i},fireEvent:function(t,e){var n=this.makeEvent(t,e);return this.dispatchEvent(n)},cloneEvent:function(t){for(var e,n=Object.create(null),i=0;i<r.length;i++)n[e=r[i]]=t[e]||s[i],!u||"target"!==e&&"relatedTarget"!==e||n[e]instanceof SVGElementInstance&&(n[e]=n[e].correspondingUseElement);return t.preventDefault&&(n.preventDefault=function(){t.preventDefault()}),n},getTarget:function(t){var e=this.captureInfo[t.pointerId];return e?t._target!==e&&t.type in a?void 0:e:t._target},propagate:function(t,e,n){for(var i=t.target,o=[];i!==document&&!i.contains(t.relatedTarget);)if(o.push(i),!(i=i.parentNode))return;n&&o.reverse(),o.forEach(function(n){t.target=n,e.call(this,t)},this)},setCapture:function(t,e,i){this.captureInfo[t]&&this.releaseCapture(t,i),this.captureInfo[t]=e,this.implicitRelease=this.releaseCapture.bind(this,t,i),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease);var o=new n("gotpointercapture");o.pointerId=t,o._target=e,i||this.asyncDispatchEvent(o)},releaseCapture:function(t,e){var i=this.captureInfo[t];if(i){this.captureInfo[t]=void 0,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease);var o=new n("lostpointercapture");o.pointerId=t,o._target=i,e||this.asyncDispatchEvent(o)}},dispatchEvent:function(t){var e=this.getTarget(t);if(e)return e.dispatchEvent(t)},asyncDispatchEvent:function(t){requestAnimationFrame(this.dispatchEvent.bind(this,t))}};c.boundHandler=c.eventHandler.bind(c);var h={shadow:function(t){if(t)return t.shadowRoot||t.webkitShadowRoot},canTarget:function(t){return t&&Boolean(t.elementFromPoint)},targetingShadow:function(t){var e=this.shadow(t);if(this.canTarget(e))return e},olderShadow:function(t){var e=t.olderShadowRoot;if(!e){var n=t.querySelector("shadow");n&&(e=n.olderShadowRoot)}return e},allShadows:function(t){for(var e=[],n=this.shadow(t);n;)e.push(n),n=this.olderShadow(n);return e},searchRoot:function(t,e,n){if(t){var i,o,r=t.elementFromPoint(e,n);for(o=this.targetingShadow(r);o;){if(i=o.elementFromPoint(e,n)){var s=this.targetingShadow(i);return this.searchRoot(s,e,n)||i}o=this.olderShadow(o)}return r}},owner:function(t){for(var e=t;e.parentNode;)e=e.parentNode;return e.nodeType!==Node.DOCUMENT_NODE&&e.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&(e=document),e},findTarget:function(t){var e=t.clientX,n=t.clientY,i=this.owner(t.target);return i.elementFromPoint(e,n)||(i=document),this.searchRoot(i,e,n)}},l=Array.prototype.forEach.call.bind(Array.prototype.forEach),f=Array.prototype.map.call.bind(Array.prototype.map),v=Array.prototype.slice.call.bind(Array.prototype.slice),p=Array.prototype.filter.call.bind(Array.prototype.filter),d=window.MutationObserver||window.WebKitMutationObserver,m={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};function b(t,e,n,i){this.addCallback=t.bind(i),this.removeCallback=e.bind(i),this.changedCallback=n.bind(i),d&&(this.observer=new d(this.mutationWatcher.bind(this)))}function y(t){return"body /shadow-deep/ "+g(t)}function g(t){return'[touch-action="'+t+'"]'}function E(t){return"{ -ms-touch-action: "+t+"; touch-action: "+t+"; }"}b.prototype={watchSubtree:function(t){this.observer&&h.canTarget(t)&&this.observer.observe(t,m)},enableOnSubtree:function(t){this.watchSubtree(t),t===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(t)},installNewSubtree:function(t){l(this.findElements(t),this.addElement,this)},findElements:function(t){return t.querySelectorAll?t.querySelectorAll("[touch-action]"):[]},removeElement:function(t){this.removeCallback(t)},addElement:function(t){this.addCallback(t)},elementChanged:function(t,e){this.changedCallback(t,e)},concatLists:function(t,e){return t.concat(v(e))},installOnLoad:function(){document.addEventListener("readystatechange",function(){"complete"===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(t){return t.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(t){var e=f(t,this.findElements,this);return e.push(p(t,this.isElement)),e.reduce(this.concatLists,[])},mutationWatcher:function(t){t.forEach(this.mutationHandler,this)},mutationHandler:function(t){if("childList"===t.type){var e=this.flattenMutationTree(t.addedNodes);e.forEach(this.addElement,this);var n=this.flattenMutationTree(t.removedNodes);n.forEach(this.removeElement,this)}else"attributes"===t.type&&this.elementChanged(t.target,t.oldValue)}};var P=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],w="",T=window.PointerEvent||window.MSPointerEvent,S=!window.ShadowDOMPolyfill&&document.head.createShadowRoot,O=c.pointermap,M=[1,4,2,8,16],I=!1;try{I=1===new MouseEvent("test",{buttons:1}).buttons}catch(t){}var k,C={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],register:function(t){c.listen(t,this.events)},unregister:function(t){c.unlisten(t,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(t){for(var e,n=this.lastTouches,i=t.clientX,o=t.clientY,r=0,s=n.length;r<s&&(e=n[r]);r++){var a=Math.abs(i-e.x),u=Math.abs(o-e.y);if(a<=25&&u<=25)return!0}},prepareEvent:function(t){var e=c.cloneEvent(t),n=e.preventDefault;return e.preventDefault=function(){t.preventDefault(),n()},e.pointerId=this.POINTER_ID,e.isPrimary=!0,e.pointerType=this.POINTER_TYPE,e},prepareButtonsForMove:function(t,e){var n=O.get(this.POINTER_ID);0!==e.which&&n?t.buttons=n.buttons:t.buttons=0,e.buttons=t.buttons},mousedown:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=O.get(this.POINTER_ID),n=this.prepareEvent(t);I||(n.buttons=M[n.button],e&&(n.buttons|=e.buttons),t.buttons=n.buttons),O.set(this.POINTER_ID,t),e&&0!==e.buttons?c.move(n):c.down(n)}},mousemove:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);I||this.prepareButtonsForMove(e,t),e.button=-1,O.set(this.POINTER_ID,t),c.move(e)}},mouseup:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=O.get(this.POINTER_ID),n=this.prepareEvent(t);if(!I){var i=M[n.button];n.buttons=e?e.buttons&~i:0,t.buttons=n.buttons}O.set(this.POINTER_ID,t),n.buttons&=~M[n.button],0===n.buttons?c.up(n):c.move(n)}},mouseover:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);I||this.prepareButtonsForMove(e,t),e.button=-1,O.set(this.POINTER_ID,t),c.enterOver(e)}},mouseout:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);I||this.prepareButtonsForMove(e,t),e.button=-1,c.leaveOut(e)}},cancel:function(t){var e=this.prepareEvent(t);c.cancel(e),this.deactivateMouse()},deactivateMouse:function(){O.delete(this.POINTER_ID)}},_=c.captureInfo,L=h.findTarget.bind(h),R=h.allShadows.bind(h),x=c.pointermap,D={events:["touchstart","touchmove","touchend","touchcancel"],register:function(t){k.enableOnSubtree(t)},unregister:function(){},elementAdded:function(t){var e=t.getAttribute("touch-action"),n=this.touchActionToScrollType(e);n&&(t._scrollType=n,c.listen(t,this.events),R(t).forEach(function(t){t._scrollType=n,c.listen(t,this.events)},this))},elementRemoved:function(t){t._scrollType=void 0,c.unlisten(t,this.events),R(t).forEach(function(t){t._scrollType=void 0,c.unlisten(t,this.events)},this)},elementChanged:function(t,e){var n=t.getAttribute("touch-action"),i=this.touchActionToScrollType(n),o=this.touchActionToScrollType(e);i&&o?(t._scrollType=i,R(t).forEach(function(t){t._scrollType=i},this)):o?this.elementRemoved(t):i&&this.elementAdded(t)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(t){var e=t,n=this.scrollTypes;return"none"===e?"none":e===n.XSCROLLER?"X":e===n.YSCROLLER?"Y":n.SCROLLER.exec(e)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(t){return this.firstTouch===t.identifier},setPrimaryTouch:function(t){(0===x.size||1===x.size&&x.has(1))&&(this.firstTouch=t.identifier,this.firstXY={X:t.clientX,Y:t.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(t){t.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var t=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(t,200)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(t){var e=0;return"touchstart"!==t&&"touchmove"!==t||(e=1),e},touchToPointer:function(t){var e=this.currentTouchEvent,n=c.cloneEvent(t),i=n.pointerId=t.identifier+2;n.target=_[i]||L(n),n.bubbles=!0,n.cancelable=!0,n.detail=this.clickCount,n.button=0,n.buttons=this.typeToButtons(e.type),n.width=2*(t.radiusX||t.webkitRadiusX||0),n.height=2*(t.radiusY||t.webkitRadiusY||0),n.pressure=t.force||t.webkitForce||.5,n.isPrimary=this.isPrimaryTouch(t),n.pointerType=this.POINTER_TYPE,n.altKey=e.altKey,n.ctrlKey=e.ctrlKey,n.metaKey=e.metaKey,n.shiftKey=e.shiftKey;var o=this;return n.preventDefault=function(){o.scrolling=!1,o.firstXY=null,e.preventDefault()},n},processTouches:function(t,e){var n=t.changedTouches;this.currentTouchEvent=t;for(var i,o=0;o<n.length;o++)i=n[o],e.call(this,this.touchToPointer(i))},shouldScroll:function(t){if(this.firstXY){var e,n=t.currentTarget._scrollType;if("none"===n)e=!1;else if("XY"===n)e=!0;else{var i=t.changedTouches[0],o=n,r="Y"===n?"X":"Y",s=Math.abs(i["client"+o]-this.firstXY[o]),a=Math.abs(i["client"+r]-this.firstXY[r]);e=s>=a}return this.firstXY=null,e}},findTouch:function(t,e){for(var n,i=0,o=t.length;i<o&&(n=t[i]);i++)if(n.identifier===e)return!0},vacuumTouches:function(t){var e=t.touches;if(x.size>=e.length){var n=[];x.forEach(function(t,i){if(1!==i&&!this.findTouch(e,i-2)){var o=t.out;n.push(o)}},this),n.forEach(this.cancelOut,this)}},touchstart:function(t){this.vacuumTouches(t),this.setPrimaryTouch(t.changedTouches[0]),this.dedupSynthMouse(t),this.scrolling||(this.clickCount++,this.processTouches(t,this.overDown))},overDown:function(t){x.set(t.pointerId,{target:t.target,out:t,outTarget:t.target}),c.enterOver(t),c.down(t)},touchmove:function(t){this.scrolling||(this.shouldScroll(t)?(this.scrolling=!0,this.touchcancel(t)):(t.preventDefault(),this.processTouches(t,this.moveOverOut)))},moveOverOut:function(t){var e=t,n=x.get(e.pointerId);if(n){var i=n.out,o=n.outTarget;c.move(e),i&&o!==e.target&&(i.relatedTarget=e.target,e.relatedTarget=o,i.target=o,e.target?(c.leaveOut(i),c.enterOver(e)):(e.target=o,e.relatedTarget=null,this.cancelOut(e))),n.out=e,n.outTarget=e.target}},touchend:function(t){this.dedupSynthMouse(t),this.processTouches(t,this.upOut)},upOut:function(t){this.scrolling||(c.up(t),c.leaveOut(t)),this.cleanUpPointer(t)},touchcancel:function(t){this.processTouches(t,this.cancelOut)},cancelOut:function(t){c.cancel(t),c.leaveOut(t),this.cleanUpPointer(t)},cleanUpPointer:function(t){x.delete(t.pointerId),this.removePrimaryPointer(t)},dedupSynthMouse:function(t){var e=C.lastTouches,n=t.changedTouches[0];if(this.isPrimaryTouch(n)){var i={x:n.clientX,y:n.clientY};e.push(i);var o=function(t,e){var n=t.indexOf(e);n>-1&&t.splice(n,1)}.bind(null,e,i);setTimeout(o,2500)}}};k=new b(D.elementAdded,D.elementRemoved,D.elementChanged,D);var N,Y,X,A=c.pointermap,U=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,F={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(t){c.listen(t,this.events)},unregister:function(t){c.unlisten(t,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(t){var e=t;return U&&((e=c.cloneEvent(t)).pointerType=this.POINTER_TYPES[t.pointerType]),e},cleanup:function(t){A.delete(t)},MSPointerDown:function(t){A.set(t.pointerId,t);var e=this.prepareEvent(t);c.down(e)},MSPointerMove:function(t){var e=this.prepareEvent(t);c.move(e)},MSPointerUp:function(t){var e=this.prepareEvent(t);c.up(e),this.cleanup(t.pointerId)},MSPointerOut:function(t){var e=this.prepareEvent(t);c.leaveOut(e)},MSPointerOver:function(t){var e=this.prepareEvent(t);c.enterOver(e)},MSPointerCancel:function(t){var e=this.prepareEvent(t);c.cancel(e),this.cleanup(t.pointerId)},MSLostPointerCapture:function(t){var e=c.makeEvent("lostpointercapture",t);c.dispatchEvent(e)},MSGotPointerCapture:function(t){var e=c.makeEvent("gotpointercapture",t);c.dispatchEvent(e)}};function j(t){if(!c.pointermap.has(t)){var e=new Error("InvalidPointerId");throw e.name="InvalidPointerId",e}}function K(t){for(var e=t.parentNode;e&&e!==t.ownerDocument;)e=e.parentNode;if(!e){var n=new Error("InvalidStateError");throw n.name="InvalidStateError",n}}function q(t){var e=c.pointermap.get(t);return 0!==e.buttons}return window.navigator.msPointerEnabled?(N=function(t){j(t),K(this),q(t)&&(c.setCapture(t,this,!0),this.msSetPointerCapture(t))},Y=function(t){j(t),c.releaseCapture(t,!0),this.msReleasePointerCapture(t)}):(N=function(t){j(t),K(this),q(t)&&c.setCapture(t,this)},Y=function(t){j(t),c.releaseCapture(t)}),X=function(t){return!!c.captureInfo[t]},function(){if(T){P.forEach(function(t){String(t)===t?(w+=g(t)+E(t)+"\n",S&&(w+=y(t)+E(t)+"\n")):(w+=t.selectors.map(g)+E(t.rule)+"\n",S&&(w+=t.selectors.map(y)+E(t.rule)+"\n"))});var t=document.createElement("style");t.textContent=w,document.head.appendChild(t)}}(),function(){if(!window.PointerEvent){if(window.PointerEvent=n,window.navigator.msPointerEnabled){var t=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:t,enumerable:!0}),c.registerSource("ms",F)}else Object.defineProperty(window.navigator,"maxTouchPoints",{value:0,enumerable:!0}),c.registerSource("mouse",C),void 0!==window.ontouchstart&&c.registerSource("touch",D);c.register(document)}}(),window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:N},releasePointerCapture:{value:Y},hasPointerCapture:{value:X}}),{dispatcher:c,Installer:b,PointerEvent:n,PointerMap:i,targetFinding:h}}()},function(t,e,n){"use strict";n.r(e);n(0);function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,o=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){o=!0,r=t}finally{try{i||null==a.return||a.return()}finally{if(o)throw r}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.prevDiff=-1,this.currentScale=1,this.MIN_SCALE=1,this.MAX_SCALE=4,this.POINTERS_COUNT=2,this.MIN_DIFF=20,this.onPointerUp=this.onPointerUp.bind(this),this.onPointerCancel=this.onPointerCancel.bind(this)}return function(t,e,n){e&&o(t.prototype,e),n&&o(t,n)}(t,[{key:"perform",value:function(t,e,n){if(t.length!==this.POINTERS_COUNT)return n;var o=this.prevDiff,r=this.MIN_DIFF,s=i(t,2),a=s[0],u=s[1],c=Math.abs(function(t,e,n,i){return Math.hypot(e-t,i-n)}(a.clientX,u.clientX,a.clientY,u.clientY)),h=this.currentScale;return o>0&&Math.abs(c-o)<r&&(h=this.changeScaleFactor(c/o)),this.prevDiff=c,this.currentScale=h,Object.assign({},n,{scale:h})}},{key:"reset",value:function(){this.prevDiff=-1}},{key:"changeScaleFactor",value:function(t){var e=this.currentScale,n=this.MAX_SCALE,i=this.MIN_SCALE,o=e*t;return Math.min(n,Math.max(o,i))}},{key:"onPointerCancel",value:function(){this.reset()}},{key:"onPointerUp",value:function(){this.reset()}}]),t}();function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.prevAngle=0,this.POINTERS_COUNT=2,this.onPointerUp=this.onPointerUp.bind(this),this.onPointerCancel=this.onPointerCancel.bind(this)}return function(t,e,n){e&&s(t.prototype,e),n&&s(t,n)}(t,[{key:"perform",value:function(t,e,n){if(t.length!==this.POINTERS_COUNT)return n;var i=this.prevAngle,o=function(t,e,n,i){return{x:(t+e)/2,y:(n+i)/2}}(t[0].clientX,t[1].clientX,t[0].clientY,t[1].clientY),r=function(t){return t.sort(function(t,e){return e.x-t.x})[0]}(t),s=function(t,e,n,i){return 180*Math.atan2(i-e,n-t)/Math.PI}(o.x,o.y,r.x,r.y);if(0===i)return this.prevAngle=s,n;var a=i-s;return a>90?a-=180:a<-90&&(a+=180),this.prevAngle=s,Object.assign({},n,{angleDistance:a})}},{key:"reset",value:function(){this.prevAngle=0}},{key:"onPointerUp",value:function(){this.reset()}},{key:"onPointerCancel",value:function(){this.reset()}}]),t}();function u(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var c=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.isActive=!0,this.lastPosition={x:0,y:0},this.gesturePosition={x:0,y:0},this.POINTERS_COUNT=1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerUp=this.onPointerUp.bind(this)}return function(t,e,n){e&&u(t.prototype,e),n&&u(t,n)}(t,[{key:"perform",value:function(t,e,n){var i=this.isActive,o=this.gesturePosition,r=this.lastPosition,s=this.POINTERS_COUNT;if(t.length!==s)return n;var a=n.scale,u=void 0===a?1:a;if(!i)return n;var c=e.x,h=e.y,l=this.getMovement(e,o),f=l.movementX/u,v=l.movementY/u,p=r.x+f,d=r.y+v;return this.lastPosition={x:p,y:d},this.gesturePosition={x:c,y:h},Object.assign({},n,{x:p,y:d})}},{key:"getMovement",value:function(t,e){var n=t.x,i=t.y,o=0===e.x?n:e.x,r=0===e.y?i:e.y;return{movementX:t.movementX||t.mozMovementX||t.webkitMovementX||n-o,movementY:t.movementY||t.mozMovementY||t.webkitMovementY||i-r}}},{key:"onPointerDown",value:function(t){this.isActive=!0,this.gesturePosition={x:t.x,y:t.y}}},{key:"onPointerUp",value:function(){this.gesturePosition={x:0,y:0}}}]),t}();function h(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var l={pointerdown:"onPointerDown",pointerup:"onPointerUp",pointermove:"onPointerMove",pointercancel:"onPointerCancel"},f=function(){function t(e){var n=e.node,i=e.gestures,o=e.onMove;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.node=n,this.pointers=[],this.gestures=i,this.state={x:0,scale:1,angleDistance:0},this.onMove=o,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onPointerCancel=this.onPointerCancel.bind(this),document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock,this.node.requestPointerLock=this.node.requestPointerLock||this.node.mozRequestPointerLock||this.node.webkitRequestPointerLock}return function(t,e,n){e&&h(t.prototype,e),n&&h(t,n)}(t,[{key:"isLocked",value:function(){return this.node===document.pointerLockElement||this.node===document.mozPointerLockElement||this.node===document.webkitPointerLockElement}},{key:"hasPointerLock",value:function(){return"pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document}},{key:"init",value:function(){this.subscribeEvents(),this.onMove(this.state)}},{key:"subscribeEvents",value:function(){var t=this.node;t.addEventListener("pointerdown",this.onPointerDown),t.addEventListener("pointermove",this.onPointerMove),t.addEventListener("pointerup",this.onPointerUp),t.addEventListener("pointercancel",this.onPointerCancel)}},{key:"removePointer",value:function(t){this.pointers=this.pointers.filter(function(e){return e.pointerId!==t.pointerId})}},{key:"addPointer",value:function(t){this.pointers=this.pointers.concat(t)}},{key:"updatePointer",value:function(t){this.pointers=this.pointers.map(function(e){return e.pointerId===t.pointerId?t:e})}},{key:"notify",value:function(t){this.gestures.forEach(function(e){var n=e[l[t.type]];"function"==typeof n&&n(t)})}},{key:"onPointerUp",value:function(t){this.hasPointerLock()||this.removePointer(t),this.notify(t)}},{key:"onPointerCancel",value:function(t){this.hasPointerLock()||this.removePointer(t),this.notify(t)}},{key:"onPointerDown",value:function(t){this.addPointer(t),this.isLocked()?(document.exitPointerLock(),this.hasPointerLock()&&this.removePointer(t)):this.node.requestPointerLock(),this.notify(t,this.state)}},{key:"onPointerMove",value:function(t){this.updatePointer(t),this.performGestures(t),this.notify(t)}},{key:"performGestures",value:function(t){var e=this,n=this.gestures,i=this.pointers;n.forEach(function(n){e.state=n.perform(i,t,e.state)}),this.onMove(this.state)}}]),t}(),v=".view-info__preview",p=".view-info__indicator",d=".view-info__field--scale .view-info__value",m=".view-info__field--brightness .view-info__value",b=document.querySelector(".panorama-viewer__image");b.setAttribute("touch-action","none");var y=1,g=null,E=function(t){var e=t.x,n=t.scale,i=t.angleDistance,o=y+-i/180*2;o=Math.min(2,Math.max(o,0)),y=o,b.style.filter="brightness(".concat(100*o,"%)"),b.style.backgroundPosition="".concat(e,"px 100%"),b.style.transform="scale(".concat(n,")"),function(t,e){var n=t.x,i=t.scale,o=e.brightnessValue,r=e.image,s=document.documentElement,a=s.clientWidth,u=s.offsetHeight,c=window.devicePixelRatio,h=r.width/c,l=u/(r.height/c),f=document.querySelector(v),b=document.querySelector(p),y=f.clientWidth,g=a/h/l,E=g/i*y,P=-y/(h*l)*n+(g*y-g*y/i)/2;b.style.backgroundImage="repeating-linear-gradient(\n    to right,\n    transparent,\n    transparent ".concat(E,"px,\n    rgba(0,0,0, 0.5) ").concat(E,"px,\n    rgba(0,0,0, 0.5) 100%)"),b.style.backgroundPosition="".concat(P,"px 100%"),document.querySelector(d).innerHTML="".concat(Math.round(100*i),"%"),document.querySelector(m).innerHTML="".concat(Math.round(100*o),"%")}(t,{brightnessValue:o,image:g})},P=new a,w=new r,T=new c,S=new f({node:b,gestures:[T,w,P],onMove:function(t){return E(t)}});new Promise(function(t,e){var n=new Image;n.src="images/panorama.jpg",n.onload=function(){return t(n)},n.onerror=e}).then(function(t){g=t,S.init()})}]);