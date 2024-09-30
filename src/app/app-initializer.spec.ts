import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppInitializer } from './app-initializer';
import { Authenticator } from './infrastructures/adapters/authenticator';
import { userFactory } from './testing/factories';

describe('AppInitializer', () => {
  it('store から initialState が取得できること', () => {
    const authenticator = { loggedInUser$: of(null) };
    TestBed.configureTestingModule({
      providers: [{ provide: Authenticator, useValue: authenticator }],
    });

    const store = TestBed.inject(AppInitializer);

    expect(store.loggedInUser()).toBeNull();
    expect(store.readyApp()).toBe(false);
  });

  describe('initialize が呼ばれたとき、', () => {
    const dummyUser = userFactory({});

    beforeEach(() => {
      const authenticator = { loggedInUser$: of(dummyUser) };
      TestBed.configureTestingModule({
        providers: [{ provide: Authenticator, useValue: authenticator }],
      });
    });

    it('loggedInUser が non null であること', async () => {
      const store = TestBed.inject(AppInitializer);
      await store.initialize();

      expect(store.loggedInUser()).toEqual(dummyUser);
    });

    it('readyApp が true であること', async () => {
      const store = TestBed.inject(AppInitializer);
      await store.initialize();

      expect(store.readyApp()).toBe(true);
    });

    it('loggedIn が true であること', async () => {
      const store = TestBed.inject(AppInitializer);
      await store.initialize();

      expect(store.loggedIn()).toBe(true);
    });
  });

  describe('login が呼ばれたとき、', () => {
    const dummyUser = userFactory({});

    beforeEach(() => {
      const authenticator = { login: () => Promise.resolve({ user: dummyUser }) };
      TestBed.configureTestingModule({
        providers: [{ provide: Authenticator, useValue: authenticator }],
      });
    });

    it('loggedInUser が non null であること', async () => {
      const store = TestBed.inject(AppInitializer);
      await store.login();

      expect(store.loggedInUser()).toEqual(dummyUser);
    });
  });

  describe('logout が呼ばれたとき、', () => {
    beforeEach(() => {
      const authenticator = { logout: () => Promise.resolve() };
      TestBed.configureTestingModule({
        providers: [{ provide: Authenticator, useValue: authenticator }],
      });
    });

    it('loggedInUser が null であること', async () => {
      const store = TestBed.inject(AppInitializer);
      await store.logout();

      expect(store.loggedInUser()).toBeNull();
    });
  });
});
