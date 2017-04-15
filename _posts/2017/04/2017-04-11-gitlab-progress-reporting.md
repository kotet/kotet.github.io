---
layout: post
title: "Gitlabのissueのタスクの進捗をまとめるシェルスクリプト"
date: 2017-04-11 7:00:00 +0900
tags: tech
image: 
---

いろいろあって必要になって作った。
ひょっとすると他に必要な人がいるかもしれないので残しておく。

特定のprojectのissueのdescriptionにあるチェックボックスの数を数えてHTMLにする。
`$REPORT_GENERATOR_TOKEN`と`$PROJECT_ID`をセットして実行する。

```shell
json=$(curl -s --header "PRIVATE-TOKEN: $REPORT_GENERATOR_TOKEN" https://gitlab.com/api/v4/projects/$PROJECT_ID/issues)

len=$(echo $json | jq length)

echo '<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>'
echo "<h1>" $(date) "</h1>"

for i in $( seq 0 $(($len - 1)) ); do

    item=$(echo $json | jq ".[$i]")
    title=$(echo $item | jq ".title")
    description=$(echo $item | jq ".description")
    all=$(echo -e $description | grep -c " \- \[.\]")
    complete=$(echo -e $description | grep -c "[x]")

    if [ ! $all = "0" ]; then
        ratio=$(echo "scale=2; $complete/$all" | bc | tail -c 3)

        echo "<h3>" $(echo $title | tr -d '"') "</h3>"
        echo "<p>" $complete "/" $all "(" $ratio "%)" "</p>" 
    fi

done

echo "</body>"
```

 - 追記
    完了率が100%のときにうまく動かない不具合があったため修正。
    上のコードは修正後のもの。
    まあ自分用に書いたものなので別に直してもここを更新しなくてもいいのだが……