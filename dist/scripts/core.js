function clearElement(el) {
  while (el.firstChild && el.removeChild(el.firstChild));
}

function registerEach(element) {
  const loops = element.querySelectorAll("[data-each]");

  const templates = Array.from(loops).map((el) => {
    const template = el.firstElementChild;
    return () => document.importNode(template, true);
  });

  return (context) => {
    processEach(loops, templates, context);
  };
}

function processEach(loops, templates, context) {
  loops.forEach((el, index) => {
    const array = el.dataset.each.split("=>")[0].replace(" ", "");

    if (!el.each) {
      clearElement(el);
    }

    const values = (context[array] || []);

    el.each = (el.each || []).slice(0, values.length - 1);

    while (el.childNodes.length > el.each.length) {
      el.removeChild(el.childNodes[el.childNodes.length - 1]);
    }

    values.forEach((item, i) => {
      if (!el.each[i]) {
        el.each[i] = {
          value: item,
          template: templates[index]()
        };

        initializeContext(el.each[i].template, el.each[i].value);

        el.each[i].value.$clean = true;
        el.appendChild(el.each[i].template);
      }

      if (el.each[i].value != item) {
        item.$clean = false;
        el.each[i].value = item;
      }
    });
  });
}

function processText(texts, context) {
  texts.forEach(el => {
    el.textContent = context[el.dataset.text] || "";
  });
}

function registerText(element) {
  const texts = element.querySelectorAll("[data-text]");

  return (context) => {
    processText(texts, context);
  }
}

function registerElement(element) {
  const bindings = [];

  bindings.push(registerText(element));
  bindings.push(registerEach(element));

  return bindings;
}

function registerBindings(bindings, context) {
  bindings.forEach((binding) => {
    binding(context);
  });
}

export function initializeContext(element, context) {
  const bindings = registerElement(element);

  registerBindings(bindings, context);

  document.addEventListener("updateBindings", () => {
    registerBindings(bindings, context);
  });
}

export function triggerUpdate() {
  const event = new Event("updateBindings");
  document.dispatchEvent(event);
}
