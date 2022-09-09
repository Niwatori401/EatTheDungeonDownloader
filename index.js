import scrape from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';

const args = process.argv.slice(2);

var locationToSaveAt = args[0] + "\EatTheDungeon";

console.log("Saving to: ", locationToSaveAt);

const options = {
    urls: ['https://bewilderedgames.com/'],
    directory: locationToSaveAt,
    plugins: [ 
      new PuppeteerPlugin({
        launchOptions: { headless: false, timeout: 999999 },
        scrollToBottom: { timeout: 10000, viewportN: 10 },
        blockNavigation: true,
      })
    ]
};

await scrape(options);
