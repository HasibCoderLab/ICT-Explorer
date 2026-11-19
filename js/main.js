// Global navigation, theme, reveal animations and small interactions.
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  }));

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('ict-explorer-theme');
  if (savedTheme === 'light') document.body.classList.add('light-theme');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('ict-explorer-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  });

  const progress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const areas = {
    education: ['Education', 'ICT gives learners access to digital books, recorded lessons, virtual classrooms and educational resources beyond the physical classroom.', 'Example: A student can attend an online class and review a recorded lesson to understand a difficult topic.'],
    healthcare: ['Healthcare', 'ICT helps healthcare professionals manage patient information, communicate with specialists and provide some services remotely.', 'Example: Telemedicine can allow a patient to consult a healthcare professional through a video call.'],
    banking: ['Banking', 'Digital systems help people check accounts, transfer money and make payments without always visiting a bank branch.', 'Example: A mobile banking app can show a transaction history and help users pay bills.'],
    agriculture: ['Agriculture', 'Farmers can use weather forecasts, market information and sensors to make more informed decisions.', 'Example: Soil-moisture information can help a farmer decide when crops may need water.'],
    communication: ['Communication', 'Internet-based tools let people exchange messages, share files and talk face-to-face across long distances.', 'Example: A video call can connect students working on a group project from different places.'],
    business: ['Business', 'ICT supports online shopping, digital advertising, record keeping and communication with customers.', 'Example: An online store can display products and receive orders at any time.']
  };
  const detail = document.getElementById('areaDetail');
  document.querySelectorAll('.application-card').forEach(card => card.addEventListener('click', () => {
    const item = areas[card.dataset.area];
    document.getElementById('areaTitle').textContent = item[0];
    document.getElementById('areaText').textContent = item[1];
    document.getElementById('areaExample').textContent = item[2];
    detail.hidden = false;
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }));
  document.getElementById('closeArea').addEventListener('click', () => { detail.hidden = true; });

  const processButton = document.getElementById('processButton');
  processButton.addEventListener('click', () => {
    const value = document.getElementById('processInput').value.trim();
    const output = document.getElementById('processResult');
    output.textContent = value
      ? `Input received: "${value}". The computer processes the data and can display or store the result.`
      : 'Please enter a message first so the system has some input data.';
  });
});
