---
layout: post
title:  "「自作ライブラリを削除しました」についての誤解"
date:   2017-01-04 10:51:38 +0900
categories: diary
---

このような記事があり、多くの反応を読んでいた。

[自作ライブラリを削除しました(記事は削除されてリンクは無効)](http://www.coppermine.jp/docs/promised/2017/01/closed-some-libraries.html)

この記事を読んでいる限りかなり無茶苦茶な主張をしているように見える。
が、さらに色々見ていくうちに自分は何か誤解しているのではないかと思った。
自分は記事の人とはなんの関係もないが、わかったことを書きのこしておく。

この記事を読んで、自分は
「OSSはオーナーがライセンスを変更すればいつでもクローズドにできる。
使ったらライセンス料をいただく」
というふうに読み取った。

さらにそこから、ライセンスは後から取り消せばそれが過去のものにも遡って適用されるというようなめちゃくちゃな主張をしているように読み取れた。
実際にそう解釈したのだろう人が自分以外にもかなり見つかる。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">ライセンスを変更しても、BSDライセンスでライブラリを取得した人が再配布することは防げないはず。OSSライセンス怖い。<br>&quot;「一度オープンソースにしたら止められない」なんて寝言、誰が言ったのですか？&quot;<br>自作ライブラリを削除しました<a href="https://t.co/87iRsKxEQs">https://t.co/87iRsKxEQs</a></p>&mdash; kusanoさん@がんばらない (@kusano_k) <a href="https://twitter.com/kusano_k/status/816119824791109632">2017年1月3日</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://t.co/OLFVb04LSd">https://t.co/OLFVb04LSd</a> 勘違いしている人多いけど、契約内容について片方が一方的に廃止したところで、古い契約は無効にはならないのでありました。</p>&mdash; Denullpo S.Hammerson (@denullpo) <a href="https://twitter.com/denullpo/status/816302546453024768">2017年1月3日</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">過去にBSDLでライセンスされてたバージョンをforkすればいいだけだな / で poortoys とか coppermine.jp とか書かれてるものは避けときましょうって話? / “自作ライブラリを削除しました - Prom…” <a href="https://t.co/3zv9vat6uD">https://t.co/3zv9vat6uD</a></p>&mdash; tagomoris (@tagomoris) <a href="https://twitter.com/tagomoris/status/816310366376296452">2017年1月3日</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">この人は公開後コピーされたソフトのライセンスと、手元の物理コピーの区別が付いていないのではないか。<br><br>自作ライブラリを削除しました <a href="https://t.co/dzv54W5c3c">https://t.co/dzv54W5c3c</a></p>&mdash; 酔漢@ニャー将棋 (@suikan_blackfin) <a href="https://twitter.com/suikan_blackfin/status/816141850566266881">2017年1月3日</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

おそらくそれで炎上しているのだと思うのだが、記事を書いた本人のTwitterを見にいくとこのような発言があった。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">オープンだった時代に公開されていたコードはどうなるんですか…? <a href="https://t.co/b0iKvWIqYL">https://t.co/b0iKvWIqYL</a></p>&mdash; 優衣唄 (@YuikaSS) <a href="https://twitter.com/YuikaSS/status/816131871797035008">2017年1月3日</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/YuikaSS">@YuikaSS</a> 手元にあればOSS時代のライセンスが有効です。あくまで手元にあれば、の話ですが。例：OpenIndiana</p>&mdash; HASUNUMA Kenji (@khasunuma) <a href="https://twitter.com/khasunuma/status/816137137129070592">2017年1月3日</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

つまり、本人にはそのようなことを主張する意思はなかったのだ。
ライセンスを過去のバージョンまで遡って変更することはできないため、OSSでは誰か一人でも過去のバージョンのソースコードのコピーを持っていればそこから今まで通り開発を進められる。
逆にいうと誰もソースコードを持っていなかった場合オーナーが非公開にすれば何もできなくなる。
この記事ではどうもそういう場合の話をしてそれを「オープンソースのリスク」と呼んでいたようだ。
そう解釈すればこれはただバックアップを取らないと大変な事になるよという話になり、そんなにめちゃくちゃな主張はしていないという事になる。

しかしソースコードを自分で持っていないとそれを人質にとられる可能性があるというのは別にOSSに限らない。
それを「オープンソースのリスク」と呼ぶのは違和感があるので、この解釈も間違っているかもしれない。

どうも何かいざこざがあった結果怒って書いた記事のようなので、少し感情的で不正確な部分があるということかもしれない。
だとしたら、その結果大きな誤解を受けている。
感情に任せて書いた文章は大抵うまく伝わらないので記事を書くときは冷静になって誤解を受けない表現を心がけなければならない。
また、読み手も最終的に出てきたものだけを見て判断せずに、物事の流れや前提を確認する努力をしなくてはならないだろう。

どうもTwitterで自殺をほのめかして、親しい人も連絡が取れないらしい。
自分はなにか公開したもので誤解を受けたなら、公開した人はその誤解を解くために説明する責任があると考えている。
ぜひもう一度出てきて、本当は何を言いたかったのか教えて欲しい。