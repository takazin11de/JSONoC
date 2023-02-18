# JSONPIC
JSON with Padding through iframe and CSS

## Overview
A tool for fetching JSON from cross-origin using JavaScript.

JavaScriptでクロスオリジンにおいてもJSONを読み込む事ができるライブラリです。

## Usage
You can provide the JSON in the following format in CSS (demo.json.css):

JSONを下記のようにCSSでパディングし設置します。  (demo.json.css):

```
body{content:'{"name":"Alice","age":20}'}
```

Fetch JSON(JSONPIC) file:

JSON(JSONPIC)ファイルの読込:

```
// JSONPIC.fetch( url , timeout(ms) ).
async function sample(){
  JSONPIC.fetch('https://foo.com/data1.json.css',5000).then(
    (json)=>{
      console.log(json);
    }
  ).catch(
    (e)=>{
      console.log(e); // e : "timeout" or "error"(file not found OR JSON Syntax Error)
    }
  );

  try {
    let json = await JSONPIC.fetch('https://bar.com/data2.json.css',5000);
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


Convert JavaScript-object to JSON(JSONPIC):

jsオブジェクトからJSON(JSONPIC)への変換:
```
// JSONPIC.cnv( js_object )
let json = JSONPIC.cnv(
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

**Note:** It is important to escape both the JSON and the CSS in the provided CSS file.

**(注)** JSON(JSONPIC)ファイルはCSSのエスケープとJSONのエスケープのどちらも施してください。

```
{text : " \ "} or {text : " \\ "}
                -->  body{content:'{"text" : " \\\\ "}'}

{text : " \" "}  -->  body{content:'{"text" : " \\\" "}'}

{text : " \' "}  -->  body{content:'{"text" : " \' "}'}
                   or body{content:'{"text" : " \\\' "}'}

{text : " \n "}  -->  body{content:'{"text" : " \\n "}'}

{text : " \t "}  -->  body{content:'{"text" : " \\t "}'}

```

**Note:** JSONPIC cannot be used under Web Worker because it uses DOM operations.

**(注)** JSONPICはDOM操作を使用しているため、Web Workerのもとで使用することができません。
