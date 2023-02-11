class JSONIC {
  static load(filename){
    const iframe = document.createElement('iframe');
    const promise = new Promise((resolve, reject) => {
      iframe.onload = () =>  {
        const elemnt_jsonic = iframe.contentWindow.document.getElementById("jsonic");
        const style = window.getComputedStyle(elemnt_jsonic);
        var content = style.getPropertyValue("content");
        try {
          iframe.parentNode.removeChild(iframe);
        }catch(e){}
        try {
          content = content.split('a').join('aa');
          content = content.split('\\\\').join('1a1');
          content = content.split('\\"').join('2a2');
          content = content.split('"').join('');
          content = content.split('1a1').join('\\');
          content = content.split('2a2').join('"');
          content = content.split('aa').join('a');
          let json = JSON.parse(content);
          resolve(json);
          return;
        }catch(e){
          resolve(null);
          return;
        }
      };
      iframe.onerror = () => {
        reject(new Error('JSONIC Error'));
        return;
      };
    })
    iframe.setAttribute('srcdoc', '<!DOCTYPE html><html><head>'+
    '<meta charset="utf-8"><link rel="stylesheet" href="'+filename+'">'+
    '<title></title></head><body><p id="jsonic"></p></body></html>');
    iframe.setAttribute("id", "jsonic_iframe");
    iframe.style.visibility="hidden";
    iframe.style.position="absolute";
    iframe.style.width="0";
    iframe.style.height="0";
    iframe.style.border="none";
    document.body.appendChild(iframe);
    return promise;
  }
};