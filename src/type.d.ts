declare interface Window {
  electronAPI: {
    startCrawler: (url: string) => Promise<string[]>;
  };
}