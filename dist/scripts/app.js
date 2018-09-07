import { initializeContext, triggerUpdate } from "./core.js";

const context = {
  headerMessage: "Top of the Page!",
  siteMap: [{
    label: "Home",
    url: "/"
  }, {
    label: "About",
    url: "/about"
  }]
};

initializeContext(document.body, context);

setTimeout(() => {
  context.headerMessage += " Test";
  context.siteMap.push({
    label: "Questions",
    url: "/"
  });

  triggerUpdate();
}, 1000);

setTimeout(() => {
  context.headerMessage += " Test";
  context.siteMap = context.siteMap.slice(0, 2);
  context.siteMap[1].label = "Wowza!";
  
  triggerUpdate();
}, 2000);
