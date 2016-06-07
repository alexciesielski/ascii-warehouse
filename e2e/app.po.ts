export class XteamPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('xteam-app h1')).getText();
  }
}
