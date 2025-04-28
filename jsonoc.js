class JSONoC {
  static #f;
  static #l = [];
  static fetch = (url, timeout = 5000, key = ``) => {
    return new Promise((resolve, reject) => {
      (new Promise(resolve => {
        this.#l.push([resolve, document.createElement(`p`), Object.assign(document.createElement(`p`), { id: `_${key}` })]);
        if (this.#l[0] == 1) {
          resolve(this.#l[1].slice(1, 3));
          this.#l = [1];
        }
        if (this.#f) return;
        document.body.append(Object.assign(this.#f = document.createElement(`iframe`),
          { style: `visibility:hidden;position:fixed`, onload: _ => { this.#l.forEach(([a, b, c]) => a([b, c])); this.#l = [1] } }))
      })).then(([p, t]) => {
        (new Promise((resolve, reject) => {
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
          setTimeout(_ => { reject(`timeout`) }, timeout);
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