class JSONPIC{
  static fetch(filename, timeout){
    try {
      const iframe = document.createElement(`iframe`);
      iframe.setAttribute(`srcdoc`, `<!DOCTYPE html><link rel="stylesheet" href="${filename}"><title></title>`);
      Object.assign(iframe.style, {
        visibility : "hidden",
        position : "absolute",
        width : "0",
        height : "0",
        border : "none"});
      document.body.appendChild(iframe);
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          iframe.remove();
          reject(`timeout`);
        }, timeout);
        iframe.onload = () => {
          try {
            const element = iframe.contentWindow.document.body;
            const content = window.getComputedStyle(element).getPropertyValue(`content`);
            // "!\\\"#$%&\'()*+,-\\nabcd\\t./:;<=>?@[\\\\]^_`{|}~\\\\"
            // "!\\\"#$%&\\\'()*+,-\\nabcd\\t./:;<=>?@[\\\\]^_`{|}~\\\\"
            const text = content
            .split(`$`).join(`$$`)
            .split(`\\\\`).join(`_$1`)
            .split(`\\"`).join(`_$2`)
            .split(`\\'`).join(`_$3`)
            .split(`\\`).join(`_$4`)
            .split(`"`).join(``)
            .split(`_$1'`).join(`'`)
            .split(`_$1`).join(`\\`)
            .split(`_$2`).join(`"`)
            .split(`_$4`).join(`\\\\`)
            .split(`$$`).join(`$`);
            resolve(JSON.parse(text));
          } catch(e) {
            reject(`error`);
          } finally {
            iframe.remove();
            clearTimeout(timer);
          }
          return;
        };
      });
    } catch(e) {
      return new Promise((resolve, reject) => {reject(`error`)});
    }
  }

  static cnv(json){
    try {
      return `body{content:'${ JSON.stringify(json)
        .split(`$`).join(`$$`)
        .split(`\\\\`).join(`_$1`)
        .split(`\\"`).join(`_$2`)
        .split(`\\`).join(`_$3`)
        .split(`'`).join(`_$4`)
        .split(`_$1`).join(`\\\\\\\\`)
        .split(`_$2`).join(`\\\\\\"`)
        .split(`_$3`).join(`\\\\`)
        .split(`_$4`).join(`\\'`)
        .split(`$$`).join(`$`)
      }'}`;
    } catch(e) {
      return;
    }
  }
};