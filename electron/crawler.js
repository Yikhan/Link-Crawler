const { chromium } = require('playwright');

async function runCrawler(url) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  await browser.close();
  return [];
}

module.exports = { runCrawler };