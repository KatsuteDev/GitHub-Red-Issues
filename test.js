const assert = require("assert");
const puppeteer = require("puppeteer");

(async () => {
    const URL = "https://github.com/KatsuteDev/GitHub-Red-Issues";

    // init puppeteer

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    // css
    const variables = [
        `--bgColor-closed-emphasis`,
        `--color-danger-emphasis`,
        `--fgColor-closed`,
        `--color-danger-fg`,
        `--bgColor-closed-muted`,
        `--color-danger-subtle`,
    ];

    // test

    const variableExists = async (v) => {
        return await page.evaluate((v2) => {
            const style = getComputedStyle(document.documentElement);
            return style.getPropertyValue(v2) !== '';
        }, v);
    };

    let failed = false;
    for(const v of variables){
        try{
            assert(await variableExists(v));
            console.info('✅', v);
        }catch(e){
            console.error('❌', v);
            failed = true;
        }
    }

    // selectors

    const selectorExists = async (selector) => {
        try{
            await page.waitForSelector(selector, { timeout: 5000 });
            return true;
        }catch(e){
            return false;
        }
    };

    const selectors = [

    ];

    // test

    for(const s of selectors){
        try{
            assert(await selectorExists(s));
            console.info('✅', s);
        }catch(e){
            console.error('❌', s);
            failed = true;
        }
    }

    // post

    await browser.close();

    failed && process.exit(1);
})();