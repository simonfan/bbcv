//     bbcv
//     (c) sf
//     bbcv is licensed under the sf terms.

define("bbcv/iterators",["require","exports","module","lodash"],function(e,t){var i=e("lodash");t.onItemViews=function(){var e=Array.prototype.slice.call(arguments);return i.each(this.modelViews,function(t){t.on.apply(t,e)}),this};var o=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"];i.each(o,function(e){t[e]=function(){var t=Array.prototype.slice.call(arguments);return t.unshift(this.modelViews),i[e].apply(i,t)}})}),define("bbcv/event-handlers",["require","exports","module","lodash","jquery"],function(e,t){e("lodash"),e("jquery");t.handleAdd=function(e){this.addModelView(e)},t.handleRemove=function(e){this.removeModelView(e)},t.handleReset=function(e){this.$el.html(""),e.each(this.handleRemove),e.each(this.handleAdd)},t.handleResort=function(e,t){this.handleReset(e,t)}}),define("bbcv/model-view",["require","exports","module","lodash","jquery"],function(e,t){function i(e,t,i){var o=i.getModelViewAt(t-1);return o?e.insertAfter(o.$el):e.appendTo(i.$el)}var o=e("lodash"),l=e("jquery");t.getModelViewAt=function(e){return this.modelViews[e]},t.getModelView=function(e){var t=e.cid;return o.find(this.modelViews,function(e){return e.model.cid===t})},t.removeModelViewAt=function(e){var t=this.modelViews.splice(e,1)[0];return t?t.remove():void 0},t.removeModelView=function(e){var t=e.cid,i=o.findIndex(this.modelViews,function(e){return e.model.cid===t});return this.removeModelViewAt(i)},t.addModelView=function(e){var t=o.isFunction(this.modelHtml)?this.modelHtml(e):this.modelHtml,n=l(t),s=this.collection.indexOf(e);i(n,s,this);var r={el:n,model:e,index:s,collection:this.collection,collectionView:this},d=this.modelView(r);return this.modelViews.splice(s,0,d),d}}),define("bbcv",["require","exports","module","lowercase-backbone","lodash","lowercase-backbone","bbcv/iterators","bbcv/event-handlers","bbcv/model-view"],function(e,t,i){var o=e("lowercase-backbone").view,l=e("lodash"),n=o.prototype.initialize,s=i.exports=o.extend({initialize:function(e){n.call(this,e),this.initializeBBCV(e)},initializeBBCV:function(e){if(e=e||{},l.each(["resortEvent","modelHtmlTemplate","modelHtml","modelView","collection","parseModelHtmlTemplateData"],function(t){this[t]=e[t]||this[t]},this),!this.modelHtml){var t=e.compileTemplate||this.compileTemplate,i=l.isFunction(this.modelHtmlTemplate)?this.modelHtmlTemplate:t(this.modelHtmlTemplate);this.modelHtml=function(e){var t=l.isFunction(this.parseModelHtmlTemplateData)?this.parseModelHtmlTemplateData(e):e.toJSON();return i(t)}}this.modelViews=[];var o=this.collection;if(!this.collection)throw new Error("No collection given for collection view");l.bindAll(this,["handleAdd","handleRemove","handleReset","handleResort"]),this.listenTo(o,"add",this.handleAdd).listenTo(o,"remove",this.handleRemove).listenTo(o,"reset",this.handleReset).listenTo(o,this.resortEvent,this.handleResort),this.handleReset(o)},resortEvent:"resort",compileTemplate:l.template,modelHtmlTemplate:'<div>bb-collection-view item replace "modelHtml" property</div>',modelHtml:!1,modelView:e("lowercase-backbone").view});s.assignProto(e("bbcv/iterators")).assignProto(e("bbcv/event-handlers")).assignProto(e("bbcv/model-view"))});