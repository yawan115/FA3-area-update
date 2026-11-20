(() => {
  'use strict';

  const storageKey = 'fa3-monthly-updates-v1';
  const baselineMonth = '2026-10';
  const defaultMonth = '2026-11';
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const cards = [...document.querySelectorAll('.project-card')];
  const topics = cards.map(card => card.querySelector('.project-name').textContent.trim());
  const nav = document.getElementById('month-nav');
  const feedback = document.getElementById('monthly-feedback');
  const period = document.getElementById('reporting-period');
  const snapshotLabel = document.querySelector('.snapshot-label');
  const highlights = [...document.querySelectorAll('.kpi-card')].map(card => ({
    value: card.querySelector('.kpi-value'),
    description: card.querySelector('.kpi-sub')
  }));
  const novemberHighlights = highlights.map(({ value, description }) => ({
    value: value.textContent,
    description: description.textContent
  }));
  const octoberHighlights = [
    { value: '4 Workstreams', description: 'SRE Agent POC, Testing POC Done, 1,709 Tables Audited' },
    { value: '28% Rollout', description: 'K8S/Istio Test Done · Prod Post-D11 Freeze · OIDC POC Done' },
    { value: '60% Tagging', description: 'Range Tagging +20% · Semantic Layer POC in Oct · Phase 2 Scope' },
    { value: 'Stage 1-2 Done', description: 'CDH Core Recovery Data Done · Huawei Cloud Sprint 3 Kickoff' }
  ];
  let selectedMonth = defaultMonth;
  let canSave = true;

  const isMonth = month => typeof month === 'string' && /^20\d{2}-(0[1-9]|1[0-2])$/.test(month);
  const monthLabel = month => `${monthNames[Number(month.slice(5)) - 1]} ${month.slice(0, 4)}`;

  function validate(data) {
    if (!data || data.version !== 1 || !Array.isArray(data.months) ||
        data.months.length > 120 || !data.months.every(isMonth) ||
        new Set(data.months).size !== data.months.length ||
        !data.updates || typeof data.updates !== 'object' || Array.isArray(data.updates)) {
      throw new Error('Invalid monthly backup format.');
    }
    for (const [topic, updates] of Object.entries(data.updates)) {
      if (!topics.includes(topic) || !updates || typeof updates !== 'object' || Array.isArray(updates)) {
        throw new Error('Backup contains an unknown topic or invalid update.');
      }
      for (const [month, text] of Object.entries(updates)) {
        if (!data.months.includes(month) || typeof text !== 'string' || text.length > 10000) {
          throw new Error('Invalid update text or month.');
        }
      }
    }
    if (data.statuses !== undefined) {
      if (!data.statuses || typeof data.statuses !== 'object' || Array.isArray(data.statuses)) {
        throw new Error('Invalid status backup format.');
      }
      for (const [topic, status] of Object.entries(data.statuses)) {
        if (!topics.includes(topic) || typeof status !== 'string' || status.length > 120) {
          throw new Error('Invalid topic status.');
        }
      }
    }
    return data;
  }

  let state = validate(structuredClone(window.FA3_INITIAL_DATA));
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      state = validate(JSON.parse(stored));
      feedback.textContent = 'Existing browser drafts loaded. Export a backup before replacing them.';
    }
  } catch (error) {
    canSave = false;
    feedback.textContent = `Could not load browser drafts: ${error.message}. Existing storage will not be overwritten; export the visible data or restore a valid backup.`;
  }

  function save() {
    if (!canSave) {
      feedback.textContent = 'Changes are in memory only. Restore a valid backup or export before leaving.';
      return;
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      feedback.textContent = 'Saved in this browser only. Export a backup to keep or move your updates.';
    } catch (error) {
      feedback.textContent = `Browser save failed: ${error.message}. Export a backup before leaving.`;
    }
  }

  const baseline = cards.map(card => ({
    status: card.querySelector('.project-header .tag-status'),
    body: card.querySelector('.project-body'),
    footer: card.querySelector('.project-footer')
  }));

  function render() {
    const months = [...new Set([baselineMonth, ...state.months])].sort().reverse();
    if (!months.includes(selectedMonth)) selectedMonth = months[0];
    period.textContent = `${monthLabel(selectedMonth)} Update`;
    const isOctober = selectedMonth === baselineMonth;
    const snapshot = isOctober ? octoberHighlights : novemberHighlights;
    highlights.forEach(({ value, description }, index) => {
      value.textContent = snapshot[index].value;
      description.textContent = snapshot[index].description;
    });
    snapshotLabel.textContent = isOctober
      ? 'October 2026 baseline highlights.'
      : 'Latest highlights · November 2026 snapshot; not automatically recalculated from drafts.';
    nav.replaceChildren();
    for (const month of months) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = monthLabel(month);
      button.setAttribute('aria-pressed', String(month === selectedMonth));
      button.addEventListener('click', () => {
        selectedMonth = month;
        render();
      });
      nav.append(button);
    }

    cards.forEach((card, index) => {
      card.querySelector('.monthly-updates')?.remove();
      card.querySelector('.editable-status')?.remove();
      const original = baseline[index];
      const isBaseline = selectedMonth === baselineMonth;
      original.status.classList.toggle('baseline-hidden', !isBaseline);
      original.body.classList.toggle('baseline-hidden', !isBaseline);
      original.footer.classList.toggle('baseline-hidden', !isBaseline);

      if (!isBaseline) {
        const status = document.createElement('input');
        status.type = 'text';
        status.className = 'tag-status progress editable-status';
        status.maxLength = 120;
        status.placeholder = 'No latest status';
        status.value = state.statuses?.[topics[index]] ?? '';
        status.setAttribute('aria-label', `${topics[index]} — latest status, not month-specific`);
        status.title = 'Latest status (shared across later months)';
        status.addEventListener('input', () => {
          state.statuses ||= {};
          state.statuses[topics[index]] = status.value;
          save();
        });
        original.status.after(status);
      }

      if (isBaseline && !state.months.includes(baselineMonth)) return;
      const group = document.createElement('div');
      group.className = 'monthly-updates';
      const entry = document.createElement('div');
      entry.className = 'monthly-entry';
      const heading = document.createElement('div');
      heading.className = 'monthly-heading';
      const label = document.createElement('label');
      const id = `update-${index}-${selectedMonth}`;
      label.htmlFor = id;
      label.textContent = isBaseline ? 'October notes (in addition to baseline)' : `${monthLabel(selectedMonth)} update`;
      const hint = document.createElement('small');
      hint.textContent = 'Browser draft';
      const textarea = document.createElement('textarea');
      textarea.id = id;
      textarea.maxLength = 10000;
      textarea.placeholder = 'No update provided. Add progress, achievements, blockers or next steps.';
      textarea.setAttribute('aria-label', `${topics[index]} — ${monthLabel(selectedMonth)} update`);
      textarea.value = state.updates[topics[index]]?.[selectedMonth] ?? '';
      textarea.addEventListener('input', () => {
        state.updates[topics[index]] ||= {};
        state.updates[topics[index]][selectedMonth] = textarea.value;
        save();
      });
      heading.append(label, hint);
      entry.append(heading, textarea);
      group.append(entry);
      card.querySelector('.project-header').after(group);
    });
  }

  document.getElementById('add-month').addEventListener('click', () => {
    const month = document.getElementById('update-month').value;
    if (!isMonth(month)) {
      feedback.textContent = 'Choose a valid month between 2020 and 2099.';
    } else if (state.months.includes(month)) {
      selectedMonth = month;
      render();
      feedback.textContent = 'That month already exists; showing its updates.';
    } else if (state.months.length >= 120) {
      feedback.textContent = 'Maximum 120 months reached. Export a backup before starting a new archive.';
    } else {
      state.months.push(month);
      selectedMonth = month;
      render();
      save();
    }
  });

  document.getElementById('export-updates').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `fa3-monthly-updates-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    feedback.textContent = 'Backup exported. It may contain confidential text; keep it in approved storage.';
  });

  document.getElementById('import-updates').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (file.size > 2000000) throw new Error('Backup exceeds 2 MB.');
      const imported = validate(JSON.parse(await file.text()));
      if (!window.confirm('Replace current monthly drafts with this backup? Export your current drafts first if needed.')) return;
      state = imported;
      canSave = true;
      selectedMonth = state.months.includes(defaultMonth) ? defaultMonth : baselineMonth;
      render();
      save();
    } catch (error) {
      feedback.textContent = `Restore failed: ${error.message}`;
    } finally {
      event.target.value = '';
    }
  });

  render();
})();
