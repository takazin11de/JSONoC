# JSONPIC
JSONPIC(JSON with Padding through iframe and CSS)

## Overview
A tool for fetching JSON from cross-origin using JavaScript.

## Usage
You can provide the JSON in the following format in CSS (demo.json.css) :

```
body{content:'{"name":"Alice","age":20}'}
```

You can retrieve the JSON using the following code:

Fetch JSONPIC file
```
JSONPIC.fetch('demo.json.css').then(
  (json)=>{
    console.log(json);
  }
).catch(
  (err)=>{
    console.log(err);
  }
);
```
Result 
```
{name: 'Alice', age: 20}
```


Convert object to JSONPIC
```
let json = JSONPIC.cnv(
  {
    name : "Alice",
    age  : 20
  }
  );
  console.log(json);
```
Result 
```
body{content:'{"name":"Alice","age":20}'}
```


**Note:** It is important to escape both the JSON and the CSS in the provided CSS file.
