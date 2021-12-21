import fs from "fs";
import path from "path";

import { zip } from 'zip-a-folder';

class Main {

    public static async main(): Promise<void> {
        const src : string = path.join(__dirname, "src");
        const dist: string = path.join(__dirname, "dist");

        // clear directory
        if(fs.existsSync(dist))
            for(const file of fs.readdirSync(dist))
                fs.unlinkSync(path.join(dist, file));

        // copy src to dist
        for(const file of fs.readdirSync(src))
            fs.copyFileSync(path.join(src, file), path.join(dist, file));

        // zip chrome extension
        await zip(dist, path.join(__dirname, "chrome.zip"));

        // downgrade manifest for firefox
        fs.writeFileSync(path.join(dist, "manifest.json"),
            fs.readFileSync(path.join(dist, "manifest.json"), "utf-8")
                .replace(`"manifest_version": 3`, `"manifest_version": 2`));

        // zip firefox add-on
        await zip(dist, path.join(__dirname, "firefox.zip"));

        // cleanup
        for(const file of fs.readdirSync(dist))
            fs.unlinkSync(path.join(dist, file));
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