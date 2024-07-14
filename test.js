const puppeteer = require("puppeteer");

const URL = "https://github.com/KatsuteDev/GitHub-Red-Issues";

const variables = [
    `--bgColor-closed-emphasis`,
    `--fgColor-closed`,
    `--bgColor-closed-muted`,
];

const selectors = [

];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    let failed = false;

    for(const v of variables){
        if(
            await page.evaluate((v2) => {
                const style = getComputedStyle(document.documentElement);
                return style.getPropertyValue(v2) !== '';
            }, v)
        ){
            console.info('✅', v);
        }else{
            console.error('❌', v);
            failed = true;
        }
    }

    for(const s of selectors){
        try{
            await page.waitForSelector(s, { timeout: 5000 });
            console.info('✅', s);
        }catch(e){
            console.error('❌', s);
            failed = true;
        }
    }

    await browser.close();

    failed && process.exit(1);
})();