/*!
 * wjs-recentComments v1.0.0
 * Copyright 2019 zkreations
 * Developed by José Gregorio (fb.com/JGMateran) | Daniel Abel M. (fb.com/danieI.abel)
 * Licensed under GNU (github.com/zkreations/wjs-recentComments/blob/master/LICENSE)
 */
var recentCmts = function() {
    var d = document.getElementById("wjs-recentCmts"),
        g = window.location.protocol + "//" + window.location.hostname,
        p = d.dataset.cphoto || "//www.gravatar.com/avatar/?d=mm",
        k = d.dataset.cnumber || 6,
        q = d.dataset.csnippet || 50,
        e = document.createElement("script");
    e.src = g + "/feeds/comments/default?alt=json-in-script&callback=recentCmts&max-results=" + k;
    document.body.appendChild(e);
    return function(e) {
        for (var h = 0, l; h < k && (l = e.feed.entry[h]); h++) {
            var g = d,
                r = d.innerHTML,
                b = l,
                c = b.author[0],
                m = c.name.$t,
                f =
                b.content;
            var a = b.summary;
            f = (f ? f.$t : a.$t).replace(/<[^>]*>?/g, "").substring(0, q) + "...";
            c = c.gd$image;
            c = (c.src.includes("g/blank.gif") || c.src.includes("g/b16-rounded.gif") ? p : c.src).replace(/s\B\d{2,4}/, "s80");
            a: {
                for (a = 0; a < b.link.length; a++) {
                    var n = b.link[a];
                    if ("alternate" === n.rel) {
                        a = n.href;
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
            g.innerHTML = r + ('<div class="wjs-cmts__card"><div class="wjs-cmts__card-content"><a href="' +
                a + '" class="wjs-cmts__image"><img src="' + c + '" alt="' + m + '" /></a><div class="wjs-cmts__data"><h3 class="wjs-cmts__title"><a href="' + a + '">' + m + '</a><span class="wjs-cmts__date">' + b + '</span></h3><p class="wjs-cmts__snippet">' + f + "</p></div></div></div>")
        }
    }
}();