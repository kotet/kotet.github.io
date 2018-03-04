---
layout: post
title: "DMD 2.079.0 Released【翻訳】"
tags: dlang tech translation 
---

この記事は、
[DMD 2.079.0 Released – The D Blog](https://dlang.org/blog/2018/03/03/dmd-2-079-0-released/)
を自分用に翻訳したものを
[許可を得て](http://dlang.org/blog/2017/06/16/life-in-the-fast-lane/#comment-1631)
公開するものである。

ソース中にコメントの形で原文を残している。
誤字や誤訳などを見つけたら今すぐ
[Pull request](https://github.com/{{ site.github.repository_nwo }}/edit/{{ site.branch }}/{{ page.path }})だ!

---

<!-- The D Language Foundation is happy to announce version 2.079.0 of DMD, the reference compiler for the D programming language. This latest version [is available for download](https://dlang.org/download.html) in multiple packages. [The changelog](https://dlang.org/changelog/2.079.0.html) details the changes and bugfixes that were the product of [78 contributors](https://dlang.org/changelog/2.079.0.html#contributors) for this release. -->

<!-- It’s not always easy to choose which enhancements or changes from a release to highlight on the blog. What’s important to some will elicit a shrug from others. This time, there’s so much to choose from that my head is spinning. But two in particular stand out as having the potential to result in a significant impact on the D programming experience, especially for those who are new to the language. -->

<!-- ### No Visual Studio required -->

<!-- Although it has only [a small entry](https://dlang.org/changelog/2.079.0.html#lld_mingw) in the changelog, this is a very big deal for programming in D on Windows: the Microsoft toolchain is no longer required to link 64-bit executables. The [previous release](https://dlang.org/blog/2018/01/04/dmd-2-078-0-has-been-released/) made things easier by eliminating the need to configure the compiler; it now searches for a Visual Studio or Microsoft Build Tools installation when either `-m32mscoff` or `-m64` are passed on the command line. This release goes much further. -->

<!-- DMD on Windows now ships with a set of platform libraries built from the MinGW definitions and a wrapper library for the VC 2010 C runtime (the changelog only mentions the installer, but this is all bundled in the zip package as well). When given the `-m32mscoff` or `-m64` flags, if the compiler fails to find a Windows SDK installation (which comes installed with newer versions of Visual Studio – with older versions it must be installed separately), it will fallback on these libraries. Moreover, the compiler now ships with `lld`, the LLVM linker. If it fails to find the MS linker, this will be used instead (note, however, that the use of this linker is currently considered experimental). -->

<!-- So the 64-bit and 32-bit COFF output is now an out-of-the-box experience on Windows, as it has always been with the OMF output (`-m32`, which is the default). This should make things a whole lot easier for those coming to D without a C or C++ background on Windows, for some of whom the need to install and configure Visual Studio has been a source of pain. -->

<!-- ### Automatically compiled imports -->

<!-- Another trigger for some new D users, particularly those coming from a mostly Java background, has been the way imports are handled. Consider the venerable ‘Hello World’ example: -->

```d
import std.stdio;

void main() {
    writeln("Hello, World!");
}
```

<!-- Someone coming to D for the first time from a language that automatically compiles imported modules could be forgiven for assuming that’s what’s happening here. Of course, that’s not the case. The `std.stdio` module is part of [Phobos, the D standard library](https://dlang.org/phobos/index.html), which ships with the compiler as a precompiled library. When compiling an executable or shared library, the compiler passes it on to the linker along any generated object files. -->

<!-- The surprise comes when that same newcomer attempts to compile multiple files, such as: -->

```d
// hellolib.d
module hellolib;
import std.stdio;

void sayHello() {
    writeln("Hello!");
}

// hello.d
import hellolib;

void main() {
    sayHello();
}
```


<!-- The common mistake is to do this, which results in a linker error about the missing `sayHello` symbol: -->

```
dmd hello.d
```

<!-- D compilers have never considered imported modules for compilation. Only source files passed on the command line are actually compiled. So the proper way to compile the above is like so: -->

```
dmd hello.d hellolib.d
```

<!-- The `import` statement informs the compiler which symbols are visible and accessible in the current compilation unit, not which source files should be compiled. In other words, during compilation, the compiler doesn’t care whether imported modules have already been compiled or are intended to be compiled. The user must explicitly pass either all source modules intended for compilation on the command line, or their precompiled object or library files for linking. -->

<!-- It’s not that adding support for compiling imported modules is impossible. It’s that doing so comes with some configuration issues that are unavoidable thanks to the link step. For example, you don’t want to compile imported modules from `libFoo` when you’re already linking with the `libFoo` static library. This is getting into the realm of build tools, and so the philosophy has been to leave it up to build tools to handle. -->

<!-- DMD 2.079.0 [changes the game](https://dlang.org/changelog/2.079.0.html#includeimports). Now, the above example can be compiled and linked like so: -->

```
dmd -i hello.d
```

<!-- The `-i` switch tells the compiler to treat imported modules as if they were passed on the command line. It can be limited to specific modules or packages by passing a module or package name, and the same can be excluded by preceding the name with a dash, e.g.: -->

```
dmd -i=foo -i=-foo.bar main.d
```

<!-- Here, any imported module whose fully-qualified name starts `foo` will be compiled, unless the name starts with `foo.bar`. By default, `-i` means to compile all imported modules except for those from Phobos and DRuntime, i.e.: -->

```
-i=-core -i=-std -i=-etc -i=-object
```

<!-- While this is no substitute for a full on build tool, it makes quick tests and programs with no complex configuration requirements much easier to compile. -->

<!-- ### The #dbugfix Campaign -->

<!-- On a related note, last month I announced the [**#dbugfix** Campaign](https://dlang.org/blog/2018/02/03/the-dbugfix-campaign/). The short of it is, if there’s a [D Bugzilla issue](https://issues.dlang.org/) you’d really like to see fixed, tweet the issue number along with **#dbugfix**, or, if you don’t have a Twitter account or you’d like to have a discussion about the issue, make a post in [the General forum](https://forum.dlang.org/group/general) with the issue number and **#dbugfix** in the title. The core team will commit to fixing at least two of those issues for a subsequent compiler release. -->

<!-- Normally, I’ll collect the data for the two months between major compiler releases. For the initial batch, we’re going three months to give people time to get used to it. I anticipated it would be slow to catch on, and it seems I was right. There were a few issues tweeted and posted in the days after the announcement, but then it went quiet. So far, this is what we have: -->

*   [Issue #1983](https://issues.dlang.org/show_bug.cgi?id=1983)
*   [Issue #2043](https://issues.dlang.org/show_bug.cgi?id=2043)
*   [Issue #5227](https://issues.dlang.org/show_bug.cgi?id=5227)
*   [Issue #16189](https://issues.dlang.org/show_bug.cgi?id=16189)
*   [Issue #17957](https://issues.dlang.org/show_bug.cgi?id=17957)
*   [Issue #18068](https://issues.dlang.org/show_bug.cgi?id=18068)
*   [Issue #18147](https://issues.dlang.org/show_bug.cgi?id=18147)
*   [Issue #18353](https://issues.dlang.org/show_bug.cgi?id=18353)

<!-- DMD 2.080.0 is scheduled for release just as [DConf 2018](http://dconf.org/2018/index.html) kicks off. The cutoff date for consideration during this run will be the day the 2.080.0 beta is announced. That will give our bugfixers time to consider which bugs to work on. I’ll include the tally and the issues they select in the DMD release announcement, then they will work to get the fixes implemented and the PRs merged in a subsequent release (hopefully 2.081.0). When 2.080.0 is released, I’ll start collecting **#dbugfix** issues for the next cycle. -->

<!-- So if there’s an issue you want fixed that isn’t on that list above, put it out there with **#dbugfix**! Also, don’t be shy about retweeting **#dbugfix** issues or **+1**’ing them in the forums. This will add weight to the consideration of which ones to fix. And remember, include an issue number, otherwise it isn’t going to count! -->
