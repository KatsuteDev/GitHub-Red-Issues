// Copyright (C) 2023 Katsute <https://github.com/Katsute>

const fs = require("fs");
const path = require("path");

const AdmZip = require("adm-zip");

const src  = path.join(__dirname, "src");
const dist = path.join(__dirname, "dist");

const ext  = path.join(__dirname, "extension.zip");

/* clear dist */ {
    if(fs.existsSync(dist))
        fs.rmSync(dist, {recursive: true});
    fs.mkdirSync(dist);

    !fs.existsSync(ext) || fs.rmSync(ext, {recursive: true});
}

/* copy src to zip */ {
    for(const file of fs.readdirSync(src))
        fs.copyFileSync(path.join(src, file), path.join(dist, file));
}

/* minify */ {
    for(const file of ["style.css"])
        fs.writeFileSync(path.join(dist, file), fs.readFileSync(path.join(dist, file), "utf-8")
            .replace(/(?<!^)\/\*.*\*\//g, '') // /* comments (except first copyright)
            .replace(/ \/\/.*$/gm,'') // // comments
            .replace(/ +/gm, ' ') // extra spaces
            .replace(/^ +/gm, '') // leading space
            .replace(/\r?\n/gm, '') // new line
            .trim());
}

const zip = new AdmZip();

zip.addLocalFolderPromise(dist)
   .then(() => zip.writeZip(ext))
   .then(() => fs.rmSync(dist, {recursive: true}));