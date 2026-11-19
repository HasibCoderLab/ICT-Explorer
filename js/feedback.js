// Local-only feedback demo. No data is transmitted to a server.
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'ict-explorer-feedback-v1';
  const form = document.getElementById('feedbackForm');
  const status = document.getElementById('formStatus');
  const chart = document.getElementById('feedbackChart');
  const categories = ['Study', 'Communication', 'Entertainment', 'Business'];

  function getResponses() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  }
  function render() {
    const responses = getResponses();
    document.getElementById('responseCount').textContent = `${responses.length} response${responses.length === 1 ? '' : 's'}`;
    chart.innerHTML = '';
    if (!responses.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-chart';
      empty.textContent = 'Submit a response to see the chart.';
      chart.appendChild(empty);
      return;
    }
    categories.forEach(category => {
      const count = responses.filter(item => item.usage === category).length;
      const row = document.createElement('div');
      row.className = 'chart-row';
      const label = document.createElement('span'); label.textContent = category;
      const track = document.createElement('div'); track.className = 'chart-track';
      const fill = document.createElement('div'); fill.className = 'chart-fill';
      fill.style.width = `${(count / responses.length) * 100}%`;
      track.appendChild(fill);
      const number = document.createElement('span'); number.className = 'chart-count'; number.textContent = `${Math.round(count / responses.length * 100)}%`;
      row.append(label, track, number);
      chart.appendChild(row);
    });
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const usage = data.get('usage');
    if (!usage) { status.textContent = 'Please choose one area first.'; return; }
    const responses = getResponses();
    responses.push({
      name: String(data.get('name') || '').trim().slice(0, 40),
      className: String(data.get('class') || ''),
      usage,
      opinion: String(data.get('opinion') || '').trim().slice(0, 300),
      submittedAt: new Date().toISOString()
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
      form.reset();
      status.textContent = 'Thank you! Your response was saved in this browser.';
      render();
    } catch {
      status.textContent = 'Your browser could not save this response. Check storage settings.';
    }
  });
  document.getElementById('resetFeedback').addEventListener('click', () => {
    if (confirm('Clear all feedback responses saved in this browser?')) {
      localStorage.removeItem(STORAGE_KEY);
      status.textContent = 'Local demo responses cleared.';
      render();
    }
  });
  render();
});
