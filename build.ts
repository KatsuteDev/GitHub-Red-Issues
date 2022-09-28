// Copyright (C) 2022 Katsute <https://github.com/Katsute>

import * as fs from "fs";
import * as path from "path";

import { zip } from "zip-a-folder";

abstract class Main {

    public static async main(): Promise<void> {
        const src : string = path.join(__dirname, "src");
        const dist: string = path.join(__dirname, "dist");

        const chrome : string = path.join(__dirname, "chrome.zip");
        const firefox: string = path.join(__dirname, "firefox.zip");

        /* clear dist */ {
            if(fs.existsSync(dist))
                fs.rmSync(dist, {recursive: true});
            fs.mkdirSync(dist);

            !fs.existsSync(chrome) || fs.rmSync(chrome, {recursive: true});
            !fs.existsSync(firefox) || fs.rmSync(firefox, {recursive: true});
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
                    .trim())
        }

        /* chrome */ {
            await zip(dist, chrome);
        }

        /* firefox */ {
            // downgrade manifest
            const manifest: string = path.join(dist, "manifest.json");

            fs.writeFileSync(manifest,
                fs.readFileSync(manifest, "utf-8")
                    .replace(`"manifest_version": 3`, `"manifest_version": 2`));

            // zip firefox add-on
            await zip(dist, firefox);
        }

        /* cleanup */ {
            fs.rmSync(dist, {recursive: true});
        }
    }

}

process.on("unhandledRejection", (error: Error, promise: any) => {
    console.error(`Unhandled rejection at:\n  Promise ${promise}\n  ${error.stack}`);
    process.exit(-1);
});

Main.main().catch((error: Error) => {
    console.error(error.stack!);
    process.exit(-1);
});