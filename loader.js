// ═══════════════════════════════════════════════════════
//  Oculis Iuris — Section Loader
//  Fetches each section HTML file and injects into page
// ═══════════════════════════════════════════════════════

const sections = [
  { slot: 'slot-nav',           file: 'sections/nav.html' },
  { slot: 'slot-hero',          file: 'sections/hero.html' },
  { slot: 'slot-about',         file: 'sections/about.html' },
  { slot: 'slot-logo-meaning',  file: 'sections/logo-meaning.html' },
  { slot: 'slot-team',          file: 'sections/team.html' },
  { slot: 'slot-events',        file: 'sections/events.html' },
  { slot: 'slot-past-events',   file: 'sections/past-events.html' },
  { slot: 'slot-case-month',    file: 'sections/case-month.html' },
  { slot: 'slot-trivia',        file: 'sections/trivia.html' },
  { slot: 'slot-gallery',       file: 'sections/gallery.html' },
  { slot: 'slot-forensic-quiz', file: 'sections/forensic-quiz.html' },
  { slot: 'slot-modal',         file: 'sections/modal.html' },
  { slot: 'slot-toxicology',    file: 'sections/toxicology.html' },
  { slot: 'slot-join',          file: 'sections/join.html' },
  { slot: 'slot-footer',        file: 'sections/footer.html' },
];

// Load all sections in order, then init JS
async function loadAllSections() {
  for (const { slot, file } of sections) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Failed: ${file}`);
      const html = await response.text();
      document.getElementById(slot).innerHTML = html;
    } catch (err) {
      console.error(`Could not load ${file}:`, err);
    }
  }

  // ── After all sections loaded, init interactive features ──
  if (typeof loadTrivia === 'function')        loadTrivia();
  if (typeof buildFQGrid === 'function')       buildFQGrid();
  if (typeof loadToxQuestion === 'function')   loadToxQuestion();
}

loadAllSections();
