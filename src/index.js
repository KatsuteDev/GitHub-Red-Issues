// Copyright (C) 2022 Katsute <https://github.com/Katsute>

"use strict";

const whenElementAdded = (selector, f) => {
    const init = setInterval(() => {
        const e = document.querySelector(selector);
        if(e != null){
            f(e);
            clearInterval(init);
        }
    }, 1000 * 1);
}

if(window.location.pathname.toLowerCase().includes("/projects/"))
    whenElementAdded(`#__primerPortalRoot__`, (e) => {
        e.addEventListener("DOMNodeInserted", (i) => {
            if(i.target.tagName && i.target.tagName.toLowerCase() == "svg") // find svg
                for(const child of i.target.children) // check svg content
                    if(child.getAttribute("d") == "M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z") // checkmark
                        setTimeout(() => {
                            i.target.parentElement.classList.add("rissue-closed-bg"); // apply css
                        }, 100); // doesn't work unless we delay
        });
    });