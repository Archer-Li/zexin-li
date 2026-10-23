(() => {
  'use strict';
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const history = [];
  let historyIndex = 0;
  const commands = {
    help: 'Available commands:\n  whoami       A short introduction\n  focus        Systems, observability, AI tools\n  philosophy   A human–AI learning loop\n  links        Find me elsewhere\n  clear        Start with a clean screen\n\nUse ↑ / ↓ for command history.',
    whoami: 'Zexin Li\nBased in New York.\nInto systems, observability, and AI tools.',
    focus: '01  Platform & infrastructure\n    Streaming APIs · OpenResty · Kubernetes\n02  Observability\n    OpenTelemetry · Grafana · telemetry pipelines\n03  AI developer tools\n    MCP · agent workflows · evaluation',
    philosophy: 'AI as an external brain.\nOffload repetitive effort. Make room for creativity.\n\nAccumulate context → give feedback → verify → repeat.\nBetter defaults. More room for deeper thought.',
    links: [
      ['GitHub', 'https://github.com/Archer-Li'],
      ['LinkedIn', 'https://www.linkedin.com/in/zexin-archer-li/']
    ]
  };
  function runCommand(raw) {
    const entered = raw.trim();
    if (!entered) return;
    history.push(entered);
    historyIndex = history.length;
    input.value = '';
    const command = entered.toLowerCase();
    if (command === 'clear') {
      output.replaceChildren();
      return;
    }
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    const prompt = document.createElement('p');
    prompt.className = 'terminal-prompt';
    prompt.textContent = '❯ ' + entered;
    entry.append(prompt);
    const response = document.createElement('p');
    if (command === 'links') {
      commands.links.forEach(([label, href], index) => {
        if (index) response.append(document.createElement('br'));
        const link = document.createElement('a');
        link.href = href;
        link.className = 'terminal-highlight';
        link.textContent = label + ' ↗';
        response.append(link);
      });
    } else {
      response.textContent = Object.hasOwn(commands, command)
        ? commands[command]
        : 'Command not found. Type help to see what is available.';
    }
    entry.append(response);
    output.append(entry);
    while (output.children.length > 35) output.firstElementChild.remove();
    output.scrollTop = output.scrollHeight;
  }
  document.getElementById('terminal-form').addEventListener('submit', event => {
    event.preventDefault();
    runCommand(input.value);
  });
  document.querySelectorAll('[data-command]').forEach(button => {
    button.addEventListener('click', () => runCommand(button.dataset.command));
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      historyIndex = Math.max(0, Math.min(history.length,
        historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
      input.value = history[historyIndex] || '';
    }
    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      output.replaceChildren();
    }
  });
  const clock = document.getElementById('ny-clock');
  function tick() {
    const now = new Date();
    clock.textContent = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false
    }).format(now);
    clock.dateTime = now.toISOString();
  }
  tick();
  setInterval(tick, 30000);
  document.getElementById('year').textContent = new Date().getFullYear();
})();
