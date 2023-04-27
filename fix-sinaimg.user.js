// ==UserScript==
// @name              修复 P9 的新浪图床跨域问题
// @namespace         https://github.com/ctgnauh/p9-sinaimg-fixer.user.js
// @version           0.1
// @description       修复微博图片在第三方网站上无法正常显示的问题
// @author            itorr, ctgnauh
// @license           MIT
// @match             https://psnine.com/*
// @icon              https://psnine.com/favicon.ico
// @run-at            document-end
// @grant             GM_xmlhttpRequest
// @supportURL        https://github.com/ctgnauh/p9-sinaimg-fixer.user.js/issues
// ==/UserScript==

(function() {
    'use strict';

    const isSinaImageRegex = /^https?:\/\/([^/]+\.|)sinaimg\.cn\//;

    const fixSinaImages = () => {
        document.querySelectorAll('.imgclick').forEach(fixSinaImage);
    };

    const fixSinaImage = el => {
        if (!isSinaImageRegex.test(el.src)) return;
        GM_xmlhttpRequest({
            method: 'GET',
            url: el.src,
            responseType: 'blob',
            headers: {
                referer: 'https://weibo.com/mygroups',
            },
            onload(res) {
                const url = URL.createObjectURL(res.response);
                el.src = url;
            },
        });
        el.removeAttribute('src');
    };

    fixSinaImages();
})();
