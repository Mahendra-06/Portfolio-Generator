const form = document.getElementById("portfolioForm");
const previewFrame = document.getElementById("previewFrame");
const downloadBtn = document.getElementById("downloadBtn");
const importBtn = document.getElementById("importBtn");
const importInput = document.getElementById("importInput");
const copyBtn = document.getElementById("copyBtn");
const demoBtn = document.getElementById("demoBtn");
const resetBtn = document.getElementById("resetBtn");
const statusEl = document.getElementById("status");

const projectsContainer = document.getElementById("projectsContainer");
const addProjectBtn = document.getElementById("addProjectBtn");
const experienceContainer = document.getElementById("experienceContainer");
const addExperienceBtn = document.getElementById("addExperienceBtn");

const removeImageBtn = document.getElementById("removeImageBtn");
const profileImageInput = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");

const nameInput = document.getElementById("name");
const bioInput = document.getElementById("bio");
const skillsInput = document.getElementById("skills");
const contactInput = document.getElementById("contact");
const githubInput = document.getElementById("github");
const linkedinInput = document.getElementById("linkedin");

const nameError = document.getElementById("nameError");
const bioError = document.getElementById("bioError");
const skillsError = document.getElementById("skillsError");
const projectsError = document.getElementById("projectsError");
const experienceError = document.getElementById("experienceError");
const githubError = document.getElementById("githubError");
const linkedinError = document.getElementById("linkedinError");

const bioHint = document.getElementById("bioHint");
const skillsHint = document.getElementById("skillsHint");
const contactHint = document.getElementById("contactHint");

const STORAGE_KEY = "portfolio_builder_form_v2";

const DEFAULT_ANIME_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1b2947"/><stop offset="100%" stop-color="#405d90"/></linearGradient><linearGradient id="hair" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f1530"/><stop offset="100%" stop-color="#20294f"/></linearGradient></defs><rect width="800" height="1000" fill="url(#bg)"/><circle cx="400" cy="360" r="180" fill="#f7d7c4"/><path d="M215 395c15-170 115-245 185-245s170 75 185 245c-40-42-95-67-185-67s-145 25-185 67z" fill="url(#hair)"/><path d="M240 365c0-126 75-250 160-250-58 38-90 110-95 180-18 10-42 32-65 70z" fill="#101735"/><path d="M560 365c0-126-75-250-160-250 58 38 90 110 95 180 18 10 42 32 65 70z" fill="#101735"/><ellipse cx="338" cy="350" rx="24" ry="14" fill="#20284a"/><ellipse cx="462" cy="350" rx="24" ry="14" fill="#20284a"/><circle cx="338" cy="346" r="6" fill="#f7faff"/><circle cx="462" cy="346" r="6" fill="#f7faff"/><path d="M350 430c18 20 82 20 100 0" stroke="#cf6c7b" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M292 523h216l34 260H258z" fill="#273961"/><path d="M265 650c45-35 95-53 135-53s90 18 135 53" stroke="#7ba2ff" stroke-width="8" fill="none" opacity=".65"/></svg>`
  );

const DEFAULT_PROFILE_IMAGES = { "1": DEFAULT_ANIME_IMAGE, "2": DEFAULT_ANIME_IMAGE, "3": DEFAULT_ANIME_IMAGE, "4": DEFAULT_ANIME_IMAGE };

const template1 = `
<section class="portfolio-shell t1-split">
  <style>
    .t1-split{max-width:1180px;padding:.85rem;background:#1f1f22;border-radius:14px;border:1px solid #3b3b40}
    .t1-surface{background:#111;border-radius:12px;overflow:hidden}
    .t1-top{position:relative;display:grid;grid-template-columns:1fr 1fr;min-height:530px}
    .t1-left{background:#d8d8d8;clip-path:polygon(0 0,100% 0,82% 100%,0 100%);padding:1.5rem 5.6rem 2rem 2rem;display:flex;flex-direction:column;justify-content:space-between}
    .t1-nav{display:flex;align-items:center;justify-content:space-between;gap:1rem}
    .t1-mark{font-weight:900;font-size:1.18rem;letter-spacing:.08em;color:#111}
    .t1-links{display:flex;gap:1.15rem}
    .t1-links a{color:#111;font-size:.83rem;font-weight:700}
    .t1-cta{padding:.45rem .9rem;border-radius:999px;background:#f0f0f0;color:#0f0f0f;font-size:.77rem;font-weight:800}
    .t1-intro{padding-top:1.2rem;max-width:min(560px,78%)}
    .t1-intro p{margin:0}
    .t1-hi{font-size:2.15rem;font-weight:700;color:#111}
    .t1-name{margin:.42rem 0 0;font-size:clamp(2.2rem,5vw,4rem);line-height:1.03;color:#111;max-width:100%;overflow-wrap:anywhere}
    .t1-role{margin:.35rem 0 0;color:#707070;font-weight:800;font-size:1.06rem}
    .t1-bio{margin:.7rem 0 0;max-width:100%;color:#585858;line-height:1.7;font-size:.95rem}
    .t1-social{margin-top:1.15rem;display:flex;gap:.55rem;flex-wrap:wrap}
    .t1-social a{display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:42px;padding:0 .68rem;border-radius:6px;background:#efefef;border:1px solid #cfcfcf;color:#111;font-size:.77rem;font-weight:800}
    .t1-photo{position:relative;background:#050505}
    .t1-photo img{position:absolute;right:0;bottom:0;width:min(95%,540px);height:100%;object-fit:contain}
    .t1-body{padding:.8rem;background:#f6f8fc}
    @media(max-width:960px){.t1-top{grid-template-columns:1fr}.t1-left{clip-path:none}.t1-nav{flex-wrap:wrap}.t1-links{order:2;width:100%;overflow:auto}.t1-photo{min-height:350px}.t1-photo img{position:static;width:100%;height:100%;object-fit:cover}}
  </style>
  <div class="t1-surface">
    <section id="about" class="t1-top">
      <div class="t1-left">
        <header class="t1-nav">
          <a class="t1-mark" href="#about">TG</a>
          <nav class="t1-links">
            <a href="#about">About me</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Portfolio</a>
          </nav>
          <a class="t1-cta" href="#contact">Contact Me</a>
        </header>
        <div class="t1-intro">
          <p class="t1-hi">Hi, I am</p>
          <h1 class="t1-name">{{name}}</h1>
          <p class="t1-role">Front-end Developer / UI Designer</p>
          <p class="t1-bio">{{bio}}</p>
          <div class="t1-social">{{socialLinks}}</div>
        </div>
      </div>
      <aside class="t1-photo"><img src="{{profileImage}}" alt="Profile photo" /></aside>
    </section>
    <div class="t1-body">
      <section id="skills" class="content-block reveal"><h2>Skills</h2><ul class="skill-list">{{skills}}</ul></section>
      <section id="experience" class="content-block reveal"><h2>Experience</h2><div class="experience-wrap">{{experience}}</div></section>
      <section id="projects" class="content-block reveal"><h2>Projects</h2><div class="projects-wrap">{{projects}}</div></section>
      <section id="contact" class="content-block reveal"><h2>Contact</h2><p class="contact-lines">{{contact}}</p></section>
    </div>
  </div>
</section>`;

const template2 = `
<section class="portfolio-shell t2">
  <header class="site-header">
    <a class="logo-mark" href="#">{{name}}</a>
    <nav class="site-nav">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
    <a class="header-cta" href="#contact">Reach Out</a>
  </header>
  <section id="about" class="hero-section reveal">
    <div class="hero-text">
      <p class="kicker">Frontend Engineer</p>
      <h1>{{name}}</h1>
      <p class="hero-bio">{{bio}}</p>
      <div class="social-links">{{socialLinks}}</div>
      <div class="hero-actions">
        <a class="btn-solid" href="#projects">See Work</a>
        <a class="btn-ghost" href="#experience">Experience</a>
      </div>
    </div>
    <aside class="portrait-panel"><img src="{{profileImage}}" alt="Profile photo" /></aside>
  </section>
  <section id="skills" class="content-block reveal"><h2>Skills</h2><div class="chips">{{skills}}</div></section>
  <section id="experience" class="content-block reveal"><h2>Experience</h2><div class="experience-wrap">{{experience}}</div></section>
  <section id="projects" class="content-block reveal"><h2>Case Studies</h2><div class="projects-wrap">{{projects}}</div></section>
  <section id="contact" class="content-block reveal"><h2>Contact</h2><p class="contact-lines">{{contact}}</p></section>
</section>`;

const template3 = `
<section class="portfolio-shell t3">
  <header class="site-header">
    <a class="logo-mark" href="#">{{name}}</a>
    <nav class="site-nav">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
    <a class="header-cta" href="#contact">Contact</a>
  </header>
  <section id="about" class="content-block reveal" style="display:grid;grid-template-columns:1.1fr 300px;gap:0.85rem;align-items:center;">
    <div>
      <p class="kicker">Product-Focused Developer</p>
      <h1>{{name}}</h1>
      <p class="hero-bio">{{bio}}</p>
      <div class="social-links" style="margin-top:0.7rem;">{{socialLinks}}</div>
    </div>
    <div class="portrait-panel" style="min-height:260px;"><img src="{{profileImage}}" alt="Profile photo" /></div>
  </section>
  <section id="skills" class="content-block reveal"><h2>Tech Stack</h2><div class="chips">{{skills}}</div></section>
  <section id="experience" class="content-block reveal"><h2>Experience</h2><div class="experience-wrap">{{experience}}</div></section>
  <section id="projects" class="content-block reveal"><h2>Project Library</h2><div class="projects-wrap">{{projects}}</div></section>
  <section id="contact" class="content-block reveal"><h2>Contact</h2><p class="contact-lines">{{contact}}</p></section>
</section>`;

const template4 = `
<section class="portfolio-shell t4-neon">
  <style>
    .t4-neon{max-width:1160px;background:
      radial-gradient(circle at 20% -10%, rgba(196,62,255,.34), transparent 36%),
      radial-gradient(circle at 85% 4%, rgba(66,129,255,.28), transparent 30%),
      #070a13;border:1px solid rgba(103,113,255,.36);box-shadow:0 0 0 1px rgba(163,95,255,.18),0 26px 55px rgba(6,10,20,.66);padding:1.2rem}
    .t4-neon .n-wrap{border-radius:18px;border:1px solid rgba(144,157,255,.23);background:linear-gradient(160deg,rgba(7,9,16,.94),rgba(10,15,30,.96));padding:1.05rem}
    .t4-neon .n-nav{display:flex;align-items:center;justify-content:space-between;gap:.8rem;padding:.45rem .6rem;border-radius:999px;border:1px solid rgba(131,147,255,.23);background:rgba(6,9,16,.8)}
    .t4-neon .n-logo{font-weight:800;color:#f4f7ff}
    .t4-neon .n-menu{display:flex;gap:.9rem}
    .t4-neon .n-menu a{color:#aeb7cc;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
    .t4-neon .n-arrow{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(152,166,255,.35);color:#dfe5ff}
    .t4-neon .n-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:1rem;align-items:end;padding:1.15rem .45rem .5rem}
    .t4-neon .n-kicker{margin:0;color:#aeb6c8;font-weight:700;font-size:.71rem;letter-spacing:.12em;text-transform:uppercase}
    .t4-neon .n-title{margin:.4rem 0 0;font-size:clamp(2.2rem,5.2vw,4.2rem);line-height:1;color:#f5f7ff;display:flex;align-items:flex-start;gap:.2rem}
    .t4-neon .n-title i{font-style:normal;color:#ff6e46;font-size:.76em;line-height:.9}
    .t4-neon .n-bio{margin:.7rem 0 0;max-width:560px;color:#9aa7bf;line-height:1.7}
    .t4-neon .n-actions{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.95rem}
    .t4-neon .n-btn{display:inline-flex;align-items:center;justify-content:center;padding:.54rem .9rem;border-radius:999px;border:1px solid rgba(140,155,255,.35);font-size:.78rem;font-weight:700}
    .t4-neon .n-btn--solid{background:linear-gradient(130deg,#ff6d56,#ff9158);border-color:transparent;color:#fff}
    .t4-neon .n-btn--ghost{background:rgba(10,15,30,.72);color:#e6edff}
    .t4-neon .n-photo{min-height:430px;border-radius:16px;overflow:hidden;border:1px solid rgba(123,139,255,.27);background:#0b1020}
    .t4-neon .n-photo img{width:100%;height:100%;object-fit:cover;display:block}    .t4-neon .n-sections{display:grid;grid-template-columns:1fr;gap:.7rem;margin:.95rem .45rem .2rem}
    .t4-neon .n-card{border-radius:14px;border:1px solid rgba(139,155,255,.23);background:rgba(13,19,38,.8);padding:.9rem}
    .t4-neon .n-card h2{color:#f2f5ff;font-size:1.02rem;margin:0 0 .55rem}
    .t4-neon .chips .chip{background:rgba(83,113,255,.18);border-color:rgba(130,153,255,.36);color:#dce6ff}
    .t4-neon .contact-lines{color:#c7d2ea}
    .t4-neon .contact-link{color:#8db2ff}
    .t4-neon .social-link{background:rgba(89,116,255,.2);border-color:rgba(138,160,255,.4);color:#dfe9ff}
    .t4-neon .social-empty{color:#93a1bd}
    @media(max-width:920px){.t4-neon .n-menu{display:none}.t4-neon .n-hero{grid-template-columns:1fr}.t4-neon .n-photo{min-height:300px}}
  </style>
  <div class="n-wrap">
    <header class="n-nav">
      <a class="n-logo" href="#about">{{name}}</a>
      <nav class="n-menu">
        <a href="#projects">Work</a>
        <a href="#about">About</a>
        <a href="#experience">Ventures</a>
        <a href="#skills">Articles</a>
        <a href="#contact">Contact</a>
      </nav>
      <a class="n-arrow" href="#contact" aria-label="Go to contact">↗</a>
    </header>

    <section id="about" class="n-hero">
      <div>
        <p class="n-kicker">Seasoned Product Designer</p>
        <h1 class="n-title">{{name}}<i>+</i></h1>
        <p class="n-bio">{{bio}}</p>
        <div class="social-links" style="margin-top:.75rem">{{socialLinks}}</div>
        <div class="n-actions">
          <a class="n-btn n-btn--solid" href="#projects">Get the portfolio</a>
          <a class="n-btn n-btn--ghost" href="#contact">Contact me</a>
        </div>
      </div>
      <aside class="n-photo"><img src="{{profileImage}}" alt="Profile photo" /></aside>
    </section>
    <section class="n-sections">
      <article id="skills" class="n-card"><h2>Skills</h2><div class="chips">{{skills}}</div></article>
      <article id="projects" class="n-card"><h2>Work</h2><div class="projects-wrap">{{projects}}</div></article>
      <article id="experience" class="n-card"><h2>Experience</h2><div class="experience-wrap">{{experience}}</div></article>
      <article id="contact" class="n-card"><h2>Contact</h2><p class="contact-lines">{{contact}}</p></article>
    </section>
  </div>
</section>`;

const fallbackTemplates = { "1": template3, "2": template2, "3": template1, "4": template4 };
let latestPortfolioHtml = "";
let latestPortfolioState = null;
let templateCache = {};
let debounceId;
let profileImageDataUrl = "";

function escapeHtml(value = "") {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

function setStatus(message) {
  statusEl.textContent = message;
  if (!message) return;
  window.clearTimeout(setStatus.timeoutId);
  setStatus.timeoutId = window.setTimeout(() => { statusEl.textContent = ""; }, 2500);
}

function setFieldError(inputEl, errorEl, message) {
  if (!inputEl || !errorEl) return;
  errorEl.textContent = message;
  inputEl.classList.toggle("is-invalid", Boolean(message));
}

function setCharHint(hintEl, inputEl) {
  if (!hintEl || !inputEl) return;
  const max = Number(inputEl.getAttribute("maxlength")) || 0;
  hintEl.textContent = max ? `${inputEl.value.length}/${max}` : `${inputEl.value.length}`;
}

function updateStaticCharHints() {
  setCharHint(bioHint, bioInput);
  setCharHint(skillsHint, skillsInput);
  setCharHint(contactHint, contactInput);
}

function isValidUrl(urlText) {
  try {
    const parsed = new URL(urlText);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function updateProfilePreview() {
  if (!profileImageDataUrl) {
    profilePreview.hidden = true;
    profilePreview.removeAttribute("src");
    removeImageBtn.disabled = true;
    return;
  }
  profilePreview.src = profileImageDataUrl;
  profilePreview.hidden = false;
  removeImageBtn.disabled = false;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result || "");
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

function clearValidation() {
  setFieldError(nameInput, nameError, "");
  setFieldError(bioInput, bioError, "");
  setFieldError(skillsInput, skillsError, "");
  setFieldError(githubInput, githubError, "");
  setFieldError(linkedinInput, linkedinError, "");
  projectsError.textContent = "";
  experienceError.textContent = "";

  projectsContainer.querySelectorAll(".project-row").forEach((row) => {
    row.querySelector(".project-title").classList.remove("is-invalid");
    row.querySelector(".project-link").classList.remove("is-invalid");
    row.querySelector(".project-prototype-file").classList.remove("is-invalid");
    row.querySelector(".project-error").textContent = "";
  });

  experienceContainer.querySelectorAll(".experience-row").forEach((row) => {
    row.querySelector(".experience-role").classList.remove("is-invalid");
    row.querySelector(".experience-company").classList.remove("is-invalid");
    row.querySelector(".experience-error").textContent = "";
  });
}

function createProjectRow(data = {}) {
  const row = document.createElement("div");
  row.className = "project-row";
  row.innerHTML = `<div class="project-row__head"><p class="project-row__title">Project</p><button type="button" class="btn-delete">Remove</button></div><input type="text" class="project-title" maxlength="80" placeholder="Project title" value="${escapeHtml(data.title || "")}" /><textarea class="project-description" rows="2" maxlength="200" placeholder="Project description">${escapeHtml(data.description || "")}</textarea><p class="char-hint project-desc-hint"></p><input type="text" class="project-tech" maxlength="150" placeholder="Tech stack (comma-separated)" value="${escapeHtml(data.tech || "")}" /><input type="text" class="project-link" placeholder="Project link https://example.com (optional)" value="${escapeHtml(data.link || "")}" /><input type="file" class="project-prototype-file" accept="image/*" /><input type="hidden" class="project-prototype" value="${escapeHtml(data.prototype || "")}" /><img class="project-prototype-preview" alt="Prototype preview" ${data.prototype ? `src="${escapeHtml(data.prototype)}"` : "hidden"} /><p class="field-error project-error" aria-live="polite"></p>`;

  row.querySelector(".btn-delete").addEventListener("click", () => {
    row.remove();
    saveFormState();
    scheduleGenerate();
  });

  const desc = row.querySelector(".project-description");
  const hint = row.querySelector(".project-desc-hint");
  const fileInput = row.querySelector(".project-prototype-file");
  const prototypeValueInput = row.querySelector(".project-prototype");
  const prototypePreview = row.querySelector(".project-prototype-preview");
  const update = () => {
    const max = Number(desc.getAttribute("maxlength")) || 0;
    hint.textContent = `${desc.value.length}/${max}`;
  };
  desc.addEventListener("input", update);
  update();

  fileInput.addEventListener("change", async () => {
    const [file] = fileInput.files || [];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      fileInput.classList.add("is-invalid");
      row.querySelector(".project-error").textContent = "Choose a valid image file.";
      fileInput.value = "";
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      prototypeValueInput.value = dataUrl;
      prototypePreview.src = dataUrl;
      prototypePreview.hidden = false;
      row.querySelector(".project-error").textContent = "";
      fileInput.classList.remove("is-invalid");
      saveFormState();
      scheduleGenerate();
    } catch (error) {
      row.querySelector(".project-error").textContent = "Unable to read prototype image.";
    }
  });

  projectsContainer.appendChild(row);
  return row;
}

function createExperienceRow(data = {}) {
  const row = document.createElement("div");
  row.className = "experience-row";
  row.innerHTML = `<div class="experience-row__head"><p class="experience-row__title">Experience</p><button type="button" class="btn-delete">Remove</button></div><div class="inline-two"><input type="text" class="experience-role" maxlength="70" placeholder="Role" value="${escapeHtml(data.role || "")}" /><input type="text" class="experience-duration" maxlength="40" placeholder="Duration" value="${escapeHtml(data.duration || "")}" /></div><input type="text" class="experience-company" maxlength="80" placeholder="Company" value="${escapeHtml(data.company || "")}" /><textarea class="experience-highlights" rows="2" maxlength="220" placeholder="Highlights / achievements">${escapeHtml(data.highlights || "")}</textarea><p class="char-hint experience-highlight-hint"></p><p class="field-error experience-error" aria-live="polite"></p>`;

  row.querySelector(".btn-delete").addEventListener("click", () => {
    row.remove();
    saveFormState();
    scheduleGenerate();
  });

  const highlights = row.querySelector(".experience-highlights");
  const hint = row.querySelector(".experience-highlight-hint");
  const update = () => {
    const max = Number(highlights.getAttribute("maxlength")) || 0;
    hint.textContent = `${highlights.value.length}/${max}`;
  };
  highlights.addEventListener("input", update);
  update();

  experienceContainer.appendChild(row);
  return row;
}
function getProjectData() {
  return Array.from(projectsContainer.querySelectorAll(".project-row"))
    .map((row) => ({
      title: row.querySelector(".project-title").value.trim(),
      description: row.querySelector(".project-description").value.trim(),
      tech: row.querySelector(".project-tech").value.trim(),
      link: row.querySelector(".project-link").value.trim(),
      prototype: row.querySelector(".project-prototype").value.trim(),
    }))
    .filter((entry) => entry.title || entry.description || entry.tech || entry.link || entry.prototype);
}

function getExperienceData() {
  return Array.from(experienceContainer.querySelectorAll(".experience-row"))
    .map((row) => ({
      role: row.querySelector(".experience-role").value.trim(),
      company: row.querySelector(".experience-company").value.trim(),
      duration: row.querySelector(".experience-duration").value.trim(),
      highlights: row.querySelector(".experience-highlights").value.trim(),
    }))
    .filter((entry) => entry.role || entry.company || entry.duration || entry.highlights);
}

function validateForm(options = {}) {
  const { silent = false } = options;
  clearValidation();

  let isValid = true;
  if (!nameInput.value.trim()) {
    setFieldError(nameInput, nameError, "Name is required.");
    isValid = false;
  }
  if (!bioInput.value.trim()) {
    setFieldError(bioInput, bioError, "Bio is required.");
    isValid = false;
  }
  if (!skillsInput.value.trim()) {
    setFieldError(skillsInput, skillsError, "Add at least one skill.");
    isValid = false;
  }
  if (githubInput.value.trim() && !isValidUrl(githubInput.value.trim())) {
    setFieldError(githubInput, githubError, "Enter a valid GitHub URL (http/https).");
    isValid = false;
  }
  if (linkedinInput.value.trim() && !isValidUrl(linkedinInput.value.trim())) {
    setFieldError(linkedinInput, linkedinError, "Enter a valid LinkedIn URL (http/https).");
    isValid = false;
  }

  const projects = projectsContainer.querySelectorAll(".project-row");
  let hasProject = false;
  projects.forEach((row) => {
    const titleInput = row.querySelector(".project-title");
    const descInput = row.querySelector(".project-description");
    const techInput = row.querySelector(".project-tech");
    const linkInput = row.querySelector(".project-link");
    const prototypeInput = row.querySelector(".project-prototype");
    const prototypeFileInput = row.querySelector(".project-prototype-file");
    const rowError = row.querySelector(".project-error");

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    const tech = techInput.value.trim();
    const link = linkInput.value.trim();
    const prototype = prototypeInput.value.trim();
    if (title || desc || tech || link || prototype) hasProject = true;

    if ((desc || tech || link || prototype) && !title) {
      titleInput.classList.add("is-invalid");
      rowError.textContent = "Add a project title for this entry.";
      isValid = false;
    }
    if (link && !isValidUrl(link)) {
      linkInput.classList.add("is-invalid");
      rowError.textContent = "Project link must start with http:// or https://";
      isValid = false;
    }
    if (prototype && !prototype.startsWith("data:image") && !isValidUrl(prototype)) {
      prototypeFileInput.classList.add("is-invalid");
      rowError.textContent = "Upload a valid prototype image.";
      isValid = false;
    }
  });
  if (!hasProject) {
    projectsError.textContent = "Add at least one project.";
    isValid = false;
  }

  const experiences = experienceContainer.querySelectorAll(".experience-row");
  let hasExperience = false;
  experiences.forEach((row) => {
    const roleInput = row.querySelector(".experience-role");
    const companyInput = row.querySelector(".experience-company");
    const durationInput = row.querySelector(".experience-duration");
    const highlightsInput = row.querySelector(".experience-highlights");
    const rowError = row.querySelector(".experience-error");

    const role = roleInput.value.trim();
    const company = companyInput.value.trim();
    const duration = durationInput.value.trim();
    const highlights = highlightsInput.value.trim();
    if (role || company || duration || highlights) hasExperience = true;

    if ((company || duration || highlights) && !role) {
      roleInput.classList.add("is-invalid");
      rowError.textContent = "Add role for this experience entry.";
      isValid = false;
    }
    if (role && !company) {
      companyInput.classList.add("is-invalid");
      rowError.textContent = "Add company name for this experience entry.";
      isValid = false;
    }
  });
  if (!hasExperience) {
    experienceError.textContent = "Add at least one experience entry.";
    isValid = false;
  }

  if (!isValid && !silent) setStatus("Fix the highlighted fields.");
  return isValid;
}

function getFormData() {
  const formData = new FormData(form);
  return {
    name: escapeHtml((formData.get("name") || "").trim() || "Your Name"),
    bio: escapeHtml((formData.get("bio") || "").trim() || "Write a short professional bio."),
    skillsInput: (formData.get("skills") || "").trim(),
    contactInput: (formData.get("contact") || "").trim(),
    templateId: formData.get("template") || "1",
    profileImage: profileImageDataUrl,
    github: (formData.get("github") || "").trim(),
    linkedin: (formData.get("linkedin") || "").trim(),
    projects: getProjectData().map((item) => ({ title: escapeHtml(item.title), description: escapeHtml(item.description), tech: escapeHtml(item.tech), link: escapeHtml(item.link), prototype: escapeHtml(item.prototype) })),
    experience: getExperienceData().map((item) => ({ role: escapeHtml(item.role), company: escapeHtml(item.company), duration: escapeHtml(item.duration), highlights: escapeHtml(item.highlights) })),
  };
}

function buildCurrentFormState() {
  return {
    name: nameInput.value,
    bio: bioInput.value,
    skills: skillsInput.value,
    github: githubInput.value,
    linkedin: linkedinInput.value,
    contact: contactInput.value,
    template: (new FormData(form).get("template") || "1").toString(),
    profileImage: profileImageDataUrl,
    projects: getProjectData(),
    experience: getExperienceData(),
  };
}

function attachEditableStateToHtml(html, state) {
  const json = JSON.stringify(state || {}).replace(/</g, "\\u003c");
  const tag = `<script id="portfolioBuilderState" type="application/json">${json}</script>`;
  if (html.includes("</body>")) return html.replace("</body>", `${tag}</body>`);
  return `${html}${tag}`;
}

function applyImportedState(state) {
  if (!state || typeof state !== "object") throw new Error("Invalid imported data.");

  nameInput.value = (state.name || "").toString();
  bioInput.value = (state.bio || "").toString();
  skillsInput.value = (state.skills || "").toString();
  githubInput.value = (state.github || "").toString();
  linkedinInput.value = (state.linkedin || "").toString();
  contactInput.value = (state.contact || "").toString();

  const templateId = (state.template || "1").toString();
  const radio = form.querySelector(`input[name="template"][value="${templateId}"]`);
  if (radio) radio.checked = true;

  profileImageDataUrl = typeof state.profileImage === "string" ? state.profileImage : "";
  profileImageInput.value = "";
  updateProfilePreview();

  projectsContainer.innerHTML = "";
  if (Array.isArray(state.projects) && state.projects.length) {
    state.projects.forEach((project) => createProjectRow(project));
  } else {
    createProjectRow();
  }

  experienceContainer.innerHTML = "";
  if (Array.isArray(state.experience) && state.experience.length) {
    state.experience.forEach((entry) => createExperienceRow(entry));
  } else {
    createExperienceRow();
  }

  clearValidation();
  updateStaticCharHints();
}

function cleanInlineText(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function cleanMultilineText(value = "") {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function textWithBreaks(node) {
  if (!node) return "";
  const clone = node.cloneNode(true);
  clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
  return cleanMultilineText(clone.textContent || "");
}

function extractImportedStateFallback(doc) {
  const bodyTemplate = (doc.body?.getAttribute("data-template") || "").trim();
  const template = ["1", "2", "3", "4"].includes(bodyTemplate) ? bodyTemplate : "1";

  const skillNodes = Array.from(doc.querySelectorAll("#skills .chip, #skills li, .skill-list li, .chips .chip"));
  const skills = [...new Set(
    skillNodes
      .map((node) => cleanInlineText(node.textContent || ""))
      .filter(Boolean)
      .filter((text) => !/^add your skills$/i.test(text))
  )].join(", ");

  const projects = Array.from(doc.querySelectorAll(".project-item")).map((card) => {
    const title = cleanInlineText(card.querySelector("h3")?.textContent || "");
    const description = cleanInlineText(card.querySelector("p")?.textContent || "");
    const link = (card.querySelector("a[href]")?.getAttribute("href") || "").trim();
    const tech = Array.from(card.querySelectorAll(".chip"))
      .map((chip) => cleanInlineText(chip.textContent || ""))
      .filter(Boolean)
      .join(", ");
    const prototype = (card.querySelector("img.project-prototype-image")?.getAttribute("src") || "").trim();
    return { title, description, tech, link, prototype };
  }).filter((item) => item.title || item.description || item.tech || item.link || item.prototype);

  const experience = Array.from(doc.querySelectorAll(".experience-item")).map((card) => {
    const heading = cleanInlineText(card.querySelector("h3")?.textContent || "");
    const [rolePart, companyPart] = heading.split(" - ");
    const role = cleanInlineText(rolePart || "");
    const company = cleanInlineText(companyPart || "");
    const duration = cleanInlineText(card.querySelector(".experience-duration")?.textContent || "");
    const highlights = cleanInlineText(card.querySelector("p")?.textContent || "");
    return { role, company, duration, highlights };
  }).filter((item) => item.role || item.company || item.duration || item.highlights);

  const contactNode = doc.querySelector("#contact .contact-lines, .contact-lines, #contact");
  const profileNode = doc.querySelector(".portrait-panel img, .t1-photo img, .n-photo img");

  return {
    name: cleanInlineText(doc.querySelector("h1")?.textContent || ""),
    bio: cleanInlineText(doc.querySelector(".hero-bio, .t1-bio, .n-bio, p[class*='bio']")?.textContent || ""),
    skills,
    github: (doc.querySelector('a[href*="github.com"]')?.getAttribute("href") || "").trim(),
    linkedin: (doc.querySelector('a[href*="linkedin.com"]')?.getAttribute("href") || "").trim(),
    contact: textWithBreaks(contactNode),
    template,
    profileImage: (profileNode?.getAttribute("src") || "").trim(),
    projects,
    experience,
  };
}

async function importPortfolioFromFile(file) {
  const text = await file.text();
  const doc = new DOMParser().parseFromString(text, "text/html");
  const stateNode = doc.getElementById("portfolioBuilderState");
  let parsedState;
  let mode = "full";

  if (stateNode) {
    try {
      parsedState = JSON.parse(stateNode.textContent || "{}");
    } catch (error) {
      parsedState = extractImportedStateFallback(doc);
      mode = "fallback";
    }
  } else {
    parsedState = extractImportedStateFallback(doc);
    mode = "fallback";
  }

  const hasUsefulData =
    parsedState &&
    (parsedState.name ||
      parsedState.bio ||
      parsedState.skills ||
      (Array.isArray(parsedState.projects) && parsedState.projects.length) ||
      (Array.isArray(parsedState.experience) && parsedState.experience.length));
  if (!hasUsefulData) throw new Error("Could not detect editable data in this HTML file.");

  applyImportedState(parsedState);
  saveFormState();
  await generatePortfolio();
  return mode;
}

function renderSkills(rawSkills, templateId) {
  const skills = rawSkills.split(",").map((skill) => skill.trim()).filter(Boolean).map((skill) => escapeHtml(skill));
  if (!skills.length) return templateId === "3" ? "<li>Add your skills</li>" : '<span class="chip">Add your skills</span>';
  if (templateId === "3") return skills.map((skill) => `<li>${skill}</li>`).join("");
  return skills.map((skill) => `<span class="chip">${skill}</span>`).join("");
}

function renderProjects(projects) {
  if (!projects.length) return '<article class="project-item"><h3>Sample Project</h3><p>Add projects from the form.</p></article>';
  const placeholderPrototype =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dfeeff"/><stop offset="100%" stop-color="#b7d6ff"/></linearGradient></defs><rect width="540" height="300" fill="url(#g)"/><rect x="50" y="48" width="440" height="204" rx="14" fill="#ffffff" stroke="#9fc2ef" stroke-width="3"/><rect x="72" y="78" width="192" height="16" rx="8" fill="#d6e8ff"/><rect x="72" y="108" width="146" height="12" rx="6" fill="#e7f1ff"/><rect x="72" y="132" width="236" height="12" rx="6" fill="#e7f1ff"/><rect x="72" y="160" width="108" height="56" rx="10" fill="#c9e0ff"/><rect x="194" y="160" width="108" height="56" rx="10" fill="#d8e9ff"/><rect x="316" y="160" width="154" height="56" rx="10" fill="#e6f1ff"/><text x="270" y="266" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#2f5d96">Prototype Preview</text></svg>`
    );
  return projects.map((project) => {
    const title = project.title || "Untitled Project";
    const description = project.description || "No description provided.";
    const techTags = (project.tech || "")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => `<span class="chip">${escapeHtml(part)}</span>`)
      .join("");
    const techMarkup = techTags ? `<div style="display:flex;flex-wrap:wrap;gap:.35rem;margin:.35rem 0 .45rem;">${techTags}</div>` : "";
    const linkMarkup = project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>` : "";
    const prototypeImage = project.prototype || placeholderPrototype;
    return `<article class="project-item" style="display:grid;grid-template-columns:1fr 180px;gap:.75rem;align-items:center"><div><h3>${title}</h3><p>${description}</p>${techMarkup}${linkMarkup}</div><img src="${prototypeImage}" alt="${title} prototype" class="project-prototype-image" style="width:100%;height:110px;object-fit:cover;border-radius:10px;border:1px solid #cad8ee;background:#eef4ff;cursor:zoom-in" /></article>`;
  }).join("");
}

function renderExperience(entries) {
  if (!entries.length) return '<article class="experience-item"><h3>Role at Company</h3><p>Add your experience details from the form.</p></article>';
  return entries.map((item) => {
    const role = item.role || "Role";
    const company = item.company || "Company";
    const duration = item.duration ? `<span class="experience-duration">${item.duration}</span>` : "";
    const highlights = item.highlights || "No highlights provided.";
    return `<article class="experience-item"><h3>${role} - ${company}</h3>${duration}<p>${highlights}</p></article>`;
  }).join("");
}

function linkifyContactLine(line) {
  const urlMatch = line.match(/(https?:\/\/[^\s]+)/i);
  if (urlMatch) {
    const value = urlMatch[1];
    const parts = line.split(value);
    return `${escapeHtml(parts[0])}<a class="contact-link" href="${escapeHtml(value)}" target="_blank" rel="noopener noreferrer">${escapeHtml(value)}</a>${escapeHtml(parts.slice(1).join(value))}`;
  }

  const emailMatch = line.match(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i);
  if (emailMatch) {
    const value = emailMatch[1];
    const parts = line.split(value);
    return `${escapeHtml(parts[0])}<a class="contact-link" href="mailto:${encodeURIComponent(value)}">${escapeHtml(value)}</a>${escapeHtml(parts.slice(1).join(value))}`;
  }

  const phoneMatch = line.match(/(\+?[0-9][0-9\s().-]{6,}[0-9])/);
  if (phoneMatch) {
    const value = phoneMatch[1];
    const telValue = value.replace(/[^\d+]/g, "");
    const parts = line.split(value);
    return `${escapeHtml(parts[0])}<a class="contact-link" href="tel:${escapeHtml(telValue)}">${escapeHtml(value)}</a>${escapeHtml(parts.slice(1).join(value))}`;
  }

  return escapeHtml(line);
}

function renderContact(contactInput) {
  const lines = contactInput
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<span>${linkifyContactLine(line)}</span>`);
  if (!lines.length) return "<span>Email: your@email.com</span>";
  return lines.join("<br />");
}

function renderSocialLinks(github, linkedin) {
  const links = [];
  if (linkedin && isValidUrl(linkedin)) links.push(`<a class="social-link" href="${escapeHtml(linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`);
  if (github && isValidUrl(github)) links.push(`<a class="social-link" href="${escapeHtml(github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`);
  if (!links.length) return '<span class="social-empty">Add LinkedIn/GitHub links in the form.</span>';
  return links.join("");
}

async function loadTemplate(templateId) {
  if (templateCache[templateId]) return templateCache[templateId];
  try {
    const response = await fetch(`templates/template${templateId}.html`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed template fetch");
    const html = await response.text();
    templateCache[templateId] = html;
    return html;
  } catch (error) {
    return fallbackTemplates[templateId] || fallbackTemplates["1"];
  }
}

function withBaseStyles(content, templateId) {  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Generated Portfolio</title><base href="about:srcdoc" target="_self" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" /><style>:root{--ink:#102542;--muted:#526584;--bg:#f3f6fb;--card:#fff;--line:#dde5f2;--accent:#1568d8;--accent-soft:#eef5ff;--shadow:0 14px 34px rgba(17,34,68,.08)}*{box-sizing:border-box}body{margin:0;font-family:"Plus Jakarta Sans",sans-serif;background:var(--bg);color:var(--ink)}h1,h2,h3{font-family:"Space Grotesk",sans-serif;margin:0}p{margin:0}a{text-decoration:none;color:inherit}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.portfolio-shell{max-width:1120px;margin:1.2rem auto;padding:1rem;border-radius:22px}.site-header{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.3rem .2rem .9rem;position:relative}.logo-mark{font-size:1.12rem;font-weight:800;letter-spacing:.02em}.site-nav{display:flex;gap:1.2rem;color:var(--muted);font-size:.92rem}.header-cta{background:var(--accent);color:#fff;border-radius:10px;padding:.55rem .95rem;font-size:.84rem;font-weight:700}.mobile-nav{display:none}.mobile-nav summary{list-style:none;cursor:pointer;border:1px solid var(--line);border-radius:9px;padding:.44rem .7rem;font-size:.84rem;font-weight:700;background:#fff;color:#234372}.mobile-nav summary::-webkit-details-marker{display:none}.mobile-nav-links{margin-top:.45rem;border:1px solid var(--line);border-radius:10px;background:#fff;display:grid}.mobile-nav-links a{padding:.58rem .72rem;border-bottom:1px solid #edf1f9;color:#365883;font-size:.88rem}.mobile-nav-links a:last-child{border-bottom:0}.hero-section{display:grid;grid-template-columns:1fr 350px;gap:1.2rem;background:linear-gradient(125deg,#fff,#f7faff);border:1px solid var(--line);border-radius:20px;padding:1.35rem;box-shadow:var(--shadow);animation:fadeUp .55s ease both}.hero-text{display:grid;align-content:center;gap:.85rem}.kicker{font-size:.83rem;text-transform:uppercase;letter-spacing:.08em;color:#2d5ca0;font-weight:700}.hero-text h1{font-size:clamp(2rem,3.6vw,3.05rem);line-height:1.06}.hero-bio{color:var(--muted);line-height:1.7;max-width:660px}.hero-actions{display:flex;gap:.62rem;flex-wrap:wrap}.social-links{display:flex;flex-wrap:wrap;gap:.45rem}.social-link{border:1px solid #cadcf7;background:#f4f9ff;color:#27548f;border-radius:999px;padding:.32rem .68rem;font-size:.78rem;font-weight:700}.social-empty{color:#7b8ea9;font-size:.85rem}.btn-solid{background:var(--accent);color:#fff;border-radius:10px;padding:.62rem 1rem;font-size:.86rem;font-weight:700}.btn-ghost{background:var(--accent-soft);color:#1d4f95;border-radius:10px;padding:.62rem 1rem;border:1px solid #cfe0fb;font-size:.86rem;font-weight:700}.portrait-panel{border-radius:16px;overflow:hidden;border:1px solid var(--line);background:#e9eff9;min-height:360px;box-shadow:0 10px 24px rgba(24,43,78,.12)}.portrait-panel img{width:100%;height:100%;object-fit:cover;display:block}.content-block{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:1rem;margin-top:.85rem;box-shadow:var(--shadow)}.reveal{animation:fadeUp .55s ease both}.content-block h2{font-size:1.08rem;margin-bottom:.75rem;color:#183a6a}.contact-lines{color:var(--muted);line-height:1.7}.contact-link{color:var(--accent);text-decoration:underline;font-weight:700}.skill-list{margin:0;padding-left:1.15rem;color:#2e4f78}.skill-list li{margin-bottom:.36rem}.chips{display:flex;flex-wrap:wrap;gap:.45rem}.chip{display:inline-block;padding:.38rem .72rem;border-radius:999px;font-size:.82rem;font-weight:700;background:var(--accent-soft);border:1px solid #cfe0fb;color:#204a85}.projects-wrap,.experience-wrap{display:grid;gap:.68rem}.project-item,.experience-item{border:1px solid #dce6f5;border-radius:12px;background:#fbfdff;padding:.9rem;break-inside:avoid}.project-item h3,.experience-item h3{font-size:1rem;margin-bottom:.32rem}.project-item p,.experience-item p{color:#526a8e;line-height:1.6;margin-bottom:.45rem}.project-item a{color:var(--accent);font-size:.88rem;font-weight:700}.experience-duration{display:inline-block;font-size:.78rem;font-weight:700;padding:.24rem .56rem;border-radius:999px;background:#edf4ff;color:#32588f;margin-bottom:.45rem}.project-prototype-image:hover{transform:scale(1.02);transition:transform .18s}.split-grid{display:grid;grid-template-columns:1.3fr 1fr;gap:.85rem}.cards-layout{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.85rem}.project-block{grid-column:span 2}.lightbox{position:fixed;inset:0;background:rgba(8,14,28,.85);display:none;align-items:center;justify-content:center;z-index:9999;padding:1rem}.lightbox.open{display:flex}.lightbox img{max-width:min(96vw,1200px);max-height:90vh;border-radius:12px;border:2px solid rgba(255,255,255,.28);box-shadow:0 22px 50px rgba(0,0,0,.45)}.lightbox-close{position:fixed;top:14px;right:16px;background:#fff;border:0;border-radius:8px;padding:.45rem .62rem;font-weight:700;cursor:pointer}.t1{background:linear-gradient(180deg,#f8fbff 0,#eef4fd 100%)}.t2{background:linear-gradient(180deg,#0f1e39 0 47%,#edf3fd 47% 100%);--ink:#132847;--muted:#5c6e8b;--card:#fff;--line:#d8e2f3;--accent:#1f7bff;--accent-soft:#edf4ff}.t2 .site-header{color:#e8f0ff}.t2 .site-nav{color:#c3d6f8}.t2 .header-cta{background:#ff6a5f}.t2 .hero-section{background:linear-gradient(130deg,rgba(255,255,255,.08),rgba(255,255,255,.02));border-color:rgba(198,216,245,.25)}.t2 .kicker{color:#8bb6ff}.t2 .hero-text h1{color:#f5f9ff}.t2 .hero-bio{color:#cad8f1}.t2 .btn-ghost{border-color:#4476bf;color:#e4efff;background:rgba(63,108,177,.24)}.t2 .portrait-panel{border-color:rgba(198,216,245,.28);background:rgba(202,219,245,.15)}.t3{background:linear-gradient(180deg,#fff 0,#f4f8ff 100%)}@media(max-width:960px){.site-nav,.header-cta{display:none}.mobile-nav{display:block;margin-left:auto}.hero-section{grid-template-columns:1fr}.portrait-panel{min-height:290px}.split-grid,.cards-layout{grid-template-columns:1fr}.project-block{grid-column:span 1}.t1-resume>section,.t2>section[style*="1fr 1fr"],.t3-magazine>section[style*="2fr 1fr"],.t3-magazine>section[style*="1.2fr 300px"]{grid-template-columns:1fr!important}.t1-resume aside[style*="position:sticky"]{position:static!important}}@media print{body{background:#fff!important;color:#111!important}.portfolio-shell{margin:0;padding:0;max-width:100%;border-radius:0}.site-header{padding-bottom:.5rem}.site-nav,.header-cta,.mobile-nav,.hero-actions{display:none!important}.hero-section,.content-block,.project-item,.experience-item{box-shadow:none!important;border-color:#c9d1df!important;background:#fff!important}.reveal{animation:none!important}.lightbox{display:none!important}}</style></head><body data-template="${templateId}">${content}<div id="imgLightbox" class="lightbox" aria-hidden="true"><button id="imgLightboxClose" class="lightbox-close" type="button">Close</button><img id="imgLightboxPreview" alt="Prototype preview large" /></div><script>(function(){const box=document.getElementById('imgLightbox');const preview=document.getElementById('imgLightboxPreview');const close=document.getElementById('imgLightboxClose');function open(src,alt){preview.src=src;preview.alt=alt||'Prototype preview large';box.classList.add('open');box.setAttribute('aria-hidden','false')}function shut(){box.classList.remove('open');box.setAttribute('aria-hidden','true')}document.querySelectorAll('.project-prototype-image').forEach((img)=>{img.addEventListener('click',()=>open(img.src,img.alt));});close.addEventListener('click',shut);box.addEventListener('click',(e)=>{if(e.target===box)shut();});document.addEventListener('keydown',(e)=>{if(e.key==='Escape')shut();});document.querySelectorAll('a[href^="#"]').forEach((a)=>{a.addEventListener('click',(e)=>{const href=a.getAttribute('href')||'';if(!href.startsWith('#'))return;e.preventDefault();if(href==='#'){window.scrollTo({top:0,behavior:'smooth'});return;}const target=document.querySelector(href);if(target)target.scrollIntoView({behavior:'smooth',block:'start'});});});})();</script></body></html>`;
}
function toSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

async function generatePortfolio() {
  const data = getFormData();
  latestPortfolioState = buildCurrentFormState();
  const template = await loadTemplate(data.templateId);
  const finalProfileImage = data.profileImage || DEFAULT_PROFILE_IMAGES[data.templateId] || DEFAULT_PROFILE_IMAGES["1"];

  const portfolioBody = template
    .replace(/{{name}}/g, data.name)
    .replace(/{{bio}}/g, data.bio)
    .replace(/{{skills}}/g, renderSkills(data.skillsInput, data.templateId))
    .replace(/{{experience}}/g, renderExperience(data.experience))
    .replace(/{{projects}}/g, renderProjects(data.projects))
    .replace(/{{socialLinks}}/g, renderSocialLinks(data.github, data.linkedin))
    .replace(/{{contact}}/g, renderContact(data.contactInput))
    .replace(/{{profileImage}}/g, escapeHtml(finalProfileImage));

  latestPortfolioHtml = withBaseStyles(portfolioBody, data.templateId);
  previewFrame.srcdoc = latestPortfolioHtml;
}

function saveFormState() {
  const formState = buildCurrentFormState();

  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(formState)); } catch (error) {}
}

function applyDefaultRows() {
  projectsContainer.innerHTML = "";
  experienceContainer.innerHTML = "";
  createProjectRow();
  createExperienceRow();
}

function loadFormState() {
  let saved;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (error) { saved = null; }

  if (!saved) {
    applyDefaultRows();
    updateProfilePreview();
    updateStaticCharHints();
    return;
  }

  try {
    const state = JSON.parse(saved);
    nameInput.value = state.name || "";
    bioInput.value = state.bio || "";
    skillsInput.value = state.skills || "";
    githubInput.value = state.github || "";
    linkedinInput.value = state.linkedin || "";
    contactInput.value = state.contact || "";
    profileImageDataUrl = state.profileImage || "";

    const templateId = state.template || "1";
    const radio = form.querySelector(`input[name="template"][value="${templateId}"]`);
    if (radio) radio.checked = true;

    projectsContainer.innerHTML = "";
    if (Array.isArray(state.projects) && state.projects.length) state.projects.forEach((project) => createProjectRow(project));
    else createProjectRow();

    experienceContainer.innerHTML = "";
    if (Array.isArray(state.experience) && state.experience.length) state.experience.forEach((entry) => createExperienceRow(entry));
    else createExperienceRow();

    updateProfilePreview();
    updateStaticCharHints();
  } catch (error) {
    applyDefaultRows();
    updateProfilePreview();
    updateStaticCharHints();
  }
}

function scheduleGenerate() {
  window.clearTimeout(debounceId);
  debounceId = window.setTimeout(async () => {
    await generatePortfolio();
  }, 170);
}

function downloadHtml() {
  if (!latestPortfolioHtml) {
    setStatus("Generate a portfolio first.");
    return;
  }

  const base = toSlug(nameInput.value.trim()) || "portfolio";
  const fileName = `${base}-portfolio.html`;
  const htmlForDownload = attachEditableStateToHtml(latestPortfolioHtml, latestPortfolioState || buildCurrentFormState());
  const blob = new Blob([htmlForDownload], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus(`HTML downloaded as ${fileName}`);
}

async function copyCode() {
  if (!latestPortfolioHtml) {
    setStatus("Generate a portfolio first.");
    return;
  }

  try {
    await navigator.clipboard.writeText(latestPortfolioHtml);
    setStatus("Code copied to clipboard.");
  } catch (error) {
    setStatus("Clipboard blocked. Copy from page source.");
  }
}

function loadDemoData() {
  nameInput.value = "Mahendra Kumar";
  bioInput.value = "Frontend developer focused on responsive UI, performance, and practical product experiences. I build clean interfaces that convert ideas into fast and reliable web apps.";
  skillsInput.value = "HTML, CSS, JavaScript, React, Tailwind, Node.js, Git, REST APIs";
  githubInput.value = "https://github.com/example";
  linkedinInput.value = "https://linkedin.com/in/example";
  contactInput.value = "Email: mahendra@example.com\nPhone: +91 90000 00000\nLocation: Bengaluru, India";

  projectsContainer.innerHTML = "";
  createProjectRow({ title: "Portfolio Generator", description: "Generated responsive portfolio websites with multiple templates, live preview, and export support.", tech: "HTML, CSS, JavaScript", link: "https://github.com/example/portfolio-generator" });
  createProjectRow({ title: "Task Flow Dashboard", description: "Productivity dashboard with analytics charts and drag-and-drop task lanes.", tech: "React, Chart.js, DnD", link: "https://github.com/example/taskflow" });

  experienceContainer.innerHTML = "";
  createExperienceRow({ role: "Frontend Developer Intern", company: "Nova Tech Labs", duration: "Jun 2025 - Dec 2025", highlights: "Built reusable UI components and improved page speed by 34% across marketing pages." });
  createExperienceRow({ role: "Freelance Web Developer", company: "Independent", duration: "2024 - Present", highlights: "Delivered 10+ responsive websites and landing pages for clients in education and retail." });

  profileImageDataUrl = "";
  profileImageInput.value = "";
  updateProfilePreview();
  updateStaticCharHints();
  saveFormState();
  scheduleGenerate();
  setStatus("Demo data loaded.");
}

function resetAll() {
  form.reset();
  profileImageDataUrl = "";
  profileImageInput.value = "";
  updateProfilePreview();
  clearValidation();
  applyDefaultRows();
  updateStaticCharHints();

  try { localStorage.removeItem(STORAGE_KEY); } catch (error) {}

  generatePortfolio();
  setStatus("Form reset and saved data cleared.");
}

addProjectBtn.addEventListener("click", () => {
  createProjectRow();
  saveFormState();
  scheduleGenerate();
});

addExperienceBtn.addEventListener("click", () => {
  createExperienceRow();
  saveFormState();
  scheduleGenerate();
});

profileImageInput.addEventListener("change", async () => {
  const [file] = profileImageInput.files || [];

  if (!file) {
    profileImageDataUrl = "";
    updateProfilePreview();
    saveFormState();
    await generatePortfolio();
    return;
  }

  if (!file.type.startsWith("image/")) {
    setStatus("Please select a valid image file.");
    profileImageInput.value = "";
    return;
  }

  try {
    profileImageDataUrl = await readFileAsDataUrl(file);
    updateProfilePreview();
    saveFormState();
    await generatePortfolio();
  } catch (error) {
    setStatus("Unable to read selected image.");
  }
});

removeImageBtn.addEventListener("click", async () => {
  profileImageDataUrl = "";
  profileImageInput.value = "";
  updateProfilePreview();
  saveFormState();
  await generatePortfolio();
  setStatus("Uploaded image removed.");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateForm()) return;
  saveFormState();
  await generatePortfolio();
  setStatus("Portfolio generated.");
});

form.addEventListener("input", () => {
  updateStaticCharHints();
  saveFormState();
  scheduleGenerate();
});

form.addEventListener("change", () => {
  updateStaticCharHints();
  saveFormState();
  scheduleGenerate();
});

importBtn.addEventListener("click", () => {
  importInput.click();
});

importInput.addEventListener("change", async () => {
  const [file] = importInput.files || [];
  if (!file) return;
  try {
    const mode = await importPortfolioFromFile(file);
    if (mode === "fallback") setStatus("Portfolio imported from HTML content. Review fields once.");
    else setStatus("Portfolio imported. You can continue editing.");
  } catch (error) {
    setStatus(error.message || "Unable to import this HTML file.");
  } finally {
    importInput.value = "";
  }
});

downloadBtn.addEventListener("click", downloadHtml);
copyBtn.addEventListener("click", copyCode);
demoBtn.addEventListener("click", loadDemoData);
resetBtn.addEventListener("click", resetAll);

try { localStorage.removeItem(STORAGE_KEY); } catch (error) {}
applyDefaultRows();
updateProfilePreview();
updateStaticCharHints();
generatePortfolio();









