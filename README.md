# JSONoC

JSON over CSS

## 概要 Overview

JavaScript でクロスオリジンにおいても JSON を読み込む事ができるライブラリです。

A tool for fetching JSON from cross-origin using JavaScript.

## 使い方 Usage

JSON(json.css)ファイルの読込:
Fetch JSON(json.css) file:

```
// JSONoC.fetch( url , timeout(ms), key )

async function sample(){

  JSONoC.fetch('https://foo.com/data1.json.css',5000,"").then(
    (json)=>{
      console.log(json);
    }
  ).catch(
    (e)=>{
      console.log(e); // e : "timeout" or "error"(file not found OR JSON Syntax Error)
    }
  );


  try {
    let json = await JSONoC.fetch('https://bar.com/data2.json.css',5000,"");
    console.log(json);
  } catch(e) {
    console.log(e); // e : "timeout" or "error"(file not found OR JSON Syntax Error)
  }

}
```

実行結果 Result:

```
{name: 'Alice', age: 20}
```

js オブジェクトから JSON(json.css)への変換:

Convert JavaScript-object to JSON(json.css):

```
// JSONoC.cnv( js_object, key )

let json = JSONoC.cnv(
  {
    name : "Alice",
    age  : 20
  }, ""
  );
  console.log(json);
```

実行結果 Result:

```
#_{--_:'{"name":"Alice","age":20}';}
```

引数keyを指定するとkeyを知っている場合のみjsonを取得できるようになるため、JSONPでいうところのコールバック関数名のように使用することが可能です。

**(注)** JSONoC は DOM 操作を使用しているため、Web Worker のもとで使用することができません。

**Note:** JSONoC cannot be used under Web Worker because it uses DOM operations.

