import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { DatabaseAdapter } from './database.adapter';

// NOTE: テスト用のダミーデータ
//       ref. https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
const firebase = { apiKey: 'dummy', authDomain: '', databaseURL: '', projectId: 'dummy-id', storageBucket: '', messagingSenderId: '' };

describe('DatabaseAdapter', () => {
  let adapter: DatabaseAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(firebase)],
    });
    adapter = TestBed.inject(DatabaseAdapter);
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });
});
