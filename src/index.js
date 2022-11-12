/* Copyright (C) 2022 Katsute <https://github.com/Katsute> */

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

    if(window.location.pathname.toLowerCase().includes("/projects/"))
        whenElementAdded(`#__primerPortalRoot__`, (e) => {
            e.addEventListener("DOMNodeInserted", (i) => {
                let svg;
                if(svg = i.target.querySelector("figure > span > svg"))
                    svg.querySelector(`path[d="M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z"]`).parentElement.parentElement.classList.add("rissue-closed-bg");
            });
        });

    if(window.location.pathname.toLowerCase() === "/search"){
        const apply = (e) => {
            for(const path of e.querySelectorAll(`path[d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM0 8a8 8 0 1116 0A8 8 0 010 8zm11.78-1.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"]`))
                path.parentElement.classList.add("rissue-closed-fg");
        };

        whenElementAdded(`react-app[app-name="blackbird-search"]`, (e) => {
            apply(e);

            e.addEventListener("DOMNodeInserted", (i) => i.target.querySelector("[style]") && apply(e));
        });
    }
})();