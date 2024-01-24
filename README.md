# jso_css

JSON with Padding through iframe and CSS

## Overview

A tool for fetching JSON from cross-origin using JavaScript.

JavaScript でクロスオリジンにおいても JSON を読み込む事ができるライブラリです。

## Usage

Fetch JSON(jso.css) file:

JSON(jso.css)ファイルの読込:

```
// JSO_CSS.fetch( url , timeout(ms) )

async function sample(){

  JSO_CSS.fetch('https://foo.com/data1.jso.css',5000).then(
    (json)=>{
      console.log(json);
    }
  ).catch(
    (e)=>{
      console.log(e); // e : "timeout" or "error"(file not found OR JSON Syntax Error)
    }
  );


  try {
    let json = await JSO_CSS.fetch('https://bar.com/data2.jso.css',5000);
    console.log(json);
  } catch(e) {
    console.log(e); // e : "timeout" or "error"(file not found OR JSON Syntax Error)
  }

}
```

Result:

実行結果:

```
{name: 'Alice', age: 20}
```

Convert JavaScript-object to JSON(JSO_CSS):

js オブジェクトから JSON(JSO_CSS)への変換:

```
// JSO_CSS.cnv( js_object )

let json = JSO_CSS.cnv(
  {
    name : "Alice",
    age  : 20
  }
  );
  console.log(json);
```

Result:

実行結果:

```
body{content:'{"name":"Alice","age":20}'}
```

**Note:** JSONPIC cannot be used under Web Worker because it uses DOM operations.

**(注)** JSONPIC は DOM 操作を使用しているため、Web Worker のもとで使用することができません。
