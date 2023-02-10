// Copyright (C) 2023 Katsute <https://github.com/Katsute>

const fs = require("fs");
const path = require("path");

const zip = require("zip-a-folder").zip;

const src  = path.join(__dirname, "src");
const dist = path.join(__dirname, "dist");

const ext  = path.join(__dirname, "extension.zip");

(async () => {

})();

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
    for(const file of ["index.js", "style.css"])
        fs.writeFileSync(path.join(dist, file), fs.readFileSync(path.join(dist, file), "utf-8")
            .replace(/(?<!^)\/\*.*\*\//g, '') // /* comments (except first copyright)
            .replace(/ \/\/.*$/gm,'') // // comments
            .replace(/ +/gm, ' ') // extra spaces
            .replace(/^ +/gm, '') // leading space
            .replace(/\r?\n/gm, '') // new line
            .trim());
}

zip(dist, ext).then(() => {
    fs.rmSync(dist, {recursive: true});
});