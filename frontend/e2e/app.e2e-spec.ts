import { KaudioPage } from './app.po';

describe('kaudio App', function() {
  let page: KaudioPage;

  beforeEach(() => {
    page = new KaudioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
