!function(){var t=document.querySelector("button[data-start"),n=document.querySelector("button[data-stop"),e=document.querySelector("body"),o=null;t.addEventListener("click",(function(){null===o&&(o=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3))})),n.addEventListener("click",(function(){clearInterval(o),o=null}))}();
//# sourceMappingURL=01-color-switcher.85028563.js.map