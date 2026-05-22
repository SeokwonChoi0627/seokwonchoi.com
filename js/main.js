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
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
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

// ── LANGUAGE SWITCHER (i18n) ─────────────────────────────────────────────
const i18n = {
  ko: {
    text: {
      '#nav a[href="#about"]':        '소개',
      '#nav a[href="#achievements"]': '성과',
      '#nav a[href="#career"]':       '경력',
      '#nav a[href="#capabilities"]': '역량',
      '.hero-title': '재경·기획·전략 시니어 | 삼천리그룹 11년',
      '.hero-edu':   '서강대학교 경영학과 졸업',
      '.hero-tags .hero-tag:nth-child(1)': '#재경',
      '.hero-tags .hero-tag:nth-child(2)': '#기획',
      '.hero-tags .hero-tag:nth-child(3)': '#전략',
      '.hero-tags .hero-tag:nth-child(5)': '#예산관리',
      '.stat-cell:nth-child(1) .stat-label': '삼천리그룹 근속',
      '.stat-cell:nth-child(2) .stat-label': '법인세 환급 달성',
      '.stat-cell:nth-child(3) .stat-label': '영업이익 성장 기여',
      '.stat-cell:nth-child(3) .stat-sub':   '매출↑ 판관비↓ 동시 달성',
      '.stat-cell:nth-child(4) .stat-label': '정기 세무조사 수검',
      '.section-about .section-title':        '소개',
      '.section-achievements .section-title': '핵심 성과',
      '.achievement-cell:nth-child(1) .achievement-tag': '세무 · 2024',
      '.achievement-cell:nth-child(2) .achievement-tag': '기획 · 2025',
      '.achievement-cell:nth-child(3) .achievement-tag': '세무조사 · 2019',
      '.achievement-cell:nth-child(4) .achievement-tag': '시스템 · 2023',
      '.achievement-cell:nth-child(5) .achievement-tag': '세무조사 · 2024',
      '.achievement-cell:nth-child(6) .achievement-tag': '성장 · 2017–2025',
      '.cap-cell:nth-child(1) .cap-domain': '재무·세무 / Tax',
      '.cap-cell:nth-child(2) .cap-domain': '기획·예산 / Planning',
      '.cap-cell:nth-child(3) .cap-domain': '전략·분석 / Strategy',
      '.cap-cell:nth-child(4) .cap-domain': '시스템·AI / IT & AI',
      '.timeline-item:nth-child(2) .tl-company': '삼천리그룹 · 삼천리모터스 전략본부 전략팀 과장',
      '.timeline-item:nth-child(3) .tl-company': '삼천리그룹 · 삼천리모터스 기획팀 과장 (재경 병행)',
      '.timeline-item:nth-child(4) .tl-company': '삼천리그룹 · 삼천리모터스 재경팀 과장',
      '.timeline-item:nth-child(5) .tl-company': '삼천리그룹 · 에스파워 경영지원팀',
      '.timeline-item:nth-child(2) .tl-badge': '전략',
      '.timeline-item:nth-child(3) .tl-badge': '기획',
      '.timeline-item:nth-child(4) .tl-badge': '재경',
      '.timeline-item:nth-child(5) .tl-badge': '회계',
      '.footer-meta':   'AI 역량 보유 · Claude 활용 · Excel 고급',
      '.footer-domain': 'seokwonchoi.com  ·  ©2026 최석원',
    },
    html: {
      '.timeline-item:nth-child(2) .timeline-period': '2025.12<br>현재<span class="timeline-duration">6개월</span>',
      '.timeline-item:nth-child(3) .timeline-period': '2024.11<br>2025.11<span class="timeline-duration">1년 1개월</span>',
      '.timeline-item:nth-child(4) .timeline-period': '2017.06<br>2024.10<span class="timeline-duration">7년 5개월</span>',
      '.timeline-item:nth-child(5) .timeline-period': '2015.03<br>2017.05<span class="timeline-duration">2년 3개월</span>',
      '.about-greeting': '방문해주셔서<br>감사합니다.<br>저는 <em>최석원</em>입니다.',
      '.about-body p:nth-child(1)': '삼천리그룹에서 11년을 보내며 <strong>회계 담당자로 시작해 전략 기획자로 성장</strong>했습니다. 발전소 회계에서 BMW 딜러사 재경, 그리고 그룹 본사 전략팀까지 — 매번 새로운 역할을 맡을 때마다 현장의 숫자가 사업의 방향과 어떻게 연결되는지를 직접 경험했습니다.',
      '.about-body p:nth-child(2)': '세무조사 과세전적부심사를 직접 발표하고, 50억 규모의 경정청구를 이끌고, SAP 회계시스템을 처음부터 설계하고, 예산관리 체계를 구축하는 과정에서 저는 <strong>실무의 깊이와 사업 전반을 보는 시야</strong>를 동시에 키워왔습니다.',
      '.about-body p:nth-child(3)': '현재 조직 재편을 계기로, 재경·기획·전략을 통합적으로 활용할 수 있는 새로운 환경에서 다음 도전을 준비하고 있습니다. 이 페이지가 저를 이해하는 데 도움이 되기를 바랍니다.',
      '.about-quote p': '"단일 직무 전문가라기보다,<br>숫자(재경) → 사업(기획) → 방향(전략)으로<br>시야를 확장해온 제너럴리스트에 가깝습니다."',
      '.about-keywords': '<span class="keyword">법인세</span><span class="keyword">부가세</span><span class="keyword">경정청구</span><span class="keyword">세무조사</span><span class="keyword">SAP</span><span class="keyword">예산관리</span><span class="keyword">사업보고</span><span class="keyword">중장기전략</span><span class="keyword">내부통제</span><span class="keyword">시스템구축</span><span class="keyword">M&amp;A 안정화</span><span class="keyword">AI 활용</span>',
      '.achievement-cell:nth-child(1) .achievement-desc': '법인세 경정청구를 통해 중견기업 세액공제 적용을 확정, 중부청 심사 단계까지 대응하여 환급 결정.',
      '.achievement-cell:nth-child(2) .achievement-desc': '매출 7.6% 성장 속 판관비 절감 동시 달성. 비즈플레이 예산관리 시스템 도입·예산통제 프로세스 고도화로 영업이익 +17.7%(YoY) 개선에 기여.',
      '.achievement-cell:nth-child(3) .achievement-desc': '과세전적부심사 PT 발표로 부과세액 1억 5천만원 → 약 2천만원으로 절감. 청주세무서 직접 대응.',
      '.achievement-cell:nth-child(4) .achievement-desc': 'BMW KOREA 딜러사 공통 회계시스템 SAP 도입 주관. 계정 설계부터 마이그레이션까지 전 과정 수행.',
      '.achievement-cell:nth-child(5) .achievement-desc': '당초 2개월 예정 정기 세무조사를 안진회계법인 협업으로 3주 만에 조기 종료.',
      '.achievement-cell:nth-child(6) .achievement-desc': '매출 850억 → 4,500억 이상으로 성장하는 과정을 재경팀 핵심 인원으로 전 기간 주도.',
      '.timeline-item:nth-child(2) .tl-desc': '그룹 모빌리티 사업(BMW·BYD) 중장기 전략 수립, 시너지 모델 검토, 경영진 의사결정 자료 작성. 그룹 부사장과 2인 체제로 출범한 전략본부 멤버.',
      '.timeline-item:nth-child(3) .tl-desc': '전사 예산관리 시스템(비즈플레이) 도입 주관, 월간·분기 BMW 사업보고, 중장기 10년 전략 수립 참여. 매출 7.6% 성장 속 판관비 절감 동시 달성, 영업이익 +17.7%(YoY) 개선에 기여. 예산 고도화 및 비용 효율화 주도.',
      '.timeline-item:nth-child(4) .tl-desc': '세무 총괄(법인세·부가세·지방세), 월결산·감사 대응, SAP 시스템 구축, 내부회계관리제도 도입, 정기 세무조사 3회 수검. 법인세 경정청구 50억 환급.',
      '.timeline-item:nth-child(5) .tl-desc': '안산복합화력발전소(자산 8,500억) 회계·세무·재무 전담. 비정기 세무조사 대응(추징 200억 → 1억 미만), 리파이낸싱(6천억) 지원.',
      '.cap-cell:nth-child(1) .cap-items': '<li>법인세·부가세·원천세 직접 신고</li><li>정기 세무조사 3회 수검 대응</li><li>경정청구 (환급 50억)</li><li>과세전적부심사 PT 직접 수행</li><li>내부회계관리제도 운영</li>',
      '.cap-cell:nth-child(2) .cap-items': '<li>비즈플레이 예산관리 시스템 도입</li><li>월간·분기 BMW 사업보고</li><li>전사 예산통제 프로세스 구축</li><li>중장기 10년 전략 수립 참여</li><li>경영분석 및 KPI 관리</li>',
      '.cap-cell:nth-child(3) .cap-items': '<li>BMW 그룹 사업보고 작성</li><li>중장기 전략 기획</li><li>재무 데이터 기반 경영분석</li><li>딜러사 그룹 수익성 분석</li><li>투자 타당성 검토</li>',
      '.cap-cell:nth-child(4) .cap-items': '<li>SAP 구축 및 안정화 주도</li><li>비즈플레이 도입 주관</li><li>Claude AI 업무 활용</li><li>Excel 고급 (매크로·피벗)</li><li>ERP 마이그레이션 경험</li>',
    }
  },
  en: {
    text: {
      '#nav a[href="#about"]':        'About',
      '#nav a[href="#achievements"]': 'Achievements',
      '#nav a[href="#career"]':       'Career',
      '#nav a[href="#capabilities"]': 'Capabilities',
      '.hero-title': 'Senior Finance · Planning · Strategy | 11 Years at Samchully Group',
      '.hero-edu':   'B.A. Business Administration, Sogang University',
      '.hero-tags .hero-tag:nth-child(1)': '#Finance',
      '.hero-tags .hero-tag:nth-child(2)': '#Planning',
      '.hero-tags .hero-tag:nth-child(3)': '#Strategy',
      '.hero-tags .hero-tag:nth-child(5)': '#Budgeting',
      '.stat-cell:nth-child(1) .stat-label': 'Years at Samchully Group',
      '.stat-cell:nth-child(2) .stat-label': 'Tax Refund Achieved',
      '.stat-cell:nth-child(3) .stat-label': 'Operating Profit Growth',
      '.stat-cell:nth-child(3) .stat-sub':   'Revenue↑ SG&A↓ Simultaneously',
      '.stat-cell:nth-child(4) .stat-label': 'Tax Audits Completed',
      '.section-about .section-title':        'About',
      '.section-achievements .section-title': 'Key Achievements',
      '.achievement-cell:nth-child(1) .achievement-tag': 'Tax · 2024',
      '.achievement-cell:nth-child(2) .achievement-tag': 'Planning · 2025',
      '.achievement-cell:nth-child(3) .achievement-tag': 'Tax Audit · 2019',
      '.achievement-cell:nth-child(4) .achievement-tag': 'System · 2023',
      '.achievement-cell:nth-child(5) .achievement-tag': 'Tax Audit · 2024',
      '.achievement-cell:nth-child(6) .achievement-tag': 'Growth · 2017–2025',
      '.cap-cell:nth-child(1) .cap-domain': 'Finance · Tax',
      '.cap-cell:nth-child(2) .cap-domain': 'Planning · Budget',
      '.cap-cell:nth-child(3) .cap-domain': 'Strategy · Analysis',
      '.cap-cell:nth-child(4) .cap-domain': 'Systems · AI',
      '.timeline-item:nth-child(2) .tl-company': 'Samchully Group · Samchully Motors Strategy Division, Strategy Team — Manager',
      '.timeline-item:nth-child(3) .tl-company': 'Samchully Group · Samchully Motors Planning Team — Manager (Finance concurrent)',
      '.timeline-item:nth-child(4) .tl-company': 'Samchully Group · Samchully Motors Finance & Tax Team — Manager',
      '.timeline-item:nth-child(5) .tl-company': 'Samchully Group · S-Power Business Support Team',
      '.timeline-item:nth-child(2) .tl-badge': 'Strategy',
      '.timeline-item:nth-child(3) .tl-badge': 'Planning',
      '.timeline-item:nth-child(4) .tl-badge': 'Finance',
      '.timeline-item:nth-child(5) .tl-badge': 'Accounting',
      '.footer-meta':   'AI-Proficient · Claude · Advanced Excel',
      '.footer-domain': 'seokwonchoi.com  ·  ©2026 Seokwon Choi',
    },
    html: {
      '.timeline-item:nth-child(2) .timeline-period': '2025.12<br>Present<span class="timeline-duration">6 mos.</span>',
      '.timeline-item:nth-child(3) .timeline-period': '2024.11<br>2025.11<span class="timeline-duration">1 yr 1 mo.</span>',
      '.timeline-item:nth-child(4) .timeline-period': '2017.06<br>2024.10<span class="timeline-duration">7 yrs 5 mos.</span>',
      '.timeline-item:nth-child(5) .timeline-period': '2015.03<br>2017.05<span class="timeline-duration">2 yrs 3 mos.</span>',
      '.about-greeting': 'Thank you for<br>visiting.<br>I\'m <em>Seokwon Choi</em>.',
      '.about-body p:nth-child(1)': 'Over 11 years at Samchully Group, I grew from <strong>an accountant into a strategic planner</strong>. From power plant accounting to BMW dealer finance, and then to the Group\'s Strategy Division — each new role deepened my understanding of how numbers on the ground connect to the direction of the business.',
      '.about-body p:nth-child(2)': 'By personally presenting tax audit defense hearings, leading a &#8361;5 billion corporate tax refund, designing an SAP system from scratch, and building budget management frameworks, I developed both <strong>deep operational expertise and a broad business perspective</strong>.',
      '.about-body p:nth-child(3)': 'Following a recent organizational restructuring, I am seeking a new environment where I can leverage my integrated expertise across finance, planning, and strategy. I hope this page helps you get to know me better.',
      '.about-quote p': '"Rather than a single-discipline specialist,<br>I am a generalist who expanded my view<br>from Numbers (Finance) → Business (Planning) → Direction (Strategy)."',
      '.about-keywords': '<span class="keyword">Corporate Tax</span><span class="keyword">VAT</span><span class="keyword">Tax Refund Claim</span><span class="keyword">Tax Audit</span><span class="keyword">SAP</span><span class="keyword">Budget Mgmt</span><span class="keyword">Business Report</span><span class="keyword">Long-term Strategy</span><span class="keyword">Internal Control</span><span class="keyword">System Implementation</span><span class="keyword">M&amp;A Integration</span><span class="keyword">AI Utilization</span>',
      '.achievement-cell:nth-child(1) .achievement-desc': 'Secured a &#8361;5B corporate tax refund by confirming mid-sized company tax credit eligibility and responding through the Jungbu Regional Tax Office review process.',
      '.achievement-cell:nth-child(2) .achievement-desc': 'Achieved SG&amp;A reduction alongside 7.6% revenue growth. Contributed to +17.7% YoY operating profit improvement by deploying Bizplay budget system and advancing budget control processes.',
      '.achievement-cell:nth-child(3) .achievement-desc': 'Reduced assessed tax from &#8361;150M to approximately &#8361;20M through a pre-assessment review presentation. Directly handled proceedings at Cheongju Tax Office.',
      '.achievement-cell:nth-child(4) .achievement-desc': 'Led the SAP rollout as the shared accounting system for BMW KOREA dealers. Managed the full process from account design to data migration.',
      '.achievement-cell:nth-child(5) .achievement-desc': 'Completed a scheduled 2-month tax audit in just 3 weeks in collaboration with Anjin &amp; Associates.',
      '.achievement-cell:nth-child(6) .achievement-desc': 'Core Finance team member who drove revenue growth from &#8361;85B to over &#8361;450B across the entire period.',
      '.timeline-item:nth-child(2) .tl-desc': 'Led mid to long-term strategy for the Group\'s mobility business (BMW·BYD), reviewed synergy models, and prepared executive decision materials. Founding member of the Strategy Division, a 2-person team with the Group EVP.',
      '.timeline-item:nth-child(3) .tl-desc': 'Spearheaded the company-wide Bizplay budget system rollout, handled monthly/quarterly BMW business reports, and participated in 10-year strategic planning. Achieved SG&amp;A reduction alongside 7.6% revenue growth, contributing to a +17.7% YoY operating profit improvement.',
      '.timeline-item:nth-child(4) .tl-desc': 'Managed all taxation (corporate, VAT, local taxes), monthly closing and external audits, SAP implementation, internal accounting controls, and 3 regular tax audit engagements. Led the &#8361;5B corporate tax refund claim.',
      '.timeline-item:nth-child(5) .tl-desc': 'Sole accounting professional for Ansan Combined Cycle Power Plant (assets &#8361;850B). Reduced an irregular tax assessment from &#8361;20B to under &#8361;100M, and supported a &#8361;600B refinancing process.',
      '.cap-cell:nth-child(1) .cap-items': '<li>Direct filing: Corporate / VAT / Withholding Tax</li><li>3 Regular Tax Audit Engagements</li><li>Tax Refund Claim (&#8361;5B Recovered)</li><li>Pre-assessment Review Presentation</li><li>Internal Accounting Control System</li>',
      '.cap-cell:nth-child(2) .cap-items': '<li>Bizplay Budget System Implementation</li><li>Monthly/Quarterly BMW Business Reports</li><li>Company-wide Budget Control Process</li><li>10-Year Strategic Planning</li><li>Management Analysis &amp; KPI Tracking</li>',
      '.cap-cell:nth-child(3) .cap-items': '<li>BMW Group Business Reporting</li><li>Mid to Long-term Strategy</li><li>Finance-driven Management Analysis</li><li>Dealer Group Profitability Analysis</li><li>Investment Feasibility Review</li>',
      '.cap-cell:nth-child(4) .cap-items': '<li>SAP Implementation &amp; Stabilization</li><li>Bizplay System Rollout</li><li>Claude AI Productivity Tools</li><li>Advanced Excel (Macros · Pivot)</li><li>ERP Migration Experience</li>',
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

// ── EMAILJS 설정 ────────────────────────────────────────────────────────
// 최초 1회 설정 필요:
//  1. https://www.emailjs.com 무료 가입
//  2. Email Services → Add Service → Custom SMTP
//     Host: smtp.naver.com  Port: 465  Security: SSL
//     User: dragon0627@naver.com  Password: 네이버 앱 비밀번호
//  3. Email Templates → Create Template
//     To: dragon0627@naver.com
//     Subject: [포트폴리오 문의] {{subject}}
//     Body: 보내는 분: {{from_name}} / 이메일: {{reply_to}}\n\n{{message}}
//  4. Account → General → Public Key 복사
//  5. 아래 세 상수를 교체하면 바로 동작합니다.
// ────────────────────────────────────────────────────────────────────────
const EJS_PUBLIC_KEY  = 'pGghz9Loz1w-DskFg';
const EJS_SERVICE_ID  = 'service_0m2mkpd';
const EJS_TEMPLATE_ID = 'template_h99mwud';

if (typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: EJS_PUBLIC_KEY });
}

// ── CONTACT MODAL ──
const modal       = document.getElementById('contact-modal');
const btnClose    = document.getElementById('modal-close');
const btnSuccClose= document.getElementById('success-close');
const cfForm      = document.getElementById('contact-form');
const cfFile      = document.getElementById('cf-file');
const cfFileName  = document.getElementById('cf-file-name');
const cfFileClear = document.getElementById('cf-file-clear');
const cfSubmitBtn = document.getElementById('submit-btn');
const cfSubmitLbl = document.getElementById('submit-label');
const cfError     = document.getElementById('form-error');
const cfSuccess   = document.getElementById('form-success');

function openModal() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    cfForm.reset();
    cfForm.style.display = '';
    cfSuccess.style.display = 'none';
    cfError.textContent = '';
    cfFileName.textContent = '선택된 파일 없음';
    cfFileClear.style.display = 'none';
    cfSubmitBtn.disabled = false;
    cfSubmitLbl.textContent = '제출하기';
  }, 350);
}

document.getElementById('contact-trigger').addEventListener('click', e => {
  e.preventDefault();
  openModal();
});
btnClose.addEventListener('click', closeModal);
btnSuccClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// 파일 선택 표시
cfFile.addEventListener('change', () => {
  if (cfFile.files.length) {
    cfFileName.textContent = cfFile.files[0].name;
    cfFileClear.style.display = 'inline';
  }
});
cfFileClear.addEventListener('click', () => {
  cfFile.value = '';
  cfFileName.textContent = '선택된 파일 없음';
  cfFileClear.style.display = 'none';
});

// 폼 제출
cfForm.addEventListener('submit', async e => {
  e.preventDefault();
  cfError.textContent = '';

  // 미설정 안내
  if (EJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    cfError.textContent = 'EmailJS 설정이 필요합니다. js/main.js의 키 3개를 교체해주세요.';
    return;
  }

  // 필수 항목 검사
  const name    = cfForm.from_name.value.trim();
  const email   = cfForm.reply_to.value.trim();
  const subject = cfForm.subject.value.trim();
  const message = cfForm.message.value.trim();
  if (!name || !email || !subject || !message) {
    cfError.textContent = '필수 항목(*)을 모두 입력해주세요.';
    return;
  }

  cfSubmitBtn.disabled = true;
  cfSubmitLbl.textContent = '전송 중…';

  try {
    await emailjs.sendForm(EJS_SERVICE_ID, EJS_TEMPLATE_ID, cfForm);
    cfForm.style.display = 'none';
    cfSuccess.style.display = 'block';
  } catch (err) {
    cfError.textContent = '전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 dragon0627@naver.com으로 직접 연락해 주세요.';
    cfSubmitBtn.disabled = false;
    cfSubmitLbl.textContent = '제출하기';
  }
});
