// ==UserScript==
// @name        box_local_path
// @description box url to local path
// @namespace   Nobuho Tanaka
// @version     3.4
// @match     https://takenaka.ent.box.com/folder/*
// @grant        GM_setClipboard
// ==/UserScript==

window.addEventListener("load", function () {
  "use strict";

  ////////////////////////////////////////////////////////////////
  // 基準となるベースパス
  let base_path = "C:\\Takenaka\\Box\\";
  ////////////////////////////////////////////////////////////////

  let visible_path;
  let last_path;
  let hidden_path;

  // 検索窓の横を挿入対象に
  let target_elm = document.getElementsByClassName("header-search")[0];

  // コピー時のテキストの追加
  let copied_text = document.createElement("div"); //新しい要素を"タグ名"で作成し、変数copied_text に代入
  let str_copied = document.createTextNode("Copied!"); //テキストノードを代入
  copied_text.style.textDecoration = "None";
  copied_text.style.marginLeft = "8px";
  copied_text.style.lineHeight = "40px";
  copied_text.style.display = "none";
  copied_text.appendChild(str_copied); //テキストノードを追加
  copied_text.setAttribute("id", "copy_message");
  copied_text.classList.add("copy-link");
  target_elm.parentNode.insertBefore(
    copied_text,
    target_elm.nextElementSibling
  );

  // クリック用アイコンの追加
  let folder_icon = document.createElement("a"); //新しい要素を"タグ名"で作成し、変数folder_icon に代入
  let str_icon = document.createTextNode("📂"); //テキストノードを代入
  folder_icon.href = "javascript:void(0);"; //ダミーのリンクを作成
  folder_icon.style.textDecoration = "None"; //始めは表示しない
  folder_icon.style.marginLeft = "8px";
  folder_icon.style.lineHeight = "40px";
  folder_icon.appendChild(str_icon); //テキストノードを追加
  folder_icon.setAttribute("id", "copy_local_link");
  folder_icon.classList.add("add-link");
  target_elm.parentNode.insertBefore(
    folder_icon,
    target_elm.nextElementSibling
  );

  // クリックのローカルパスのコピー
  document.getElementById("copy_local_link").onclick = function () {
    // パスの取得
    let array_path = [];
    // メニューアイコンの取得
    let menu_elm = document.querySelector(
      "button.ItemListBreadcrumbOverflow-menuButton"
    );

    if (menu_elm === null) {
      // 表示されているパスを読み込み
      visible_path = document.querySelectorAll(
        "ol.ItemListBreadcrumb-list[data-testid=item-list-breadcrumb-list] a.ItemListBreadcrumb-link"
      );
      for (j = 0; j < visible_path.length; j++) {
        array_path.push(visible_path[j].textContent);
      }

      // 最後のパスを読み込み
      last_path = document.querySelectorAll(
        "ol.ItemListBreadcrumb-list[data-testid=item-list-breadcrumb-list] h1.page-title"
      );
      for (kk = 0; kk < last_path.length; kk++) {
        array_path.push(last_path[kk].textContent);
      }
    } else {
      // パス表示メニューを開く
      document
        .querySelector("button.ItemListBreadcrumbOverflow-menuButton")
        .click();

      // 隠れたパスを読み込み
      hidden_path = document.querySelectorAll("a.menu-item");
      for (let i = 0; i < hidden_path.length; i++) {
        array_path.push(hidden_path[i].textContent);
      }

      // 表示されているパスを読み込み
      visible_path = document.querySelectorAll(
        "ol.ItemListBreadcrumb-list[data-testid=item-list-breadcrumb-list] a.ItemListBreadcrumb-link"
      );
      for (let j = 0; j < visible_path.length; j++) {
        array_path.push(visible_path[j].textContent);
      }

      // 最後のパスを読み込み
      last_path = document.querySelectorAll(
        "ol.ItemListBreadcrumb-list[data-testid=item-list-breadcrumb-list] h1.page-title"
      );
      for (let k = 0; k < last_path.length; k++) {
        array_path.push(last_path[k].textContent);
      }

      // パス表示メニューを閉じる
      document
        .querySelector("button.ItemListBreadcrumbOverflow-menuButton")
        .click();
    }

    // 先頭の「すべてのファイル」を削除
    array_path.shift();

    // パスを結合してコピー
    let local_path = base_path + array_path.join("\\");
    GM_setClipboard(local_path);

    // コピー時のテキストの表示および消去を簡素化（タイマーの処理の最適化）
    document.getElementById("copy_message").style.display = "inline";
    setTimeout(function () {
      document.getElementById("copy_message").style.display = "none";
    }, 2000);
  };
});
