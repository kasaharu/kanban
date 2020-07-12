# NgBasis

![](https://github.com/kasaharu/kanban/workflows/Node%20CI/badge.svg)

## 使い方

- [テンプレートからリポジトリを作成する](https://help.github.com/ja/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) に書かれている手順で template からリポジトリを作成
- リポジトリが作成されたら以下の手順で clone から deploy までを実施

  ```shell
  $ git clone [the-repositoryname]
  $ cd [the-repositoryname]
  $ yarn
  $ yarn ng deploy --base-href=/[the-repositoryname]/
  ```

- デプロイ完了後 `https://[your-username].github.io/[the-repositoryname]` にアクセスするとページが表示される

## 各種バージョン

- [package.json](./package.json) 参照

## Formatter & Linter

- [Prettier](https://prettier.io/)
- [TSLint](https://palantir.github.io/tslint/)
- [stylelint](https://stylelint.io/)

## CI & CD

- [CircleCI](https://circleci.com/)
- [GitHub Pages](https://help.github.com/ja/github/working-with-github-pages)
- [Renovate](https://renovate.whitesourcesoftware.com/)

# Custom Schematics

- @kasaharu/ng-schematics パッケージを使って Custom Schematics が使える
- 下記のコマンドを実行することで使用できる

```shell
$ yarn ng-schematics ngrx-store --name features/store/hello
```
