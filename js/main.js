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
const EJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

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
