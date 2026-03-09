// Oculis Iuris — JavaScript | JSS Medical College, Mysore

// ─── CASE OF MONTH ───
function toggleAnswer() {
  const el = document.getElementById('caseAnswer');
  el.classList.toggle('show');
  event.target.closest('button').textContent = el.classList.contains('show') ? '🔍 Hide Discussion' : '🔍 Reveal Discussion';
}

// ─── TRIVIA ───
const triviaData = [
  {
    q: "Which rigor mortis sign indicates death occurred approximately 12–24 hours ago?",
    opts: ["Onset of rigor mortis", "Well-established rigor mortis", "Passing off of rigor mortis", "Cadaveric spasm"],
    ans: 1,
    feedback: "Well-established rigor (12–24 hrs) indicates the body is in full muscular stiffness. It starts at 6–12 hrs, fully established by 12–24 hrs, and passes off by 36–48 hrs."
  },
  {
    q: "The 'Washerwoman hands' appearance in a drowned body suggests:",
    opts: ["Post-mortem decomposition", "Chemical burn", "Prolonged immersion in water", "Severe dehydration before death"],
    ans: 2,
    feedback: "Prolonged water immersion causes maceration of skin — wrinkling and whitening of the palms and soles, classically called 'washerwoman hands.' It helps estimate immersion time."
  },
  {
    q: "A defense wound is most commonly seen on:",
    opts: ["Head and neck", "Chest and abdomen", "Forearms and hands", "Lower extremities"],
    ans: 2,
    feedback: "Defense wounds appear on the forearms, hands, and dorsum of hands — areas used to ward off blows. They indicate the victim was alive and conscious during the attack."
  },
  {
    q: "Adipocere formation requires which essential component?",
    opts: ["Dry and cold environment", "Moisture and warmth", "Airtight container", "Alkaline soil"],
    ans: 1,
    feedback: "Adipocere (saponification of body fat) forms best in warm, moist environments. It converts body fat to a waxy, soap-like substance and is a useful tool for estimating time since death."
  },
  {
    q: "The McRobert's maneuver is a forensic consideration in which scenario?",
    opts: ["Drowning deaths", "Shoulder dystocia in obstetric deaths", "Firearm wound trajectory", "Ligature strangulation"],
    ans: 1,
    feedback: "McRobert's maneuver is used in shoulder dystocia — a complication during childbirth. It becomes forensically relevant when investigating maternal or neonatal death during obstetric emergencies."
  },
  {
    q: "Pugilistic attitude of the body after death is caused by:",
    opts: ["Rigor mortis", "Post-mortem lividity", "Heat coagulation of muscle proteins", "Cadaveric spasm"],
    ans: 2,
    feedback: "The pugilistic attitude (boxer's posture — flexion of limbs) occurs due to heat causing coagulation and shortening of muscle proteins. It is seen in fire deaths and does NOT indicate a fight."
  }
];

let triviaIndex = 0;
let triviaAnswered = false;

function loadTrivia() {
  if (triviaIndex >= triviaData.length) {
    document.querySelector('.trivia-card').innerHTML = `
      <div style="font-family:'Cinzel',serif; font-size:1.5rem; color:var(--gold); margin-bottom:16px;">🏆 Quiz Complete!</div>
      <p style="color:var(--cream); margin-bottom:24px;">You've completed all 6 trivia questions. Great forensic thinking!</p>
      <button class="btn-gold" onclick="triviaIndex=0;triviaAnswered=false;loadTrivia();document.querySelector('.trivia-counter').style.display='block';" style="border:none;cursor:pointer;">RESTART QUIZ</button>
    `;
    return;
  }
  const q = triviaData[triviaIndex];
  triviaAnswered = false;
  document.getElementById('triviaCounter').textContent = `QUESTION ${triviaIndex+1} / ${triviaData.length}`;
  document.getElementById('triviaQ').textContent = q.q;
  document.getElementById('triviaFeedback').textContent = '';
  document.getElementById('triviaNext').classList.remove('show');

  const optsEl = document.getElementById('triviaOpts');
  optsEl.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'trivia-opt';
    btn.textContent = opt;
    btn.onclick = () => answerTrivia(i, q.ans, q.feedback);
    optsEl.appendChild(btn);
  });
}

function answerTrivia(chosen, correct, feedback) {
  if (triviaAnswered) return;
  triviaAnswered = true;
  const opts = document.querySelectorAll('.trivia-opt');
  opts[correct].classList.add('correct');
  if (chosen !== correct) opts[chosen].classList.add('wrong');
  document.getElementById('triviaFeedback').textContent = feedback;
  document.getElementById('triviaNext').classList.add('show');
}

function nextTrivia() {
  triviaIndex++;
  loadTrivia();
}


// ─── FORENSIC IMAGE QUIZ ───
const fqData = [
  { icon: '🩸', label: 'Bloodstain Pattern', q: 'A circular bloodstain with scalloped edges on a flat surface most likely indicates:', opts: ['High velocity impact', 'Blood fell from a height of less than 30cm', 'Drip pattern from a stationary wound', 'Cast-off pattern'], ans: 2, explain: 'Circular drip stains with minimal satellite spatter indicate blood fell from low height onto a flat, horizontal surface — classic drip pattern from a relatively stationary source.' },
  { icon: '💀', label: 'Bone Fracture', q: 'A "ring fracture" of the skull base is characteristically associated with:', opts: ['Direct blow to the vertex', 'Falls from a height landing on the feet', 'Gunshot wound', 'Strangulation'], ans: 1, explain: 'Ring fracture around the foramen magnum occurs when the skull drives down onto the spine (or vice versa) — classic in falls from height onto feet or buttocks, and in judicial hanging.' },
  { icon: '🔵', label: 'Hyoid Bone', q: 'Fracture of the hyoid bone is MOST commonly associated with:', opts: ['Ligature strangulation', 'Manual strangulation', 'Hanging', 'Drowning'], ans: 1, explain: 'Hyoid fracture occurs in up to 30% of manual strangulation cases — direct pressure compresses and fractures the hyoid. It\'s less common in ligature strangulation and rare in drowning.' },
  { icon: '🌡️', label: 'Lividity Pattern', q: 'Post-mortem lividity fixed in an inconsistent position with the body\'s current position suggests:', opts: ['Normal decomposition', 'Body was moved after death', 'Drowning death', 'Natural cardiac death'], ans: 1, explain: 'Fixed lividity (after 6–8 hours) that doesn\'t match the body\'s current position is a key forensic indicator that the body was moved after death — crucial in homicide investigations.' },
  { icon: '🔥', label: 'Burn Injury', q: 'The "crocodile" or "alligator skin" appearance on a burned body indicates:', opts: ['Ante-mortem flame contact', 'Post-mortem slow burning', 'Superficial thermal injury', 'Chemical burn'], ans: 0, explain: 'Crocodile/alligator skin pattern appears in areas with ante-mortem contact burns — the skin splits in a characteristic way due to contraction of dermis under direct flame, with vital reaction visible.' },
  { icon: '💊', label: 'Stomach Contents', q: 'Preserving gastric contents during autopsy is MOST important for:', opts: ['Estimating height', 'Toxicological analysis', 'DNA profiling', 'Age estimation'], ans: 1, explain: 'Gastric contents are crucial for toxicological analysis — identifying undigested poison, tablets, or toxic substances. The degree of digestion also helps estimate time since last meal and time of death.' },
];

function buildFQGrid() {
  const grid = document.getElementById('fqGrid');
  fqData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'fq-item';
    el.innerHTML = `
      <div class="fq-img">${item.icon}<span class="fq-question-tag">? QUIZ</span></div>
      <div class="fq-label">${item.label}</div>
    `;
    el.onclick = () => openModal(i);
    grid.appendChild(el);
  });
}

function openModal(i) {
  const item = fqData[i];
  document.getElementById('modalImg').innerHTML = `<span style="font-size:5rem">${item.icon}</span>`;
  document.getElementById('modalQ').textContent = item.q;
  document.getElementById('modalFeedback').textContent = '';
  const opts = document.getElementById('modalOpts');
  opts.innerHTML = '';
  item.opts.forEach((opt, j) => {
    const btn = document.createElement('button');
    btn.className = 'modal-opt';
    btn.textContent = opt;
    btn.onclick = () => answerModal(j, item.ans, item.explain);
    opts.appendChild(btn);
  });
  document.getElementById('modalOverlay').classList.add('active');
}

function answerModal(chosen, correct, explain) {
  const opts = document.querySelectorAll('.modal-opt');
  opts.forEach(o => o.style.pointerEvents = 'none');
  opts[correct].classList.add('correct');
  if (chosen !== correct) opts[chosen].classList.add('wrong');
  document.getElementById('modalFeedback').textContent = explain;
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay'))
    document.getElementById('modalOverlay').classList.remove('active');
}
function closeModalBtn() {
  document.getElementById('modalOverlay').classList.remove('active');
}


// ─── TOXICOLOGY CORNER ───
const toxData = [
  {
    poison: "Organophosphate (e.g., Malathion)",
    icon: "🌿",
    clues: [
      { icon: "👁️", text: "Pinpoint pupils (miosis)" },
      { icon: "💧", text: "Excessive salivation and lacrimation (SLUDGE)" },
      { icon: "🤢", text: "Nausea, vomiting, abdominal cramps" },
      { icon: "💪", text: "Muscle twitching and fasciculations" },
      { icon: "🫁", text: "Bronchospasm and excessive bronchosecretions" }
    ],
    opts: ["Cyanide", "Organophosphate", "Atropine poisoning", "Methanol"],
    ans: 1,
    explain: "Organophosphate poisoning causes SLUDGE syndrome — Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis — due to acetylcholinesterase inhibition. Antidote: Atropine + Pralidoxime (2-PAM)."
  },
  {
    poison: "Cyanide",
    icon: "💨",
    clues: [
      { icon: "🍑", text: "Bright cherry-red lividity post-mortem" },
      { icon: "🌰", text: "Smell of bitter almonds from the body" },
      { icon: "⚡", text: "Rapid onset — death within minutes" },
      { icon: "🧠", text: "Headache, confusion, seizures" },
      { icon: "💓", text: "Initially tachycardia then bradycardia" }
    ],
    opts: ["Carbon monoxide", "Arsenic", "Cyanide", "Strychnine"],
    ans: 2,
    explain: "Cyanide inhibits cytochrome c oxidase — cellular respiration halts. The blood remains bright red (oxygenated) as cells cannot use O₂. Classic bitter almond smell. Antidote: Sodium thiosulphate + Hydroxocobalamin."
  },
  {
    poison: "Arsenic (Chronic)",
    icon: "🔱",
    clues: [
      { icon: "💅", text: "Mees' lines — transverse white bands on nails" },
      { icon: "🖐️", text: "Hyperkeratosis of palms and soles" },
      { icon: "🔬", text: "Sensory peripheral neuropathy" },
      { icon: "🦱", text: "Alopecia (hair loss)" },
      { icon: "🌑", text: "Hyperpigmentation — 'raindrop' pattern" }
    ],
    opts: ["Lead poisoning", "Thallium poisoning", "Mercury poisoning", "Arsenic poisoning"],
    ans: 3,
    explain: "Chronic arsenic poisoning presents with Mees' lines, raindrop pigmentation, Bowen's disease risk, neuropathy, and Blackfoot disease. Hair/nail arsenic analysis is diagnostic. Antidote: BAL (Dimercaprol)."
  },
  {
    poison: "Carbon Monoxide",
    icon: "🏭",
    clues: [
      { icon: "🌹", text: "Cherry-pink post-mortem lividity" },
      { icon: "🏠", text: "Found in a closed garage / kitchen" },
      { icon: "🧠", text: "Headache, dizziness, confusion" },
      { icon: "🫀", text: "SpO₂ unreliable (normal on pulse ox!)" },
      { icon: "🔥", text: "History of fire/combustion exposure" }
    ],
    opts: ["Cyanide", "Carbon monoxide", "Nitrites", "Hydrogen sulfide"],
    ans: 1,
    explain: "CO binds haemoglobin 200× more avidly than O₂, forming carboxyhaemoglobin. Pink lividity is characteristic. SpO₂ appears normal — co-oximetry needed. Antidote: 100% O₂ / hyperbaric oxygen."
  },
  {
    poison: "Strychnine",
    icon: "🌰",
    clues: [
      { icon: "😬", text: "Risus sardonicus — fixed grotesque grin" },
      { icon: "🏹", text: "Opisthotonos — extreme backward arching" },
      { icon: "⚡", text: "Convulsions triggered by light, sound, touch" },
      { icon: "😰", text: "Consciousness retained during convulsions" },
      { icon: "💀", text: "Death from exhaustion/asphyxia during seizure" }
    ],
    opts: ["Tetanus toxin", "Strychnine", "Brucine", "Picrotoxin"],
    ans: 1,
    explain: "Strychnine blocks glycine receptors in the spinal cord — uninhibited motor neuron firing causes violent tonic-clonic convulsions. Key differentiator from tetanus: rapid onset (15–30 min) and consciousness is preserved. Derived from Strychnos nux-vomica."
  }
];

let toxIndex = 0, toxCorrect = 0, toxAttempted = 0, toxAnswered = false;

function updateToxScore() {
  document.getElementById('toxScore').textContent = `SCORE: ${toxCorrect} / ${toxAttempted}`;
}

function loadToxQuestion() {
  if (toxIndex >= toxData.length) toxIndex = 0;
  const t = toxData[toxIndex];
  toxAnswered = false;

  document.getElementById('toxResultText').textContent = '';
  document.getElementById('toxResultExplain').textContent = '';
  document.getElementById('toxNextBtn').classList.remove('show');

  const cluesEl = document.getElementById('toxClues');
  cluesEl.innerHTML = '';
  t.clues.forEach(c => {
    cluesEl.innerHTML += `<div class="clue-item"><div class="clue-icon">${c.icon}</div><div class="clue-text">${c.text}</div></div>`;
  });

  const optsEl = document.getElementById('toxOpts');
  optsEl.innerHTML = '';
  t.opts.forEach((opt, i) => {
    optsEl.innerHTML += `<button class="tox-opt" onclick="answerTox(${i})"><span class="opt-icon">☠️</span>${opt}</button>`;
  });

  toxIndex++;
}

function answerTox(chosen) {
  if (toxAnswered) return;
  toxAnswered = true;
  toxAttempted++;
  const t = toxData[toxIndex - 1];
  const opts = document.querySelectorAll('.tox-opt');
  opts.forEach(o => o.style.pointerEvents = 'none');
  opts[t.ans].classList.add('correct');
  if (chosen !== t.ans) {
    opts[chosen].classList.add('wrong');
    document.getElementById('toxResultText').textContent = `☠️ Incorrect — The answer is: ${t.poison}`;
  } else {
    toxCorrect++;
    document.getElementById('toxResultText').textContent = `✅` Correct! That's ${t.poison}`;
    toxCorrect++;
  }
  updateToxScore();
  document.getElementById('toxResultExplain').textContent = t.explain;
  document.getElementById('toxNextBtn').classList.add('show');
}

function updateToxScore() {
  document.getElementById('toxScore').textContent = `SCORE: ${toxCorrect} / ${toxAttempted}`;
}

// ── Init ──

// ── NOTE ──
// loadTrivia(), buildFQGrid(), loadToxQuestion() are called
// by loader.js AFTER all section HTML files are injected into the page.
// Do not call them here directly.
