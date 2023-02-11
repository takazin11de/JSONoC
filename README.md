# JSONIC (JSON with iframe and CSS)



data.json.css : 
'''
#jsonic{content: '\
{\
  "name" : "Alice",\
  "age"  : 20\
}\
'}
'''

How to use :
'''
JSONIC.load('test.json.css').then(
    (json)=>{
      const p = document.createElement('p');
      p.innerText=JSON.stringify(json);
      document.body.appendChild(p);
    }
  );
'''

Result
'''
{"name":"Alice","age":20}
'''
