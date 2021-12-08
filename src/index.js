// Copyright (C) 2021 Katsute <https://github.com/Katsute>

"use strict";

identifyTimelineMerge();

const interval = setInterval(identifyTimelineMerge, 1000);

// find merge
function identifyTimelineMerge(){
    for(let element of document.getElementsByClassName("TimelineItem-badge color-fg-on-emphasis color-bg-done-emphasis"))
        if(element.getElementsByTagName("svg")[0].classList.contains("octicon-git-merge"))
            element.classList.add("rissue-merge");
}