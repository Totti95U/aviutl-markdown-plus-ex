// 独自の markdown 記法を追加するためのファイルです

// 例えば
// - `[` と `]` で囲んだ文字に赤マーカーが引かれる
// - `%` で囲った数式は計算された値が表示される (`% 2 + 4 %`と打つと `6` が出力されるなど)
// といったものが作れます

// 他にも使う記号の変更などができます
//詳しくは https://marked.js.org/using_pro を参照してください

// また、このファイルを弄る場合は 正規表現 および javascript の exec() について調べることをおススメします

// `[` と `]` で囲むとマーカーが引かれるやつ
const color = {
    name: 'color', // 機能の名前です
    level: 'inline', // inline か block が選べます

    // 追加する記法を探す手掛かりとなるワードを入れます (今回は終端の `]`)
    start(src) { return src.match(/\]/)?.index; },

    // tokenizer で記法が使われている場所を探します
    tokenizer(src, tokens){
        // 記法のルールを正規表現で定めます
        // TeX と干渉しないように `[` の直後、もしくは `]` の直前に
        // スペースがある場合は除外することをおススメします (e.g. `[test]` は ok, `[ test]` は ng.)
        const rule = /^(\[+)(?!\s)([^\[\]\n]*?)(?<!\s)(\]+)/;
        const match = rule.exec(src);

        // 記法が使われている場所を発見した時の処理を書きます
        if (match) {
            // [], [[]], [[[]]], ... それぞれで別の色を付けるための準備
            brl = match[1].length;
            brr = match[3].length;
            brd = brr-brl;

            brl_text = '['.repeat(Math.max(0, -brd));
            brr_text = ']'.repeat(Math.max(0, brd));

            // token のプロパティを設定する
            return {
                type: 'color', // name と同じもの推奨
                raw: match[0],
                level: Math.min(brl, brr), // 色を変えるための数値
                text: this.lexer.inlineTokens(brl_text + match[2] + brr_text) // 表示したい文字列
            };
        }
    },
    // 記法があった場所にどのような html を記述するかを指定する
    // 今回の場合 `[test]` は `<span class=mark1>test</span>` のようになる
    renderer(token){
        // tokenizer を `[` `]` 内の文字列に対しても走らせたい場合はこのファイルのように
        //  - token のプロパティに this.lexer.inlineTokens() を
        //  - そのプロパティに this.parser.parseInline() を
        // 使う必要がある
        return `<span class="mark${token.level}">${this.parser.parseInline(token.text)}</span>`;
    },
    // さらに markdown の tokenizer が走るものを設定
    // これにより `[**test**]` は色付き太字の `test` になる
    // (設定しないと 色付きの `**test**` が出力される)
    childTokens : [ 'text' ]
};

// 独自記法を使うように設定する
// (独自記法、例えば calc を追加する場合は [color, calc,...] のようにしてください)
marked.use({ extensions: [color] });