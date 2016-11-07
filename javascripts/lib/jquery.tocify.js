/*! jQuery UI - v1.10.3 - 2013-09-16
* http://jqueryui.com
* Includes: jquery.ui.widget.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
!function(t,e){var n=0,i=Array.prototype.slice,o=t.cleanData;t.cleanData=function(e){for(var n,i=0;null!=(n=e[i]);i++)try{t(n).triggerHandler("remove")}catch(s){}o(e)},t.widget=function(n,i,o){var s,r,a,l,c={},h=n.split(".")[0];n=n.split(".")[1],s=h+"-"+n,o||(o=i,i=t.Widget),t.expr[":"][s.toLowerCase()]=function(e){return!!t.data(e,s)},t[h]=t[h]||{},r=t[h][n],a=t[h][n]=function(t,n){return this._createWidget?(arguments.length&&this._createWidget(t,n),e):new a(t,n)},t.extend(a,r,{version:o.version,_proto:t.extend({},o),_childConstructors:[]}),l=new i,l.options=t.widget.extend({},l.options),t.each(o,function(n,o){return t.isFunction(o)?(c[n]=function(){var t=function(){return i.prototype[n].apply(this,arguments)},e=function(t){return i.prototype[n].apply(this,t)};return function(){var n,i=this._super,s=this._superApply;return this._super=t,this._superApply=e,n=o.apply(this,arguments),this._super=i,this._superApply=s,n}}(),e):(c[n]=o,e)}),a.prototype=t.widget.extend(l,{widgetEventPrefix:r?l.widgetEventPrefix:n},c,{constructor:a,namespace:h,widgetName:n,widgetFullName:s}),r?(t.each(r._childConstructors,function(e,n){var i=n.prototype;t.widget(i.namespace+"."+i.widgetName,a,n._proto)}),delete r._childConstructors):i._childConstructors.push(a),t.widget.bridge(n,a)},t.widget.extend=function(n){for(var o,s,r=i.call(arguments,1),a=0,l=r.length;l>a;a++)for(o in r[a])s=r[a][o],r[a].hasOwnProperty(o)&&s!==e&&(n[o]=t.isPlainObject(s)?t.isPlainObject(n[o])?t.widget.extend({},n[o],s):t.widget.extend({},s):s);return n},t.widget.bridge=function(n,o){var s=o.prototype.widgetFullName||n;t.fn[n]=function(r){var a="string"==typeof r,l=i.call(arguments,1),c=this;return r=!a&&l.length?t.widget.extend.apply(null,[r].concat(l)):r,this.each(a?function(){var i,o=t.data(this,s);return o?t.isFunction(o[r])&&"_"!==r.charAt(0)?(i=o[r].apply(o,l),i!==o&&i!==e?(c=i&&i.jquery?c.pushStack(i.get()):i,!1):e):t.error("no such method '"+r+"' for "+n+" widget instance"):t.error("cannot call methods on "+n+" prior to initialization; attempted to call method '"+r+"'")}:function(){var e=t.data(this,s);e?e.option(r||{})._init():t.data(this,s,new o(r,this))}),c}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(n,i){var o,s,r,a=n;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof n)if(a={},o=n.split("."),n=o.shift(),o.length){for(s=a[n]=t.widget.extend({},this.options[n]),r=0;o.length-1>r;r++)s[o[r]]=s[o[r]]||{},s=s[o[r]];if(n=o.pop(),i===e)return s[n]===e?null:s[n];s[n]=i}else{if(i===e)return this.options[n]===e?null:this.options[n];a[n]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(n,i,o){var s,r=this;"boolean"!=typeof n&&(o=i,i=n,n=!1),o?(i=s=t(i),this.bindings=this.bindings.add(i)):(o=i,i=this.element,s=this.widget()),t.each(o,function(o,a){function l(){return n||r.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?r[a]:a).apply(r,arguments):e}"string"!=typeof a&&(l.guid=a.guid=a.guid||l.guid||t.guid++);var c=o.match(/^(\w+)\s*(.*)$/),h=c[1]+r.eventNamespace,u=c[2];u?s.delegate(u,h,l):i.bind(h,l)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function n(){return("string"==typeof t?i[t]:t).apply(i,arguments)}var i=this;return setTimeout(n,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,n,i){var o,s,r=this.options[e];if(i=i||{},n=t.Event(n),n.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),n.target=this.element[0],s=n.originalEvent)for(o in s)o in n||(n[o]=s[o]);return this.element.trigger(n,i),!(t.isFunction(r)&&r.apply(this.element[0],[n].concat(i))===!1||n.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,n){t.Widget.prototype["_"+e]=function(i,o,s){"string"==typeof o&&(o={effect:o});var r,a=o?o===!0||"number"==typeof o?n:o.effect||n:e;o=o||{},"number"==typeof o&&(o={duration:o}),r=!t.isEmptyObject(o),o.complete=s,o.delay&&i.delay(o.delay),r&&t.effects&&t.effects.effect[a]?i[e](o):a!==e&&i[a]?i[a](o.duration,o.easing,s):i.queue(function(n){t(this)[e](),s&&s.call(i[0]),n()})}})}(jQuery),/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */
function(t){"use strict";t(window.jQuery,window,document)}(function(t,e,n,i){"use strict";var o="tocify",s="tocify-focus",r="tocify-hover",a="tocify-hide",l="tocify-header",c="."+l,h="tocify-subheader",u="."+h,d="tocify-item",f="."+d,p="tocify-extend-page",g="."+p;t.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var n=this;n.tocifyWrapper=t(".tocify-wrapper"),n.extendPageScroll=!0,n.items=[],n._generateToc(),n.cachedHeights=[],n.cachedAnchors=[],n._addCSSClasses(),n.webkit=function(){for(var t in e)if(t&&-1!==t.toLowerCase().indexOf("webkit"))return!0;return!1}(),n._setEventHandlers(),t(e).load(function(){n._setActiveElement(!0),t("html, body").promise().done(function(){setTimeout(function(){n.extendPageScroll=!1},0)})})},_generateToc:function(){var e,n,i=this,s=i.options.ignoreSelector;return e=t(this.options.context).find(-1!==this.options.selectors.indexOf(",")?this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(",")):this.options.selectors.replace(/ /g,"")),e.length?(i.element.addClass(o),void e.each(function(e){t(this).is(s)||(n=t("<ul/>",{id:l+e,"class":l}).append(i._nestElements(t(this),e)),i.element.append(n),t(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===t(this).find(i.options.selectors).length?t(this).filter(i.options.selectors).each(function(){t(this).is(s)||i._appendSubheaders.call(this,i,n)}):t(this).find(i.options.selectors).each(function(){t(this).is(s)||i._appendSubheaders.call(this,i,n)})}))})):void i.element.addClass(a)},_setActiveElement:function(t){var n=this,i=e.location.hash.substring(1),o=n.element.find("li[data-unique='"+i+"']");return i.length?(n.element.find("."+n.focusClass).removeClass(n.focusClass),o.addClass(n.focusClass),n.options.showAndHide&&o.click()):(n.element.find("."+n.focusClass).removeClass(n.focusClass),!i.length&&t&&n.options.highlightDefault&&n.element.find(f).first().addClass(n.focusClass)),n},_nestElements:function(e,n){var i,o,s;return i=t.grep(this.items,function(t){return t===e.text()}),this.items.push(i.length?e.text()+n:e.text()),e.hasClass("section-header")?t("<li/>",{"class":"section-header-toc"}).append(t("<h4/>",{text:e.text(),"class":"sidebar-nav-heading"})):(s=this._generateHashValue(i,e,n),o=t("<li/>",{"class":d,"data-unique":s}).append(t("<a/>",{text:e.text()})),e.before(t("<div/>",{name:s,"data-unique":s})),o)},_generateHashValue:function(t,e,n){var i="",o=this.options.hashGenerator;if("pretty"===o){for(i=e.text().toLowerCase().replace(/\s/g,"-"),i=i.replace(/[^\x00-\x7F]/g,"");i.indexOf("--")>-1;)i=i.replace(/--/g,"-");for(;i.indexOf(":-")>-1;)i=i.replace(/:-/g,"-")}else i="function"==typeof o?o(e.text(),e):e.text().replace(/\s/g,"");return t.length&&(i+=""+n),i},_appendSubheaders:function(e,n){var i=t(this).index(e.options.selectors),o=t(e.options.selectors).eq(i-1),s=+t(this).prop("tagName").charAt(1),r=+o.prop("tagName").charAt(1);r>s?e.element.find(u+"[data-tag="+s+"]").last().append(e._nestElements(t(this),i)):s===r?n.find(f).last().after(e._nestElements(t(this),i)):n.find(f).last().after(t("<ul/>",{"class":h,"data-tag":s})).next(u).append(e._nestElements(t(this),i))},_setEventHandlers:function(){var o=this;this.element.on("click.tocify","li",function(){if(!t(this).hasClass("section-header-toc")){if(o.options.history&&(e.location.hash=t(this).attr("data-unique")),o.element.find("."+o.focusClass).removeClass(o.focusClass),t(this).addClass(o.focusClass),o.options.showAndHide){var n=t('li[data-unique="'+t(this).attr("data-unique")+'"]');o._triggerShow(n)}o._scrollTo(t(this))}}),this.element.find("li").on({"mouseenter.tocify":function(){t(this).hasClass("section-header-toc")||(t(this).addClass(o.hoverClass),t(this).css("cursor","pointer"))},"mouseleave.tocify":function(){"bootstrap"!==o.options.theme&&t(this).removeClass(o.hoverClass)}}),t(e).on("resize",function(){o.calculateHeights()}),t(e).on("scroll.tocify",function(){t("html, body").promise().done(function(){var s,r,a,l,c=t(e).scrollTop(),h=t(e).height(),u=t(n).height(),d=t("body")[0].scrollHeight;if(o.options.extendPage&&(o.webkit&&c>=d-h-o.options.extendPageOffset||!o.webkit&&h+c>u-o.options.extendPageOffset)&&!t(g).length){if(r=t('div[data-unique="'+t(f).last().attr("data-unique")+'"]'),!r.length)return;a=r.offset().top,t(o.options.context).append(t("<div />",{"class":p,height:Math.abs(a-c)+"px","data-unique":p})),o.extendPageScroll&&(l=o.element.find("li.active"),o._scrollTo(t("div[data-unique="+l.attr("data-unique")+"]")))}setTimeout(function(){var r,a=null;0==o.cachedHeights.length&&o.calculateHeights();var l=t(e).scrollTop();if(o.cachedAnchors.each(function(t){return o.cachedHeights[t]-l<0?void(a=t):!1}),r=t(o.cachedAnchors[a]).attr("data-unique"),s=t('li[data-unique="'+r+'"]'),o.options.highlightOnScroll&&s.length&&!s.hasClass(o.focusClass)){o.element.find("."+o.focusClass).removeClass(o.focusClass),s.addClass(o.focusClass);var c=o.tocifyWrapper,h=t(s).closest(".tocify-header"),u=h.offset().top,d=c.offset().top,f=u-d;if(f>=t(e).height()){var p=f+c.scrollTop();c.scrollTop(p)}else 0>f&&c.scrollTop(0)}o.options.scrollHistory&&e.location.hash!=="#"+r&&r!==i&&(history.replaceState?history.replaceState({},"","#"+r):(scrollV=n.body.scrollTop,scrollH=n.body.scrollLeft,location.hash="#"+r,n.body.scrollTop=scrollV,n.body.scrollLeft=scrollH)),o.options.showAndHideOnScroll&&o.options.showAndHide&&o._triggerShow(s,!0)},0)})})},calculateHeights:function(){var e=this;e.cachedHeights=[],e.cachedAnchors=[];var n=t(e.options.context).find("div[data-unique]");n.each(function(n){var i=(t(this).next().length?t(this).next():t(this)).offset().top-e.options.highlightOffset;e.cachedHeights[n]=i}),e.cachedAnchors=n},show:function(e){var n=this;if(!e.is(":visible"))switch(e.find(u).length||e.parent().is(c)||e.parent().is(":visible")?e.children(u).length||e.parent().is(c)||(e=e.closest(u)):e=e.parents(u).add(e),n.options.showEffect){case"none":e.show();break;case"show":e.show(n.options.showEffectSpeed);break;case"slideDown":e.slideDown(n.options.showEffectSpeed);break;case"fadeIn":e.fadeIn(n.options.showEffectSpeed);break;default:e.show()}return n.hide(t(u).not(e.parent().is(c)?e:e.closest(c).find(u).not(e.siblings()))),n},hide:function(t){var e=this;switch(e.options.hideEffect){case"none":t.hide();break;case"hide":t.hide(e.options.hideEffectSpeed);break;case"slideUp":t.slideUp(e.options.hideEffectSpeed);break;case"fadeOut":t.fadeOut(e.options.hideEffectSpeed);break;default:t.hide()}return e},_triggerShow:function(t,e){var n=this;return t.parent().is(c)||t.next().is(u)?n.show(t.next(u),e):t.parent().is(u)&&n.show(t.parent(),e),n},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(c+","+u).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=s,this.hoverClass=r),this},setOption:function(){t.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){t.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(e){var n=this,i=n.options.smoothScroll||0,o=n.options.scrollTo;return t("html, body").promise().done(function(){t("html, body").animate({scrollTop:t('div[data-unique="'+e.attr("data-unique")+'"]').next().offset().top-(t.isFunction(o)?o.call():o)+"px"},{duration:i})}),n}})});