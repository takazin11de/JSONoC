class JSONoC {
  static #promise = Promise.resolve();
  static fetch = (url, timeout = 5000, key = ``) => {
    const load_iftrame = (iframe) => new Promise(resolve => {
      if (!iframe) {
        const iframe = document.createElement(`iframe`);
        iframe.style = `visibility:hidden;position:fixed;`;
        iframe.onload = () => resolve(iframe);
        document.body.append(iframe);
      } else resolve(iframe);
    });
    const load_css = (iframe) => {
      const p = document.createElement(`p`);
      let tid;
      return (new Promise((resolve, reject) => {
        const p2 = document.createElement(`p`);
        p2.id = `_${key}`;
        iframe.contentDocument.body.appendChild(p);
        const shadow = p.attachShadow({ mode: `open` });
        const link = document.createElement(`link`);
        link.rel = `stylesheet`;
        link.href = url;
        link.onerror = () => reject(`error`);
        link.onload = () => {
          try {
            resolve(JSON.parse(getComputedStyle(p2).getPropertyValue(`--_`).trim().slice(1, -1)
              .replaceAll(`$5`, '`')
              .replaceAll(`$4`, `'`)
              .replaceAll(`$3`, `\\`)
              .replaceAll(`$2`, `\\"`)
              .replaceAll(`$1`, `\\\\`)
              .replaceAll(`$0`, `$`)))
          } catch (err) { reject(err) }
        };
        shadow.append(link, p2);
        tid = setTimeout(() => reject(`timeout`), timeout);
      })).finally(() => {
        clearTimeout(tid);
        p.remove()
      })
    };
    this.#promise = this.#promise.then(load_iftrame);
    return this.#promise.then(load_css)
  };
  static cnv = (json, key = ``) => {
    return `#${CSS.escape(`_${key}`)}{--_:'${(JSON.stringify(json))
      .replaceAll(`$`, `$0`)
      .replaceAll(`\\\\`, `$1`)
      .replaceAll(`\\"`, `$2`)
      .replaceAll(`\\`, `$3`)
      .replaceAll(`'`, `$4`)
      .replaceAll('`', `$5`)}'}`
  }
}