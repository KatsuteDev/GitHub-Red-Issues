const puppeteer = require("puppeteer");

const URL = "https://github.com/KatsuteDev/GitHub-Red-Issues";

const variables = [
    `--bgColor-closed-emphasis`,
    `--fgColor-closed`,
    `--bgColor-closed-muted`,
];

const tests = {
    "https://github.com/KatsuteDev/GitHub-Red-Issues/issues/5": [
        `svg.octicon-issue-closed`,
        `svg.octicon-discussion-closed`,
        `.octicon-checklist.color-fg-done`,
        `span.State--merged:has(svg.octicon-issue-closed)`,
        `.TimelineItem-badge:has(svg.octicon-issue-closed)`,
        // removed?
        // `.TimelineItem-badge:has(svg.octicon-discussion-closed)`,
        `tasklist-block-title > div.color-bg-done`,
        `tracked-issues-progress svg > circle[stroke^="var(--fgColor-done"]:last-child`,
        `span > svg[data-target="tracked-issues-progress.progress"] > path`,
    ],

    "https://github.com/KatsuteDev/GitHub-Red-Issues/issues?q=is%3Aissue+is%3Aclosed": [
        `svg.octicon-issue-closed`,
    ],
    "https://github.com/KatsuteDev/GitHub-Red-Issues/discussions/90": [
        `span.State--merged:has(svg.octicon-discussion-closed)`,
    ],
    "https://github.com/search?q=repo%3AKatsuteDev%2FGitHub-Red-Issues+issue&type=issues": [
        `svg:has(path[d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"])`
    ],
    "https://github.com/search?q=repo%3AKatsuteDev%2FGitHub-Red-Issues&type=pullrequests": [
        `svg:has(path[d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"])`
    ],
    "https://github.com/orgs/github/projects/4247/views/2?pane=issue&itemId=35503395": [
        `svg:has(path[d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"] + path[d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"])`,
        `projects-v2 span[class^="StateLabel__StateLabelBase"]:has(path[d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"] + path[d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"])`,
        // not visible when signed out
        // `projects-v2 .TimelineItem-Badge:has(path[d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"])`,
    ]
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 3000,
        height: 2000
    });
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

    for(const [url, selectors] of Object.entries(tests)){
        await page.goto(url);
        for(const s of selectors){
            try{
                await page.waitForSelector(s, { timeout: 5000 });
                console.info('✅', s);
            }catch(e){
                console.error('❌', s);
                failed = true;
            }
        }
    }

    await browser.close();

    failed && process.exit(1);
})();