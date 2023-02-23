/* Copyright (C) 2023 Katsute <https://github.com/Katsute> */

"use strict";

(() => {
    const whenElementAdded = (selector, f) => {
        const init = setInterval(() => {
            const e = document.querySelector(selector);
            if(e != null){
                f(e);
                clearInterval(init);
            };
        }, 1000 * 1);
    };

    const init = () => {
        if(window.location.pathname.toLowerCase().includes("/projects/"))
            whenElementAdded("#__primerPortalRoot__", (e) => {
                e.addEventListener("DOMNodeInserted", (i) => {
                    let svg;
                    if(i.target.querySelector && (svg = i.target.querySelector("figure > span > svg"))){
                        let path = svg.querySelector(`path[d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"]`);
                        path && path.parentElement.parentElement.classList.add("rissue-closed-bg");
                    };
                });
            });

        if(window.location.pathname.toLowerCase() === "/search"){
            const apply = (e) => {
                for(const path of e.querySelectorAll(`path[d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"]`))
                    path.parentElement.classList.add("rissue-closed-fg");
            };

            whenElementAdded(`react-app[app-name="blackbird-search"]`, (e) => {
                apply(e);
                e.addEventListener("DOMNodeInserted", (i) => i.target.querySelector && i.target.querySelector("[style]") && apply(e));
            });
        };
    };

    init();
    window.addEventListener("popstate", init);
})();