/*!
 * wjs-recentComments v1.1.0
 * Copyright 2019 zkreations
 * Developed by José Gregorio (fb.com/JGMateran) | Daniel Abel M. (fb.com/danieI.abel)
 * Licensed under GNU (github.com/zkreations/wjs-recentComments/blob/master/LICENSE)
 */
   var recentCmts = (function(){
    
   'use strict';
   
   var cmtsId = document.getElementById('wjs-recentCmts'),
	   defaults = {
		  homepage: window.location.protocol + '//' + window.location.hostname,
		  imgSize: 's80',
		  container: cmtsId,
		  image: (cmtsId.dataset.cphoto || '//www.gravatar.com/avatar/?d=mm'), 
		  length: (cmtsId.dataset.cnumber || 6), 
		  snippet: (cmtsId.dataset.csnippet || 50)
	   };

   var script = document.createElement( 'script' );

   var src = defaults.homepage + '/feeds/comments/default' +
      '?alt=json-in-script' +
      '&callback=recentCmts' +
      '&max-results=' + ( defaults.length );
   
   script.src = src;
   
   document.body.appendChild( script );
   
   function render( data ){
      //console.log( data );
      var author = data.author[0];
      var authorName = author.name.$t;
      var content = data.content;
      var summary = data.summary;
      var snippet = ( content ? content.$t : summary.$t).replace(/<[^>]*>?/g,'').substring( 0, defaults.snippet ) + '...';
      var image = author.gd$image;
      var authorImage = ( image.src.includes("g/blank.gif") || image.src.includes("g/b16-rounded.gif") ? defaults.image : image.src ).replace( /s\B\d{2,4}/, defaults.imgSize); 
      var url = (function(){
         for ( var i = 0; i < data.link.length; i++ ){
            var link = data.link[i];
            if ( link.rel === 'alternate' ){
               return link.href;
            }
         }
      })();
      var published = new Date( data.published.$t ).toLocaleDateString(
         'es-ES',
         {
            year:'numeric',
            month:'numeric',
            day: 'numeric'
         }
      );
      return (
         '<div class="wjs-cmts__card">'+
            '<div class="wjs-cmts__card-content">'+
               '<a href="' + url + '" class="wjs-cmts__image">'+
                  '<img src="' + authorImage + '" alt="' + authorName + '" />'+
               '</a>'+
               '<div class="wjs-cmts__data">'+
                  '<h3 class="wjs-cmts__title"><a href="' + url + '">' + authorName + '</a><span class="wjs-cmts__date">' + published + '</span></h3>'+
                  '<p class="wjs-cmts__snippet">' + snippet + '</p>'+
               '</div>'+
            '</div>'+
         '</div>'
      );
   }
   function recentCmts( json ){
      var i = 0;
      var post;
      var length = defaults.length;

      for ( ; i < length && ( post = json.feed.entry[ i ] ); i++ ){
        defaults.container.innerHTML += render( post );
      }
   }
   return recentCmts;
   })();