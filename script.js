// Basic interactivity for tabs and generate button
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab');
  const textarea = document.getElementById('topic');
  const previewText = document.getElementById('previewText');
  const generateBtn = document.getElementById('generateBtn');
  const copyBtn = document.getElementById('copyText');
  const editBtn = document.getElementById('editPost');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  generateBtn.addEventListener('click', () => {
    const topic = textarea.value.trim();
    const format = document.getElementById('format').value;
    const style = document.getElementById('style').value;
    const person = document.getElementById('persontype').value;

    generateBtn.disabled = true;
    generateBtn.innerText = 'Generating...';

    // Simulated generation delay
    setTimeout(() => {
      const generated = topic
        ? `🔸 (${format} • ${style} • ${person})\n\n${fakeExpand(topic)}`
        : 'Your generated post content will appear here...';

      previewText.textContent = generated;
      generateBtn.disabled = false;
      generateBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="#fff" d="M12 2v20M2 12h20" /></svg> Generate Post';
      // scroll preview into view on mobile
      previewText.scrollIntoView({behavior:'smooth', block:'center'});
    }, 800);
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(previewText.textContent || '');
      copyBtn.textContent = 'Copied';
      setTimeout(()=> copyBtn.textContent = 'Copy Text', 1200);
    } catch (e) {
      copyBtn.textContent = 'Copy Failed';
      setTimeout(()=> copyBtn.textContent = 'Copy Text', 1200);
    }
  });

  editBtn.addEventListener('click', () => {
    textarea.focus();
  });

  function fakeExpand(txt){
    // small fake expansion logic to make preview look like content
    if (txt.length < 30) return txt + ' — A concise, shareable post highlighting the main idea with a clear CTA.';
    return txt + '\n\nThis expands the idea into a short post that explains the point, adds insight, and finishes with a call to action or reflective question.';
  }
});