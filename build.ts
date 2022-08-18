// Copyright (C) 2022 Katsute <https://github.com/Katsute>

import * as fs from "fs";
import * as path from "path";

import { zip } from 'zip-a-folder';

class Main {

    public static async main(): Promise<void> {
        const src : string = path.join(__dirname, "src");
        const dist: string = path.join(__dirname, "dist");

        const chrome : string = path.join(__dirname, "chrome.zip");
        const firefox: string = path.join(__dirname, "firefox.zip");

        /* clear dist */ {
            if(fs.existsSync(dist))
                for(const file of fs.readdirSync(dist))
                    fs.unlinkSync(path.join(dist, file));
            else
                fs.mkdirSync(dist);

            !fs.existsSync(chrome) || fs.unlinkSync(chrome);
            !fs.existsSync(firefox) || fs.unlinkSync(firefox);
        }

        /* copy src to zip */ {
            for(const file of fs.readdirSync(src))
                fs.copyFileSync(path.join(src, file), path.join(dist, file));
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
            for(const file of fs.readdirSync(dist))
                fs.unlinkSync(path.join(dist, file));
            fs.rmdirSync(dist);
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