# JSONIC
JSONIC(JSON by iframe and CSS)

## Overview
A tool for fetching JSON from cross-origin using JavaScript.

## Usage
You can provide the JSON in the following format in CSS (example.json.css) :

```
#jsonic{content: '\
{\
  "name" : "Alice",\
  "age" : 20\
}\
'}
```

You can retrieve the JSON using the following code:

```
JSONIC.load('example.json.css').then(
  (json)=>{
    console.log(json);
  }
);
```

**Note:** It is important to escape both the JSON and the CSS in the provided CSS file.
