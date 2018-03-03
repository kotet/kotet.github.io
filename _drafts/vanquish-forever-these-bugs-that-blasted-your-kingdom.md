---
layout: post
title: "プログラムの城をだめにするバグ共をやっつける【翻訳】"
tags: dlang tech translation 
---

この記事は、
[Vanquish Forever These Bugs That Blasted Your Kingdom – The D Blog](https://dlang.org/blog/2018/02/07/vanquish-forever-these-bugs-that-blasted-your-kingdom/)
を自分用に翻訳したものを
[許可を得て](http://dlang.org/blog/2017/06/16/life-in-the-fast-lane/#comment-1631)
公開するものである。

ソース中にコメントの形で原文を残している。
誤字や誤訳などを見つけたら今すぐ
[Pull request](https://github.com/{{ site.github.repository_nwo }}/edit/{{ site.branch }}/{{ page.path }})だ!

---

<!-- _Walter Bright is the BDFL of the D Programming Language and founder of Digital Mars. He has decades of experience implementing compilers and interpreters for multiple languages, including Zortech C++, the first native C++ compiler. He also created Empire, the Wargame of the Century. This post is the first in a series on how [D’s BetterC mode](https://dlang.org/blog/2017/08/23/d-as-a-better-c/) can be used to exterminate and prevent bugs in existing C code._ -->

---

<!-- ![](https://i0.wp.com/dlang.org/blog/wp-content/uploads/2018/02/bug.jpg?resize=256%2C156) -->

<!-- Do you ever get tired of bugs that are easy to make, hard to check for, often don’t show up in testing, and [blast your kingdom](https://getyarn.io/yarn-clip/ac6765ca-f2c6-49ec-a1ba-a7e9b0f692bf) once they are widely deployed? They cost you time and money again and again. If you were only a better programmer, these things wouldn’t happen, right? -->

<!-- Maybe it’s not you at all. I’ll show how these bugs are not your fault – they’re the tools’ fault, and by improving the tools you’ll never have your kingdom blasted by them again. -->

<!-- And you won’t have to compromise, either. -->

<!-- ### Array Overflow -->

<!-- Consider this conventional program to calculate the sum of an array: -->

```c
#include <stdio.h>

#define MAX 10

int sumArray(int* p) {
    int sum = 0;
    int i;
    for (i = 0; i <= MAX; ++i)
        sum += p[i];
    return sum;
}

int main() {
    static int values[MAX] = { 7,10,58,62,93,100,8,17,77,17 };
    printf("sum = %d\n", sumArray(values));
    return 0;
}
```

<!-- The program should print:

`sum = 449`

And indeed it does, on my Ubuntu Linux system, with both `gcc` and `clang` and `-Wall`. I’m sure you already know what the bug is: -->

```c
for (i = 0; i <= MAX; ++i)
               ^^
```

<!-- This is the classic “[fencepost problem](https://en.wikipedia.org/wiki/Off-by-one_error#Fencepost_error)”. It goes through the loop 11 times instead of 10. It should properly be: -->

```c
for (i = 0; i < MAX; ++i)
```

<!-- Note that even with the bug, the program still produced the correct result! On my system, anyway. So I wouldn’t have detected it. On the customer’s system, well, then it mysteriously fails, and I have a remote [heisenbug](https://en.wikipedia.org/wiki/Heisenbug). I’m already tensing up anticipating the time and money this is going to cost me. -->

<!-- It’s such a rotten bug that over the years I have reprogrammed my brain to: -->

<!-- 1.  Never, ever use “inclusive” upper bounds.
2.  Never, ever use `<=` in a for loop condition. -->

<!-- By making myself a better programmer, I have solved the problem! Or have I? Not really. Let’s look again at the code from the perspective of the poor schlub who has to review it. He wants to ensure that `sumArray()` is correct. He must: -->

<!-- 1.  Look at all callers of `sumArray()` to see what kind of pointer is being passed.
2.  Verify that the pointer actually is pointing to an array.
3.  Verify that the size of the array is indeed `MAX`. -->

<!-- While this is trivial for the trivial program as presented here, it doesn’t really scale as the program complexity goes up. The more callers there are of `sumArray`, and the more indirect the data structures being passed to `sumArray`, the harder it is to do what amounts to data flow analysis in your head to ensure it is correct. -->

<!-- Even if you get it right, are you sure? What about when someone else checks in a change, is it still right? Do you want to do that analysis again? I’m sure you have better things to do. This is a tooling problem. -->

<!-- The fundamental issue with this particular problem is that a C array decays to a pointer when it’s an argument to a function, even if the function parameter is declared to be an array. There’s just no escaping it. There’s no detecting it, either. (At least gcc and clang don’t detect it, maybe someone has developed an analyzer that does). -->

<!-- And so the tool to fix it is [D as a BetterC](https://dlang.org/blog/2017/08/23/d-as-a-better-c/) compiler. D has the notion of a _dynamic array_, which is simply a fat pointer, that is laid out like: -->

```c
struct DynamicArray {
    T* ptr;
    size_t length;
}
```

It’s declared like:

```d
int[] a;
```

and with that the example becomes:

```d
import core.stdc.stdio;

extern (C):   // use C ABI for declarations

enum MAX = 10;

int sumArray(int[] a) {
    int sum = 0;
    for (int i = 0; i <= MAX; ++i)
        sum += a[i];
    return sum;
}

int main() {
    __gshared int[MAX] values = [ 7,10,58,62,93,100,8,17,77,17 ];
    printf("sum = %d\n", sumArray(values));
    return 0;
}
```