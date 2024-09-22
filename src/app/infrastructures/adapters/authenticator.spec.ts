import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from '@firebase/auth';
import { Authenticator } from './authenticator';

// NOTE: テスト用のダミーデータ
//       ref. https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md#3-add-firebase-config-to-environments-variable
const firebaseEnv = { apiKey: 'dummy', authDomain: '', databaseURL: '', projectId: '', storageBucket: '', messagingSenderId: '' };

// FIXME: 動くようにする
xdescribe('Authenticator', () => {
  let authenticator: Authenticator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideFirebaseApp(() => initializeApp(firebaseEnv)), provideAuth(() => getAuth())],
    });
    authenticator = TestBed.inject(Authenticator);
  });

  it('should be created', () => {
    expect(authenticator).toBeTruthy();
  });
});
