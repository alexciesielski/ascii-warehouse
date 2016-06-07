import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { XteamAppComponent } from '../app/xteam.component';

beforeEachProviders(() => [XteamAppComponent]);

describe('App: Xteam', () => {
  it('should create the app',
      inject([XteamAppComponent], (app: XteamAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'xteam works!\'',
      inject([XteamAppComponent], (app: XteamAppComponent) => {
    expect(app.title).toEqual('xteam works!');
  }));
});
