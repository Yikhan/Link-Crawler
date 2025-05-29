// electron/crawler.ts
import { chromium } from 'playwright';

export async function runCrawler(url: string): Promise<string[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const links = await page.$$eval('a', (as) =>
    as.map((a) => a.href).filter((href) => href.includes('wayshare'))
  );

  await browser.close();
  return links;
}
