class JSONoC {
  static #f;
  static fetch = (url, timeout = 5000, key = ``) => {
    const p = document.createElement(`p`);
    return new Promise((resolve, reject) => {
      (new Promise(resolve => {
        if (this.#f) resolve();
        document.body.append(Object.assign(this.#f = document.createElement(`iframe`),
          { style: `visibility:hidden;position:fixed`, onload: _ => resolve() }))
      })).then(_ => {
        (new Promise((resolve, reject) => {
          const t = Object.assign(document.createElement(`p`), { id: `_${key}` });
          this.#f.contentDocument.body.appendChild(p).attachShadow({ mode: `open` }).append(
            Object.assign(document.createElement(`link`), {
              rel: `stylesheet`, href: url, onerror: _ => reject(`error`), onload: _ => {
                try {
                  resolve(JSON.parse(getComputedStyle(t).getPropertyValue(`--_`).trim().slice(1, -1)
                    .replaceAll(`$5`, '`').replaceAll(`$4`, `'`).replaceAll(`$3`, `\\`)
                    .replaceAll(`$2`, `\\"`).replaceAll(`$1`, `\\\\`).replaceAll(`$0`, `$`)
                  ));
                } catch (e) { reject(e) }
              }
            }), t);
          setTimeout(_ => reject(`timeout`), timeout);
        })).then(j => resolve(j)).catch(e => reject(e)).finally(_ => p.remove())
      }).catch(_ => reject(`error`))
    })
  };
  static cnv = (json, key = ``) => {
    return `#${CSS.escape(`_${key}`)}{--_:'${(JSON.stringify(json))
      .replaceAll(`$`, `$0`).replaceAll(`\\\\`, `$1`).replaceAll(`\\"`, `$2`)
      .replaceAll(`\\`, `$3`).replaceAll(`'`, `$4`).replaceAll('`', `$5`)}'}`
  }
}