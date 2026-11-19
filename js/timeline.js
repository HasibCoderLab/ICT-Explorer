// Timeline content. Dates are broad milestones; verify exact historical details before formal publication.
document.addEventListener('DOMContentLoaded', () => {
  const milestones = {
    telegraph: ['1830s–1840s', 'The telegraph', 'The electric telegraph made it possible to send coded messages over long distances using electrical signals.', 'radio-tower'],
    telephone: ['1876', 'The telephone', 'The telephone made voice communication over distance possible, changing how people communicated in homes and businesses.', 'phone'],
    computer: ['1940s', 'Electronic computers', 'Early electronic computers showed how machines could process information at high speed for scientific, technical and administrative work.', 'computer'],
    internet: ['1980s–1990s', 'The Internet era', 'The growth of interconnected computer networks made sharing information and communicating globally increasingly accessible.', 'globe'],
    mobile: ['2000s–2010s', 'Smartphones', 'Smartphones brought communication, computing, photography, navigation and online services together in portable devices.', 'smartphone'],
    ai: ['Today', 'The AI era', 'Artificial intelligence is being used in areas such as language tools, image recognition, research support and automation.', 'brain-circuit']
  };
  const buttons = [...document.querySelectorAll('.timeline-item')];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.classList.toggle('active', item === button));
    const [year, title, description, icon] = milestones[button.dataset.time];
    document.getElementById('timelineYear').textContent = year;
    document.getElementById('timelineTitle').textContent = title;
    document.getElementById('timelineDescription').textContent = description;
    document.getElementById('timelineIcon').setAttribute('data-lucide', icon);
    if (window.lucide) lucide.createIcons();
  }));
});
