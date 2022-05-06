// Copyright (C) 2022 Katsute <https://github.com/Katsute>

"use strict";

if(window.location.pathname.includes("/projects/"))
    setInterval(updateProjects, 1000 * 1);

function updateProjects(){
    const paths = document.querySelectorAll(`path[d="M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z"]`);

    // sidebar
    for(const path of paths){
        if(path.parentElement.parentElement.tagName.toLowerCase() == "span"){
            path.parentElement.parentElement.classList.add("rissue-closed-bg");
            break;
        }
    }
}