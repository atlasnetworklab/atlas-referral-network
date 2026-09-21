(() => {
  'use strict';
  document.body.classList.add('js');
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const mobileQuery = matchMedia('(max-width: 760px)');
  const root = document.documentElement;
  const hero = $('.hero');
  const header = $('.site-header');
  const journey = $('#journey');
  const journeySticky = $('.journey-sticky');
  const windowEl = $('.journey-window');
  const sceneImages = $$('[data-scene-image]');
  const sceneCopies = $$('[data-scene-copy]');
  const stepButtons = $$('[data-step]');
  const route = $('#route-progress');
  const routeLength = route.getTotalLength();
  const routeDot = $('#route-dot');
  const routeHalo = $('#route-halo');
  const destination = $('#connected');
  const statuses = ['IDEA → DIRECTION', 'DESIGN → REALITY', 'DETAIL → CONFIDENCE', 'ORIGIN → DESTINATION', 'DELIVERY → PARTNERSHIP'];
  let activeStep = -1;
  let manualStep = 0;
  let paused = reducedQuery.matches;
  let pendingFrame = 0;
  let geometry = { start: 0, range: 1, destination: 0, maxScroll: 1, heroHeight: 1 };
  route.style.strokeDasharray = `${routeLength}`;
  route.style.strokeDashoffset = `${routeLength}`;

  function measure() {
    geometry = {
      // The scene pins below the fixed header, not behind it.
      start: journey.getBoundingClientRect().top + window.scrollY - header.offsetHeight,
      range: Math.max(1, journey.offsetHeight - journeySticky.offsetHeight),
      destination: destination.getBoundingClientRect().top + window.scrollY,
      maxScroll: Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      heroHeight: hero.offsetHeight,
    };
    scheduleFrame();
  }

  function showStep(step) {
    if (step === activeStep) return;
    activeStep = step;
    sceneImages.forEach((image, index) => image.classList.toggle('is-active', index === step));
    sceneCopies.forEach((copy, index) => {
      copy.classList.toggle('is-active', index === step);
      copy.setAttribute('aria-hidden', String(index !== step));
    });
    stepButtons.forEach((button, index) => {
      button.classList.toggle('is-active', index === step);
      button.setAttribute('aria-pressed', String(index === step));
    });
    $('#scene-number').textContent = String(step + 1).padStart(2, '0');
    $('#scene-status').textContent = statuses[step];
  }

  function renderFrame() {
    pendingFrame = 0;
    const y = window.scrollY;
    const manual = mobileQuery.matches || reducedQuery.matches;
    const progress = manual ? manualStep / 4 : clamp((y - geometry.start) / geometry.range);
    const step = manual ? manualStep : Math.min(4, Math.floor(progress * 5));
    const withinStep = manual ? .5 : clamp(progress * 5 - step);
    showStep(step);
    root.style.setProperty('--scroll', clamp(y / geometry.maxScroll).toFixed(4));
    const point = route.getPointAtLength(progress * routeLength);
    route.style.strokeDashoffset = `${routeLength * (1 - progress)}`;
    for (const dot of [routeDot, routeHalo]) {
      dot.setAttribute('cx', point.x.toFixed(2));
      dot.setAttribute('cy', point.y.toFixed(2));
    }
    if (!paused) {
      root.style.setProperty('--mesh-y', `${-Math.min(140, y * .035)}px`);
      root.style.setProperty('--world-y', `${-Math.min(180, y * .055)}px`);
      root.style.setProperty('--hero-shift', `${-Math.min(40, y * .035)}px`);
      windowEl.style.setProperty('--image-x', `${-6 + withinStep * 12}px`);
      windowEl.style.setProperty('--image-y', `${8 - withinStep * 16}px`);
      const approach = clamp((y - geometry.start + window.innerHeight) / window.innerHeight);
      windowEl.style.setProperty('--journey-scale', (.94 + approach * .06).toFixed(4));
      destination.style.setProperty('--destination-y', `${clamp((y - geometry.destination) * .11, -70, 90)}px`);
    }
  }

  function scheduleFrame() {
    if (!pendingFrame) pendingFrame = requestAnimationFrame(renderFrame);
  }

  function jumpToStep(step) {
    manualStep = step;
    if (mobileQuery.matches || reducedQuery.matches) {
      renderFrame();
      return;
    }
    const target = geometry.start + geometry.range * ((step + .35) / 5);
    window.scrollTo({ top: target, behavior: paused ? 'instant' : 'smooth' });
  }
  stepButtons.forEach(button => button.addEventListener('click', () => jumpToStep(Number(button.dataset.step))));

  const motionButton = $('.motion-toggle');
  function applyMotionPreference() {
    document.body.classList.toggle('motion-paused', paused);
    motionButton.disabled = reducedQuery.matches;
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', reducedQuery.matches ? 'Reduced motion enabled by your device' : paused ? 'Resume motion' : 'Pause motion');
    const orbit = $('.orbit-lines');
    if (paused && typeof orbit.pauseAnimations === 'function') orbit.pauseAnimations();
    else if (!paused && typeof orbit.unpauseAnimations === 'function') orbit.unpauseAnimations();
    scheduleFrame();
  }
  motionButton.addEventListener('click', () => { paused = !paused; applyMotionPreference(); });
  reducedQuery.addEventListener('change', () => { paused = reducedQuery.matches; manualStep = Math.max(0, activeStep); applyMotionPreference(); measure(); });
  mobileQuery.addEventListener('change', () => { manualStep = Math.max(0, activeStep); measure(); });
  const orbitStage = $('#orbit-stage');
  orbitStage.addEventListener('pointermove', (event) => {
    if (paused || event.pointerType !== 'mouse') return;
    const rect = orbitStage.getBoundingClientRect();
    orbitStage.style.setProperty('--pointer-x', (((event.clientX - rect.left) / rect.width - .5) * 18).toFixed(2));
    orbitStage.style.setProperty('--pointer-y', (((event.clientY - rect.top) / rect.height - .5) * 14).toFixed(2));
  }, { passive: true });
  orbitStage.addEventListener('pointerleave', () => { orbitStage.style.setProperty('--pointer-x', '0'); orbitStage.style.setProperty('--pointer-y', '0'); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('offscreen-hero', !entry.isIntersecting);
      const svg = $('.orbit-lines');
      if (!entry.isIntersecting || paused) svg.pauseAnimations?.();
      else svg.unpauseAnimations?.();
    }, { threshold: 0 }).observe(hero);
  }

  // Sandbox interactions use only memory. No request, storage or attribution is made.
  const idea = $('#project-idea');
  const categories = {
    'CPG & packaging': {
      description: 'From the packaging concept to the finished product, connect materials, production and delivery through one partner.',
      services: [
        ['Packaging & materials', 'Explore formats, materials, components and finishes around your product.'],
        ['Samples & production', 'Coordinate sourcing, prototypes and manufacturing against an agreed brief.'],
        ['Quality & delivery', 'Bring inspections, packing and logistics into the same plan.'],
      ],
      prompt: 'Have a sketch, a sample or an existing pack? Start there.',
    },
    'Apparel & textiles': {
      description: 'Bring fabrics, fit and finished goods together—from your first sample to a coordinated production run.',
      services: [
        ['Fabrics & trims', 'Align material sourcing, colors and components with your brief.'],
        ['Sampling & manufacturing', 'Move through prototypes, fit feedback and production planning.'],
        ['Checks & shipment', 'Coordinate quality checks, packing and delivery.'],
      ],
      prompt: 'Share your design, reference garment or fabric direction.',
    },
    'Equipment': {
      description: 'Turn a practical product requirement into a coordinated engineering, sourcing and manufacturing project.',
      services: [
        ['Requirements & design', 'Define the use, materials, dimensions and manufacturing needs.'],
        ['Prototypes & suppliers', 'Coordinate engineering samples, components and production partners.'],
        ['Quality & logistics', 'Plan agreed checks, protective packing and shipment together.'],
      ],
      prompt: 'Start with a drawing, specification or the problem you want to solve.',
    },
    'Product engineering': {
      description: 'Connect creative intent with the details needed to make it—keeping design and production in the same conversation.',
      services: [
        ['Concept & specifications', 'Translate your idea into dimensions, materials and a clear product brief.'],
        ['Prototypes & refinement', 'Coordinate samples and design feedback before production.'],
        ['Manufacturing handoff', 'Bring approved specifications, suppliers and quality expectations together.'],
      ],
      prompt: 'A sketch is enough to begin the conversation.',
    },
    'Luxury & retail': {
      description: 'Bring the product, the finish and the presentation together—with a coordinated path from concept to retail.',
      services: [
        ['Materials & detail', 'Align material sourcing, hardware and finishes with your brand direction.'],
        ['Samples & presentation', 'Coordinate product samples, presentation packaging and production.'],
        ['Quality & distribution', 'Connect finish checks, protective packing and delivery planning.'],
      ],
      prompt: 'Share your product concept, finish references or retail vision.',
    },
    'Global logistics': {
      description: 'Connect origin to destination with Atlas coordinating the people, documents and handoffs along the way.',
      services: [
        ['Shipment planning', 'Align the origin, destination, timing and transport requirements.'],
        ['Documentation & customs', 'Coordinate shipping documents and customs handoffs with the relevant partners.'],
        ['Delivery coordination', 'Keep packing, transport and the final destination in one connected plan.'],
      ],
      prompt: 'Tell us what is moving, where it starts and where it needs to go.',
    },
  };
  const categoryDialog = $('#category-dialog');
  let categoryOpener = null;
  let categoryScroll = { left: 0, top: 0 };
  let selectedCategory = '';
  $$('.product-card').forEach((card, index) => {
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-controls', 'category-dialog');
    card.setAttribute('aria-label', `Explore ${card.dataset.category}`);
    card.addEventListener('click', () => {
      const content = categories[card.dataset.category];
      if (!content) return;
      categoryOpener = card;
      selectedCategory = card.dataset.category;
      categoryScroll = { left: window.scrollX, top: window.scrollY };
      const sourceImage = card.querySelector('img');
      $('#category-image').src = sourceImage.getAttribute('src');
      $('#category-image').alt = sourceImage.alt;
      $('#category-number').textContent = `${String(index + 1).padStart(2, '0')} / 06`;
      $('#category-title').textContent = selectedCategory;
      $('#category-description').textContent = content.description;
      $('#category-project-prompt').textContent = content.prompt;
      $('#category-services').replaceChildren(...content.services.map(([title, description]) => {
        const item = document.createElement('li');
        const heading = document.createElement('h4');
        const text = document.createElement('p');
        heading.textContent = title;
        text.textContent = description;
        item.append(heading, text);
        return item;
      }));
      categoryDialog.returnValue = '';
      document.body.classList.add('category-open');
      $('.orbit-lines').pauseAnimations?.();
      categoryDialog.showModal();
      categoryDialog.scrollTop = 0;
      $('#category-title').focus({ preventScroll: true });
    });
  });
  $$('[data-close-category]').forEach(button => button.addEventListener('click', () => categoryDialog.close('return')));
  $('[data-category-start]').addEventListener('click', () => categoryDialog.close('project'));
  categoryDialog.addEventListener('close', () => {
    document.body.classList.remove('category-open');
    if (!paused && !document.body.classList.contains('offscreen-hero')) $('.orbit-lines').unpauseAnimations?.();
    if (categoryDialog.returnValue === 'project') {
      $('#project-category').textContent = `${selectedCategory} — your next idea starts here.`;
      idea.placeholder = `Tell us about your ${selectedCategory.toLowerCase()} project…`;
      // Only the category prompt changes. Keep every entered field and attached file.
      $('#project').scrollIntoView({ behavior: paused ? 'instant' : 'smooth', block: 'center' });
      idea.focus({ preventScroll: true });
    } else {
      window.scrollTo({ ...categoryScroll, behavior: 'instant' });
      categoryOpener?.focus({ preventScroll: true });
    }
  });
  $('#project-file').addEventListener('change', event => {
    $('#upload-label').textContent = event.target.files[0]?.name || 'Add a brief or file';
  });
  const previewDialog = $('#preview-dialog');
  $('#project button[type="submit"]').disabled = false;
  $('#project').addEventListener('submit', event => {
    event.preventDefault();
    previewDialog.showModal();
  });
  $$('[data-close-preview]').forEach(button => button.addEventListener('click', () => previewDialog.close()));

  const launcher = $('.agent-launcher');
  const agent = $('#agent-panel');
  function closeAgent() { agent.hidden = true; launcher.setAttribute('aria-expanded', 'false'); launcher.focus({ preventScroll: true }); }
  launcher.addEventListener('click', () => {
    const open = agent.hidden;
    agent.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) $('[data-close-agent]').focus({ preventScroll: true });
  });
  $('[data-close-agent]').addEventListener('click', closeAgent);
  $('[data-agent-project]').addEventListener('click', closeAgent);
  const previewAnswers = {
    manufacturing: 'Atlas coordinates sourcing, prototyping, manufacturing and quality control. Share your product idea in Start Your Project to see the next step.',
    logistics: 'Atlas brings shipping, customs and delivery into one coordinated plan. Explore Move in the Atlas journey to see how the handoffs connect.',
    journey: 'Follow the five milestones: Define, Build, Verify, Move and Deliver. You can scroll through them or watch the visual tour.',
  };
  $$('[data-prompt]').forEach(button => button.addEventListener('click', () => {
    $('.agent-reply').textContent = `${previewAnswers[button.dataset.prompt]} (Scripted preview.)`;
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !agent.hidden) closeAgent(); });

  const tour = $('#tour-dialog');
  const video = $('#tour-video');
  const tourTitles = ['01 / DEFINE', '02 / BUILD', '03 / VERIFY', '04 / MOVE', '05 / DELIVER'];
  const tourCopy = ['From an idea to a clear direction.', 'From design to something real.', 'Confidence in every detail.', 'A world to cross. One team to call.', 'Delivered. And ready for what’s next.'];
  $$('[data-open-reel]').forEach(button => button.addEventListener('click', () => {
    tour.showModal();
    video.currentTime = 0;
    video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
  }));
  $('[data-close-tour]').addEventListener('click', () => tour.close());
  tour.addEventListener('close', () => video.pause());
  video.addEventListener('timeupdate', () => {
    const stage = Math.min(4, Math.floor(video.currentTime / 5));
    $('#tour-stage').textContent = tourTitles[stage];
    $('#tour-copy').textContent = tourCopy[stage];
  });
  for (const dialog of [tour, previewDialog, categoryDialog]) {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  }
  window.addEventListener('scroll', scheduleFrame, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('load', measure, { once: true });
  document.fonts?.ready.then(measure);
  applyMotionPreference();
  measure();
})();
