(function () {
  var NFT = "0x99A279b6c2Fb174ada6AFc95F50e0199b7aD704b";
  var OPEN = 1794276000, PRIO_END = 1794308400, CLOSE = 1794362400;
  var RPCS = ["https://bsc-dataseed.binance.org", "https://bsc-dataseed-public.bnbchain.org"];
  function $(id) { return document.getElementById(id); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtClock(sec) {
    if (sec < 0) sec = 0;
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return pad(h) + ":" + pad(m) + ":" + pad(s);
  }
  function tick() {
    var now = Math.floor(Date.now() / 1000);
    var phase = $("b-phase"), clock = $("b-clock");
    if (!phase || !clock) return;
    var lang = document.documentElement.lang === "en" ? "en" : "zh";
    var T = {
      zh: { pre: "尚未开放", prio: "智能体优先期", pub: "公开阶段", end: "已结束", toOpen: "距开放 ", toPrioEnd: "优先期剩 ", toClose: "距结束 " },
      en: { pre: "Not open yet", prio: "Agent priority", pub: "Public phase", end: "Closed", toOpen: "Opens in ", toPrioEnd: "Priority left ", toClose: "Closes in " }
    }[lang];
    if (now < OPEN) { phase.textContent = T.pre; clock.textContent = T.toOpen + fmtClock(OPEN - now); }
    else if (now < PRIO_END) { phase.textContent = T.prio; clock.textContent = T.toPrioEnd + fmtClock(PRIO_END - now); }
    else if (now < CLOSE) { phase.textContent = T.pub; clock.textContent = T.toClose + fmtClock(CLOSE - now); }
    else { phase.textContent = T.end; clock.textContent = "00:00:00"; }
  }
  async function readMinted() {
    var data = "0xa2309ff8";
    for (var i = 0; i < RPCS.length; i++) {
      try {
        var r = await fetch(RPCS[i], { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to: NFT, data: data }, "latest"] }) });
        var j = await r.json();
        if (j && j.result) {
          var n = parseInt(j.result, 16);
          if ($("b-minted")) $("b-minted").textContent = n.toLocaleString("en-US");
          if ($("b-left")) $("b-left").textContent = (999 - n).toLocaleString("en-US");
          return;
        }
      } catch (e) {}
    }
  }
  var cbtn = $("copy-btn");
  if (cbtn) cbtn.addEventListener("click", function () {
    var t = $("agent-prompt").textContent;
    if (navigator.clipboard) navigator.clipboard.writeText(t);
    cbtn.textContent = document.documentElement.lang === "en" ? "Copied" : "已复制";
    setTimeout(function () { cbtn.textContent = document.documentElement.lang === "en" ? "Copy" : "复制"; }, 1600);
  });
  // rain canvas: falling droplets that stack at the bottom
  var cv = $("rain");
  if (cv) {
    var ctx = cv.getContext("2d"), drops = [], piles = [];
    function size() { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; }
    size(); window.addEventListener("resize", size);
    for (var i = 0; i < 42; i++) drops.push({ x: Math.random(), y: Math.random(), s: 0.002 + Math.random() * 0.006, r: 2 + Math.random() * 4 });
    (function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "rgba(63,210,220,.75)";
      drops.forEach(function (dr) {
        dr.y += dr.s; if (dr.y > 1) { dr.y = -0.02; dr.x = Math.random(); }
        ctx.beginPath(); ctx.ellipse(dr.x * cv.width, dr.y * cv.height, dr.r, dr.r * 1.5, 0, 0, 7); ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  }
  tick(); readMinted();
  setInterval(tick, 1000); setInterval(readMinted, 30000);
})();
