// Interactive Lab experiments.
document.addEventListener('DOMContentLoaded', () => {
  const tabs = [...document.querySelectorAll('.lab-tab')];
  const panels = { message: document.getElementById('messageLab'), farm: document.getElementById('farmLab'), data: document.getElementById('dataLab') };
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.toggle('active', t === tab); t.setAttribute('aria-selected', String(t === tab)); });
    Object.entries(panels).forEach(([key, panel]) => { panel.hidden = key !== tab.dataset.lab; });
  }));

  document.getElementById('sendMessage').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value.trim();
    const feedback = document.getElementById('messageFeedback');
    const packet = document.getElementById('packet');
    const received = document.getElementById('receivedMessage');
    if (!message) { feedback.textContent = 'Please type a message before sending.'; return; }
    packet.classList.remove('moving');
    received.textContent = 'Sending through the network…';
    feedback.textContent = 'The sender is preparing your message.';
    void packet.offsetWidth;
    requestAnimationFrame(() => packet.classList.add('moving'));
    window.setTimeout(() => {
      received.textContent = `Received: “${message}”`;
      feedback.textContent = 'Success! The message travelled from sender to receiver in this simplified simulation.';
    }, 1350);
  });

  const moisture = document.getElementById('moistureRange');
  const moistureValue = document.getElementById('moistureValue');
  const meter = document.getElementById('moistureMeter');
  moisture.addEventListener('input', () => {
    moistureValue.textContent = `${moisture.value}%`;
    meter.style.width = `${moisture.value}%`;
  });
  document.getElementById('checkSoil').addEventListener('click', () => {
    const value = Number(moisture.value);
    const result = value < 30
      ? 'The soil is dry. A farmer may consider watering the crops, while checking the crop and weather conditions.'
      : value < 65
        ? 'The soil has a moderate moisture level. The farmer can monitor it and decide based on crop needs.'
        : 'The soil is quite moist. Extra watering may not be needed right now; the farmer should keep monitoring.';
    document.getElementById('farmFeedback').textContent = result;
  });

  document.getElementById('calculateData').addEventListener('click', () => {
    const input = document.getElementById('dataInput');
    const value = Number(input.value);
    const feedback = document.getElementById('dataFeedback');
    if (!Number.isInteger(value) || value < 1 || value > 100) {
      feedback.textContent = 'Enter a whole number from 1 to 100.';
      return;
    }
    document.getElementById('rawData').textContent = value;
    document.getElementById('outputData').textContent = value * 2;
    feedback.textContent = `The input value ${value} was processed using the rule “multiply by 2”. The output is ${value * 2}.`;
  });
});
