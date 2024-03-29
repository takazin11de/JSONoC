class JSO_CSS {
  static fetch = async (filename, timeout) => {
    const doc = document;
    const iframe_id = `__jso_css`;
    let iframe = doc.getElementById(iframe_id);
    if (iframe == null) {
      iframe = doc.createElement(`iframe`);
      iframe.setAttribute(`srcdoc`, ``);
      Object.assign(iframe.style, {
        visibility: `hidden`,
        position: `absolute`,
        width: `0`,
        height: `0`,
        border: `none`,
      });
      iframe.id = iframe_id;
      doc.body.appendChild(iframe);
      await new Promise((resolve) => {
        iframe.onload = () => {
          resolve();
        };
      });
    }
    const idoc = iframe.contentWindow.document;
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
    link.setAttribute(`rel`, `stylesheet`);
    link.setAttribute(`href`, filename);
    const css_onload = new Promise((resolve, reject) => {
      link.onload = () => {
        try {
          const content = getComputedStyle(
            shadow.childNodes[1]
          ).getPropertyValue("--j");
          const text = content
            .trim()
            .slice(1, -1)
            .split(`$5`)
            .join("`")
            .split(`$4`)
            .join(`'`)
            .split(`$3`)
            .join(`\\`)
            .split(`$2`)
            .join(`\\"`)
            .split(`$1`)
            .join(`\\\\`)
            .split(`$0`)
            .join(`$`);
          resolve(JSON.parse(text));
        } catch (e) {
          reject(e);
        } finally {
          p.remove();
          clearTimeout(timer);
        }
      };
    });
    shadow.appendChild(link);
    shadow.appendChild(doc.createElement(`p`));
    return await Promise.race([timer_task, css_onload]);
  };
  static cnv = (json) => {
    return `p{--j:'${JSON.stringify(json)
      .split(`$`)
      .join(`$0`)
      .split(`\\\\`)
      .join(`$1`)
      .split(`\\"`)
      .join(`$2`)
      .split(`\\`)
      .join(`$3`)
      .split(`'`)
      .join(`$4`)
      .split("`")
      .join(`$5`)}'}`;
  };
}
