(function(){
  "use strict";

  /* 모바일 메뉴 토글 */
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mMenu');
  if (btn && menu) {
    btn.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- 증상 자가진단 위젯 ---------------- */
  var SYMPTOMS = {
    "no-water": {
      title: "물이 아예 안 나옴",
      cause: "모터 소손, 수위 저하, 압력스위치 고장, 배관 누수 중 하나일 가능성이 큽니다.",
      check: "차단기 상태, 모터 작동 소리(웅- 소리 유무), 최근 정전·낙뢰 여부를 먼저 확인해 주세요.",
      action: "전화로 증상을 말씀해 주시면 원인을 먼저 좁혀드리고, 필요한 부품을 챙겨서 방문합니다."
    },
    "weak-water": {
      title: "물이 약하게 나옴 / 압력 부족",
      cause: "압력탱크 공기압 저하, 배관 스케일 축적, 모터 마모로 인한 토출량 감소가 흔한 원인입니다.",
      check: "수압이 서서히 약해졌는지, 특정 수도꼭지에서만 약한지 확인해 주세요.",
      action: "압력탱크 점검부터 시작해 계통 전체를 진단한 뒤 필요한 부분만 정비합니다."
    },
    "noise": {
      title: "모터 소음 · 잦은 재기동",
      cause: "베어링 마모, 임펠러 이물질, 압력스위치 오작동으로 모터가 자주 켜졌다 꺼지는 경우가 많습니다.",
      check: "재기동 간격이 얼마나 짧은지, 소음이 언제부터 시작됐는지 확인해 주세요.",
      action: "모터를 바로 교체하지 않고 절연저항·전류를 측정해 수리 가능 여부부터 판단합니다."
    },
    "breaker": {
      title: "차단기가 자꾸 내려감",
      cause: "누전이나 모터 절연 저하 신호일 수 있어 방치하면 완전 소손으로 이어질 수 있습니다.",
      check: "차단기가 내려가는 시점(모터 기동 시인지, 사용 중인지)을 확인해 주세요.",
      action: "절연저항 측정으로 모터 수명을 먼저 진단하고, 안전을 위해 우선순위로 방문합니다."
    },
    "freeze": {
      title: "동파 · 겨울철 고장",
      cause: "노출 배관이나 압력탱크의 보온이 부족해 한파에 동파되는 경우가 대부분입니다.",
      check: "배관이 얼마나 노출되어 있는지, 이전에도 동파 이력이 있는지 확인해 주세요.",
      action: "파손 부위 수리와 함께 재발 방지를 위한 월동 보온 시공을 함께 안내합니다."
    }
  };

  var symptomButtons = document.querySelectorAll('[data-symptom]');
  var resultTitle = document.getElementById('diagTitle');
  var resultCause = document.getElementById('diagCause');
  var resultCheck = document.getElementById('diagCheck');
  var resultAction = document.getElementById('diagAction');

  function renderSymptom(key){
    var data = SYMPTOMS[key];
    if (!data || !resultTitle) return;
    resultTitle.textContent = data.title;
    resultCause.textContent = data.cause;
    resultCheck.textContent = data.check;
    resultAction.textContent = data.action;
    symptomButtons.forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-symptom') === key);
    });
  }

  symptomButtons.forEach(function(b){
    b.addEventListener('click', function(){
      renderSymptom(b.getAttribute('data-symptom'));
    });
  });

  if (symptomButtons.length) {
    renderSymptom(symptomButtons[0].getAttribute('data-symptom'));
  }

  /* ---------------- 스탯 카운트업 ---------------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var isDecimal = target % 1 !== 0;
        var duration = 900;
        var start = null;

        function step(ts){
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var value = target * progress;
          el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function(el){ io.observe(el); });
  }
})();


(function(){
  "use strict";
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbClose = document.getElementById('lightboxClose');
  if (!lb || !lbImg) return;
  function openLightbox(src, alt){ lbImg.src = src; lbImg.alt = alt || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); }
  function closeLightbox(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); lbImg.src=''; }
  document.querySelectorAll('img[data-lightbox]').forEach(function(img){
    img.addEventListener('click', function(){ openLightbox(img.currentSrc || img.src, img.alt); });
  });
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLightbox(); });
})();
