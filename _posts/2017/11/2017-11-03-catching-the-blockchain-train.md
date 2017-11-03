---
layout: post
title: "まだ間に合うブロックチェーン【翻訳】"
tags: blockchain-train-journal tech translation bitcoin
excerpt: これはブロックチェーンの列車に(ほとんど)乗り遅れてしまったテッキーのためのブログです。うむ、the blockchain train って良いですね、歌を書かなければ！
---

この記事は、
[Catching the Blockchain Train](http://decentralized.blog/catching-the-blockchain-train.html)
を自分用に翻訳したものを
[許可を得て](https://twitter.com/pors/status/925987521078743040)
公開するものである。

ソース中にコメントの形で原文を残している。
内容が理解できる程度のざっくりした翻訳であり誤字や誤訳などが多いので、気になったら
[Pull request](https://github.com/{{ site.github.repository_nwo }}/edit/{{ site.branch }}/{{ page.path }})だ!

---

<!-- # [Catching the Blockchain Train](http://decentralized.blog/catching-the-blockchain-train.html) -->

<!-- ## What is this and for who? -->

### これは何？誰のためのもの？

<!-- This is a blog for techies who (almost) missed the blockchain train. Hmm, I also need to write a song "the blockchain train," it just sounds so good! -->

これはブロックチェーンの列車に(ほとんど)乗り遅れてしまったテッキーのためのブログです。
うむ、"the blockchain train“って良いですね、歌を書かなければ！

<!-- I'm a bit late to the blockchain/Bitcoin party, and when you made it past the previous line I assume you are too! -->

私はブロックチェーン/Bitcoinに少々乗り遅れてしまいました。
そしてあなたもそうだと思います！

<!-- No worries, there is still plenty of time to add blockchain technology to your skillset. I am confident that what we see happening now is just the very beginning of a decentralized Internet. So even though we feel we are late, we can still catch the blockchain train. Especially because you and I are pretty smart! Right? -->

心配しないでも時間は十分あります。
私は今起きていることは非中央集権型インターネットの始まりだと思っています。
乗り遅れたと思っても、まだ飛び乗ることは可能です。
特に私たちは賢いので！ですよね？

<!-- My approach to educating myself is two-fold: -->

私の学習アプローチは2つに集約されます:

<!-- *   First by reading as much as I can about the blockchain, Bitcoin, smart contracts, Ethereum, dapps, ipfs, and all of that. -->

- まずブロックチェーン、Bitcoin、スマートコントラクト、Ethereum、dapps、ipfs、などすべてについて調べ読みまくります

<!-- *   In parallel, I want to apply what I learn by turning this blog into a decentralized app (dapp) as much as possible. I will work in "naive mode" and start building and using technologies I found on my path, and backtrack (you know, refactor) when I see it was the wrong approach. -->

- 同時に、このブログを非中央集権型アプリケーション(dapp)に近づけるよう学んだことを適用していきます。
  私は「影響されやすいモード」で作業し道中見つけたテクノロジーを使用、構築し、間違ったようならバックトラック(リファクタ)します。

<!-- The code will, of course, be open source and available here: [blockchaintrain](https://github.com/blockchaintrain/blog). -->

コードはもちろんオープンソースで、こちらから利用できます:  [blockchaintrain](https://github.com/blockchaintrain/blog)

<!-- BTW this is not a tutorial; it's just a journal of my activities. -->

ところでこれはチュートリアルではありません。ただの活動記録です。

<!-- ## What I'm reading -->

### 読んでいるもの

<!-- I'm reading three books in parallel right now (next to the online article here and there): -->

現在私は3つの書籍を同時に読んでいます(オンライン記事はこちらです):

<!-- 1.  [Mastering Bitcoin: Programming the Open Blockchain](https://www.goodreads.com/book/show/35432045-mastering-bitcoin): a thorough technical introduction into the world of Bitcoin. I got stuck halfway when I read it a couple of years ago. This time I mean to finish it. -->

1.  [Mastering Bitcoin: Programming the Open Blockchain](https://www.goodreads.com/book/show/35432045-mastering-bitcoin):
  Bitcoinの世界への徹底したテクニカルイントロダクションです。
  私が数年前に読んだときは挫折しました。
  今回は終わらせようと思います。

<!-- 2.  [Blockchain for dummies](https://www.goodreads.com/book/show/34890064-blockchain-for-dummies-for-dummies): yeah, I know... -->

2.  [Blockchain for dummies](https://www.goodreads.com/book/show/34890064-blockchain-for-dummies-for-dummies): yeah, I know...

<!-- 3.  [Decentralized Applications: Harnessing Bitcoin's Blockchain Technology](https://www.goodreads.com/book/show/26457167-decentralized-applications): not very well received, but I like it so far. -->

3.  [Decentralized Applications: Harnessing Bitcoin's Blockchain Technology](https://www.goodreads.com/book/show/26457167-decentralized-applications):
  よく理解できていませんが、好きです。

<!-- I'll keep you updated on other books or articles I read. -->

他に読んだ本や記事についても更新していきます。

<!-- ## Decentralized blog design part 1 -->

### 非中央集権型ブログデザインその1

<!-- The first version of this blog (you're reading it now) is a statically generated blog with [Pelican](https://github.com/getpelican/pelican)*, and I uploaded the files to my server with SSH. -->

このブログの最初のバージョン(今読んでいるものです)は[Pelican](https://github.com/getpelican/pelican)で静的に生成されたものであり[^1]、ファイルをSSHでサーバにアップロードしています。

<!-- So my progress towards a fully decentralized blog is 0/100! -->

つまり完全非中央集権型ブログへの進捗は0/100です！

<!-- Excellent! That means there is still a lot to discover. -->

素晴らしい！発見の余地がたくさんあるということです。

<!-- In the next article, I will describe how I made a first step: load the content of the blog from a decentralized file system. -->

次の記事では、最初のステップについて書こうと思います: ブログのコンテンツを非中央集権型ファイルシステムにロードします。

<!-- *: if you don't like Python, you can use Hugo (Go) or Jekyll (Ruby) or [any one of these](https://www.netlify.com/blog/2017/05/25/top-ten-static-site-generators-of-2017/). Let me know if you follow along with a different site generator, and I'll add it to this blog. -->

[^1]: もしPythonが嫌いならば、Hugo (Go)やJekyll (Ruby)や[その他様々なものを使うことができます](https://www.netlify.com/blog/2017/05/25/top-ten-static-site-generators-of-2017/)。
  違うサイトジェネレータを使ったなら、教えていただければこのブログに追記します。

<!-- ## What can you expect in the next episodes? -->

### この後はどんな話が聞けるの？

<!-- *   Using a decentralized file system
*   From static pages to dynamic content (so from files to a dapp)
*   Supporting identity
*   Introduction of colored coins or sidechains or maybe even a mini-ICO
*   Whatever seems like a useful feature to add... -->

- 非中央集権型ファイルシステムの使用
- 静的ページから動的コンテンツへ(ファイルからdappへ)
- アイデンティティのサポート
- colored coinやsidechainやmini-ICOのイントロダクション
- 便利そうな機能なんでも……

<!-- ## Wanna join me? -->

### 参加したい？

<!-- If you want to play along and contribute, please leave a note in the comments! Uhm, as soon as I have figured out how to support comments in a decentralized manner. Till then, tweet to me [@pors](https://twitter.com/pors)! -->

参加、貢献したい場合、コメントを残してください！Uhm、非中央集権型なやり方でコメントをサポートする方法を出来るだけ早く調べます。
それまでは、私 [@pors](https://twitter.com/pors)にツイートしてください！