---
layout: post
title: "記事の編集履歴、PR作成、その他Qiitaにあるような3つの機能の代替"
date: 2017-05-10 07:00:00 +0900
tags: jekyll tech
---

このサイトの各ページの下にある"Improve this page"について書く。
GitHub Pagesでは、GitHubリポジトリの名前、ブランチ、現在のページに対応するソースファイルのパスが変数として得られる。
なのでテンプレートを使ってQiitaの"編集履歴"、"編集リクエスト"のような機能を実現することができる。
この2つは技術系記事が載るサイトにあるべき機能だと思う。

### 現在のページの編集(commit)履歴

```
{% raw %}https://github.com/{{ site.github.repository_nwo }}/commits/{{ site.branch }}/{{ page.path }}{% endraw %}
```

[サンプル](https://github.com/{{ site.github.repository_nwo }}/commits/{{ site.branch }}/{{ page.path }})

### 現在のページの編集リクエスト(editing)ページ

```
{% raw %}https://github.com/{{ site.github.repository_nwo }}/edit/{{ site.branch }}/{{ page.path }}{% endraw %}
```

[サンプル](https://github.com/{{ site.github.repository_nwo }}/edit/{{ site.branch }}/{{ page.path }})

### Markdownで本文を見る(raw)

```
{% raw %}https://raw.githubusercontent.com/{{ site.github.repository_nwo }}/{{ site.branch }}/{{ page.path }}{% endraw %}
```

[サンプル](https://raw.githubusercontent.com/{{ site.github.repository_nwo }}/{{ site.branch }}/{{ page.path }})

多分他にもいろいろできると思う。