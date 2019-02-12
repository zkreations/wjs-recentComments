/*!
 * wjs-recentComments v1.0.0
 * Copyright 2019 zkreations
 * Developed by José Gregorio (fb.com/JGMateran) | Daniel Abel M. (fb.com/danieI.abel)
 * Licensed under GNU (github.com/zkreations/wjs-recentComments/blob/master/LICENSE)
 */
var recentCmts = function() {
    var f = window.location.protocol + "//" + window.location.hostname,
        h = document.getElementById("wjs-recentCmts"),
        d = document.createElement("script");
    d.src = f + "/feeds/comments/default?alt=json-in-script&callback=recentCmts&max-results=6";
    document.body.appendChild(d);
    return function(d) {
        for (var g = 0, k; 6 > g && (k = d.feed.entry[g]); g++) {
            var f = h,
                n = h.innerHTML,
                b = k,
                c = b.author[0],
                l = c.name.$t,
                e = b.content;
            var a = b.summary;
            e = (e ? e.$t : a.$t).replace(/<[^>]*>?/g, "").substring(0, 50) + "...";
            c = c.gd$image;
            c =
                (c.src.includes("g/blank.gif") || c.src.includes("g/b16-rounded.gif") ? "//www.gravatar.com/avatar/?d=mm" : c.src).replace(/s\B\d{2,4}/, "s80");
            a: {
                for (a = 0; a < b.link.length; a++) {
                    var m = b.link[a];
                    if ("alternate" === m.rel) {
                        a = m.href;
                        break a
                    }
                }
                a = void 0
            }
            b = (new Date(b.published.$t)).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            });
            f.innerHTML = n + ('<div class="wjs-cmts__card"><div class="wjs-cmts__card-content"><a href="' + a + '" class="wjs-cmts__image"><img src="' + c + '" alt="' + l + '" /></a><div class="wjs-cmts__data"><h3 class="wjs-cmts__title"><a href="' +
                a + '">' + l + '</a><span class="wjs-cmts__date">' + b + '</span></h3><p class="wjs-cmts__snippet">' + e + "</p></div></div></div>")
        }
    }
}();