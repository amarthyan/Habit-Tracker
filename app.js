// State Management
const STATE_KEY = 'habit-tracker-state-v2';
const HABITS_KEY = 'habit-tracker-habits';
const DARK_KEY = 'habit-dark';

const defaultHabits = [
  { id: "h1", name: "Exercise 3x a week", goal: 12 },
  { id: "h2", name: "Drink 16 cups of water", goal: 28 },
  { id: "h3", name: "Clean the room", goal: 8 },
  { id: "h4", name: "Eat fruits & vegetables", goal: 28 },
  { id: "h5", name: "Walk the dog", goal: 20 },
  { id: "h6", name: "Self-reflection", goal: 14 },
  { id: "h7", name: "Study session", goal: 20 },
  { id: "h8", name: "Good sleep session", goal: 28 }
];

const state = {
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  habits: [...defaultHabits],
  completions: {},
  isDarkMode: false,
  editingHabitId: null
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdayLetters = ["S", "M", "T", "W", "T", "F", "S"];

const weekColors = [
  { color: "var(--week1)", soft: "var(--week1-soft)" },
  { color: "var(--week2)", soft: "var(--week2-soft)" },
  { color: "var(--week3)", soft: "var(--week3-soft)" },
  { color: "var(--week4)", soft: "var(--week4-soft)" },
  { color: "var(--week5)", soft: "var(--week5-soft)" }
];

// Week mapping: maps week numbers 1-6 to design palette indexes
const weekColorMapping = [1, 2, 3, 4, 5, 2];

function getWeekColors(weekNum) {
  const index = weekColorMapping[(weekNum - 1) % weekColorMapping.length];
  return weekColors[index - 1];
}

function getMonthColors(monthIdx) {
  const index = (monthIdx % 5) + 1;
  return weekColors[index - 1];
}

function getHabitColor(habit, index) {
  const idNum = parseInt(habit.id.replace(/\D/g, ''));
  const idx = isNaN(idNum) ? (index + 1) : idNum;
  const weekIndex = ((idx - 1) % 5) + 1;
  return `var(--week${weekIndex})`;
}

// Date helpers
function getDaysInMonth(year, month) {
  const dayCount = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const days = [];
  
  for (let d = 1; d <= dayCount; d++) {
    const weekdayIdx = (firstDayIndex + d - 1) % 7;
    // Standard calendar week starting Sunday
    const weekNum = Math.floor((d - 1 + firstDayIndex) / 7) + 1;
    days.push({
      day: d,
      weekday: weekdayLetters[weekdayIdx],
      week: weekNum
    });
  }
  return days;
}

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// Storage operations
function loadFromStorage() {
  try {
    const completionsJson = localStorage.getItem(STATE_KEY);
    if (completionsJson) state.completions = JSON.parse(completionsJson);
    
    const habitsJson = localStorage.getItem(HABITS_KEY);
    if (habitsJson) state.habits = JSON.parse(habitsJson);
    
    state.isDarkMode = localStorage.getItem(DARK_KEY) === "1";
    if (state.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {
    console.error("LocalStorage load error:", e);
  }
}

function saveCompletions() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state.completions));
}

// Render Functions
function initApp() {
  loadFromStorage();
  
  // Set event listeners for static controls
  document.getElementById('btn-prev-year').addEventListener('click', () => {
    state.currentYear--;
    render();
  });
  
  document.getElementById('btn-next-year').addEventListener('click', () => {
    state.currentYear++;
    render();
  });
  
  document.getElementById('btn-theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('btn-export-pdf').addEventListener('click', exportPDF);
  document.getElementById('btn-export-excel').addEventListener('click', exportExcel);
  
  render();
}

function toggleTheme() {
  state.isDarkMode = !state.isDarkMode;
  document.documentElement.classList.toggle("dark", state.isDarkMode);
  localStorage.setItem(DARK_KEY, state.isDarkMode ? "1" : "0");
  
  // Update toggle button icon
  const button = document.getElementById('btn-theme-toggle');
  button.innerHTML = state.isDarkMode ? `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  ` : `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  `;
}

function getHabitMonthCompletionCount(habitId, year, monthIdx) {
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  let count = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = formatDate(year, monthIdx, d);
    if (state.completions[habitId]?.[key]) {
      count++;
    }
  }
  return count;
}

function render() {
  const days = getDaysInMonth(state.currentYear, state.currentMonth);
  const totalCells = state.habits.length * days.length;
  
  // Calculate total monthly completed cells
  let monthlyCompleted = 0;
  state.habits.forEach(habit => {
    monthlyCompleted += getHabitMonthCompletionCount(habit.id, state.currentYear, state.currentMonth);
  });
  
  const monthlyPercentage = totalCells ? (monthlyCompleted / totalCells) * 100 : 0;
  
  // Render Header & Month Navigation
  renderHeaderControls(monthlyCompleted, totalCells, monthlyPercentage);
  
  // Render Main Habit Tracker Grid
  renderHabitGrid(days);
  
  // Render Goals Sidebar Panel
  renderGoalsPanel();
  
  // Render Analytics (Circular Charts and Cards)
  renderAnalytics(days, monthlyCompleted, totalCells, monthlyPercentage);
}

function renderHeaderControls(completed, total, pct) {
  // Update year
  document.getElementById('year-display').textContent = state.currentYear;
  
  // Render month tabs list
  const container = document.getElementById('month-tabs-container');
  container.innerHTML = '';
  
  monthNames.forEach((month, idx) => {
    const btn = document.createElement('button');
    btn.className = `month-tab ${idx === state.currentMonth ? 'active' : ''}`;
    btn.textContent = month.slice(0, 3);
    
    const palette = getMonthColors(idx);
    if (idx === state.currentMonth) {
      btn.style.background = palette.color;
      btn.style.setProperty('--shadow-color', `color-mix(in oklab, ${palette.color} 35%, transparent)`);
    } else {
      btn.style.background = palette.soft;
    }
    
    btn.addEventListener('click', () => {
      state.currentMonth = idx;
      render();
    });
    
    container.appendChild(btn);
  });
  
  // Update subtitle summary
  document.getElementById('month-summary-text').textContent = 
    `${monthNames[state.currentMonth]} ${state.currentYear} · ${completed}/${total} completed · ${Math.round(pct)}%`;
}

function renderHabitGrid(days) {
  const container = document.getElementById('habit-grid-wrapper');
  container.innerHTML = '';
  
  const grid = document.createElement('div');
  grid.className = 'habit-grid';
  grid.style.gridTemplateColumns = `220px repeat(${days.length}, var(--cell-size)) 60px`;
  
  // Row 1: Week Badges Header
  const rowWeeks = document.createElement('div');
  rowWeeks.className = 'grid-row header-weeks';
  
  // Corner empty header space
  const cellEmptyCorner = document.createElement('div');
  rowWeeks.appendChild(cellEmptyCorner);
  
  // Place week badges dynamically
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const cell = document.createElement('div');
    cell.className = 'flex-col-center';
    
    // Check if this day is the start of a week group
    const isWeekStart = i === 0 || days[i - 1].week !== day.week;
    if (isWeekStart) {
      const badge = document.createElement('div');
      badge.className = 'week-badge';
      badge.textContent = `W${day.week}`;
      badge.style.background = getWeekColors(day.week).color;
      cell.appendChild(badge);
    }
    
    rowWeeks.appendChild(cell);
  }
  
  // Done empty header space
  rowWeeks.appendChild(document.createElement('div'));
  grid.appendChild(rowWeeks);
  
  // Row 2: Days Header
  const rowDays = document.createElement('div');
  rowDays.className = 'grid-row header-days';
  
  const cellHabitTitle = document.createElement('div');
  cellHabitTitle.className = 'px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground';
  cellHabitTitle.textContent = 'Habit';
  rowDays.appendChild(cellHabitTitle);
  
  days.forEach(day => {
    const cell = document.createElement('div');
    cell.className = 'day-header-cell';
    cell.style.background = getWeekColors(day.week).soft;
    
    const num = document.createElement('span');
    num.className = 'day-header-num';
    num.textContent = day.day;
    
    const letter = document.createElement('span');
    letter.className = 'day-header-day';
    letter.textContent = day.weekday;
    
    cell.appendChild(num);
    cell.appendChild(letter);
    rowDays.appendChild(cell);
  });
  
  const cellDoneTitle = document.createElement('div');
  cellDoneTitle.className = 'text-center text-[10px] font-semibold uppercase text-muted-foreground';
  cellDoneTitle.textContent = 'Done';
  rowDays.appendChild(cellDoneTitle);
  grid.appendChild(rowDays);
  
  // Habit Rows
  state.habits.forEach((habit, idx) => {
    const row = document.createElement('div');
    row.className = 'grid-row habit-row';
    
    // Name Column
    const cellName = document.createElement('div');
    cellName.className = 'cell-habit-name';
    
    if (state.editingHabitId === habit.id) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'habit-name-input';
      input.value = habit.name;
      
      const saveEdit = () => {
        const val = input.value.trim();
        if (val) habit.name = val;
        state.editingHabitId = null;
        localStorage.setItem(HABITS_KEY, JSON.stringify(state.habits));
        render();
      };
      
      input.addEventListener('blur', saveEdit);
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveEdit();
      });
      
      cellName.appendChild(input);
      // Timeout ensures browser completes layout cycle before focus
      setTimeout(() => input.focus(), 0);
    } else {
      const btn = document.createElement('button');
      btn.className = 'habit-name-btn';
      btn.textContent = habit.name;
      btn.title = "Click to edit";
      btn.addEventListener('click', () => {
        state.editingHabitId = habit.id;
        render();
      });
      
      const delBtn = document.createElement('button');
      delBtn.className = 'btn-delete-habit';
      delBtn.setAttribute('aria-label', 'Remove habit');
      delBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      `;
      delBtn.addEventListener('click', () => {
        if (confirm(`Are you sure you want to remove the habit "${habit.name}"?`)) {
          state.habits = state.habits.filter(h => h.id !== habit.id);
          delete state.completions[habit.id];
          localStorage.setItem(HABITS_KEY, JSON.stringify(state.habits));
          saveCompletions();
          render();
        }
      });
      
      cellName.appendChild(btn);
      cellName.appendChild(delBtn);
    }
    row.appendChild(cellName);
    
    // Day Checkboxes Columns
    days.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'cell-day-toggle';
      
      const dateStr = formatDate(state.currentYear, state.currentMonth, day.day);
      const isChecked = !!state.completions[habit.id]?.[dateStr];
      const colors = getWeekColors(day.week);
      
      const checkbox = document.createElement('button');
      checkbox.className = `day-checkbox ${isChecked ? 'checked' : ''}`;
      
      // Inject week dynamic colors via inline custom properties
      checkbox.style.setProperty('--active-color', colors.color);
      checkbox.style.setProperty('--active-shadow-color', `color-mix(in oklab, ${colors.color} 40%, transparent)`);
      checkbox.style.setProperty('--hover-bg-color', colors.soft);
      checkbox.style.setProperty('--hover-border-color', colors.color);
      
      // Hover background helper child
      const hoverBg = document.createElement('div');
      hoverBg.className = 'hover-bg';
      checkbox.appendChild(hoverBg);
      
      if (isChecked) {
        checkbox.innerHTML += `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5"/>
          </svg>
        `;
      }
      
      checkbox.addEventListener('click', () => {
        if (!state.completions[habit.id]) {
          state.completions[habit.id] = {};
        }
        state.completions[habit.id][dateStr] = !state.completions[habit.id][dateStr];
        saveCompletions();
        render();
      });
      
      cell.appendChild(checkbox);
      row.appendChild(cell);
    });
    
    // Done Total Column
    const cellDone = document.createElement('div');
    cellDone.className = 'cell-habit-done';
    cellDone.textContent = getHabitMonthCompletionCount(habit.id, state.currentYear, state.currentMonth);
    row.appendChild(cellDone);
    
    grid.appendChild(row);
  });
  
  // Add Habit Button Row
  const addBtn = document.createElement('button');
  addBtn.className = 'btn-add-habit';
  addBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg> Add habit
  `;
  addBtn.addEventListener('click', () => {
    const newId = `h_${Date.now()}`;
    state.habits.push({ id: newId, name: "New habit", goal: 14 });
    state.editingHabitId = newId;
    localStorage.setItem(HABITS_KEY, JSON.stringify(state.habits));
    render();
  });
  
  container.appendChild(grid);
  container.appendChild(addBtn);
}

function renderGoalsPanel() {
  const container = document.getElementById('goals-panel-list');
  container.innerHTML = '';
  
  state.habits.forEach((habit, idx) => {
    const count = getHabitMonthCompletionCount(habit.id, state.currentYear, state.currentMonth);
    const isGoalMet = count >= habit.goal;
    const progressPct = habit.goal ? Math.min(100, (count / habit.goal) * 100) : 0;
    const barColor = getHabitColor(habit, idx);
    
    const item = document.createElement('div');
    item.className = 'goal-item';
    
    const header = document.createElement('div');
    header.className = 'goal-header';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'goal-name';
    nameSpan.textContent = habit.name;
    nameSpan.title = habit.name;
    
    const fractionDiv = document.createElement('div');
    fractionDiv.className = 'goal-fraction';
    
    if (isGoalMet) {
      fractionDiv.innerHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      `;
    }
    
    const fractionText = document.createElement('span');
    fractionText.textContent = `${count}/`;
    fractionDiv.appendChild(fractionText);
    
    const goalInput = document.createElement('input');
    goalInput.type = 'number';
    goalInput.className = 'goal-input';
    goalInput.value = habit.goal;
    goalInput.min = '0';
    
    goalInput.addEventListener('change', () => {
      const val = parseInt(goalInput.value);
      habit.goal = isNaN(val) ? 0 : Math.max(0, val);
      localStorage.setItem(HABITS_KEY, JSON.stringify(state.habits));
      render();
    });
    
    fractionDiv.appendChild(goalInput);
    
    header.appendChild(nameSpan);
    header.appendChild(fractionDiv);
    
    const barContainer = document.createElement('div');
    barContainer.className = 'progress-bar-container';
    
    const barFill = document.createElement('div');
    barFill.className = 'progress-bar-fill';
    barFill.style.background = barColor;
    
    // Set width with timeout to trigger animations
    setTimeout(() => {
      barFill.style.width = `${progressPct}%`;
    }, 50);
    
    barContainer.appendChild(barFill);
    
    item.appendChild(header);
    item.appendChild(barContainer);
    
    container.appendChild(item);
  });
}

function renderAnalytics(days, completed, total, pct) {
  // 1. Monthly Circular Chart
  updateCircularChart('monthly-chart-svg', 170, pct, `${completed}/${total}`);
  
  // 2. Statistics Grid
  const statsList = document.getElementById('stats-grid-container');
  statsList.innerHTML = '';
  
  const incomplete = total - completed;
  const goalsMet = state.habits.filter(h => getHabitMonthCompletionCount(h.id, state.currentYear, state.currentMonth) >= h.goal).length;
  
  const stats = [
    { label: "Completed", value: completed, color: "var(--week4)" },
    { label: "Incomplete", value: incomplete, color: "var(--week3)" },
    { label: "Habits Hit Goal", value: goalsMet, color: "var(--week1)" },
    { label: "Habits Tracked", value: state.habits.length, color: "var(--week5)" }
  ];
  
  stats.forEach(st => {
    const div = document.createElement('div');
    div.className = 'stat-card';
    div.style.background = `color-mix(in oklab, ${st.color} 12%, transparent)`;
    
    const val = document.createElement('div');
    val.className = 'stat-value';
    val.style.color = st.color;
    val.textContent = st.value;
    
    const lbl = document.createElement('div');
    lbl.className = 'stat-label';
    lbl.textContent = st.label;
    
    div.appendChild(val);
    div.appendChild(lbl);
    statsList.appendChild(div);
  });
  
  // 3. Weekly Completion Charts
  const weeklyContainer = document.getElementById('weekly-progress-grid');
  weeklyContainer.innerHTML = '';
  
  const maxWeek = Math.max(...days.map(d => d.week));
  for (let w = 1; w <= maxWeek; w++) {
    const weekDays = days.filter(d => d.week === w);
    const weekCellTotal = weekDays.length * state.habits.length;
    
    let weekCompleted = 0;
    state.habits.forEach(habit => {
      weekDays.forEach(day => {
        const dateStr = formatDate(state.currentYear, state.currentMonth, day.day);
        if (state.completions[habit.id]?.[dateStr]) {
          weekCompleted++;
        }
      });
    });
    
    const weekPct = weekCellTotal ? (weekCompleted / weekCellTotal) * 100 : 0;
    const colors = getWeekColors(w);
    
    const widget = document.createElement('div');
    widget.className = 'circular-chart-widget';
    
    const chartId = `week-chart-${w}`;
    const svgDiv = document.createElement('div');
    svgDiv.className = 'chart-svg-container';
    svgDiv.id = chartId;
    widget.appendChild(svgDiv);
    
    const label = document.createElement('span');
    label.className = 'chart-label';
    label.textContent = `Week ${w}`;
    widget.appendChild(label);
    
    weeklyContainer.appendChild(widget);
    
    updateCircularChart(chartId, 120, weekPct, `${weekCompleted}/${weekCellTotal}`, colors.color);
  }
  
  // 4. Year Overview Grid
  const yearContainer = document.getElementById('year-overview-grid-container');
  yearContainer.innerHTML = '';
  
  let yearTotalCells = 0;
  let yearCompletedCells = 0;
  
  monthNames.forEach((month, idx) => {
    const daysInMonth = new Date(state.currentYear, idx + 1, 0).getDate();
    const cells = state.habits.length * daysInMonth;
    
    let done = 0;
    state.habits.forEach(habit => {
      done += getHabitMonthCompletionCount(habit.id, state.currentYear, idx);
    });
    
    yearTotalCells += cells;
    yearCompletedCells += done;
    
    const monthPct = cells ? (done / cells) * 100 : 0;
    const palette = getMonthColors(idx);
    const isCurrent = idx === state.currentMonth;
    
    const btn = document.createElement('button');
    btn.className = 'month-card-btn';
    btn.style.borderColor = isCurrent ? palette.color : 'var(--border)';
    btn.style.background = isCurrent ? palette.soft : 'transparent';
    
    const chartId = `year-month-chart-${idx}`;
    const svgDiv = document.createElement('div');
    svgDiv.className = 'chart-svg-container';
    svgDiv.id = chartId;
    btn.appendChild(svgDiv);
    
    btn.addEventListener('click', () => {
      state.currentMonth = idx;
      render();
    });
    
    yearContainer.appendChild(btn);
    
    updateCircularChart(chartId, 90, monthPct, `${done}/${cells}`, palette.color, month.slice(0, 3));
  });
  
  // Update year overview summary numbers
  const yearPct = yearTotalCells ? (yearCompletedCells / yearTotalCells) * 100 : 0;
  document.getElementById('year-summary-numbers').textContent = 
    `${yearCompletedCells}/${yearTotalCells} · ${Math.round(yearPct)}%`;
}

function updateCircularChart(containerId, size, percentage, subtext, strokeColor = "var(--week2)", labelOverride = "") {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, percentage)) / 100) * circumference;
  
  // Format percentage text
  const pctStr = `${Math.round(percentage)}%`;
  
  container.innerHTML = `
    <svg width="${size}" height="${size}" class="-rotate-90">
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" stroke="var(--muted)" stroke-width="${strokeWidth}" fill="none"></circle>
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" fill="none" 
        stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" 
        style="transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1);">
      </circle>
    </svg>
    <div class="chart-info">
      <span class="chart-percentage" style="font-size: ${size > 120 ? '1.5rem' : size > 90 ? '1.25rem' : '1rem'}">${labelOverride ? labelOverride : pctStr}</span>
      <span class="chart-subtext" style="font-size: ${size > 120 ? '10px' : '9px'}">${subtext}</span>
    </div>
  `;
  
  // Trigger animation next frame
  requestAnimationFrame(() => {
    const circle = container.querySelector('svg circle:nth-child(2)');
    if (circle) {
      circle.style.strokeDashoffset = offset;
    }
  });
}

// Exports
function exportPDF() {
  if (!window.jspdf) {
    alert("jsPDF library is not loaded yet. Please wait a moment or refresh.");
    return;
  }
  
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape" });
    const days = getDaysInMonth(state.currentYear, state.currentMonth);
    
    doc.setFontSize(18);
    doc.text(`Habit Tracker — ${monthNames[state.currentMonth]} ${state.currentYear}`, 14, 16);
    
    const headers = [["Habit", ...days.map(d => String(d.day)), "Done", "Goal"]];
    const body = state.habits.map(habit => {
      const row = [habit.name];
      days.forEach(day => {
        const key = formatDate(state.currentYear, state.currentMonth, day.day);
        row.push(state.completions[habit.id]?.[key] ? "X" : "");
      });
      
      const done = getHabitMonthCompletionCount(habit.id, state.currentYear, state.currentMonth);
      row.push(String(done));
      row.push(String(habit.goal));
      return row;
    });
    
    doc.autoTable({
      startY: 22,
      head: headers,
      body: body,
      styles: { fontSize: 7, cellPadding: 1, halign: "center" },
      columnStyles: { 0: { halign: "left", cellWidth: 40 } },
      headStyles: { fillColor: [30, 41, 59] }
    });
    
    doc.save(`habit-tracker-${monthNames[state.currentMonth]}-${state.currentYear}.pdf`);
  } catch (e) {
    console.error("PDF Export error:", e);
    alert("An error occurred during PDF generation.");
  }
}

function exportExcel() {
  if (!window.XLSX) {
    alert("SheetJS library is not loaded yet. Please wait a moment or refresh.");
    return;
  }
  
  try {
    const wb = XLSX.utils.book_new();
    
    monthNames.forEach((month, mIdx) => {
      const days = getDaysInMonth(state.currentYear, mIdx);
      const headers = ["Habit", ...days.map(d => `${d.day} (${d.weekday})`), "Done", "Goal", "%"];
      
      const rows = state.habits.map(habit => {
        const row = [habit.name];
        days.forEach(day => {
          const key = formatDate(state.currentYear, mIdx, day.day);
          row.push(state.completions[habit.id]?.[key] ? "✓" : "");
        });
        
        const done = getHabitMonthCompletionCount(habit.id, state.currentYear, mIdx);
        row.push(done);
        row.push(habit.goal);
        row.push(habit.goal ? Math.round((done / habit.goal) * 100) : 0);
        return row;
      });
      
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      XLSX.utils.book_append_sheet(wb, ws, month.slice(0, 3));
    });
    
    XLSX.writeFile(wb, `habit-tracker-${state.currentYear}.xlsx`);
  } catch (e) {
    console.error("Excel Export error:", e);
    alert("An error occurred during Excel generation.");
  }
}

// Initialise App on Load
window.addEventListener('DOMContentLoaded', initApp);
