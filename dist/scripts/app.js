const context = {
  siteMap: [1, 2]
};

const loops = document.querySelectorAll("[data-each]");

loops.forEach((el) => {
  const array = el.dataset.each;
  const template = el.innerHTML;

  let children = "";

  (context[array] || []).forEach((item) => {
    children += template;
  });

  el.innerHTML = children;
});
