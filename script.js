// =============================
// ICCT Student Portal JavaScript
// =============================

// ----------- SIDEBAR TOGGLE -----------
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

sidebarToggle.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
  } else {
    sidebar.classList.toggle("hidden");
  }
});

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    }
  }
});

// ----------- THEME TOGGLE -----------
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const moonIcon = themeToggle.querySelector(".moon-icon");
const sunIcon = themeToggle.querySelector(".sun-icon");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  sunIcon.style.display = "block";
  moonIcon.style.display = "none";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  sunIcon.style.display = isDark ? "block" : "none";
  moonIcon.style.display = isDark ? "none" : "block";
});

// ----------- NOTIFICATIONS IN SIDEBAR -----------
// Notifications are now handled as a separate page in the sidebar navigation

// ----------- PAGE NAVIGATION -----------
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const pageId = item.getAttribute("data-page");
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    pages.forEach((p) => p.classList.remove("active"));
    document.getElementById(`${pageId}-page`).classList.add("active");
    
    // Close sidebar on mobile when nav item is clicked
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    }
    // Remove automatic sidebar hiding - let users control it manually
  });
});

function navigateTo(pageId) {
  document.querySelector(`.nav-item[data-page="${pageId}"]`).click();
}

// Show notifications popup modal
function showNotifications() {
  const modal = document.getElementById("notificationsModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

// Close notifications popup
function closeNotifications() {
  const modal = document.getElementById("notificationsModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Mark all notifications as read
function markAllAsRead() {
  const unreadItems = document.querySelectorAll("#notificationsModal .notification-item.unread");
  unreadItems.forEach(item => {
    item.classList.remove("unread");
    const dot = item.querySelector(".unread-dot");
    if (dot) dot.remove();
  });
  
  const badge = document.querySelector("#notificationsModal .badge");
  if (badge) badge.textContent = "0 new";
  
  const topBadge = document.querySelector(".notification-badge");
  if (topBadge) topBadge.style.display = "none";
  
  showToast("Notifications", "All notifications marked as read");
}

// Close modal when clicking outside
window.addEventListener("click", function(event) {
  const modal = document.getElementById("notificationsModal");
  if (event.target === modal) {
    closeNotifications();
  }
});

// ----------- LEDGER TAB SWITCHING -----------
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`${btn.dataset.tab}-tab`).classList.add("active");
  });
});

// ----------- TOAST SYSTEM -----------
const toast = document.getElementById("toast");

function showToast(title, message) {
  toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-description">${message}</div>`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ----------- SCHEDULE DATA -----------
const scheduleContent = document.getElementById("scheduleContent");
const scheduleData = [
  { 
    subject: "Integrative Programming and Technologies 2", 
    code: "OLIPT2",
    day: "Monday", 
    time: "8:00 AM - 11:00 AM", 
    room: "Room 301, Building A", 
    instructor: 'Chiong, Joriz Dedal', 
    units: 4,
    type: 'lecture',
    color: '#3b82f6',
    section: 'LFAU411A075'
  },
  { 
    subject: "System Administration and Maintenance", 
    code: "OLSA01",
    day: "Tuesday", 
    time: "1:00 PM - 4:00 PM", 
    room: "Lab 201, Building B", 
    instructor: 'Chiong, Joriz Dedal', 
    units: 4,
    type: 'lab',
    color: '#10b981',
    section: 'LFAU411A075'
  },
  { 
    subject: "Practicum (243 Hours)", 
    code: "OLITPRAC1",
    day: "Wednesday", 
    time: "9:00 AM - 5:00 PM", 
    room: "Industry Partner Site", 
    instructor: 'Vilog, Jericho Manlangit', 
    units: 3,
    type: 'practicum',
    color: '#f59e0b',
    section: 'LFAU411A075'
  },
  { 
    subject: "Applications Development and Emerging Technologies", 
    code: "OLCC06",
    day: "Thursday", 
    time: "10:00 AM - 1:00 PM", 
    room: "Room 405, Building A", 
    instructor: 'Chiong, Joriz Dedal', 
    units: 4,
    type: 'lecture',
    color: '#8b5cf6',
    section: 'LFAU333A004'
  },
  { 
    subject: "Information Assurance and Security 2", 
    code: "OLIAS2",
    day: "Friday", 
    time: "2:00 PM - 5:00 PM", 
    room: "Online via Zoom", 
    instructor: 'Chiong, Joriz Dedal', 
    units: 4,
    type: 'online',
    color: '#ec4899',
    section: 'LFAU333A004'
  },
  { 
    subject: "Event Driven Programming", 
    code: "OLPFI1",
    day: "Monday", 
    time: "2:00 PM - 5:00 PM", 
    room: "Lab 105, Building C", 
    instructor: 'Chiong, Joriz Dedal', 
    units: 4,
    type: 'lab',
    color: '#06b6d4',
    section: 'LFAU333A004'
  },
  { 
    subject: "Capstone Project and Research 2", 
    code: "OLCAPS2",
    day: "Tuesday", 
    time: "9:00 AM - 12:00 PM", 
    room: "Room 302, Building A", 
    instructor: 'Vilog, Jericho Manlangit', 
    units: 3,
    type: 'lecture',
    color: '#f97316',
    section: 'LFAU333A004'
  },
  { 
    subject: "Practicum (243 Hours)", 
    code: "OLITPRAC2",
    day: "Thursday", 
    time: "2:00 PM - 5:00 PM", 
    room: "Industry Partner Site", 
    instructor: 'Vilog, Jericho Manlangit', 
    units: 3,
    type: 'practicum',
    color: '#84cc16',
    section: 'LFAU411A075'
  }
];

function renderSchedule() {
  if (!scheduleContent) return;
  
  const dayFilter = document.getElementById('dayFilter')?.value || 'all';
  const typeFilter = document.getElementById('typeFilter')?.value || 'all';
  
  const filteredData = scheduleData.filter(item => {
    const dayMatch = dayFilter === 'all' || item.day.toLowerCase() === dayFilter;
    const typeMatch = typeFilter === 'all' || item.type === typeFilter;
    return dayMatch && typeMatch;
  });
  
  if (filteredData.length === 0) {
    scheduleContent.innerHTML = '<p style="text-align:center; padding:2rem; color:var(--muted-foreground);">No classes match your filters.</p>';
    return;
  }
  
  scheduleContent.innerHTML = filteredData.map(item => `
    <div class="schedule-item-enhanced" style="border-left-color: ${item.color};">
      <div class="schedule-item-header">
        <div class="schedule-item-main">
          <div class="schedule-avatar" style="background: ${item.color}20; color: ${item.color};">
            ${item.code}
          </div>
          <div class="schedule-item-info">
            <h4>${item.subject}</h4>
            <p class="schedule-meta">
              <span><i class="fas fa-user"></i> ${item.instructor}</span>
              <span><i class="fas fa-book"></i> ${item.units} units</span>
              <span><i class="fas fa-users"></i> ${item.section}</span>
            </p>
          </div>
        </div>
        <div class="schedule-item-badge">
          <span class="badge ${item.type === 'online' ? 'badge-info' : item.type === 'lab' ? 'badge-success' : 'badge-primary'}">
            ${item.type === 'online' ? '<i class="fas fa-video"></i>' : item.type === 'lab' ? '<i class="fas fa-flask"></i>' : '<i class="fas fa-book-open"></i>'}
            ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
        </div>
      </div>
      <div class="schedule-item-details">
        <div class="detail-pill">
          <i class="fas fa-calendar-day"></i>
          <strong>${item.day}</strong>
        </div>
        <div class="detail-pill">
          <i class="fas fa-clock"></i>
          <strong>${item.time}</strong>
        </div>
        <div class="detail-pill">
          <i class="fas fa-map-marker-alt"></i>
          <strong>${item.room}</strong>
        </div>
      </div>
    </div>
  `).join("");
}

function filterSchedule() {
  renderSchedule();
}

function printSchedule() {
  window.print();
}

function exportSchedule() {
  showToast('info', 'Export feature coming soon!');
}

// Render schedule on load
if (scheduleContent) {
  renderSchedule();
}

// ----------- DASHBOARD WIDGETS (GPA, TODO, MESSAGES, SEARCH) -----------
const todoListEl = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const messagesList = document.getElementById('messagesList');
const gpaValueEl = document.getElementById('gpaValue');

let todos = [
  { id: 1, text: 'Submit Project 2 (Web Development)', due: '2025-01-15' },
  { id: 2, text: 'Pay tuition balance', due: '2025-01-15' },
];

// load persisted todos if available
try {
  const storedTodos = JSON.parse(localStorage.getItem('todos'));
  if (Array.isArray(storedTodos)) todos = storedTodos;
} catch(e) { /* ignore */ }

let messages = [
  { from: 'Prof. Santos', text: 'Reminder: Project 2 requirements posted.', time: '2h' },
  { from: 'Registrar', text: 'Enrollment opens Jan 15. Prepare documents.', time: '1d' },
];

try {
  const storedMsg = JSON.parse(localStorage.getItem('messages'));
  if (Array.isArray(storedMsg)) messages = storedMsg;
} catch(e) {}

function renderTodos() {
  if (!todoListEl) return;
  if (todos.length === 0) {
    todoListEl.innerHTML = '<li class="empty-state">No tasks. Good job!</li>';
    return;
  }
  todoListEl.innerHTML = todos.map(t => `
    <li data-id="${t.id}">
      <div>
        <strong>${t.text}</strong>
        <div class="time-text">Due: ${t.due}</div>
      </div>
      <div>
        <button class="btn btn-sm" onclick="completeTodo(${t.id})">Done</button>
      </div>
    </li>
  `).join('');
}

function addTodo() {
  const text = todoInput.value && todoInput.value.trim();
  if (!text) return showToast('Invalid', 'Enter a todo item');
  const id = Date.now();
  const due = new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0];
  todos.push({ id, text, due });
  todoInput.value = '';
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
  showToast('Added', 'Task added to your to-do list');
}

function completeTodo(id) {
  todos = todos.filter(t => t.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
  showToast('Completed', 'Task marked complete');
}

function renderMessages() {
  if (!messagesList) return;
  if (messages.length === 0) {
    messagesList.innerHTML = '<li class="empty-state">No messages</li>';
    return;
  }
  messagesList.innerHTML = messages.map(m => `
    <li>
      <strong>${m.from}</strong>
      <div class="time-text">${m.time} ago</div>
      <div>${m.text}</div>
    </li>
  `).join('');
}

function addMessage(msg){
  messages.unshift(msg);
  localStorage.setItem('messages', JSON.stringify(messages));
  renderMessages();
}

// ----------- PAYMENT HISTORY SAMPLE -----------
const paymentHistoryEl = document.getElementById('paymentHistory');
let paymentRecords = [
  { ref: 'PAY123456', amount: 5000, date: '2024-11-15', method: 'GCash' },
  { ref: 'PAY123457', amount: 2500, date: '2024-09-10', method: 'Card' },
  { ref: 'PAY123458', amount: 2500, date: '2024-08-02', method: 'Cash' },
];

function renderPaymentHistory() {
  if (!paymentHistoryEl) return;
  if (paymentRecords.length === 0) {
    paymentHistoryEl.innerHTML = '<p class="empty-state">No payment history yet.</p>';
    return;
  }
  paymentHistoryEl.innerHTML = paymentRecords.map(r => `
    <div class="payment-item">
      <div class="payment-info">
        <p>Ref: ${r.ref}</p>
        <span>${r.date} • ${r.method}</span>
      </div>
      <div class="payment-amount">
        <p>₱${r.amount.toFixed(2)}</p>
      </div>
    </div>
  `).join('');
}

// ----------- ENROLLMENT COURSES -----------
const enrollmentCoursesEl = document.getElementById('enrollmentCourses');
const enrollmentCountEl = document.getElementById('enrollmentCount');
const enrollmentCartEl = document.getElementById('enrollmentCart');
const cartSummaryEl = document.getElementById('cartSummary');

const availableCourses = [
  { id: 1, code: 'CS401', name: 'Advanced Database Systems', credits: 3, instructor: 'Prof. Maria Santos', schedule: 'MWF 10:00-11:30 AM', enrolled: false, color: '#4361ee' },
  { id: 2, code: 'CS402', name: 'Machine Learning', credits: 3, instructor: 'Prof. Roberto Garcia', schedule: 'TTH 1:00-2:30 PM', enrolled: false, color: '#3f37c9' },
  { id: 3, code: 'CS403', name: 'Mobile App Development', credits: 3, instructor: 'Prof. Ana Reyes', schedule: 'MWF 2:00-3:30 PM', enrolled: false, color: '#4cc9f0' },
  { id: 4, code: 'CS404', name: 'Cloud Computing', credits: 4, instructor: 'Prof. Carlos Mendoza', schedule: 'TTH 10:00-12:00 PM', enrolled: false, color: '#4ade80' },
  { id: 5, code: 'GE201', name: 'Literature and Society', credits: 3, instructor: 'Prof. Isabel Cruz', schedule: 'F 3:30-6:00 PM', enrolled: false, color: '#f59e0b' }
];

function renderEnrollmentCourses() {
  if (!enrollmentCoursesEl) return;
  
  const tbody = enrollmentCoursesEl.querySelector('tbody');
  if (!tbody) return;
  
  tbody.innerHTML = availableCourses.map(course => `
    <tr class="${course.enrolled ? 'enrolled-row' : ''}" data-id="${course.id}">
      <td><span class="badge badge-outline">${course.code}</span></td>
      <td><strong>${course.name}</strong></td>
      <td style="text-align: center;">${course.credits}</td>
      <td>${course.instructor}</td>
      <td><i class="fas fa-clock"></i> ${course.schedule}</td>
      <td style="text-align: center;"><span class="badge badge-secondary"><i class="fas fa-users"></i> 25/40</span></td>
      <td style="text-align: center;">
        <button class="btn btn-sm ${course.enrolled ? 'btn-success' : 'btn-primary'}" onclick="toggleEnrollment(${course.id})">
          <i class="fas ${course.enrolled ? 'fa-check' : 'fa-plus'}"></i>
          ${course.enrolled ? 'Enrolled' : 'Enroll'}
        </button>
      </td>
    </tr>
  `).join('');
  
  updateEnrollmentCart();
}

function toggleEnrollment(courseId) {
  const course = availableCourses.find(c => c.id === courseId);
  if (course) {
    course.enrolled = !course.enrolled;
    renderEnrollmentCourses();
    showToast(course.enrolled ? 'Course Added' : 'Course Removed', 
              `${course.name} ${course.enrolled ? 'added to' : 'removed from'} enrollment cart`);
  }
}

function updateEnrollmentCart() {
  const enrolledCourses = availableCourses.filter(c => c.enrolled);
  const totalCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);
  
  if (enrollmentCountEl) {
    enrollmentCountEl.textContent = `${enrolledCourses.length} courses (${totalCredits} credits) selected`;
  }
  
  if (enrollmentCartEl && cartSummaryEl) {
    if (enrolledCourses.length > 0) {
      enrollmentCartEl.style.display = 'block';
      cartSummaryEl.textContent = `${enrolledCourses.length} courses selected • ${totalCredits} total credits`;
    } else {
      enrollmentCartEl.style.display = 'none';
    }
  }
}

if (enrollmentCoursesEl) {
  renderEnrollmentCourses();
}

// Search and filter for enrollment
const courseSearchEl = document.getElementById('courseSearch');
const deptFilterEl = document.getElementById('deptFilter');

if (courseSearchEl) {
  courseSearchEl.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

if (deptFilterEl) {
  deptFilterEl.addEventListener('change', (e) => {
    const dept = e.target.value;
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
      const code = card.querySelector('.badge-outline').textContent;
      if (dept === 'all') {
        card.style.display = '';
      } else if (dept === 'Computer Science' && code.startsWith('CS')) {
        card.style.display = '';
      } else if (dept === 'General Education' && code.startsWith('GE')) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ----------- PAYMENT HISTORY SAMPLE -----------

// GPA sparkline (simple SVG line based on mock history)
function drawGpaSparkline(values){
  const holder = document.getElementById('gpaSparkline');
  if(!holder || !values || values.length===0) return;
  const w = holder.clientWidth || 200;
  const h = holder.clientHeight || 48;
  const padding = 6;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const norm = v=> (h-padding) - ((v - min)/(max-min || 1))*(h-padding*2);
  const step = w/(values.length-1 || 1);
  const points = values.map((v,i)=>`${i*step},${norm(v)}`).join(' ');
  holder.innerHTML = `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline fill="none" stroke="#2563eb" stroke-width="2" points="${points}" /></svg>`;
}

drawGpaSparkline([2.3,2.5,2.7,3.0,2.85]);

function updateGPA(newGpa) {
  if (!gpaValueEl) return;
  gpaValueEl.textContent = newGpa.toFixed(2);
}

// simple search over announcements, subjects, messages
function handleSearch() {
  const q = document.getElementById('globalSearch').value.trim().toLowerCase();
  if (!q) return showToast('Search', 'Enter a term to search');
  // search announcements
  const foundAnn = Array.from(document.querySelectorAll('.announcement-item')).filter(a => a.textContent.toLowerCase().includes(q));
  if (foundAnn.length) {
    showToast('Search', `Found ${foundAnn.length} announcement(s)`);
    // navigate to dashboard
    navigateTo('dashboard');
    foundAnn[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  // search subjects in enrollment
  const foundSubj = Array.from(document.querySelectorAll('.subject-item')).filter(s => s.textContent.toLowerCase().includes(q));
  if (foundSubj.length) {
    showToast('Search', `Found ${foundSubj.length} subject(s)`);
    navigateTo('enrollment');
    foundSubj[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  // search messages
  const foundMsg = messages.filter(m => (m.from + ' ' + m.text).toLowerCase().includes(q));
  if (foundMsg.length) {
    showToast('Search', `Found ${foundMsg.length} message(s)`);
    navigateTo('notifications');
    return;
  }
  showToast('Search', 'No results found');
}

// helper for quick links
function openLink(hash) {
  // if it's a page in nav, simulate click
  const nav = document.querySelector(`.nav-item[data-page="${hash.replace('#','')}"]`);
  if (nav) nav.click();
}

// ----------- ENROLLMENT SECTIONS -----------
const enrolledSubjects = document.getElementById("enrolledSubjects");
const availableSections = document.getElementById("availableSections");
const enrolledUnits = document.getElementById("enrolledUnits");

let enrolled = [
  { code: "CS301", name: "Database Systems", units: 3 },
  { code: "CS302", name: "Web Development", units: 3 },
];

const available = [
  { code: "CS303", name: "Network Security", units: 3 },
  { code: "CS304", name: "Data Structures", units: 3 },
  { code: "CS305", name: "Software Engineering", units: 3 },
];

function renderSubjects() {
  if (!enrolledSubjects || !availableSections) return;
  
  enrolledSubjects.innerHTML = enrolled.map(subj => `
    <div class="subject-item">
      <div class="subject-header">
        <div class="subject-info">
          <div class="subject-name">${subj.name}</div>
          <p class="subject-details">${subj.code} • ${subj.units} units</p>
        </div>
        <div class="subject-actions">
          <button class="btn btn-destructive btn-sm" onclick="dropSubject('${subj.code}')">Remove</button>
        </div>
      </div>
    </div>
  `).join("");

  availableSections.innerHTML = available.map(subj => `
    <div class="subject-item">
      <div class="subject-header">
        <div class="subject-info">
          <div class="subject-name">${subj.name}</div>
          <p class="subject-details">${subj.code} • ${subj.units} units</p>
        </div>
        <div class="subject-actions">
          <button class="btn btn-primary btn-sm" onclick="addSubject('${subj.code}')">Add</button>
        </div>
      </div>
    </div>
  `).join("");

  if (enrolledUnits) {
    enrolledUnits.textContent = `${enrolled.reduce((t, s) => t + s.units, 0)} units`;
  }
}

// Render subjects on load
if (enrolledSubjects && availableSections) {
  renderSubjects();
}

function addSubject(code) {
  const subj = available.find(s => s.code === code);
  if (subj) {
    enrolled.push(subj);
    available.splice(available.indexOf(subj), 1);
    renderSubjects();
    showToast("Enrollment Updated", `${subj.name} added`);
  }
}

function dropSubject(code) {
  const subj = enrolled.find(s => s.code === code);
  if (subj) {
    available.push(subj);
    enrolled.splice(enrolled.indexOf(subj), 1);
    renderSubjects();
    showToast("Enrollment Updated", `${subj.name} removed`);
  }
}

// ----------- TUITION PAYMENT SIMULATION -----------
const refDisplay = document.getElementById("refNumberDisplay");
const refNumber = document.getElementById("refNumber");
const paymentAmount = document.getElementById("paymentAmount");

function payTuition() {
  const amount = Number(paymentAmount.value);
  if (!amount || amount <= 0) {
    showToast("Invalid Payment", "Enter a valid amount.");
    return;
  }
  const ref = "REF" + Math.floor(Math.random() * 1000000000);
  refDisplay.style.display = "block";
  refNumber.textContent = ref;
  showToast("Payment Successful", `₱${amount.toFixed(2)} paid. Ref: ${ref}`);
  paymentAmount.value = "";
}

// ----------- PAYMENT HISTORY -----------
const paymentHistory = document.getElementById("paymentHistory");
let payments = [];

function addPaymentRecord(amount, ref) {
  const date = new Date().toLocaleString();
  payments.unshift({ amount, ref, date });
  renderHistory();
}

function renderHistory() {
  if (payments.length === 0) {
    paymentHistory.innerHTML = `<p class="empty-state">No payment history yet.</p>`;
  } else {
    paymentHistory.innerHTML = payments.map(p => `
      <div class="payment-item">
        <div class="payment-info">
          <p>Ref: ${p.ref}</p>
          <span>${p.date}</span>
        </div>
        <div class="payment-amount">
          <p>₱${p.amount.toFixed(2)}</p>
        </div>
      </div>
    `).join("");
  }
}

// ----------- STORE & CART SYSTEM -----------
const storeItems = document.getElementById("storeItems");
const cartItems = document.getElementById("cartItems");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const cartContainer = document.getElementById("cartContainer");

const items = [
  { id: 1, name: "PE Uniform", desc: "Physical Education uniform", price: 500, img: 'https://via.placeholder.com/80x80?text=Uniform' },
  { id: 2, name: "ID Lace", desc: "ICCT official ID lace", price: 100, img: 'https://via.placeholder.com/80x80?text=Lace' },
  { id: 3, name: "Notebook", desc: "ICCT College notebook", price: 80, img: 'https://via.placeholder.com/80x80?text=Notebook' },
];

let cart = [];

// --- STORE (category-driven) ---
// storeItems / cartItems / cartContainer are defined earlier
const storeCatalog = {
  documents: [
    { id: 'd1', name: 'Certificate of Enrollment', desc: 'Official certificate of enrollment', price: 50, img: 'https://via.placeholder.com/80x80?text=Cert' },
    { id: 'd2', name: 'Certificate of Graduation', desc: 'Graduation certificate', price: 150, img: 'https://via.placeholder.com/80x80?text=Grad' },
    { id: 'd3', name: 'Transcript of Records', desc: 'Official transcript', price: 250, img: 'https://via.placeholder.com/80x80?text=TOR' },
    { id: 'd4', name: 'Honorable Dismissal', desc: 'Transfer credentials', price: 100, img: 'https://via.placeholder.com/80x80?text=HD' }
  ],
  uniforms: [
    { id: 'u1', name: 'PE Uniform', desc: 'Physical Education uniform', price: 500, img: 'https://via.placeholder.com/80x80?text=Uniform' },
    { id: 'u2', name: 'College Polo', desc: 'Official college polo', price: 600, img: 'https://via.placeholder.com/80x80?text=Polo' }
  ],
  supplies: [
    { id: 's1', name: 'Notebook', desc: 'ICCT College notebook', price: 80, img: 'https://via.placeholder.com/80x80?text=Notebook' },
    { id: 's2', name: 'ID Lace', desc: 'ICCT official ID lace', price: 100, img: 'https://via.placeholder.com/80x80?text=Lace' },
    { id: 's3', name: 'Lab Manual', desc: 'Laboratory manual', price: 300, img: 'https://via.placeholder.com/80x80?text=Manual' }
  ],
  fees: [
    { id: 'f1', name: 'ID Card Replacement', desc: 'New student ID', price: 150, img: 'https://via.placeholder.com/80x80?text=ID' },
    { id: 'f2', name: 'Clearance Fee', desc: 'End of semester clearance', price: 50, img: 'https://via.placeholder.com/80x80?text=Clear' },
    { id: 'f3', name: 'Late Enrollment Fee', desc: 'Late enrollment penalty', price: 500, img: 'https://via.placeholder.com/80x80?text=Late' }
  ]
};

function renderCategoryButtons() {
  const container = document.getElementById('categoryItemsContainer') || document.getElementById('storeItems');
  if (!container) return;
  const keys = Object.keys(storeCatalog);
  
  // Category icons (outline style)
  const categoryIcons = {
    documents: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
    uniforms: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>`,
    supplies: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`,
    fees: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
  };
  
  const html = keys.map(k => `
    <button class="category-btn" data-cat="${k}" onclick="showCategoryItems('${k}')">
      ${categoryIcons[k] || ''}
      <span>${k.charAt(0).toUpperCase() + k.slice(1)}</span>
    </button>
  `).join('');
  container.innerHTML = `<div class="category-selector">${html}</div><div id="categoryItemsDisplay"></div>`;
}

function showCategoryItems(catKey) {
  // visually mark active - allow reselection
  document.querySelectorAll('.category-btn').forEach(b => {
    if (b.dataset.cat === catKey) {
      // Toggle if already active, otherwise activate
      if (b.classList.contains('active')) {
        b.classList.remove('active');
        // Clear items
        const display = document.getElementById('categoryItemsDisplay');
        if (display) display.innerHTML = '';
        return;
      } else {
        // Remove active from all others
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        b.classList.add('active');
      }
    }
  });
  renderCategoryItems(catKey);
}

function renderCategoryItems(catKey) {
  const list = storeCatalog[catKey] || [];
  const display = document.getElementById('categoryItemsDisplay');
  if (!display) return;
  if (list.length === 0) {
    display.innerHTML = '<p class="empty-state">No items in this category.</p>';
    return;
  }
  const html = list.map(it => `
    <div class="store-item-card">
      <div class="store-item-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </div>
      <div class="store-item-info">
        <h4>${it.name}</h4>
        <p class="text-muted">${it.desc}</p>
      </div>
      <div class="store-item-actions">
        <div class="price">₱${it.price.toFixed(2)}</div>
        <button class="btn btn-sm btn-primary" onclick="addToCart('${it.name.replace(/'/g, "\\'")}', ${it.price})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add
        </button>
      </div>
    </div>
  `).join('');
  display.innerHTML = `<div class="category-items">${html}</div>`;
}

// Initialize store view: show category buttons on load
if (document.getElementById('categoryItemsContainer') || storeItems) {
  renderCategoryButtons();
}

// --- Calendar helpers ---
function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = (day === 0 ? -6 : 1 - day); // make Monday the first day
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}

function formatDateRange(a,b) {
  const opts = { month: 'short', day: 'numeric' };
  const as = a.toLocaleDateString(undefined, opts);
  const bs = b.toLocaleDateString(undefined, opts);
  return `${as} — ${bs}`;
}

function dayNameToIndex(name) {
  const map = { monday:0, tuesday:1, wednesday:2, thursday:3, friday:4, saturday:5 };
  return map[(name||'').toLowerCase()] ?? -1;
}

function timeToGridRows(timeStr) {
  // assumes grid rows from 1..12 representing 7:00..18:00 in 1 hour steps
  try {
    const parts = timeStr.split('-');
    const start = parseTime(parts[0]);
    const end = parseTime(parts[1]);
    const idxStart = Math.max(1, start.hour - 6); // 7:00 -> row 1
    const idxEnd = Math.min(13, end.hour - 6 + (end.minute>0?1:0));
    return { start: idxStart, end: idxEnd };
  } catch(e){
    return { start:1, end:2 };
  }
}

function parseTime(t) {
  // t like '7:30 AM' or '13:00' or '9:00 PM'
  if (!t) return { hour:7, minute:0 };
  const match = t.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return { hour:7, minute:0 };
  let h = parseInt(match[1],10);
  const m = parseInt(match[2],10);
  const ampm = match[3];
  if (ampm) {
    if (ampm.toUpperCase() === 'PM' && h !== 12) h += 12;
    if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
  }
  return { hour: h, minute: m };
}

function previousWeek() {
  const start = window.calendarStart ? new Date(window.calendarStart) : startOfWeek(new Date());
  start.setDate(start.getDate() - 7);
  window.calendarStart = start.toISOString();
  renderCalendar();
}

function nextWeek() {
  const start = window.calendarStart ? new Date(window.calendarStart) : startOfWeek(new Date());
  start.setDate(start.getDate() + 7);
  window.calendarStart = start.toISOString();
  renderCalendar();
}

// Calendar-aware schedule renderer
function renderCalendar() {
  const schedule = scheduleData || [];
  const weekTitle = document.getElementById('currentWeek');
  const calendarGrid = document.querySelector('.calendar-grid');
  if (!calendarGrid) return;

  // compute start of week from window.calendarStart (defaults to today start-of-week)
  const start = window.calendarStart ? new Date(window.calendarStart) : startOfWeek(new Date());
  const end = new Date(start);
  end.setDate(start.getDate() + 5); // Mon-Sat (6 days)
  if (weekTitle) weekTitle.textContent = formatDateRange(start, end);

  // Clear existing day columns' .day-slots
  const dayCols = document.querySelectorAll('.calendar-day-col');
  dayCols.forEach((col, idx) => {
    const slots = col.querySelector('.day-slots');
    if (slots) slots.innerHTML = '';
    // determine date for this column
    const d = new Date(start);
    d.setDate(start.getDate() + idx);
    col.dataset.date = d.toISOString();
  });

  // place schedule items by matching day (mon..sat) and approximate time -> grid-row placement
  schedule.forEach(item => {
    // item: { day: 'monday', time: '8:00 AM - 11:00 AM', subject: '...', room: '...' }
    const dayIndex = dayNameToIndex(item.day);
    if (dayIndex < 0) return;
    const col = document.querySelectorAll('.calendar-day-col')[dayIndex];
    if (!col) return;
    const slots = col.querySelector('.day-slots');
    const rowSpan = timeToGridRows(item.time);
    const el = document.createElement('div');
    el.className = 'calendar-class';
    el.style.gridRow = `${rowSpan.start} / ${rowSpan.end}`;
    el.innerHTML = `
      <div class="class-title">${item.subject}</div>
      <div class="class-time">${item.time}</div>
      <div class="class-room">${item.room || ''}</div>
    `;
    // optional color tag
    if (item.color) el.style.borderLeft = `3px solid ${item.color}`;
    slots.appendChild(el);
  });
}

// Store initialization handled by renderCategoryButtons() earlier

// ----------- ENHANCED CART SYSTEM FOR ONLINE PAYMENT -----------
function addToCart(itemName, itemPrice) {
  const existing = cart.find(c => c.name === itemName);
  if (existing) {
    showToast("Already Added", `${itemName} is already in your cart.`);
    return;
  }
  
  cart.push({ name: itemName, price: itemPrice });
  renderEnhancedCart();
  showToast("Added to Cart", `${itemName} added to cart.`);
}

function removeFromEnhancedCart(itemName) {
  cart = cart.filter(c => c.name !== itemName);
  renderEnhancedCart();
  showToast("Removed", `${itemName} removed from cart.`);
}

function renderEnhancedCart() {
  if (!cartItems || !cartContainer) return;
  
  if (cart.length === 0) {
    cartContainer.style.display = "none";
  } else {
    cartContainer.style.display = "block";
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₱${item.price.toFixed(2)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromEnhancedCart('${item.name.replace(/'/g, "\\'")}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join("");
    
    const total = cart.reduce((t, i) => t + i.price, 0);
    cartTotal.textContent = "₱" + total.toFixed(2);
  }
}

function clearCart() {
  cart = [];
  renderEnhancedCart();
  showToast("Cart Cleared", "All items removed from cart.");
}

function proceedToPayment() {
  if (cart.length === 0) {
    showToast("Empty Cart", "Add items to cart before proceeding.");
    return;
  }
  
  const total = cart.reduce((t, i) => t + i.price, 0);
  const refCode = "PAY" + Date.now().toString().slice(-8);
  
  // Simulate payment processing
  showToast("Payment Processing", `Processing payment of ₱${total.toFixed(2)}...`);
  
  setTimeout(() => {
    showToast("Payment Successful", `Payment completed! Reference: ${refCode}`);
    cart = [];
    renderEnhancedCart();
  }, 1500);
}

function generatePaymentCode() {
  const refCode = "ICCT" + Date.now().toString().slice(-10);
  showToast("Payment Code Generated", `Your payment code: ${refCode}. Valid for 24 hours.`);
}

function downloadStatement() {
  showToast("Downloading", "Your payment statement is being generated...");
  setTimeout(() => {
    showToast("Download Complete", "Statement downloaded successfully.");
  }, 1000);
}

// Initialize cart on page load
if (cartItems && cartContainer) {
  renderEnhancedCart();
}

// ----------- ORF PDF GENERATION (client-side using jsPDF) -----------
async function generateORFPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  // simple ORF layout
  doc.setFontSize(16);
  doc.text('Official Registration Form (ORF)', 14, 20);
  doc.setFontSize(11);
  doc.text('Student ID: 2024-00001', 14, 36);
  doc.text('Name: Juan Dela Cruz', 14, 44);
  doc.text('Program: BS Computer Science', 14, 52);
  doc.text('Year Level: 3rd Year', 14, 60);
  doc.text('Address: 123 Mabini St., Sampaloc, Manila', 14, 68);
  doc.text('Signature: ______________________', 14, 120);
  doc.save('ORF-2024-00001.pdf');
}

function renderCartOld() {
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-state">Your cart is empty</p>`;
    cartFooter.style.display = "none";
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-header">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">₱${item.price * item.qty}</span>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQty(${item.id}, -1)">-</button>
            <span class="quantity-value">${item.qty}</span>
            <button class="quantity-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
          <button class="btn btn-destructive btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `).join("");
    cartFooter.style.display = "block";
    cartTotal.textContent = "₱" + cart.reduce((t, i) => t + i.price * i.qty, 0);
  }
}

function addToCartOld(id) {
  const item = items.find(i => i.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  renderCartOld();
  showToast("Added to Cart", `${item.name} added to cart.`);
}

function updateQty(id, change) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) removeFromCart(id);
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

function checkout() {
  if (cart.length === 0) return showToast("Cart Empty", "Add items before checkout.");
  const total = cart.reduce((t, i) => t + i.price * i.qty, 0);
  const ref = "ORD" + Math.floor(Math.random() * 1000000);
  cart = [];
  renderCart();
  showToast("Checkout Complete", `₱${total.toFixed(2)} paid. Order Ref: ${ref}`);
}

// ----------- DOWNLOAD FORM (Mock) -----------
function downloadForm() {
  showToast("Download", "Enrollment form downloaded successfully.");
}

// ----------- LOGOUT (Mock) -----------
document.getElementById("logoutBtn").addEventListener("click", () => {
  showToast("Logout", "You have been logged out.");
});

// --- Profile Persistence & Photo Upload ---
function loadProfile() {
  const data = JSON.parse(localStorage.getItem('profile') || '{}');
  if (data.fullName) document.getElementById('profileFullName').value = data.fullName;
  if (data.studentId) document.getElementById('profileStudentId').value = data.studentId;
  if (data.email) document.getElementById('profileEmail').value = data.email;
  if (data.address) document.getElementById('profileAddress').value = data.address;
  if (data.phone) document.getElementById('profilePhone').value = data.phone;
  if (data.program) document.getElementById('profileProgram').value = data.program;
  if (data.yearLevel) document.getElementById('profileYearLevel').value = data.yearLevel;
  if (data.photo) {
    const img = document.getElementById('profilePhotoPreview');
    img.src = data.photo;
    img.style.display = 'block';
  }
}
function saveProfile() {
  const data = {
    fullName: document.getElementById('profileFullName').value,
    studentId: document.getElementById('profileStudentId').value,
    email: document.getElementById('profileEmail').value,
    address: document.getElementById('profileAddress').value,
    phone: document.getElementById('profilePhone').value,
    program: document.getElementById('profileProgram').value,
    yearLevel: document.getElementById('profileYearLevel').value,
    photo: document.getElementById('profilePhotoPreview').src || ''
  };
  localStorage.setItem('profile', JSON.stringify(data));
  showToast('Profile Saved', 'Your profile has been updated.');
  // Sync to enrollment fields
  syncProfileToEnrollment(data);
}
function syncProfileToEnrollment(data) {
  document.getElementById('enrollStudentId').value = data.studentId;
  document.getElementById('enrollStudentName').value = data.fullName;
  document.getElementById('enrollProgram').value = data.program;
  document.getElementById('enrollYearLevel').value = data.yearLevel;
}
// Load profile photo
const photoInput = document.getElementById('profilePhotoInput');
const photoPreview = document.getElementById('profilePhotoPreview');
if(photoInput && photoPreview) {
  photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      photoPreview.src = evt.target.result;
      photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
}

// --- Enrollment field persistence (auto-fill for ORF) ---
function loadEnrollment() {
  const data = JSON.parse(localStorage.getItem('profile') || '{}');
  if (data.studentId) document.getElementById('enrollStudentId').value = data.studentId;
  if (data.fullName) document.getElementById('enrollStudentName').value = data.fullName;
  if (data.program) document.getElementById('enrollProgram').value = data.program;
  if (data.yearLevel) document.getElementById('enrollYearLevel').value = data.yearLevel;
}

// --- Store Item Modal ---
function openStoreItemModal(itemId) {
  const item = items.find(i => i.id === itemId);
  if (!item) return;
  document.getElementById('modalItemImage').src = item.img;
  document.getElementById('modalItemName').textContent = item.name;
  document.getElementById('modalItemDesc').textContent = item.desc;
  document.getElementById('modalItemPrice').textContent = '₱' + item.price;
  document.getElementById('modalAddToCartBtn').onclick = function() { addToCart(item.id); closeStoreItemModal(); };
  document.getElementById('storeItemModal').style.display = 'block';
}
function closeStoreItemModal() {
  document.getElementById('storeItemModal').style.display = 'none';
}
// Make store items clickable for modal
if(storeItems) {
  storeItems.addEventListener('click', function(e) {
    const itemDiv = e.target.closest('.store-item');
    if (!itemDiv) return;
    const idx = Array.from(storeItems.children).indexOf(itemDiv);
    if (idx >= 0) openStoreItemModal(items[idx].id);
  });
}

// ----------- INITIALIZE ALL SECTIONS ON PAGE LOAD -----------
function initializePortal() {
  // Render all dashboard widgets
  renderTodos();
  renderMessages();
  updateGPA(2.85);
  
  // Render schedule if on schedule page (check for calendar or old list)
  const calendarGrid = document.querySelector('.calendar-grid');
  if (calendarGrid) {
    renderCalendar(); // new calendar view
  } else if (scheduleContent) {
    renderSchedule(); // fallback to old list view
  }
  
  // Render payment history
  if (paymentHistoryEl) {
    renderPaymentHistory();
  }
  
  // Render enrollment sections
  if (enrolledSubjects && availableSections) {
    renderSubjects();
  }
  
  // Render enrollment courses
  if (enrollmentCoursesEl) {
    renderEnrollmentCourses();
  }
  
  // Initialize cart display
  renderEnhancedCart();
  
  // Load profile data
  loadProfile();
  const profileData = JSON.parse(localStorage.getItem('profile') || '{}');
  syncProfileToEnrollment(profileData);
  
  // Render Library, Email, and Career pages
  renderLibraryResources();
  renderEmails();
  renderJobListings();
  
  console.log('Student Portal Initialized Successfully!');
}

// ----------- LIBRARY RESOURCES -----------
const libraryResourcesEl = document.getElementById('libraryResources');
const libraryResources = [
  { title: 'Data Structures and Algorithms in Java', author: 'Robert Lafore', type: 'E-Book', category: 'Computer Science', available: true },
  { title: 'Introduction to Database Systems', author: 'C.J. Date', type: 'E-Book', category: 'Computer Science', available: true },
  { title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', type: 'E-Book', category: 'Computer Science', available: false },
  { title: 'Business Analytics: Data Analysis & Decision Making', author: 'S. Christian Albright', type: 'E-Book', category: 'Business', available: true },
  { title: 'Engineering Mechanics: Statics and Dynamics', author: 'Russell C. Hibbeler', type: 'E-Book', category: 'Engineering', available: true },
  { title: 'Research Methods for Business Students', author: 'Mark Saunders', type: 'Journal', category: 'Research', available: true },
];

function renderLibraryResources() {
  if (!libraryResourcesEl) return;
  libraryResourcesEl.innerHTML = libraryResources.map(resource => `
    <div class="course-card">
      <div class="course-code">${resource.type}</div>
      <h4>${resource.title}</h4>
      <p class="course-title">${resource.author}</p>
      <div class="course-info">
        <span><i class="fas fa-tag"></i> ${resource.category}</span>
        <span class="badge ${resource.available ? 'badge-success' : 'badge-secondary'}">${resource.available ? 'Available' : 'Borrowed'}</span>
      </div>
      <button class="btn btn-primary btn-sm" ${!resource.available ? 'disabled' : ''}>
        <i class="fas fa-book-reader"></i> ${resource.available ? 'Borrow' : 'Reserved'}
      </button>
    </div>
  `).join('');
}

// ----------- STUDENT EMAIL -----------
const emailListEl = document.getElementById('emailList');
const emails = [
  { from: 'registrar@icct.edu.ph', subject: 'Enrollment Reminder', preview: 'Don\'t forget to complete your enrollment for the next semester...', time: '2h ago', unread: true },
  { from: 'prof.santos@icct.edu.ph', subject: 'Project 2 Submission Extended', preview: 'Due to multiple requests, the deadline has been extended to...', time: '5h ago', unread: true },
  { from: 'library@icct.edu.ph', subject: 'Book Return Reminder', preview: 'Your borrowed book "Data Structures" is due on...', time: '1d ago', unread: false },
  { from: 'career.services@icct.edu.ph', subject: 'New Job Opening: Software Developer', preview: 'Our partner company is looking for fresh graduates...', time: '2d ago', unread: false },
  { from: 'finance@icct.edu.ph', subject: 'Payment Confirmation', preview: 'Your payment of ₱5,000 has been successfully processed...', time: '3d ago', unread: false },
];

function renderEmails() {
  if (!emailListEl) return;
  emailListEl.innerHTML = emails.map(email => `
    <div class="email-item" style="display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid #e0e0e0; cursor: pointer; ${email.unread ? 'background: #f5f5f5;' : ''}" onmouseover="this.style.background='#f9f9f9'" onmouseout="this.style.background='${email.unread ? '#f5f5f5' : 'white'}'">
      <div style="display: flex; align-items: center;">
        ${email.unread ? '<div style="width: 8px; height: 8px; background: #1976d2; border-radius: 50%;"></div>' : '<div style="width: 8px;"></div>'}
      </div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
          <strong style="${email.unread ? 'color: #000;' : 'color: #666;'}">${email.from}</strong>
          <span style="color: #999; font-size: 0.875rem;">${email.time}</span>
        </div>
        <div style="color: #333; margin-bottom: 0.25rem; ${email.unread ? 'font-weight: 600;' : ''}">${email.subject}</div>
        <div style="color: #666; font-size: 0.875rem;">${email.preview}</div>
      </div>
    </div>
  `).join('');
}

// ----------- CAREER SERVICES - JOB LISTINGS -----------
const jobListingsEl = document.getElementById('jobListings');
const jobListings = [
  { 
    title: 'Junior Software Developer', 
    company: 'Tech Solutions Inc.', 
    location: 'Makati City', 
    type: 'Full-time', 
    salary: '₱25,000 - ₱35,000',
    posted: '2 days ago',
    logo: '💻'
  },
  { 
    title: 'Web Developer Intern', 
    company: 'Digital Marketing Agency', 
    location: 'Quezon City', 
    type: 'Internship', 
    salary: '₱15,000/month',
    posted: '5 days ago',
    logo: '🌐'
  },
  { 
    title: 'Database Administrator', 
    company: 'Financial Services Corp.', 
    location: 'BGC, Taguig', 
    type: 'Full-time', 
    salary: '₱30,000 - ₱45,000',
    posted: '1 week ago',
    logo: '🗄️'
  },
  { 
    title: 'IT Support Specialist', 
    company: 'Healthcare Systems', 
    location: 'Pasig City', 
    type: 'Full-time', 
    salary: '₱20,000 - ₱28,000',
    posted: '1 week ago',
    logo: '🔧'
  },
];

function renderJobListings() {
  if (!jobListingsEl) return;
  jobListingsEl.innerHTML = jobListings.map(job => `
    <div class="card" style="padding: 1.5rem;">
      <div style="display: flex; gap: 1rem;">
        <div style="font-size: 3rem;">${job.logo}</div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <div>
              <h4 style="margin: 0 0 0.25rem 0;">${job.title}</h4>
              <p style="color: #666; margin: 0;">${job.company}</p>
            </div>
            <span class="badge badge-primary">${job.type}</span>
          </div>
          <div style="display: flex; gap: 1.5rem; margin: 1rem 0; color: #666; font-size: 0.875rem;">
            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
            <span><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
            <span><i class="fas fa-clock"></i> ${job.posted}</span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-primary btn-sm"><i class="fas fa-paper-plane"></i> Apply Now</button>
            <button class="btn btn-outline btn-sm"><i class="fas fa-bookmark"></i> Save</button>
            <button class="btn btn-outline btn-sm"><i class="fas fa-info-circle"></i> Details</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortal);
} else {
  initializePortal();
}

// Visual Grade Analyzer - What-If Calculator
function calculateWhatIf() {
    const nextCourse = document.getElementById('nextCourse').value;
    const predictedGradeSelect = document.getElementById('predictedGrade');
    const predictedGrade = parseFloat(predictedGradeSelect.value);
    const courseWeight = parseFloat(document.getElementById('courseWeight').value);
    
    if (!nextCourse || !predictedGrade || !courseWeight) {
        showToast('Missing Information', 'Please fill in all fields to calculate the impact.');
        return;
    }
    
    const currentGWA = 1.47;
    const currentCredits = 29;
    
    let projectedGWA;
    if (nextCourse === 'next-sem') {
        projectedGWA = ((currentGWA * currentCredits) + (predictedGrade * courseWeight)) / (currentCredits + courseWeight);
    } else {
        const adjustmentFactor = courseWeight / 100;
        projectedGWA = currentGWA + ((predictedGrade - currentGWA) * adjustmentFactor);
    }
    
    projectedGWA = Math.max(1.00, Math.min(5.00, projectedGWA));
    
    const resultElement = document.getElementById('whatIfResult');
    const projectedGWAElement = document.getElementById('projectedGWA');
    const resultMessageElement = document.getElementById('resultMessage');
    
    projectedGWAElement.textContent = projectedGWA.toFixed(2);
    
    const difference = (currentGWA - projectedGWA).toFixed(2);
    let message;
    let icon = document.querySelector('.result-icon');
    
    if (projectedGWA < currentGWA) {
        message = `Great! Your GWA will improve by ${Math.abs(difference)} points.`;
        icon.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        projectedGWAElement.style.color = '#10b981';
    } else if (projectedGWA > currentGWA) {
        message = `Warning: Your GWA may decrease by ${Math.abs(difference)} points. Consider improving your performance.`;
        icon.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        projectedGWAElement.style.color = '#f59e0b';
    } else {
        message = 'Your GWA will remain the same.';
        icon.style.background = 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)';
        projectedGWAElement.style.color = '#06b6d4';
    }
    
    resultMessageElement.textContent = message;
    resultElement.style.display = 'block';
}

// Toggle Grade Scale Legend
function toggleGradeScale() {
    const legend = document.getElementById('gradeScaleLegend');
    if (legend) {
        legend.style.display = legend.style.display === 'none' ? 'block' : 'none';
    }
}

// ----------- COMPREHENSIVE GRADES DATA BY YEAR -----------
const allGradesData = {
    // 1st Year - 2022-2023
    '2022-1': {
        year: 1,
        semester: '1st Semester, AY 2022-2023',
        gwa: 1.65,
        credits: 27,
        courses: [
            { code: 'OLGE101', name: 'Understanding the Self', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE102', name: 'Mathematics in the Modern World', credits: 3, prelim: 1.75, midterm: 2.00, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE103', name: 'Purposive Communication', credits: 3, prelim: 1.50, midterm: 1.75, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS101', name: 'Introduction to Computing', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.75, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS102', name: 'Computer Programming 1', credits: 3, prelim: 1.75, midterm: 1.75, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE104', name: 'Physical Education 1', credits: 2, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE105', name: 'National Service Training Program 1', credits: 3, prelim: 1.75, midterm: 1.75, finals: 1.50, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS103', name: 'Discrete Structures 1', credits: 3, prelim: 1.75, midterm: 2.00, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS104', name: 'Social Issues and Professional Practice', credits: 3, prelim: 1.50, midterm: 1.75, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' }
        ]
    },
    '2022-2': {
        year: 1,
        semester: '2nd Semester, AY 2022-2023',
        gwa: 1.58,
        credits: 30,
        courses: [
            { code: 'OLGE106', name: 'Readings in Philippine History', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.75, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE107', name: 'The Contemporary World', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS105', name: 'Computer Programming 2', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS106', name: 'Data Structures and Algorithms', credits: 3, prelim: 1.75, midterm: 1.75, finals: 1.50, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS107', name: 'Discrete Structures 2', credits: 3, prelim: 1.50, midterm: 1.75, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS108', name: 'Information Management', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE108', name: 'Physical Education 2', credits: 2, prelim: 1.50, midterm: 1.25, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE109', name: 'National Service Training Program 2', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS109', name: 'Human Computer Interaction', credits: 3, prelim: 1.50, midterm: 1.75, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS110', name: 'Platform Technologies', credits: 4, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' }
        ]
    },
    // 2nd Year - 2023-2024
    '2023-1': {
        year: 2,
        semester: '1st Semester, AY 2023-2024',
        gwa: 1.52,
        credits: 28,
        courses: [
            { code: 'OLGE110', name: 'Art Appreciation', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE111', name: 'Science, Technology and Society', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS111', name: 'Object Oriented Programming', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.25, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS112', name: 'Architecture and Organization', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS113', name: 'Networking 1', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS114', name: 'Operating Systems', credits: 3, prelim: 1.50, midterm: 1.25, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE112', name: 'Physical Education 3', credits: 2, prelim: 1.25, midterm: 1.25, finals: 1.25, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' },
            { code: 'OLCS115', name: 'Quantitative Methods', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS116', name: 'Software Engineering 1', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' }
        ]
    },
    '2023-2': {
        year: 2,
        semester: '2nd Semester, AY 2023-2024',
        gwa: 1.48,
        credits: 29,
        courses: [
            { code: 'OLGE113', name: 'Ethics', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE114', name: 'Rizal: Life and Works', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS117', name: 'Networking 2', credits: 3, prelim: 1.50, midterm: 1.25, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS118', name: 'Information Assurance and Security 1', credits: 3, prelim: 1.25, midterm: 1.50, finals: 1.25, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' },
            { code: 'OLCS119', name: 'Algorithms and Complexity', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.75, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS120', name: 'Programming Languages', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLGE115', name: 'Physical Education 4', credits: 2, prelim: 1.25, midterm: 1.25, finals: 1.25, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' },
            { code: 'OLCS121', name: 'Software Engineering 2', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.25, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS122', name: 'Automata and Language Theory', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' }
        ]
    },
    // 3rd Year - 2024-2025
    '2024-1': {
        year: 3,
        semester: '1st Semester, AY 2024-2025',
        gwa: 1.44,
        credits: 28,
        courses: [
            { code: 'OLCS123', name: 'Web Development', credits: 3, prelim: 1.25, midterm: 1.50, finals: 1.25, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' },
            { code: 'OLCS124', name: 'Integrative Programming and Technologies 1', credits: 4, prelim: 1.50, midterm: 1.25, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS125', name: 'Advanced Database Systems', credits: 4, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS126', name: 'Capstone Project and Research 1', credits: 3, prelim: 1.25, midterm: 1.50, finals: 1.25, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' },
            { code: 'OLCS127', name: 'Multimedia Systems', credits: 3, prelim: 1.50, midterm: 1.25, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS128', name: 'Mobile Programming', credits: 3, prelim: 1.50, midterm: 1.50, finals: 1.25, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS129', name: 'Machine Learning Fundamentals', credits: 4, prelim: 1.50, midterm: 1.50, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCS130', name: 'Cloud Computing Basics', credits: 4, prelim: 1.25, midterm: 1.50, finals: 1.25, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' }
        ]
    },
    '2024-2': {
        year: 3,
        semester: '2nd Semester, AY 2024-2025',
        gwa: 1.47,
        credits: 29,
        courses: [
            { code: 'OLIPT2', name: 'Integrative Programming and Technologies 2', credits: 4, prelim: 1.25, midterm: 1.50, finals: 1.00, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' },
            { code: 'OLSA01', name: 'System Administration and Maintenance', credits: 4, prelim: 1.50, midterm: 1.25, finals: 1.50, finalGrade: 1.50, remarks: 'Very Good', status: 'verified' },
            { code: 'OLITPRAC1', name: 'Practicum (243 Hours)', credits: 3, prelim: 1.75, midterm: 1.50, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'pending' },
            { code: 'OLITPRAC2', name: 'Practicum (243 Hours)', credits: 3, prelim: 1.50, midterm: 1.75, finals: 1.50, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' },
            { code: 'OLCAPS2', name: 'Capstone Project and Research 2', credits: 3, prelim: 1.75, midterm: 1.75, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'pending' },
            { code: 'OLCC06', name: 'Applications Development and Emerging Technologies', credits: 4, prelim: 1.25, midterm: 1.25, finals: 1.25, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' },
            { code: 'OLIAS2', name: 'Information Assurance and Security 2', credits: 4, prelim: 1.25, midterm: 1.25, finals: 1.25, finalGrade: 1.25, remarks: 'Excellent', status: 'verified' },
            { code: 'OLPFI1', name: 'Event Driven Programming', credits: 4, prelim: 1.75, midterm: 1.75, finals: 1.75, finalGrade: 1.75, remarks: 'Very Good', status: 'verified' }
        ]
    }
};

// Function to get grade badge class
function getGradeBadgeClass(grade) {
    if (grade <= 1.49) return 'grade-excellent';
    if (grade <= 1.99) return 'grade-verygood';
    if (grade <= 2.49) return 'grade-good';
    if (grade <= 2.99) return 'grade-fair';
    if (grade === 3.00) return 'grade-passing';
    return 'grade-fail';
}

// Function to get status badge
function getStatusBadge(status) {
    if (status === 'verified') {
        return '<span class="badge badge-success"><i class="fas fa-check-circle"></i> Verified</span>';
    } else if (status === 'pending') {
        return '<span class="badge badge-warning"><i class="fas fa-clock"></i> Under Verification</span>';
    } else {
        return '<span class="badge badge-info"><i class="fas fa-info-circle"></i> Pending</span>';
    }
}

// Function to update grades by year level
function updateGradesByYear() {
    const yearSelect = document.getElementById('yearLevelSelect');
    const semesterSelect = document.getElementById('semesterSelect');
    
    if (!yearSelect || !semesterSelect) return;
    
    const selectedYear = yearSelect.value;
    
    if (selectedYear === 'all') {
        // Show all grades summary
        renderAllYearsGrades();
    } else {
        // Filter semesters for selected year
        updateSemesterOptions(parseInt(selectedYear));
        // Load first semester of that year
        const firstSemester = Object.keys(allGradesData).find(key => 
            allGradesData[key].year === parseInt(selectedYear)
        );
        if (firstSemester) {
            semesterSelect.value = firstSemester;
            updateGradesBySemester();
        }
    }
}

// Function to update semester dropdown based on year
function updateSemesterOptions(year) {
    const semesterSelect = document.getElementById('semesterSelect');
    if (!semesterSelect) return;
    
    semesterSelect.innerHTML = '';
    
    Object.keys(allGradesData).forEach(key => {
        if (allGradesData[key].year === year) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = allGradesData[key].semester;
            if (key === '2024-2') option.textContent += ' (Current)';
            semesterSelect.appendChild(option);
        }
    });
}

// Function to update grades by semester
function updateGradesBySemester() {
    const semesterSelect = document.getElementById('semesterSelect');
    const yearSelect = document.getElementById('yearLevelSelect');
    
    if (!semesterSelect) return;
    
    const selectedSemester = semesterSelect.value;
    const semesterData = allGradesData[selectedSemester];
    
    if (!semesterData) return;
    
    // Update year selector to match
    if (yearSelect) {
        yearSelect.value = semesterData.year.toString();
    }
    
    // Update stats
    document.getElementById('semesterGWA').textContent = semesterData.gwa.toFixed(2);
    document.getElementById('creditsValue').textContent = semesterData.credits;
    document.getElementById('gradeTableTitle').textContent = `Course Grades - ${semesterData.semester}`;
    
    // Update table
    const tbody = document.getElementById('gradesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = semesterData.courses.map(course => `
        <tr>
            <td><span class="badge badge-outline">${course.code}</span></td>
            <td>${course.name}</td>
            <td style="text-align: center;">${course.credits}</td>
            <td style="text-align: center;" title="Prelim Grade">${course.prelim.toFixed(2)}</td>
            <td style="text-align: center;" title="Midterm Grade">${course.midterm.toFixed(2)}</td>
            <td style="text-align: center;" title="Finals Grade">${course.finals.toFixed(2)}</td>
            <td style="text-align: center;"><span class="grade-badge ${getGradeBadgeClass(course.finalGrade)}">${course.finalGrade.toFixed(2)}</span></td>
            <td class="text-muted">${course.remarks}</td>
            <td>${getStatusBadge(course.status)}</td>
        </tr>
    `).join('') + `
        <tr class="total-row">
            <td colspan="2"><strong>SEMESTER TOTALS</strong></td>
            <td style="text-align: center;"><strong>${semesterData.credits}</strong></td>
            <td colspan="3" style="text-align: center;" class="text-muted"><em>Grade per period</em></td>
            <td style="text-align: center;"><strong class="grade-badge ${getGradeBadgeClass(semesterData.gwa)}">${semesterData.gwa.toFixed(2)}</strong></td>
            <td colspan="2"><strong>Semester GWA</strong></td>
        </tr>
    `;
}

// Function to render all years summary
function renderAllYearsGrades() {
    document.getElementById('gradeTableTitle').textContent = 'All Academic Grades - Complete Record';
    document.getElementById('gwaLabel').textContent = 'Cumulative GWA';
    document.getElementById('creditsLabel').textContent = 'Total Credits Earned';
    
    // Calculate cumulative stats
    let totalCredits = 0;
    let totalWeightedGrade = 0;
    
    Object.values(allGradesData).forEach(sem => {
        totalCredits += sem.credits;
        totalWeightedGrade += sem.gwa * sem.credits;
    });
    
    const cumulativeGWA = totalWeightedGrade / totalCredits;
    
    document.getElementById('semesterGWA').textContent = cumulativeGWA.toFixed(2);
    document.getElementById('creditsValue').textContent = totalCredits;
    
    const tbody = document.getElementById('gradesTableBody');
    if (!tbody) return;
    
    let allCoursesHTML = '';
    
    // Group by year
    [1, 2, 3].forEach(year => {
        const yearSemesters = Object.keys(allGradesData).filter(key => 
            allGradesData[key].year === year
        );
        
        if (yearSemesters.length > 0) {
            allCoursesHTML += `
                <tr class="year-header" style="background: var(--card-bg); font-weight: bold;">
                    <td colspan="9" style="padding: 1rem; border-top: 2px solid var(--border-color);">
                        <i class="fas fa-graduation-cap"></i> ${year === 1 ? '1st' : year === 2 ? '2nd' : year === 3 ? '3rd' : '4th'} Year
                    </td>
                </tr>
            `;
            
            yearSemesters.forEach(semKey => {
                const semData = allGradesData[semKey];
                allCoursesHTML += `
                    <tr style="background: var(--hover-bg);">
                        <td colspan="9" style="padding: 0.75rem; font-weight: 600;">
                            ${semData.semester} - GWA: ${semData.gwa.toFixed(2)} | Credits: ${semData.credits}
                        </td>
                    </tr>
                `;
                
                semData.courses.forEach(course => {
                    allCoursesHTML += `
                        <tr>
                            <td><span class="badge badge-outline">${course.code}</span></td>
                            <td>${course.name}</td>
                            <td style="text-align: center;">${course.credits}</td>
                            <td style="text-align: center;">${course.prelim.toFixed(2)}</td>
                            <td style="text-align: center;">${course.midterm.toFixed(2)}</td>
                            <td style="text-align: center;">${course.finals.toFixed(2)}</td>
                            <td style="text-align: center;"><span class="grade-badge ${getGradeBadgeClass(course.finalGrade)}">${course.finalGrade.toFixed(2)}</span></td>
                            <td class="text-muted">${course.remarks}</td>
                            <td>${getStatusBadge(course.status)}</td>
                        </tr>
                    `;
                });
            });
        }
    });
    
    tbody.innerHTML = allCoursesHTML;
}

// Anonymous Feedback Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const category = document.getElementById('feedbackCategory').value;
            const feedbackType = document.querySelector('input[name="feedbackType"]:checked').value;
            const subject = document.getElementById('feedbackSubject').value;
            const message = document.getElementById('feedbackMessage').value;
            
            if (!category || !message) {
                showToast('Error', 'Please fill in all required fields.');
                return;
            }
            
            console.log('Feedback submitted:', { category, feedbackType, subject, message });
            
            document.getElementById('feedbackForm').style.display = 'none';
            document.getElementById('feedbackSuccess').style.display = 'block';
            
            showToast('Success', 'Your anonymous feedback has been submitted!');
            
            setTimeout(() => {
                feedbackForm.reset();
            }, 500);
        });
    }
});

function resetFeedbackForm() {
    document.getElementById('feedbackForm').style.display = 'block';
    document.getElementById('feedbackSuccess').style.display = 'none';
    document.getElementById('feedbackForm').reset();
}

// Initialize Chart for Grade Trends (using simple canvas drawing)
function initGradeTrendChart() {
    const canvas = document.getElementById('gradesTrendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const data = [
        { semester: 'Sem 1 2023', gwa: 1.65 },
        { semester: 'Sem 2 2023', gwa: 1.52 },
        { semester: 'Sem 1 2024', gwa: 1.48 },
        { semester: 'Sem 2 2024', gwa: 1.41 }
    ];
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e6f6f6';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }
    
    ctx.fillStyle = '#6b7a7a';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const grade = (1.0 + (i * 0.25)).toFixed(2);
        const y = padding + (chartHeight / 4) * (4 - i);
        ctx.fillText(grade, padding - 10, y + 4);
    }
    
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - ((point.gwa - 1.0) / 1.0) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - ((point.gwa - 1.0) / 1.0) * chartHeight;
        
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#0b1a1a';
        ctx.font = 'bold 14px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(point.gwa, x, y - 12);
        
        ctx.fillStyle = '#6b7a7a';
        ctx.font = '11px Poppins';
        ctx.fillText(point.semester, x, canvas.height - padding + 20);
    });
    
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const targetY = padding + chartHeight - ((1.50 - 1.0) / 1.0) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(padding, targetY);
    ctx.lineTo(canvas.width - padding, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
}

if (document.getElementById('gradesTrendChart')) {
    setTimeout(initGradeTrendChart, 100);
}

// ----------- PROFILE EDITING AND PHOTO UPLOAD -----------
let isEditMode = false;

// Optimized function to update avatar in all locations
function updateAvatarEverywhere(imageUrl) {
    // Update profile photo preview
    const preview = document.getElementById('profilePhotoPreview');
    if (preview) {
        preview.src = imageUrl;
        preview.style.display = 'block';
    }
    
    // Hide initials
    const largeAvatar = document.querySelector('.profile-avatar-large');
    if (largeAvatar) {
        largeAvatar.style.display = 'none';
    }
    
    // Update sidebar avatar
    const sidebarAvatar = document.querySelector('.sidebar .user-profile img');
    if (sidebarAvatar) {
        sidebarAvatar.src = imageUrl;
        sidebarAvatar.style.display = 'block';
    } else {
        // Create sidebar image if it doesn't exist
        const userProfile = document.querySelector('.sidebar .user-profile');
        if (userProfile) {
            const existingAvatar = userProfile.querySelector('.avatar');
            if (existingAvatar) {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.width = '40px';
                img.style.height = '40px';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
                existingAvatar.replaceWith(img);
            }
        }
    }
    
    // Update top nav avatar
    const topNavAvatar = document.querySelector('.top-nav .avatar');
    if (topNavAvatar) {
        let img = topNavAvatar.querySelector('img');
        if (!img) {
            img = document.createElement('img');
            topNavAvatar.innerHTML = '';
            topNavAvatar.appendChild(img);
        }
        img.src = imageUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
    }
}

// Compress and resize image before saving
function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Resize if image is too large
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to compressed base64
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataUrl);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Handle photo upload
const profilePhotoInput = document.getElementById('profilePhotoInput');
if (profilePhotoInput) {
    profilePhotoInput.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showToast('Please select a valid image file (JPG, PNG, GIF, or WebP).', 'error');
            this.value = ''; // Reset input
            return;
        }
        
        // Validate file size (max 10MB before compression)
        if (file.size > 10 * 1024 * 1024) {
            showToast('Image size should not exceed 10MB.', 'error');
            this.value = ''; // Reset input
            return;
        }
        
        try {
            // Show loading state
            showToast('Uploading and optimizing image...', 'info');
            
            // Compress and resize image
            const compressedImage = await compressImage(file, 800, 0.85);
            
            // Check compressed size (localStorage limit is ~5MB)
            if (compressedImage.length > 5 * 1024 * 1024) {
                // Try with more compression
                const moreCompressed = await compressImage(file, 600, 0.7);
                if (moreCompressed.length > 5 * 1024 * 1024) {
                    showToast('Image is too large even after compression. Please use a smaller image.', 'error');
                    this.value = ''; // Reset input
                    return;
                }
                updateAvatarEverywhere(moreCompressed);
                localStorage.setItem('profilePhoto', moreCompressed);
            } else {
                updateAvatarEverywhere(compressedImage);
                localStorage.setItem('profilePhoto', compressedImage);
            }
            
            showToast('Profile photo updated successfully!', 'success');
        } catch (error) {
            console.error('Error uploading photo:', error);
            showToast('Failed to upload photo. Please try again.', 'error');
            this.value = ''; // Reset input
        }
    });
}

// Load saved photo on page load
function loadSavedPhoto() {
    const savedPhoto = localStorage.getItem('profilePhoto');
    const removeBtn = document.getElementById('removePhotoBtn');
    
    if (savedPhoto) {
        try {
            updateAvatarEverywhere(savedPhoto);
            // Show remove button
            if (removeBtn) {
                removeBtn.style.display = 'inline-flex';
            }
        } catch (error) {
            console.error('Error loading saved photo:', error);
            localStorage.removeItem('profilePhoto'); // Clear corrupted data
        }
    }
}

// Initialize photo on page load
loadSavedPhoto();

// Handle remove photo button
const removePhotoBtn = document.getElementById('removePhotoBtn');
if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', function() {
        // Confirm removal
        if (confirm('Are you sure you want to remove your profile photo?')) {
            // Remove from localStorage
            localStorage.removeItem('profilePhoto');
            
            // Hide preview
            const preview = document.getElementById('profilePhotoPreview');
            if (preview) {
                preview.style.display = 'none';
            }
            
            // Show initials
            const largeAvatar = document.querySelector('.profile-avatar-large');
            if (largeAvatar) {
                largeAvatar.style.display = 'flex';
            }
            
            // Reset sidebar avatar to initials
            const sidebarAvatar = document.querySelector('.sidebar .user-profile img');
            if (sidebarAvatar) {
                const userProfile = document.querySelector('.sidebar .user-profile');
                const avatarDiv = document.createElement('div');
                avatarDiv.className = 'avatar';
                avatarDiv.textContent = 'CD';
                sidebarAvatar.replaceWith(avatarDiv);
            }
            
            // Reset top nav avatar to initials
            const topNavAvatar = document.querySelector('.top-nav .avatar');
            if (topNavAvatar) {
                topNavAvatar.innerHTML = 'CD';
            }
            
            // Hide remove button
            this.style.display = 'none';
            
            // Reset file input
            const fileInput = document.getElementById('profilePhotoInput');
            if (fileInput) {
                fileInput.value = '';
            }
            
            showToast('Profile photo removed successfully!', 'success');
        }
    });
}

// Update remove button visibility when photo is uploaded
const originalPhotoInput = document.getElementById('profilePhotoInput');
if (originalPhotoInput) {
    const originalListener = originalPhotoInput.addEventListener;
    originalPhotoInput.addEventListener('change', function() {
        setTimeout(() => {
            const removeBtn = document.getElementById('removePhotoBtn');
            if (removeBtn && localStorage.getItem('profilePhoto')) {
                removeBtn.style.display = 'inline-flex';
            }
        }, 500);
    });
}

// Handle profile editing
const editProfileBtn = document.getElementById('editProfileBtn');
const profileForm = document.getElementById('profileForm');

// Define editable fields with their data attributes
const editableFields = [
    { selector: '.form-grid .input-group:nth-child(1) .form-display', key: 'firstName', label: 'First Name' },
    { selector: '.form-grid .input-group:nth-child(2) .form-display', key: 'lastName', label: 'Last Name' },
    { selector: '.input-group:has(label [class*="envelope"]) .form-display', key: 'email', label: 'Email' },
    { selector: '.input-group:has(label [class*="phone"]) .form-display', key: 'phone', label: 'Phone' },
    { selector: '.input-group:has(label [class*="map-marker"]) .form-display', key: 'address', label: 'Address' },
    { selector: '.input-group:has(label [class*="calendar"]) .form-display', key: 'dob', label: 'Date of Birth' }
];

// Load saved profile data
function loadProfileData() {
    editableFields.forEach(field => {
        const savedValue = localStorage.getItem(`profile_${field.key}`);
        if (savedValue) {
            const element = profileForm.querySelector(field.selector);
            if (element) {
                if (isEditMode) {
                    element.querySelector('input').value = savedValue;
                } else {
                    element.textContent = savedValue;
                }
            }
        }
    });
    
    // Update name in header
    const firstName = localStorage.getItem('profile_firstName');
    const lastName = localStorage.getItem('profile_lastName');
    if (firstName && lastName) {
        const profileName = document.getElementById('profileName');
        if (profileName) {
            profileName.textContent = `${firstName} ${lastName}`;
        }
        
        // Update sidebar name
        const sidebarName = document.querySelector('.sidebar .user-profile h3');
        if (sidebarName) {
            sidebarName.textContent = `${firstName} ${lastName}`;
        }
    }
}

// Toggle edit mode
function toggleEditMode() {
    isEditMode = !isEditMode;
    
    if (isEditMode) {
        // Switch to edit mode
        editProfileBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        editProfileBtn.classList.add('btn-primary');
        
        editableFields.forEach(field => {
            const element = profileForm.querySelector(field.selector);
            if (element) {
                const currentValue = element.textContent;
                element.innerHTML = `<input type="text" class="form-input" value="${currentValue}" placeholder="${field.label}">`;
            }
        });
    } else {
        // Switch to view mode and save data
        editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
        editProfileBtn.classList.remove('btn-primary');
        
        let hasChanges = false;
        editableFields.forEach(field => {
            const element = profileForm.querySelector(field.selector);
            if (element) {
                const input = element.querySelector('input');
                if (input) {
                    const newValue = input.value.trim();
                    if (newValue) {
                        localStorage.setItem(`profile_${field.key}`, newValue);
                        element.innerHTML = newValue;
                        hasChanges = true;
                    }
                }
            }
        });
        
        if (hasChanges) {
            loadProfileData();
            showToast('Profile updated successfully!', 'success');
        }
    }
}

if (editProfileBtn) {
    editProfileBtn.addEventListener('click', toggleEditMode);
}

// Load profile data on page load
loadProfileData();

// Toast notification helper
function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Icon mapping for different types
    const iconMap = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after appropriate time (longer for errors)
    const duration = type === 'error' ? 5000 : 3000;
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ----------- GRADE VERIFICATION REQUEST -----------
function requestGradeVerification(courseCode, courseName) {
    const confirmation = confirm(
        `Submit grade verification request for ${courseName}?\n\n` +
        `Course Code: ${courseCode}\n` +
        `This request must be submitted within 10 days of grade posting.\n\n` +
        `You will receive a response within 3-5 business days.`
    );
    
    if (confirmation) {
        // Simulate request submission
        showToast('Success', `Grade verification request submitted for ${courseName}. You will receive a response within 3-5 business days.`);
        
        // Update button state
        const buttons = document.querySelectorAll(`button[onclick*="${courseCode}"]`);
        buttons.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-check"></i> Request Submitted';
            btn.disabled = true;
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            btn.style.cursor = 'not-allowed';
            btn.style.opacity = '0.7';
        });
        
        // Log to console for debugging
        console.log(`Grade verification request submitted for ${courseCode} - ${courseName}`);
    }
}
