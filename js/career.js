// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('progress-bar');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / maxScroll * 100) + '%';
  nav.classList.toggle('scrolled', scrolled > 10);
}, { passive: true });

// ── INTERSECTION OBSERVER (스크롤 페이드인) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-anim], .m-stripe').forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (!target) return;
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const statsBand = document.querySelector('.stats-band');
if (statsBand) counterObserver.observe(statsBand);

// ── LANGUAGE SWITCHER (i18n) ──────────────────────────────────────────────
const i18n = {
  ko: {
    text: {
      '#nav a[href="#about"]':        '소개',
      '#nav a[href="#ventures"]':     '사업',
      '#nav a[href="#career"]':       '이력',
      '#nav a[href="#capabilities"]': '역량',
      '.hero-name':  '최석원',
      '.hero-title': '시스템 설계자',
      '.hero-sub':   '기획 전략 코치 / 억대매출부업',
      '.hero-tags .hero-tag:nth-child(1)': '#셀러',
      '.hero-tags .hero-tag:nth-child(2)': '#크리에이터',
      '.hero-tags .hero-tag:nth-child(3)': '#부업강의',
      '.hero-tags .hero-tag:nth-child(4)': '#AI',
      '.hero-tags .hero-tag:nth-child(5)': '#온라인쇼핑몰',
      '.stat-cell:nth-child(1) .stat-label': '누적 판매 상품 수량',
      '.stat-cell:nth-child(2) .stat-label': '누적 주문 고객 수',
      '.stat-cell:nth-child(3) .stat-label': '누적 판매 매출',
      '.stat-cell:nth-child(4) .stat-label': '주당 부업 투자 시간',
      '.section-about .section-title':        '소개',
      '.section-ventures .section-title':     '사업',
      '.section-career .section-title':       '이력',
      '.section-capabilities .section-title': '역량',
      '.about-body p:nth-child(1)': '월급으로 부족한 자본주의 시대, 해답을 찾습니다.',
      '.about-body p:nth-child(2)': '2020년 퇴근 후 작게 시작한 쇼핑몰을 현재까지 운영하고 있으며, AI가 발전함에 따라 업무시간도 현저히 줄었습니다.',
      '.about-body p:nth-child(3)': 'AI 에이전트의 가치를 보았고, 새로운 사업으로 확장해 나아갑니다.',
      '.venture-cell:nth-child(1) .venture-desc': '2020년 쇼핑몰 개설 이후 현재까지 누적 판매한 상품 수량입니다. 베이킹 전문도구 단일 카테고리에서 높은 재구매율을 기반으로 꾸준히 성장했습니다.',
      '.venture-cell:nth-child(1) .venture-tag':  '쇼핑몰 · 2020~현재',
      '.venture-cell:nth-child(2) .venture-desc': '화이트펭귄을 통해 상품을 주문한 누적 고객 수입니다. 단골 고객 비율이 높으며, 제품 만족도 기반의 자연 성장이 이어지고 있습니다.',
      '.venture-cell:nth-child(2) .venture-tag':  '고객 · 2020~현재',
      '.venture-cell:nth-child(3) .venture-desc': '창업 이후 현재까지의 누적 매출 총액입니다. 공급·물류·CS를 100% 외주화하고 AI 자동화를 도입해, 1인이 운영하는 구조로 달성한 억대 매출입니다.',
      '.venture-cell:nth-child(3) .venture-tag':  '매출 · 2020~현재',
      '.venture-cell:nth-child(4) .venture-desc': '2026년 현재 주 3시간 미만으로 쇼핑몰 전체를 운영하고 있습니다. AI 도구 도입과 시스템화된 프로세스로 본업과의 완전한 병행이 가능한 구조입니다.',
      '.venture-cell:nth-child(4) .venture-tag':  '효율 · 2026',
      '.venture-cell:nth-child(5) .venture-desc': '납품 이력이 있는 B2B 제휴 거래처 수입니다. 카페, 호텔, 출판업체 등 다양한 업종과 협력하며 안정적인 수익 구조를 구축했습니다.',
      '.venture-cell:nth-child(5) .venture-tag':  '제휴 · 2026',
      '.venture-cell:nth-child(6) .venture-desc': '공급·물류·CS를 외주화하고 AI로 반복 업무를 자동화해, 직접 손대지 않아도 돌아가는 구조를 완성했습니다. 본업을 유지하면서 혼자 운영 가능한 완전한 1인 사업 시스템입니다.',
      '.venture-cell:nth-child(6) .venture-tag':  '1인 운영 · 2026',
      '.timeline-item:nth-child(2) .tl-role':    'Founder · CEO',
      '.timeline-item:nth-child(2) .tl-company': '화이트펭귄 (온라인쇼핑몰)',
      '.timeline-item:nth-child(2) .tl-badge':   '창업 · 운영',
      '.timeline-item:nth-child(3) .tl-role':    '크리에이터 · 강사',
      '.timeline-item:nth-child(3) .tl-company': '셀러_리맨',
      '.timeline-item:nth-child(3) .tl-badge':   '크리에이터 · 강의',
      '.timeline-item:nth-child(4) .tl-role':    'AI 강사 · 실무 적용',
      '.timeline-item:nth-child(4) .tl-company': 'AI 에이전트 실무적용',
      '.timeline-item:nth-child(4) .tl-badge':   'AI · 교육',
      '.timeline-item:nth-child(5) .tl-role':    '개인 투자자',
      '.timeline-item:nth-child(5) .tl-company': '주식 · 금융투자',
      '.timeline-item:nth-child(5) .tl-badge':   '투자',
      '.timeline-item:nth-child(6) .tl-role':    '개인 투자자',
      '.timeline-item:nth-child(6) .tl-company': '부동산 투자',
      '.timeline-item:nth-child(6) .tl-badge':   '투자 · 자산',
      '.timeline-item:nth-child(7) .tl-role':    '플레이어 · 전략 연구',
      '.timeline-item:nth-child(7) .tl-company': '롤토체스 (TFT)',
      '.timeline-item:nth-child(7) .tl-badge':   '게임 · 취미',
      '.cap-cell:nth-child(1) .cap-domain': '업무 효율화',
      '.cap-cell:nth-child(2) .cap-domain': '빠른 실행력',
      '.cap-cell:nth-child(3) .cap-domain': '꾸준함',
      '.cap-cell:nth-child(4) .cap-domain': '학습 능력',
      '.cap-cell:nth-child(5) .cap-domain': '네트워킹',
      '.footer-meta':   '가치를 연구하고 개발하는 전략 기획자입니다',
      '.footer-domain': 'seokwonchoi.com · ©2026 Seokwon Choi',
    },
    html: {
      '.about-greeting': '부업하는<br>직장인,<br><em>최석원</em>입니다.',
      '.about-quote p': '"AI는 사람의 일자리를 빼앗는 것이 아니라,<br>그것을 잘 쓰는 사람의 가치를 높이는 것이다"',
      '.about-keywords': '<span class="keyword">부업</span><span class="keyword">시스템</span><span class="keyword">설계자</span><span class="keyword">업무효율</span><span class="keyword">프로세스</span><span class="keyword">AI</span><span class="keyword">셀러</span><span class="keyword">강의</span><span class="keyword">크리에이터</span><span class="keyword">가치</span><span class="keyword">긍정</span><span class="keyword">목표</span>',
      '.timeline-item:nth-child(2) .timeline-period': '2020.02<br>현재<span class="timeline-duration">5년+</span>',
      '.timeline-item:nth-child(3) .timeline-period': '2024.12<br>현재<span class="timeline-duration">6개월+</span>',
      '.timeline-item:nth-child(4) .timeline-period': '2025.01<br>현재<span class="timeline-duration">5개월+</span>',
      '.timeline-item:nth-child(5) .timeline-period': '2015.01<br>현재<span class="timeline-duration">10년+</span>',
      '.timeline-item:nth-child(6) .timeline-period': '2021.01<br>현재<span class="timeline-duration">4년+</span>',
      '.timeline-item:nth-child(7) .timeline-period': '2019.06<br>현재<span class="timeline-duration">6년+</span>',
      '.timeline-item:nth-child(2) .tl-desc': '베이킹 전문도구 단일 카테고리 쇼핑몰 창업 및 운영. 공급·물류·CS를 100% 외주화하고 AI 자동화를 도입해 누적 매출 10억 원 달성. 1인 사업체 최적화로 현재 주 3시간 미만 운영 체계 완성.',
      '.timeline-item:nth-child(3) .tl-desc': '직장인 부업 온라인쇼핑몰 운영 노하우를 콘텐츠화. 실전 셀러 경험 기반 강의 제작 및 커뮤니티 운영. 시스템 자동화·AI 활용 부업 모델을 강의 형태로 전파.',
      '.timeline-item:nth-child(4) .tl-desc': '업무 자동화 및 AI 에이전트 실무 도입 컨설팅. 2025년 사내 AI TFT 팀장을 역임하며 조직 전반의 AI 전환을 주도. 쇼핑몰·사무·기획 업무의 AI 전환 경험을 바탕으로 팀·기업 대상 교육 진행. Claude Code, ChatGPT, Gemini 활용 자동화 파이프라인 구축 강의.',
      '.timeline-item:nth-child(5) .tl-desc': '10년 이상 국내외 주식 시장 직접 투자. 뉴스·공시·실적 분석 기반의 독자적 투자 판단 체계 구축. AI 뉴스레터 서비스를 통한 정보 수집 자동화로 투자 리서치 효율화.',
      '.timeline-item:nth-child(6) .tl-desc': '수도권 중심 부동산 시장 분석 및 실물 투자. 상업용부동산 1개 직접 운영 중이며, 임장·공시지가·정책 흐름 분석을 병행하며 장기 자산 구축 전략을 실행 중. 직장·부업 수익을 실물 자산으로 전환하는 복리 설계.',
      '.timeline-item:nth-child(7) .tl-desc': '팀파이트 택틱스(TFT) 6년 이상 플레이, 마스터 티어 10회 이상 달성. 확률·기댓값·밴픽 전략 분석 습관이 사업 의사결정과 투자 리스크 관리로 이어지는 사고 훈련. 전략 게임 특유의 상황 적응력을 실무에 응용.',
      '.cap-cell:nth-child(1) .cap-items': '<li>AI 도입 후 작업시간 80% 단축</li><li>5년 이상 1인 완전 운영</li><li>본업·부업 완전 병행 체계</li><li>SOP 및 반복 업무 자동화</li><li>주 3시간 이하 쇼핑몰 운영</li>',
      '.cap-cell:nth-child(2) .cap-items': '<li>아이디어 → 런칭 1개월 미만</li><li>실패 프로젝트 10개+ 경험 보유</li><li>소규모 테스트 → 검증 → 확장</li><li>즉시 프로토타이핑 능력</li><li>데이터 기반 빠른 피벗</li>',
      '.cap-cell:nth-child(3) .cap-items': '<li>창업 이후 매년 매출 성장</li><li>6개월 이상 지속 운영 원칙</li><li>BEP 달성 후 확장 원칙 준수</li><li>5년+ 동일 카테고리 집중</li><li>장기 복리 사고 기반 의사결정</li>',
      '.cap-cell:nth-child(4) .cap-items': '<li>AI 신기술 즉시 실무 적용</li><li>상위 셀러 전략 벤치마킹</li><li>셀러 커뮤니티 지속 참여</li><li>사내 AI TFT 팀장 역임</li><li>자기계발 교육 꾸준히 수강</li>',
      '.cap-cell:nth-child(5) .cap-items': '<li>B2B 제휴 거래처 100여 곳</li><li>출판사·인플루언서·유튜버 협업</li><li>셀러 커뮤니티 운영 경험</li><li>강의 수강생 네트워크 구축</li><li>카페·호텔·업체 다업종 협력</li>',
    }
  },
  en: {
    text: {
      '#nav a[href="#about"]':        'About',
      '#nav a[href="#ventures"]':     'Ventures',
      '#nav a[href="#career"]':       'Career',
      '#nav a[href="#capabilities"]': 'Capabilities',
      '.hero-name':  'Seokwon Choi',
      '.hero-title': 'System Architect',
      '.hero-sub':   'Strategy Coach / 1B+ Side Business',
      '.hero-tags .hero-tag:nth-child(1)': '#Seller',
      '.hero-tags .hero-tag:nth-child(2)': '#Creator',
      '.hero-tags .hero-tag:nth-child(3)': '#SideBiz',
      '.hero-tags .hero-tag:nth-child(4)': '#AI',
      '.hero-tags .hero-tag:nth-child(5)': '#eCommerce',
      '.stat-cell:nth-child(1) .stat-label': 'Total Products Sold',
      '.stat-cell:nth-child(2) .stat-label': 'Total Customers',
      '.stat-cell:nth-child(3) .stat-label': 'Total Revenue',
      '.stat-cell:nth-child(4) .stat-label': 'Weekly Hours on Side Biz',
      '.section-about .section-title':        'About',
      '.section-ventures .section-title':     'Ventures',
      '.section-career .section-title':       'Career',
      '.section-capabilities .section-title': 'Capabilities',
      '.about-body p:nth-child(1)': 'In an era where a salary alone falls short, I went looking for answers.',
      '.about-body p:nth-child(2)': 'Since 2020, I\'ve run an online shop after work hours. As AI has advanced, my operational time has dropped dramatically.',
      '.about-body p:nth-child(3)': 'I saw the value of AI agents and am now expanding into new business ventures.',
      '.venture-cell:nth-child(1) .venture-desc': 'Total units sold since the shop launched in 2020. Steady growth driven by high repeat-purchase rates in a single baking tools category.',
      '.venture-cell:nth-child(1) .venture-tag':  'Shop · 2020–Present',
      '.venture-cell:nth-child(2) .venture-desc': 'Cumulative number of customers who have ordered through White Penguin. High loyalty base, with natural growth driven by product satisfaction.',
      '.venture-cell:nth-child(2) .venture-tag':  'Customers · 2020–Present',
      '.venture-cell:nth-child(3) .venture-desc': 'Total revenue since founding. Achieved through 100% outsourcing of supply, logistics, and CS — combined with AI automation — as a fully solo-operated business.',
      '.venture-cell:nth-child(3) .venture-tag':  'Revenue · 2020–Present',
      '.venture-cell:nth-child(4) .venture-desc': 'As of 2026, the entire shop runs on under 3 hours per week. AI tools and systematized processes make full parallel operation with a day job possible.',
      '.venture-cell:nth-child(4) .venture-tag':  'Efficiency · 2026',
      '.venture-cell:nth-child(5) .venture-desc': 'B2B partner businesses with active supply history — cafés, hotels, publishers and more — providing a stable recurring revenue base.',
      '.venture-cell:nth-child(5) .venture-tag':  'Partnerships · 2026',
      '.venture-cell:nth-child(6) .venture-desc': 'Outsourced supply, logistics, and CS; automated repetitive tasks with AI. Built a system that runs without direct involvement — a complete solo-operated business designed to work alongside a full-time job.',
      '.venture-cell:nth-child(6) .venture-tag':  'Solo Operation · 2026',
      '.timeline-item:nth-child(2) .tl-role':    'Founder · CEO',
      '.timeline-item:nth-child(2) .tl-company': 'White Penguin (Online Shop)',
      '.timeline-item:nth-child(2) .tl-badge':   'Founded · Operated',
      '.timeline-item:nth-child(3) .tl-role':    'Creator · Educator',
      '.timeline-item:nth-child(3) .tl-company': 'Seller_Reman',
      '.timeline-item:nth-child(3) .tl-badge':   'Creator · Education',
      '.timeline-item:nth-child(4) .tl-role':    'AI Instructor · Practitioner',
      '.timeline-item:nth-child(4) .tl-company': 'AI Agent — Applied Practice',
      '.timeline-item:nth-child(4) .tl-badge':   'AI · Education',
      '.timeline-item:nth-child(5) .tl-role':    'Individual Investor',
      '.timeline-item:nth-child(5) .tl-company': 'Stock · Financial Investment',
      '.timeline-item:nth-child(5) .tl-badge':   'Investment',
      '.timeline-item:nth-child(6) .tl-role':    'Individual Investor',
      '.timeline-item:nth-child(6) .tl-company': 'Real Estate Investment',
      '.timeline-item:nth-child(6) .tl-badge':   'Investment · Assets',
      '.timeline-item:nth-child(7) .tl-role':    'Player · Strategy Research',
      '.timeline-item:nth-child(7) .tl-company': 'Teamfight Tactics (TFT)',
      '.timeline-item:nth-child(7) .tl-badge':   'Gaming · Hobby',
      '.cap-cell:nth-child(1) .cap-domain': 'Work Efficiency',
      '.cap-cell:nth-child(2) .cap-domain': 'Fast Execution',
      '.cap-cell:nth-child(3) .cap-domain': 'Consistency',
      '.cap-cell:nth-child(4) .cap-domain': 'Learning Ability',
      '.cap-cell:nth-child(5) .cap-domain': 'Networking',
      '.footer-meta':   'Strategy thinker who researches and builds value',
      '.footer-domain': 'seokwonchoi.com · ©2026 Seokwon Choi',
    },
    html: {
      '.about-greeting': 'Side business<br>professional,<br><em>Seokwon Choi</em>.',
      '.about-quote p': '"AI doesn\'t steal people\'s jobs —<br>it amplifies the value of those<br>who know how to use it."',
      '.about-keywords': '<span class="keyword">Side Biz</span><span class="keyword">Systems</span><span class="keyword">Architect</span><span class="keyword">Efficiency</span><span class="keyword">Process</span><span class="keyword">AI</span><span class="keyword">Seller</span><span class="keyword">Educator</span><span class="keyword">Creator</span><span class="keyword">Value</span><span class="keyword">Positive</span><span class="keyword">Goals</span>',
      '.timeline-item:nth-child(2) .timeline-period': '2020.02<br>Present<span class="timeline-duration">5 yrs+</span>',
      '.timeline-item:nth-child(3) .timeline-period': '2024.12<br>Present<span class="timeline-duration">6 mos+</span>',
      '.timeline-item:nth-child(4) .timeline-period': '2025.01<br>Present<span class="timeline-duration">5 mos+</span>',
      '.timeline-item:nth-child(5) .timeline-period': '2015.01<br>Present<span class="timeline-duration">10 yrs+</span>',
      '.timeline-item:nth-child(6) .timeline-period': '2021.01<br>Present<span class="timeline-duration">4 yrs+</span>',
      '.timeline-item:nth-child(7) .timeline-period': '2019.06<br>Present<span class="timeline-duration">6 yrs+</span>',
      '.timeline-item:nth-child(2) .tl-desc': 'Founded and operates a single-category baking tools online shop. 100% outsourced supply, logistics, and CS — combined with AI automation — drove 1B+ KRW in cumulative revenue. Optimized for solo operation; now runs on under 3 hours/week.',
      '.timeline-item:nth-child(3) .tl-desc': 'Turned hands-on seller experience into content. Produces courses on running an online shop as a side business and manages an active community. Advocates AI + automation as the foundation of a scalable side income model.',
      '.timeline-item:nth-child(4) .tl-desc': 'Consulting on AI agent adoption for real-world workflows. Served as AI TFT Team Lead in 2025, driving company-wide AI transformation. Delivers training on Claude Code, ChatGPT, and Gemini for automating shop, admin, and planning tasks.',
      '.timeline-item:nth-child(5) .tl-desc': 'Direct investment in domestic and international equities for 10+ years. Built an independent investment framework based on news, disclosures, and earnings analysis. Automated research pipeline via AI newsletter service.',
      '.timeline-item:nth-child(6) .tl-desc': 'Real estate analysis and direct investment centered on the Seoul metro area. Currently operating one commercial property. Runs parallel to work and side businesses as part of a long-term compounding asset strategy.',
      '.timeline-item:nth-child(7) .tl-desc': '6+ years in Teamfight Tactics (TFT); achieved Master tier 10+ times. Probability, expected value, and adaptive strategy thinking — habits formed here carry directly into business decisions and investment risk management.',
      '.cap-cell:nth-child(1) .cap-items': '<li>80% reduction in task time after AI adoption</li><li>5+ years solo operation</li><li>Full parallel with day job</li><li>SOP and repetitive task automation</li><li>Shop runs on under 3 hrs/week</li>',
      '.cap-cell:nth-child(2) .cap-items': '<li>Idea → Launch in under 1 month</li><li>10+ failed projects — learned fast</li><li>Small test → Validate → Scale</li><li>Rapid prototyping ability</li><li>Data-driven pivoting</li>',
      '.cap-cell:nth-child(3) .cap-items': '<li>Revenue growth every year since founding</li><li>6+ month sustained operation rule</li><li>Expand only after BEP is reached</li><li>5+ years focused on one category</li><li>Long-term compounding mindset</li>',
      '.cap-cell:nth-child(4) .cap-items': '<li>Immediately applies new AI to real work</li><li>Benchmarks top sellers\' strategies</li><li>Active in seller communities</li><li>Led company AI TFT team</li><li>Continuous self-development learner</li>',
      '.cap-cell:nth-child(5) .cap-items': '<li>100+ B2B partner businesses</li><li>Collaborates with publishers, influencers & YouTubers</li><li>Managed a seller community</li><li>Extensive student network from courses</li><li>Cross-industry partnerships</li>',
    }
  }
};

function applyLang(lang) {
  const t = i18n[lang];
  Object.entries(t.text).forEach(([sel, val]) => {
    document.querySelectorAll(sel).forEach(el => { el.textContent = val; });
  });
  Object.entries(t.html).forEach(([sel, val]) => {
    document.querySelectorAll(sel).forEach(el => { el.innerHTML = val; });
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
  localStorage.setItem('lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// 저장된 언어 적용 (기본: 한국어)
applyLang(localStorage.getItem('lang') || 'ko');
