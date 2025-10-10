// =============================
// ICCT Student Portal JavaScript
// =============================

// ----------- SIDEBAR TOGGLE -----------
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("active");
  } else {
    sidebar.classList.toggle("hidden");
  }
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("active");
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
    // Remove automatic sidebar hiding - let users control it manually
  });
});

function navigateTo(pageId) {
  document.querySelector(`.nav-item[data-page="${pageId}"]`).click();
}

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
  { subject: "Database Systems", day: "Mon & Wed", time: "10:00 AM - 11:30 AM", room: "CS301", instructor: 'Dr. Reyes', units: 3 },
  { subject: "Web Development", day: "Tue & Thu", time: "1:00 PM - 2:30 PM", room: "CS302", instructor: 'Ms. Cruz', units: 3 },
  { subject: "Network Security", day: "Fri", time: "8:00 AM - 11:00 AM", room: "CS303", instructor: 'Mr. dela Vega', units: 3 },
  { subject: "Data Structures", day: "Tue & Thu", time: "10:00 AM - 11:30 AM", room: "CS304", instructor: 'Ms. Santos', units: 3 },
];

function renderSchedule() {
  if (!scheduleContent) return;
  scheduleContent.innerHTML = scheduleData.map(item => `
    <div class="schedule-item">
      <div class="schedule-avatar">${item.subject.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
      <div style="flex:1">
        <div class="schedule-header">
          <div class="schedule-title"><h4>${item.subject}</h4><div class="grade-details">${item.instructor} • ${item.units} units</div></div>
          <div class="schedule-badges"><span class="badge badge-primary">Ongoing</span></div>
        </div>
        <div class="schedule-details">
          <div class="schedule-detail">📅 ${item.day}</div>
          <div class="schedule-detail">⏰ ${item.time}</div>
          <div class="schedule-detail">🏫 ${item.room}</div>
        </div>
      </div>
    </div>
  `).join("");
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
  
  enrollmentCoursesEl.innerHTML = availableCourses.map(course => `
    <div class="course-card ${course.enrolled ? 'enrolled' : ''}" data-id="${course.id}">
      <div class="course-color-bar" style="background: ${course.color};"></div>
      <div class="course-header">
        <div>
          <span class="badge badge-outline">${course.code}</span>
          <span class="badge badge-secondary">${course.credits} Credits</span>
        </div>
        <h3>${course.name}</h3>
      </div>
      <div class="course-info">
        <div class="course-info-item">
          <i class="fas fa-user"></i>
          <div>
            <strong>Instructor</strong>
            <p>${course.instructor}</p>
          </div>
        </div>
        <div class="course-info-item">
          <i class="fas fa-clock"></i>
          <div>
            <strong>Schedule</strong>
            <p>${course.schedule}</p>
          </div>
        </div>
      </div>
      <div class="course-footer">
        <span><i class="fas fa-users"></i> 25/40 slots</span>
        <button class="enroll-btn ${course.enrolled ? 'enrolled' : ''}" onclick="toggleEnrollment(${course.id})">
          <i class="fas ${course.enrolled ? 'fa-check' : 'fa-plus'}"></i>
        </button>
      </div>
    </div>
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

const items = [
  { id: 1, name: "PE Uniform", desc: "Physical Education uniform", price: 500, img: 'https://via.placeholder.com/80x80?text=Uniform' },
  { id: 2, name: "ID Lace", desc: "ICCT official ID lace", price: 100, img: 'https://via.placeholder.com/80x80?text=Lace' },
  { id: 3, name: "Notebook", desc: "ICCT College notebook", price: 80, img: 'https://via.placeholder.com/80x80?text=Notebook' },
];

let cart = [];

function renderStore() {
  if (!storeItems) return;
  
  storeItems.innerHTML = items.map(item => `
    <div class="store-item">
      <div class="item-info">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <div class="item-name"><strong>${item.name}</strong></div>
          <div class="item-description">${item.desc}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem;align-items:flex-end">
        <div class="item-price">₱${item.price}</div>
        <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">Add</button>
      </div>
    </div>
  `).join("");
}

// Render store on load
if (storeItems) {
  renderStore();
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

function renderCart() {
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

function addToCart(id) {
  const item = items.find(i => i.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  renderCart();
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
  
  // Render schedule if on schedule page
  if (scheduleList) {
    renderSchedule();
  }
  
  // Render payment history
  if (paymentHistoryEl) {
    renderPaymentHistory();
  }
  
  // Render store items
  if (storeItems) {
    renderStore();
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
  renderCart();
  
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
    const predictedGrade = parseFloat(document.getElementById('predictedGrade').value);
    const courseWeight = parseFloat(document.getElementById('courseWeight').value);
    
    if (!nextCourse || !predictedGrade || !courseWeight) {
        showToast('Missing Information', 'Please fill in all fields to calculate the impact.');
        return;
    }
    
    const currentGWA = 1.41;
    const currentCredits = 16;
    
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
