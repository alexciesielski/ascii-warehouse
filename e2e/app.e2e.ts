import { XteamPage } from './app.po';

describe('xteam App', function() {
  let page: XteamPage;

  beforeEach(() => {
    page = new XteamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('xteam works!');
  });
});
