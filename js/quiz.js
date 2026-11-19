// Ten-question ICT quiz with explanations and a final score.
document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    { q: 'What does ICT stand for?', options: ['Information and Communication Technology', 'Internet Computer Transfer', 'Integrated Control Technology', 'Information Coding Technique'], answer: 0, why: 'ICT means Information and Communication Technology. It includes tools used to handle and communicate information.' },
    { q: 'Which one is an example of an input device?', options: ['Monitor', 'Speaker', 'Keyboard', 'Projector'], answer: 2, why: 'A keyboard sends data and instructions into a computer, so it is an input device.' },
    { q: 'Which technology supports a live online class?', options: ['Video conferencing', 'Photocopier', 'Calculator', 'USB drive'], answer: 0, why: 'Video conferencing lets people communicate with live audio and video over a network.' },
    { q: 'What is the main purpose of a strong password?', options: ['Make typing faster', 'Protect an account from unauthorized access', 'Increase screen brightness', 'Improve internet speed'], answer: 1, why: 'A strong, unique password makes it harder for someone else to access an account.' },
    { q: 'Which is an example of ICT in healthcare?', options: ['Telemedicine', 'Handwritten poster', 'Paper envelope', 'Mechanical pencil'], answer: 0, why: 'Telemedicine uses communication technology to support remote healthcare consultations.' },
    { q: 'What does a computer do during processing?', options: ['Only prints paper', 'Works on input data according to instructions', 'Always connects to Wi-Fi', 'Deletes all files'], answer: 1, why: 'Processing means carrying out operations on input data to produce useful results.' },
    { q: 'Which action is safest when an unexpected message asks for your password?', options: ['Reply with your password', 'Click every link', 'Ignore it and verify through an official channel', 'Forward it to everyone'], answer: 2, why: 'Unexpected requests for passwords are suspicious. Verify through a trusted official channel and never share your password.' },
    { q: 'Which is an example of digital communication?', options: ['Video call', 'Paper bookmark', 'Wall clock', 'Chalkboard'], answer: 0, why: 'A video call uses digital networks to exchange audio and video between people.' },
    { q: 'How can ICT help farmers?', options: ['By replacing all farming knowledge', 'By providing weather and soil information', 'By stopping all rainfall', 'By making crops grow instantly'], answer: 1, why: 'Weather forecasts and soil information can help farmers make better-informed decisions.' },
    { q: 'What is artificial intelligence commonly used for?', options: ['Recognizing patterns in data', 'Making every device waterproof', 'Removing the need for electricity', 'Guaranteeing every online fact is true'], answer: 0, why: 'AI systems can identify patterns in data, but their results still need careful checking.' }
  ];
  let index = 0, score = 0, selected = null, answered = false;
  const questionText = document.getElementById('questionText');
  const optionsEl = document.getElementById('quizOptions');
  const nextButton = document.getElementById('quizNext');
  const explanation = document.getElementById('quizExplanation');
  const questionArea = document.getElementById('quizQuestionArea');
  const resultArea = document.getElementById('quizResult');

  function renderQuestion() {
    selected = null; answered = false;
    const item = questions[index];
    document.getElementById('quizCount').textContent = `QUESTION ${String(index + 1).padStart(2, '0')} / ${questions.length}`;
    document.getElementById('quizProgress').style.width = `${((index + 1) / questions.length) * 100}%`;
    questionText.textContent = item.q;
    optionsEl.innerHTML = '';
    explanation.hidden = true;
    explanation.textContent = '';
    nextButton.disabled = true;
    nextButton.innerHTML = 'Check answer <i data-lucide="arrow-right"></i>';
    item.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.className = 'quiz-option';
      button.type = 'button';
      button.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
      button.addEventListener('click', () => {
        if (answered) return;
        selected = optionIndex;
        [...optionsEl.children].forEach(el => el.classList.remove('selected'));
        button.classList.add('selected');
        nextButton.disabled = false;
      });
      optionsEl.appendChild(button);
    });
    if (window.lucide) lucide.createIcons();
  }
  nextButton.addEventListener('click', () => {
    if (!answered) {
      if (selected === null) return;
      answered = true;
      const item = questions[index];
      const buttons = [...optionsEl.children];
      buttons.forEach((button, i) => {
        button.disabled = true;
        if (i === item.answer) button.classList.add('correct');
        if (i === selected && selected !== item.answer) button.classList.add('wrong');
      });
      if (selected === item.answer) score++;
      explanation.textContent = `${selected === item.answer ? 'Correct!' : 'Not quite.'} ${item.why}`;
      explanation.hidden = false;
      nextButton.innerHTML = index === questions.length - 1 ? 'See my result' : 'Next question';
    } else if (index < questions.length - 1) {
      index++;
      renderQuestion();
    } else {
      questionArea.hidden = true;
      resultArea.hidden = false;
      document.getElementById('quizCount').textContent = 'COMPLETED';
      document.getElementById('finalScore').textContent = `${score} / ${questions.length}`;
      document.getElementById('scoreMessage').textContent = score >= 8 ? 'Excellent work! You have a strong understanding of the topics.' : score >= 5 ? 'Good effort! Review the explanations and try again to improve.' : 'Keep exploring. Learning takes practice, and you can try again anytime.';
    }
  });
  document.getElementById('restartQuiz').addEventListener('click', () => {
    index = 0; score = 0;
    questionArea.hidden = false; resultArea.hidden = true;
    renderQuestion();
  });
  renderQuestion();
});
