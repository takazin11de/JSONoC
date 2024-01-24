class JSO_CSS {
  queue;
  static fetch = async (filename, timeout) => {
    const num_iframe = 5;
    if (JSO_CSS.queue === undefined) {
      JSO_CSS.queue = [];
    }
    const queue = JSO_CSS.queue;
    const doc = document;
    const fetch = async (filename, timeout) => {
      filename = `` + filename;
      timeout = timeout | 0;
      const iframe = await get_iframe();
      const json = await load(iframe, filename, timeout);
      return json;
    };
    const get_iframe = async () => {
      const super_iframe_id = `__jso_css`;
      let super_iframe = doc.getElementById(super_iframe_id);
      if (super_iframe == null) {
        const style = {
          visibility: `hidden`,
          position: `absolute`,
          width: `0`,
          height: `0`,
          border: `none`,
        };
        const html = `<!DOCTYPE html><title>_</title><p></p>`;
        super_iframe = doc.createElement(`iframe`);
        super_iframe.setAttribute(`srcdoc`, html);
        Object.assign(super_iframe.style, style);
        super_iframe.id = super_iframe_id;
        const task_si = new Promise((resolve) => {
          super_iframe.onload = () => {
            resolve();
          };
        });
        doc.body.appendChild(super_iframe);
        await task_si;
        const task = [...Array(num_iframe)];
        for (let i = 0; i < num_iframe; i++) {
          const iframe = doc.createElement(`iframe`);
          iframe.setAttribute(`srcdoc`, html);
          Object.assign(iframe.style, style);
          iframe.className = `u`;
          task[i] = new Promise((resolve) => {
            iframe.onload = () => {
              resolve();
            };
          });
          super_iframe.contentWindow.document.body.appendChild(iframe);
        }

        await Promise.all([...task]);
      }
      const iframes =
        super_iframe.contentWindow.document.getElementsByClassName(`u`);
      let iframe;
      if (iframes == null) {
        const iframe_task = new Promise((resolve) => {
          queue.push((iframe) => {
            resolve(iframe);
          });
        });
        return await iframe_task;
      } else {
        iframe = iframes[0];
        iframe.className = ``;
        return iframe;
      }
    };
    const load = async (iframe, filename, timeout) => {
      const idoc = iframe.contentWindow.document;
      let timer;
      const timer_task = new Promise((resolve, reject) => {
        timer = setTimeout(() => {
          iframe.className = `u`;
          const func = queue.shift();
          if (func != null) {
            func(iframe);
          }
          reject("timeout");
        }, timeout);
      });
      const link = idoc.createElement("link");
      link.setAttribute(`rel`, `stylesheet`);
      link.setAttribute(`href`, filename);
      const css_onload = new Promise((resolve, reject) => {
        link.onload = () => {
          try {
            const content = getComputedStyle(
              idoc.getElementsByTagName(`p`)[0]
            ).getPropertyValue("--j");
            iframe.className = `u`;
            const func = queue.shift();
            if (func != null) {
              func(iframe);
            }
            const text = content.trim().slice(1, -1);
            const links = idoc.getElementsByTagName(`link`);
            [...links].forEach((x) => x.remove());
            Base64ToDecText(text)
              .then((text) => {
                resolve(JSON.parse(text));
              })
              .catch((e) => {
                reject(e);
              });
          } catch (e) {
            reject(e);
          } finally {
            clearTimeout(timer);
          }
        };
      });
      idoc.head.appendChild(link);
      return await Promise.race([timer_task, css_onload]);
    };
    const Base64ToDecText = async (base64) => {
      try {
        const aaa = new Uint8Array(
          [...atob(base64)].map((s) => s.charCodeAt(0))
        );
        const bbb = await new Response(
          new Blob([aaa])
            .stream()
            .pipeThrough(new DecompressionStream(`deflate`))
        ).arrayBuffer();
        return new TextDecoder().decode(new Uint8Array(bbb));
      } catch (e) {
        throw "decode error";
      }
    };
    return await fetch(filename, timeout);
  };
  static cnv = async (json) => {
    const TextToEncBase64 = async (str) => {
      try {
        const aaa = new Uint8Array(new TextEncoder().encode(str));
        const bbb = await new Response(
          new Blob([aaa]).stream().pipeThrough(new CompressionStream(`deflate`))
        ).arrayBuffer();
        return btoa(String.fromCharCode(...new Uint8Array(bbb)));
      } catch (e) {
        throw "encode error";
      }
    };
    return `p{--j:'${await TextToEncBase64(JSON.stringify(json))}'}`;
  };
}
