function useHint() {
  if (currentMode === "daily") {
    showPopup("⚠️ Hints are disabled in Daily Puzzles!");
    return;
  }
  if (currentDifficulty === "hard") {
    alert("❌ Hints are disabled in Hard mode!");
    return;
}

if (currentDifficulty === "normal") {
    alert("❌ Hints are disabled in this normal mode!!");
    return;
}
  if (hints <= 0) {
    showPopup("⚠️ No hints left! Earn more by completing levels.");
    return;
  }
  hints--;
  updateHintDisplay();
  const remaining = Object.keys(placedWords).filter(w => !foundWords.has(w));
  if (remaining.length === 0) {
    showPopup("✅ All words already found!");
    return;
  }
  const hintWord = remaining[Math.floor(Math.random() * remaining.length)];
  const coords = placedWords[hintWord];
  const saved = localStorage.getItem("theme");
  const t = THEMES[Number(saved)] || themes[0];
  const hintColor = t.accent || "#FFD700";
  coords.forEach(([r, c], i) => {
    setTimeout(() => {
      const el = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
      if (el) {
        el.style.transition = "background 0.3s ease, color 0.3s ease";
        el.style.background = hintColor;
        el.style.color = t.text || "#000";
        el.classList.add("hinted");
      }
    }, i * 300);
  });
  setTimeout(() => {
    foundWords.add(hintWord);
    document.getElementById(`word-${hintWord}`)?.classList.add("word-found");
    saveProgress();
    showPopup(` Hint used: "${hintWord}"`);
  }, coords.length * 300 + 300);
}
if (isNaN(hints)) hints = 3;
updateHintDisplay();
function updateHintDisplay() {
  const el = document.getElementById("hintCount");
  if (el) el.textContent = hints;
  localStorage.setItem("persistentHintsBackup", hints);
  localStorage.setItem("hints", hints);
}