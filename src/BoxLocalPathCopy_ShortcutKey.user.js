// ==UserScript==
// @name         BoxLocalPathCopy_ShortcutKey
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  box url to local path
// @author       Nobuho Tanaka
// @match        https://takenaka.ent.box.com/folder/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=box.com
// @resource     toastr.min.css https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
  "use strict";

  const newCSS = GM_getResourceText("toastr.min.css");
  GM_addStyle(newCSS);

  document.body.addEventListener("keydown", function (e) {
    if (e.altKey && e.key === "s") {
      let b = "file://C:/Takenaka/Box/";
      const c = document.querySelector(
        "button.ItemListBreadcrumbOverflow-menuButton"
      );
      c &&
        (c.click(),
        (b += [
          ...document.querySelectorAll(
            "a[data-resin-target='openfolder'].menu-item"
          ),
        ]
          .map((a) => a.innerText)
          .filter(
            (a) => "\u3059\u3079\u3066\u306e\u30d5\u30a1\u30a4\u30eb" !== a
          )
          .join("/")),
        b.endsWith("/") || (b += "/"));
      b += [...document.querySelectorAll(".ItemListBreadcrumb-listItem")]
        .map((a) => a.innerText)
        .filter(
          (a) =>
            "" !== a && "\u3059\u3079\u3066\u306e\u30d5\u30a1\u30a4\u30eb" !== a
        )
        .join("/");
      document.body.click();
      // alert(decodeURI(b));
      console.log(b);
      // setTimeout(() => navigator.clipboard.writeText(b), 500);
      GM_setClipboard(b);

      // /////////////////////////////////////////////////////////////////////
      toastr.options = {
        positionClass: "toast-bottom-right",
        timeOut: "1000",
      };
      toastr.success("Boxローカルパスをコピーしました");
      e.preventDefault();
      // /////////////////////////////////////////////////////////////////////
    }
  });
})();
