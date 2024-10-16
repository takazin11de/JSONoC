class JSONoC {
  static #iframe;
  static fetch = async (url, timeout, key = ``) => {
    const doc = document;
    if (!this.#iframe) {
      this.#iframe = doc.createElement(`iframe`);
      this.#iframe.setAttribute(`style`, `visibility:hidden;position:fixed;`);
      await new Promise((resolve) => {
        this.#iframe.onload = () => {
          resolve();
        };
        doc.body.appendChild(this.#iframe);
      });
    }
    const p = doc.createElement(`p`);
    const timer_task = new Promise((resolve, reject) => {
      setTimeout(() => {
        p.remove();
        reject(`timeout`);
      }, timeout);
    });
    this.#iframe.contentDocument.body.appendChild(p);
    const shadow = p.attachShadow({ mode: `open` });
    const link = doc.createElement(`link`);
    link.rel = `stylesheet`;
    link.href = url;
    const css_onload = new Promise((resolve, reject) => {
      link.onload = () => {
        try {
          const content = getComputedStyle(
            shadow.childNodes[1]
          ).getPropertyValue(`--_`);
          resolve(JSON.parse(content.trim().slice(1, -1)
            .replaceAll(`$5`, '`')
            .replaceAll(`$4`, `'`)
            .replaceAll(`$3`, `\\`)
            .replaceAll(`$2`, `\\"`)
            .replaceAll(`$1`, `\\\\`)
            .replaceAll(`$0`, `$`)
          ));
        } catch (e) {
          reject(e);
        }
      };
      link.onerror = () => { reject(`error`); };
    });
    shadow.appendChild(link);
    const p2 = doc.createElement(`p`);
    p2.id = `_${key}`;
    shadow.appendChild(p2);
    return await Promise.race([timer_task, css_onload]);
  };
  static cnv = (json, key = ``) => {
    return `#${CSS.escape(`_${key}`)}{--_:'${(JSON.stringify(json))
      .replaceAll(`$`, `$0`)
      .replaceAll(`\\\\`, `$1`)
      .replaceAll(`\\"`, `$2`)
      .replaceAll(`\\`, `$3`)
      .replaceAll(`'`, `$4`)
      .replaceAll('`', `$5`)}';}`;
  };
}
