# AviUtl Markdown+ EX

[aviutl_browser](https://github.com/oov/aviutl_browser) を使って AviUtl で
Markdown を表示するスクリプト。

かろてら様の [MarkdownEX](https://github.com/karoterra/aviutl-markdownex) を元に少し改変したものです。

## 主な機能

- Markdownの表示
- 数式の表示
- 絵文字の表示

## MarkdownEX との違い

- 数式のレンダリングを `MathJaX` から `KaTeX` に変更
- `LaTeX` マクロを追加する仕組みを導入
- 独自の Markdown 記法を追加できる仕組みを導入

## 導入方法

0. aviutl_browser をまだ導入していない場合は先に導入してください。
1. [Releases](https://github.com/Totti95U/aviutl-markdown-plus-ex/releases)
   から最新版のZIPファイルをダウンロードしてください。
2. ZIPファイルを展開し、`script` フォルダを拡張編集の `script` フォルダと統合してください。

## 使い方

### Markdownの表示
`script/browser/Markdown+EX.exa` を拡張編集タイムラインに D&D するか、カスタムオブジェクト
`Markdown+EX.obj` に設定ダイアログから Markdown を記述したファイルのパスを指定してください。
ファイルを指定して表示する場合は UTF-8 で保存されたファイルを指定してください。

`Markdown+EX.exa` を `exedit.auf` と同じフォルダか、同じフォルダに作ったフォルダ内に移動させておくとタイムラインの右クリックから利用できます。

トラックバーの`幅`と`高さ`からはページの幅と高さ、`拡大率`からはページの拡大率(`style.zoom`)を設定できます。

設定ダイアログの `Markdown` からは Markdown の表示に使用するスタイルを指定できます。
`contents/Markdown+EX/css/markdown` フォルダ内にある CSS ファイルから使用したいファイルを選択してください。

設定ダイアログの`ハイライト`からはコードブロックのハイライトに使用するスタイルを指定できます。
`contents/Markdown+EX/css/hljs` フォルダ内にある CSS ファイルから使用したいファイルを選択してください。

### 数式の表示
[KaTeX](https://katex.org)
を使用して数式を描画することができます。

インライン形式の例
```
$a + b$ あるいは \\(a + b\\)
```

ブロック形式の例
```
$$
a + b
$$
または
\\[
a + b
\\]
もしくは
\\begin{align}
a + b
\\end{align}
など
```

### 絵文字の表示
aviutl_browser は Chromium でレンダリングした HTML ページを AviUtl で表示します。
そのため `&#x1f364;` の様に実体参照で書けば絵文字を表示(この場合🍤)することができます。
ファイルを指定して表示する場合は、ファイルに直接絵文字が書いてあっても表示できます。
これらの入力方法で表示される絵文字は使用するフォントに組み込まれているものです。

また、 `:fried_shrimp:` の様にキーワードをコロンで囲むことでも絵文字を表示することができます。
この場合はキーワードに対応する画像を表示します。
デフォルトでは `contents/Markdown+EX/img/default` フォルダ内にある画像を表示します。
キーワードと画像の対応は `default` フォルダ内にある `setting.json` 内で
`"キーワード": "画像ファイル名"` という形で定義されています。
画像を追加したい場合はこのフォルダ内に画像を追加し、 `setting.json` にキーワードを追記してください。
キーワードとして使用できる文字は半角英数字と記号 `-+_` です。
また、 `img` フォルダ内に新しく作ったフォルダ内に画像ファイルと `setting.json`
を保存することで別の絵文字セットを作ることもできます。
使用する絵文字セットを変更する際は、設定ダイアログの`絵文字`から使用したい絵文字セットのフォルダ名を指定してください。

## LaTeX マクロの追加
`contents/Markdown+EX/index.html` の40行目、`const katex_options = {` から63行目までには数式に関するオプションが書いてあります。
その中の54行目 `"macros" : {` から 58行目までが LaTeX マクロに関する項目です。
`"macros" : { "\\Q" : "\\mathbb Q", "\\C" : "\\mathbb C" }` のように `"コマンド名" : "定義式"` という形を列挙していきます。
`"\\map" : "#1 \\colon #2 \\to #3"` のように引数を取るコマンドも定義可能です。
より詳しくは https://katex.org/docs/options.html を参照してください。

## 独自記法の追加
`contents/Markdown+EX/self-extensions.js` を弄ることでオリジナルの記法を導入できます。
独自記法の例として Markdown+ EX では最初から `[` と `]` で囲った部分にマーカーが引かれる機能が追加されています。
独自記法追加の詳細については `self-extensions.js` 内のコメントや https://marked.js.org/using_pro を参照してください。

## 補助モジュール

シーンオブジェクトで参照している先のシーンと現在のシーンにおいて Markdown+EX
が同じレイヤーにあると処理が少し重くなります
(例えば Root と Scene 1 それぞれのLayer 1 に Markdown+EX が置いてあり、
Root から Scene 1 を参照する場合)。
これは rikky 氏の rikky_module を導入してあれば軽減することができます。
必須ではありませんが複数のシーンで本スクリプトを使用する場合は rikky_module
を導入しておくことをおすすめします。

## 更新履歴

更新履歴は [CHANGELOG](CHANGELOG.md) を参照してください。

## ライセンス

このソフトウェアは MIT ライセンスのもとで公開されます。
詳細は [LICENSE](LICENSE) を参照してください。

## クレジット

使用したライブラリ等については [CREDITS](CREDITS.md) を参照してください。
