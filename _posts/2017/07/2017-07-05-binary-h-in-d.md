---
layout: post
title: "binary.h in D"
tags: jekyll tech
excerpt: "C言語にはなぜか二進数リテラルがないため、そういうことをしたい場合自分で何とかする必要がある。
        D言語には普通に二進数リテラルがあるが、同じことをするコードを書いてTemplate Mixinの練習をすることにした。"
---

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">なんか、見てはいけないものを見てしまった気がする <a href="https://t.co/MP4aw9gXqg">pic.twitter.com/MP4aw9gXqg</a></p>&mdash; すぱっしゅ＠こーせんちほーぐらし！ (@hajime__725) <a href="https://twitter.com/hajime__725/status/882048385791832064">2017年7月4日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

C言語にはなぜか二進数リテラルがないため、そういうことをしたい場合自分で何とかする必要がある。
D言語には普通に二進数リテラルがあるが、同じことをするコードを書いてTemplate Mixinの練習をすることにした。
与えられた型の表現できる範囲の二進数リテラルを生成する。

<script src="https://gist.github.com/kotet/d06125b1d3b14f101742b1411d83c46f.js?file=binary.d"></script>

どんなコードが生成されているか見てみる。

```console
$ dmd binary.d -unittest -main -vcg-ast
```

```d
import object;
template binary(T)
{
	mixin(()
	{
		import std.conv : to;
		import std.range : chain, only, iota;
		import std.string : rightJustify, format;
		string result = "";
		foreach (n; iota(0, T.max).chain(T.max.only))
		{
			size_t maxlen = format("%b", T.max).length;
			string representation = format("%b", n);
			foreach (minWidth; representation.length .. maxlen + 1)
			{
				result ~= "enum " ~ T.stringof ~ " B" ~ rightJustify(representation, minWidth, '0') ~ " = " ~ to!string
				(n) ~ ";";
			}
		}
		return result;
	}
	());
}
unittest
{
	enum ubyte B0 = cast(ubyte)0u;
	enum ubyte B00 = cast(ubyte)0u;
	enum ubyte B000 = cast(ubyte)0u;
	enum ubyte B0000 = cast(ubyte)0u;
	enum ubyte B00000 = cast(ubyte)0u;
	enum ubyte B000000 = cast(ubyte)0u;
	enum ubyte B0000000 = cast(ubyte)0u;
	enum ubyte B00000000 = cast(ubyte)0u;
	enum ubyte B1 = cast(ubyte)1u;
	enum ubyte B01 = cast(ubyte)1u;
	enum ubyte B001 = cast(ubyte)1u;
	enum ubyte B0001 = cast(ubyte)1u;
	enum ubyte B00001 = cast(ubyte)1u;
	enum ubyte B000001 = cast(ubyte)1u;
	enum ubyte B0000001 = cast(ubyte)1u;
	enum ubyte B00000001 = cast(ubyte)1u;
	enum ubyte B10 = cast(ubyte)2u;
	enum ubyte B010 = cast(ubyte)2u;
	enum ubyte B0010 = cast(ubyte)2u;
	enum ubyte B00010 = cast(ubyte)2u;
	enum ubyte B000010 = cast(ubyte)2u;
	enum ubyte B0000010 = cast(ubyte)2u;
	enum ubyte B00000010 = cast(ubyte)2u;
    /// 中略
```

全体は[こちら](https://gist.github.com/kotet/d06125b1d3b14f101742b1411d83c46f#file-binary-d-cg)。
`ubyte`で表現できるすべての値の8文字以下の二進数表現を網羅している。
コードの文字列を生成して、1つの`mixin`に渡している。

```d
mixin template binary(T)
{
    foreach(...){
        mixin(...);
    }
}
```

上のように`mixin`を`foreach`で回したいところだが、それをするための`static foreach`はまだ
[Preliminary Review Round 1](https://github.com/dlang/DIPs/blob/d2dc77802c74378cf4545069eced21f85fbf893f/DIPs/DIP1010.md)
なのでのんびり待とう。