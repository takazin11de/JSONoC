# JSONIC
JSONIC(JSON with iframe and CSS)

## Overview
A tool for fetching JSON from cross-origin using JavaScript.

## Usage
You can provide the JSON in the following format in CSS (test.json.css) :

```
#jsonic{content: '
{
  "name" : "Alice",
  "age" : 20
}
'}
```

You can retrieve the JSON using the following code:

```
JSONIC.load('test.json.css').then(
  (json)=>{
    const p = document.createElement('p');
    p.innerText=JSON.stringify(json);
    document.body.appendChild(p);
  }
);
```

**Note:** It is important to escape both the JSON and the CSS in the provided CSS file.
