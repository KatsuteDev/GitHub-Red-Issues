// Copyright (C) 2022 Katsute <https://github.com/Katsute>

"use strict";

if(window.location.pathname.includes("/projects/")){
    const init = setInterval(() => {
        const overlay = document.getElementById("__primerPortalRoot__");
        if(overlay != null){
            overlay.addEventListener("DOMNodeInserted", (e) => { // on element added
                if(e.target.tagName && e.target.tagName.toLowerCase() == "svg") // find svg
                    for(const child of e.target.children) // check if issue
                        if(child.getAttribute("d") == `M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z`)
                            return setInterval(() => {
                                e.target.parentElement.classList.add("rissue-closed-bg"); // apply css
                            }, 100); // must be delayed, GitHub keeps removing the class if we add immediately
            });
            clearInterval(init);
        }
    }, 1000 * 1); // repeat until overlay element exists
}