class JSONoC {
  static #iframe;
  static fetch = async (url, timeout, key) => {
    const doc = document;
    if (!this.#iframe) {
      this.#iframe = doc.createElement(`iframe`);
      const style = this.#iframe.style;
      style.visibility = `hidden`;
      style.position = `absolute`;
      doc.body.appendChild(this.#iframe);
      await new Promise((resolve) => {
        this.#iframe.onload = () => {
          resolve();
        };
      });
    }
    const idoc = this.#iframe.contentWindow.document;
    const p = doc.createElement(`p`);
    let timer;
    const timer_task = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        p.remove();
        reject("timeout");
      }, timeout);
    });
    idoc.body.appendChild(p);
    const shadow = p.attachShadow({ mode: "open" });
    const link = idoc.createElement("link");
    link.rel = `stylesheet`;
    link.href = url;
    const css_onload = new Promise((resolve, reject) => {
      link.onload = () => {
        try {
          const content = getComputedStyle(
            shadow.childNodes[1]
          ).getPropertyValue("--j");
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
        } finally {
          p.remove();
          clearTimeout(timer);
        }
      };
    });
    shadow.appendChild(link);
    const p2 = doc.createElement(`p`);
    p2.id = `_${key}`;
    shadow.appendChild(p2);
    return await Promise.race([timer_task, css_onload]);
  };
  static cnv = (json, key) => {
    return `#${CSS.escape(`_${key}`)}{--j:'${(JSON.stringify(json))
      .replaceAll(`$`, `$0`)
      .replaceAll(`\\\\`, `$1`)
      .replaceAll(`\\"`, `$2`)
      .replaceAll(`\\`, `$3`)
      .replaceAll(`'`, `$4`)
      .replaceAll('`', `$5`)}';}`;
  };
}
