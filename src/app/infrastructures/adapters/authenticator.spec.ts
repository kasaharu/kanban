import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Authenticator } from './authenticator';

// NOTE: テスト用のダミーデータ
//       ref. https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md#3-add-firebase-config-to-environments-variable
const firebaseEnv = { apiKey: 'dummy', authDomain: '', databaseURL: '', projectId: '', storageBucket: '', messagingSenderId: '' };

describe('Authenticator', () => {
  let authenticator: Authenticator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(firebaseEnv)],
    });
    authenticator = TestBed.inject(Authenticator);
  });

  it('should be created', () => {
    expect(authenticator).toBeTruthy();
  });
});
