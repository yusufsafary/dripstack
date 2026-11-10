(function () {
  var EN = {
    "nav.mint": "Mint", "nav.token": "Token", "nav.skill": "Skill file",
    "hero.kicker": "GENERATIVE ART · 999 WORKS · 24 HOURS",
    "hero.h1": "Drop by drop,<br/><span class=\"hl\">stacked into towers.</span>",
    "hero.lede": "Every Dripstack is a tower of water drops drawn by an on-chain seed at the moment of mint. All paid, nothing free. Supply is 999, the window is 24 hours, first come first served.",
    "board.minted": "Minted", "board.left": "Remaining", "board.phase": "Phase now", "board.clock": "Countdown",
    "hero.note": "Opens 10:00 Shanghai time · 0.00072 BNB per work · No per-wallet limit",
    "hero.cta.mint": "Mint", "hero.cta.token": "$STACK token",
    "mint.kicker": "01 · MINT", "mint.h2": "24 hours, 999 works, first come first served.",
    "mint.p1": "Minting runs in two phases. The first 9 hours are agent priority: only wallets holding an Agent ID can mint. After that every wallet can mint what remains, until 999 are gone or 24 hours end. The price never changes, 0.00072 BNB per work. No free lane, no per-wallet limit.",
    "lane1.h": "Phase one · Agent priority", "lane1.p": "10:00 to 19:00 Shanghai time. Wallets holding an Agent ID mint through their own agent.",
    "lane2.h": "Phase two · Public", "lane2.p": "19:00 to 10:00 next day, Shanghai time. Every wallet can mint the remaining works, while they last.",
    "prompt.label": "AGENT PROMPT · COPY AND SEND TO YOUR AGENT", "prompt.copy": "Copy",
    "fact.supply": "SUPPLY", "fact.price": "PRICE", "fact.window": "WINDOW", "fact.window.v": "24 hours · opens 10:00 Shanghai",
    "fact.classes": "CLASSES", "fact.classes.v": "Drip ±70% · Tower ±27% · Cascade ±3%",
    "tok.kicker": "02 · TOKEN $STACK", "tok.h2": "Works are keys, the token is water.",
    "tok.p1": "$STACK supply is 9,999,999,999. When the NFT window closes, token minting opens in two lanes: holders mint 999,999 STACK per Dripstack work, once per work; wallets without a work mint 99,999 STACK per unit at 0.00072 BNB per unit. Neither lane is free.",
    "tok.p2": "Tomorrow: 9 BNB arrives. Part funds the PancakeSwap liquidity pool, part is airdropped to Dripstack holders. Details only on this site and the official X.",
    "tf.supply": "TOKEN SUPPLY", "tf.holder": "HOLDER MINT", "tf.public": "PUBLIC MINT", "tf.public.v": "99,999 per unit · 0.00072 BNB per unit",
    "tf.open": "TOKEN OPENS", "tf.open.v": "When the NFT window closes · 10:00 Shanghai next day",
    "foot.nft": "NFT contract", "foot.token": "Token contract", "foot.mint": "Token mint contract",
    "foot.note": "Minting runs through your agent. This page is read-only. Times are shown in China Standard Time (Shanghai)."
  };
  var btn = document.getElementById("lang-btn");
  var zhCache = {};
  function apply(lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in zhCache)) zhCache[k] = el.textContent;
      el.textContent = lang === "en" ? (EN[k] || zhCache[k]) : zhCache[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (!(k in zhCache)) zhCache[k] = el.innerHTML;
      el.innerHTML = lang === "en" ? (EN[k] || zhCache[k]) : zhCache[k];
    });
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    btn.textContent = lang === "en" ? "中文" : "EN";
    try { localStorage.setItem("drip-lang", lang); } catch (e) {}
  }
  var cur = "zh";
  try { cur = localStorage.getItem("drip-lang") || "zh"; } catch (e) {}
  if (cur === "en") apply("en");
  btn.addEventListener("click", function () { apply(document.documentElement.lang === "en" ? "zh" : "en"); });
})();
