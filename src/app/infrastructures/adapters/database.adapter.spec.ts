import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { DatabaseAdapter } from './database.adapter';

// NOTE: テスト用のダミーデータ
//       ref. https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
const firebase = { apiKey: 'dummy', authDomain: '', databaseURL: '', projectId: 'knbn-board', storageBucket: '', messagingSenderId: '' };

// NOTE: テストが不安定なので disable にしている
//       タイミングによって projectId が設定されていないというエラーがでる
xdescribe('DatabaseAdapter', () => {
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
