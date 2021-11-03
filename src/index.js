// Copyright (C) 2021 Katsute <https://github.com/Katsute>

"use strict";

identifyTimelineMerge();

// run for 30s in case the site hasn't loaded yet
let loop = 0;
const interval = setInterval(() => {
    identifyTimelineMerge();
    if(loop++ >= 30)
        clearInterval(this);
}, 1000);

// find merge
function identifyTimelineMerge(){
    for(let element of document.getElementsByClassName("TimelineItem-badge color-fg-on-emphasis color-bg-done-emphasis"))
        if(element.getElementsByTagName("svg")[0].classList.contains("octicon-git-merge"))
            element.classList.add("rcie-merge");
}