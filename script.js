// CSPC Intramurals App - Vanilla JavaScript/TypeScript
// Converted from React while maintaining exact same functionality

// Constants
const MOCK_USERS_KEY = "cspc_users";
const CURRENT_USER_KEY = "cspc_current_user";

// Global state
let currentUser = null;
let currentSlide = 0;
let slideInterval = null;
let activeTab = 'home-tab';





const upcomingEvents = [{
        id: 1,
        title: "Volleyball Championship",
        date: "Oct 25, 2024",
        teams: "CCS vs CEA",
        image: "asset/vb champ.png"
    },
    {
        id: 2,
        title: "Basketball Finals",
        date: "Oct 28, 2024",
        teams: "CAS vs CTHBM",
        image: "asset/bb champ.png"
    },
    {
        id: 3,
        title: "Badminton Tournament",
        date: "Nov 2, 2024",
        teams: "CHS vs CCS",
        image: "asset/bt champ.png"
    },
    {
        id: 4,
        title: "Table Tennis Cup",
        date: "Nov 5, 2024",
        teams: "CEA vs CAS",
        image: "asset/tt champ.png"
    }
];

const lastYearHighlights = [{
        id: 1,
        title: "CSPC DEPARTMENTS",
        description: "CCS, CHS, CTHBM, CAS, CEA, etc",
        image: "asset/opening1.jpg"
    },
    {
        id: 2,
        title: "CSPC pageant",
        description: "CTHBM candidates dominated <br>the most anticipated section of the pageant event",
        image: "asset/opening4.jpg"
    },
    {
        id: 3,
        title: "CCS Volleyball team",
        description: "The CCS Volleyball Team showed <br>outstanding teamwork and<br> determination throughout the<br> tournament, but in they loss in the end.",
        image: "asset/opening2.jpg"
    }, {
        id: 4,
        title: "Opening of intrams",
        description: "CSPC opened the intramurals <br>with a colorful parade full of school spirit.",

        image: "asset/opening3.jpg"
    }
];



const standingsData = [{
        id: 1,
        team: "CCS DARK KNIGHTS",
        logo: "https://spims.cspc.edu.ph/assets/img/ccs.png",
        wins: 5,
        losses: 1,
        points: 15,
        position: 1,
    },
    {
        id: 2,
        team: "CEA MIGHTY KRYPTONS",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0fVl0iKrVGq8Xk-ysij3m09BWdPXU6cVdFw&s",
        wins: 4,
        losses: 2,
        points: 12,
        position: 2,
    },
    {
        id: 3,
        team: "CAS WARRIORS",
        logo: "asset/cas.jpg",
        wins: 3,
        losses: 3,
        points: 9,
        position: 3,
    },
    {
        id: 4,
        team: "CTHBM TIGERS",
        logo: "asset/chtbm.jpg",
        wins: 2,
        losses: 4,
        points: 6,
        position: 4,
    },
    {
        id: 5,
        team: "CHS EAGLES",
        logo: "asset/chs.jpg",
        wins: 1,
        losses: 5,
        points: 3,
        position: 5,
    }


];

const teamsData = [{
        id: 1,
        name: "CCS DARK KNIGHTS",
        fullName: "College of Computer Studies",
        logo: "https://spims.cspc.edu.ph/assets/img/ccs.png",
        color: "yellow",
        description: "Masters of strategy and precision",
        achievements: ["Championship 2023", "Best Defense Award"],
        sports: ["Basketball", "Volleyball", "E-Sports"],
    },
    {
        id: 2,
        name: "CEA MIGHTY KRYPTONS",
        fullName: "College of Engineering and Architecture",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0fVl0iKrVGq8Xk-ysij3m09BWdPXU6cVdFw&s",
        color: "green",
        description: "Built to last, engineered to win",
        achievements: ["Runner-up 2023", "Best Team Spirit"],
        sports: ["Basketball", "Badminton", "Table Tennis"],
    },
    {
        id: 3,
        name: "CAS WARRIORS",
        fullName: "College of Arts and Sciences",
        logo: "asset/cas.jpg", // <-- fixed path
        color: "blue",
        description: "Knowledge is power, victory is earned",
        achievements: ["Most Improved Team", "Fair Play Award"],
        sports: ["Volleyball", "Badminton", "Track & Field"],
    },
    {
        id: 4,
        name: "CTHBM TIGERS",
        fullName: "College of Tourism, Hospitality & Business Management",
        logo: "asset/chtbm.jpg", // <-- fixed path
        color: "orange",
        description: "Service excellence, competitive spirit",
        achievements: ["Best Hospitality", "Team Unity Award"],
        sports: ["Basketball", "Volleyball", "Swimming"],
    },
    {
        id: 5,
        name: "CHS EAGLES",
        fullName: "College of Health Sciences",
        logo: "asset/chs.jpg", // <-- fixed path
        color: "red",
        description: "Healing hearts, winning games",
        achievements: ["Most Dedicated Team", "Health Awareness Award"],
        sports: ["Table Tennis", "Badminton", "Chess"],
    }



];

const scheduleData = [{
        id: 1,
        day: "Monday",
        date: "October 21, 2024",
        time: "9:00 AM - 11:00 AM",
        sport: "Basketball",
        teams: { team1: "CCS Dark Knights", team2: "CEA Mighty Kryptons" },
        venue: "Main Court",
        status: "upcoming",
    },
    {
        id: 2,
        day: "Tuesday",
        date: "October 22, 2024",
        time: "10:00 AM - 12:00 PM",
        sport: "Volleyball",
        teams: { team1: "CAS Warriors", team2: "CHS Eagles" },
        venue: "Volleyball Court",
        status: "upcoming",
    },
    {
        id: 3,
        day: "Wednesday",
        date: "October 23, 2024",
        time: "2:00 PM - 4:00 PM",
        sport: "Badminton",
        teams: { team1: "CTHBM Tigers", team2: "CCS Dark Knights" },
        venue: "Badminton Hall",
        status: "upcoming",
    },
    {
        id: 4,
        day: "Thursday",
        date: "October 24, 2024",
        time: "3:00 PM - 5:00 PM",
        sport: "Table Tennis",
        teams: { team1: "CEA Mighty Kryptons", team2: "CAS Warriors" },
        venue: "Recreation Center",
        status: "upcoming",
    },
    {
        id: 5,
        day: "Friday",
        date: "October 25, 2024",
        time: "4:00 PM - 6:00 PM",
        sport: "Basketball",
        teams: { team1: "CHS Eagles", team2: "CTHBM Tigers" },
        venue: "Main Court",
        status: "upcoming",
    },
    {
        id: 6,
        day: "Monday",
        date: "October 14, 2024",
        time: "9:00 AM - 11:00 AM",
        sport: "Volleyball",
        teams: { team1: "CCS Dark Knights", team2: "CAS Warriors" },
        venue: "Volleyball Court",
        status: "completed",
        result: "CCS Won 3-1",
    },
    {
        id: 7,
        day: "Wednesday",
        date: "October 16, 2024",
        time: "2:00 PM - 4:00 PM",
        sport: "Basketball",
        teams: { team1: "CEA Mighty Kryptons", team2: "CTHBM Tigers" },
        venue: "Main Court",
        status: "completed",
        result: "CEA Won 89-76",
    }
];

// Utility Functions
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function hide(element) {
    if (typeof element === 'string') element = $(element);
    if (element) element.classList.add('hidden');
}

function show(element) {
    if (typeof element === 'string') element = $(element);
    if (element) element.classList.remove('hidden');
}

function getMockUsers() {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : [];
}

function saveMockUsers(users) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

function showToast(title, description, type = 'success') {
    const toastContainer = $('#toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
    <div class="toast-title">${title}</div>
    <div class="toast-description">${description}</div>
  `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Auth Functions
function switchToRegister() {
    hide('#login-screen');
    show('#register-screen');
}

function switchToLogin() {
    hide('#register-screen');
    show('#login-screen');
}

async function handleLogin(username, password) {
    const users = getMockUsers();
    const user = users.find(u => u.email === username && u.password === password);

    if (user) {
        const userData = {
            id: Math.random().toString(36).substr(2, 9),
            email: user.email,
        };

        currentUser = userData;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));

        hide('#auth-screens');
        show('#main-app');

        showToast("Welcome to CSPC Intramurals!", "Successfully logged in.");

        // Initialize dashboard
        initializeDashboard();

        return true;
    }

    return false;
}

async function handleRegister(email, password) {
    const users = getMockUsers();

    if (users.find(u => u.email === email)) {
        return false;
    }

    users.push({ email, password });
    saveMockUsers(users);

    showToast("Account Created!", "You can now login with your credentials.");

    return true;
}

function logout() {
    currentUser = null;
    localStorage.removeItem(CURRENT_USER_KEY);

    hide('#main-app');
    show('#auth-screens');
    show('#login-screen');
    hide('#register-screen');

    // Clear forms
    $('#login-form').reset();
    $('#register-form').reset();
    hide('#login-error');
    hide('#register-error');
    hide('#register-success');

    // Reset navigation
    activeTab = 'home-tab';
    updateNavigation();

    showToast("Logged Out", "You have been successfully logged out.");
}

// Slideshow Functions
function initializeSlideshow() {
    updateSlide();
    startSlideshow();
}

function updateSlide() {
    const slideElements = $$('.slide');
    const dotElements = $$('.dot');

    slideElements.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
            slide.querySelector('.slide-image').src = slides[index].image;
            slide.querySelector('.slide-title').textContent = slides[index].title;
            slide.querySelector('.slide-description').textContent = slides[index].description;
        } else {
            slide.classList.remove('active');
        }
    });

    dotElements.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

function startSlideshow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Dashboard Functions
function initializeDashboard() {
    initializeSlideshow();
    renderUpcomingEvents();
    renderLastYearHighlights();
    renderStandingsTable();
    renderTeamsList();
    renderSchedule();
    updateNavigation();
}

function renderUpcomingEvents() {
    const container = document.getElementById('upcoming-events');
    container.innerHTML = upcomingEvents.map(event => `
    <div class="sports-card">
      <div class="card-image-placeholder">
        <img src="${event.image}" alt="${event.title}" class="highlight-img">
      </div>
      <div class="card-content">
        <h3 class="card-title">${event.title}</h3>
        <p class="card-subtitle"><strong>Date:</strong> ${event.date}</p>
        <p class="card-subtitle"><strong>Teams:</strong> ${event.teams}</p>
      </div>
    </div>
  `).join('');
}


function renderLastYearHighlights() {
    const container = $('#last-year-highlights');
    container.innerHTML = lastYearHighlights.map((highlight) => `
    <div class="sports-card">
      <div class="card-image-placeholder">
        <img src="${highlight.image}" alt="${highlight.title}" class="highlight-img">
      </div>
      <h3 class="card-title">${highlight.title}</h3>
      <p class="card-subtitle">${highlight.description}</p>
    </div>
  `).join('');
}


function getRankIcon(position) {
    switch (position) {
        case 1:
            return '<i class="fas fa-trophy text-yellow-500"></i>';
        case 2:
            return '<i class="fas fa-medal text-gray-400"></i>';
        case 3:
            return '<i class="fas fa-award" style="color: #d97706;"></i>';
        default:
            return `<span style="width: 1.25rem; height: 1.25rem; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: bold; color: var(--muted-foreground);">${position}</span>`;
    }
}

function getRowClass(position) {
    switch (position) {
        case 1:
            return 'team-row-gold';
        case 2:
            return 'team-row-silver';
        case 3:
            return 'team-row-bronze';
        default:
            return '';
    }
}

function renderStandingsTable() {
    const container = $('#standings-table');

    const headerHTML = `
    <div class="table-header">
      <div style="text-align: center;">RANK</div>
      <div>TEAM</div>
      <div style="text-align: center;">WINS</div>
      <div style="text-align: center;">LOSSES</div>
      <div style="text-align: center;">POINTS</div>
    </div>
  `;

    const rowsHTML = standingsData.map(team => `
    <div class="table-row ${getRowClass(team.position)}">
      <div class="rank-cell">${getRankIcon(team.position)}</div>
      <div class="team-cell">
        <img src="${team.logo}" alt="${team.team} logo" class="team-logo">
        <span class="team-name">${team.team}</span>
      </div>
      <div class="stat-cell stat-wins">${team.wins}</div>
      <div class="stat-cell stat-losses">${team.losses}</div>
      <div class="stat-cell stat-points">${team.points}</div>
    </div>
  `).join('');

    container.innerHTML = headerHTML + '<div style="padding: 0.5rem;">' + rowsHTML + '</div>';

    // Render standings stats
    const statsContainer = $('#standings-stats');
    const totalWins = standingsData.reduce((sum, team) => sum + team.wins, 0);
    const totalLosses = standingsData.reduce((sum, team) => sum + team.losses, 0);
    const totalPoints = standingsData.reduce((sum, team) => sum + team.points, 0);

    statsContainer.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${standingsData.length}</div>
      <div class="stat-label">Total Teams</div>
    </div>
    <div class="stat-card">
      <div class="stat-value stat-wins">${totalWins}</div>
      <div class="stat-label">Total Wins</div>
    </div>
    <div class="stat-card">
      <div class="stat-value stat-losses">${totalLosses}</div>
      <div class="stat-label">Total Losses</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color: var(--accent);">${totalPoints}</div>
      <div class="stat-label">Total Points</div>
    </div>
  `;
}

function renderTeamsList() {
    const container = $('#teams-list');

    container.innerHTML = teamsData.map(team => `
    <div class="team-item team-${team.color}">
      <div class="team-header">
        <div class="team-logo-container">
          <img src="${team.logo}" alt="${team.name} logo" class="team-logo-large">
        </div>
        <div class="team-info">
          <div class="team-title-row">
            <h2 class="team-title">${team.name}</h2>
            <div class="team-color-badge color-badge-${team.color}">${team.color.toUpperCase()}</div>
          </div>
          <p class="team-full-name">${team.fullName}</p>
          <p class="team-description">${team.description}</p>
          
          <div class="team-sports">
            <div class="team-section-title">
              <i class="fas fa-bullseye" style="color: var(--accent);"></i>
              <span>Sports:</span>
            </div>
            <div class="sports-tags">
              ${team.sports.map(sport => `<span class="sport-tag">${sport}</span>`).join('')}
            </div>
          </div>
          
          <div class="team-achievements">
            <div class="team-section-title">
              <i class="fas fa-trophy" style="color: var(--primary);"></i>
              <span>Achievements:</span>
            </div>
            <div class="achievement-list">
              ${team.achievements.map(achievement => `
                <div class="achievement-item">
                  <div class="achievement-dot"></div>
                  <span class="achievement-text">${achievement}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  // Render teams stats
  const statsContainer = $('#teams-stats');
  const allSports = Array.from(new Set(teamsData.flatMap(team => team.sports)));
  const totalAchievements = teamsData.reduce((sum, team) => sum + team.achievements.length, 0);
  
  statsContainer.innerHTML = `
    <div class="stat-card">
      <i class="fas fa-users stat-icon"></i>
      <div class="stat-value">${teamsData.length}</div>
      <div class="stat-label">Competing Colleges</div>
    </div>
    <div class="stat-card">
      <i class="fas fa-bullseye stat-icon" style="color: var(--accent);"></i>
      <div class="stat-value">${allSports.length}</div>
      <div class="stat-label">Different Sports</div>
    </div>
    <div class="stat-card">
      <i class="fas fa-trophy stat-icon"></i>
      <div class="stat-value">${totalAchievements}</div>
      <div class="stat-label">Total Achievements</div>
    </div>
  `;
}

function getSportEmoji(sport) {
  const emojis = {
    Basketball: "🏀",
    Volleyball: "🏐", 
    Badminton: "🏸",
    "Table Tennis": "🏓",
  };
  return emojis[sport] || "⚽";
}

function renderSchedule() {
  const upcomingGames = scheduleData.filter(game => game.status === "upcoming");
  const completedGames = scheduleData.filter(game => game.status === "completed");
  
  // Render upcoming games
  const upcomingContainer = $('#upcoming-games');
  upcomingContainer.innerHTML = upcomingGames.map(game => `
    <div class="schedule-item">
      <div class="schedule-header">
        <div class="schedule-sport">
          <div class="sport-emoji">${getSportEmoji(game.sport)}</div>
          <div class="schedule-sport-info">
            <h3>${game.sport}</h3>
            <p>${game.day}</p>
          </div>
        </div>
        <div class="status-badge status-upcoming">UPCOMING</div>
      </div>
      
      <div class="schedule-details">
        <div class="schedule-detail">
          <i class="fas fa-calendar"></i>
          <span>${game.date}</span>
        </div>
        <div class="schedule-detail">
          <i class="fas fa-clock"></i>
          <span>${game.time}</span>
        </div>
        <div class="schedule-detail">
          <i class="fas fa-map-marker-alt"></i>
          <span>${game.venue}</span>
        </div>
      </div>
      
      <div class="schedule-matchup">
        <div class="team-name-schedule">${game.teams.team1}</div>
        <div class="vs-text">
          <i class="fas fa-users"></i>
          <span>VS</span>
          <i class="fas fa-users"></i>
        </div>
        <div class="team-name-schedule">${game.teams.team2}</div>
      </div>
    </div>
  `).join('');
  
  // Render completed games
  const completedContainer = $('#completed-games');
  completedContainer.innerHTML = completedGames.map(game => `
    <div class="schedule-item" style="opacity: 0.9;">
      <div class="schedule-header">
        <div class="schedule-sport">
          <div class="sport-emoji" style="filter: grayscale(1);">${getSportEmoji(game.sport)}</div>
          <div class="schedule-sport-info">
            <h3>${game.sport}</h3>
            <p>${game.day}</p>
          </div>
        </div>
        <div class="status-badge status-completed">COMPLETED</div>
      </div>
      
      <div class="schedule-details">
        <div class="schedule-detail">
          <i class="fas fa-calendar" style="color: var(--muted-foreground);"></i>
          <span style="color: var(--muted-foreground);">${game.date}</span>
        </div>
        <div class="schedule-detail">
          <i class="fas fa-clock" style="color: var(--muted-foreground);"></i>
          <span style="color: var(--muted-foreground);">${game.time}</span>
        </div>
        <div class="schedule-detail">
          <i class="fas fa-map-marker-alt" style="color: var(--muted-foreground);"></i>
          <span style="color: var(--muted-foreground);">${game.venue}</span>
        </div>
      </div>
      
      <div class="schedule-matchup" style="background: hsla(222, 15%, 15%, 0.3);">
        <div class="team-name-schedule">${game.teams.team1}</div>
        <div class="vs-text" style="color: var(--muted-foreground);">
          <span>VS</span>
        </div>
        <div class="team-name-schedule">${game.teams.team2}</div>
      </div>
      
      ${game.result ? `
        <div class="schedule-result">
          <p class="result-text">Result: ${game.result}</p>
        </div>
      ` : ''}
    </div>
  `).join('');
}

// Tab Navigation
function switchTab(tabId) {
  // Hide all tab contents
  $$('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = $('#' + tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Update navigation
  activeTab = tabId;
  updateNavigation();
  
  // Handle slideshow for home tab
  if (tabId === 'home-tab') {
    startSlideshow();
  } else {
    stopSlideshow();
  }
}

function updateNavigation() {
  $$('.nav-item').forEach(navItem => {
    navItem.classList.remove('active');
  });
  
  // Find and activate the correct nav item
  const tabToNavMap = {
    'home-tab': 0,
    'standings-tab': 1, 
    'teams-tab': 2,
    'schedule-tab': 3
  };
  
  const navIndex = tabToNavMap[activeTab];
  if (navIndex !== undefined) {
    const navItems = $$('.nav-item');
    if (navItems[navIndex]) {
      navItems[navIndex].classList.add('active');
    }
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is already logged in
  const savedUser = localStorage.getItem(CURRENT_USER_KEY);
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      hide('#loading-screen');
      hide('#auth-screens');
      show('#main-app');
      initializeDashboard();
    } catch (error) {
      localStorage.removeItem(CURRENT_USER_KEY);
      hide('#loading-screen');
      show('#auth-screens');
      show('#login-screen');
    }
  } else {
    // Show login screen after loading
    setTimeout(() => {
      hide('#loading-screen');
      show('#auth-screens');
      show('#login-screen');
    }, 1500);
  }
  
  // Login form handler
  $('#login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = $('#login-username').value;
    const password = $('#login-password').value;
    const errorDiv = $('#login-error');
    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    hide(errorDiv);
    
    if (!username || !password) {
      errorDiv.textContent = "Please fill in all fields";
      show(errorDiv);
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    hide(btnText);
    show(btnLoading);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = await handleLogin(username, password);
      if (!success) {
        errorDiv.textContent = "Invalid username or password. Don't have an account? Register below.";
        show(errorDiv);
      }
    } catch (err) {
      errorDiv.textContent = "Login failed. Please try again.";
      show(errorDiv);
    } finally {
      submitBtn.disabled = false;
      show(btnText);
      hide(btnLoading);
    }
  });
  
  // Register form handler
  $('#register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = $('#register-email').value;
    const password = $('#register-password').value;
    const confirmPassword = $('#register-confirm-password').value;
    const errorDiv = $('#register-error');
    const successDiv = $('#register-success');
    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    hide(errorDiv);
    hide(successDiv);
    
    if (!email || !password || !confirmPassword) {
      errorDiv.textContent = "Please fill in all fields";
      show(errorDiv);
      return;
    }
    
    if (!email.includes("@") || !email.includes(".")) {
      errorDiv.textContent = "Please enter a valid email address";
      show(errorDiv);
      return;
    }
    
    if (password.length < 6) {
      errorDiv.textContent = "Password must be at least 6 characters long";
      show(errorDiv);
      return;
    }
    
    if (password !== confirmPassword) {
      errorDiv.textContent = "Passwords do not match";
      show(errorDiv);
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    hide(btnText);
    show(btnLoading);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = await handleRegister(email, password);
      if (success) {
        successDiv.textContent = "Account created successfully! You can now login.";
        show(successDiv);
        setTimeout(() => {
          switchToLogin();
        }, 2000);
      } else {
        errorDiv.textContent = "Failed to create account. Email may already be in use.";
        show(errorDiv);
      }
    } catch (err) {
      errorDiv.textContent = "Registration failed. Please try again.";
      show(errorDiv);
    } finally {
      submitBtn.disabled = false;
      show(btnText);
      hide(btnLoading);
    }
  });
});

// Global functions for inline event handlers
window.switchToRegister = switchToRegister;
window.switchToLogin = switchToLogin;
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;
window.switchTab = switchTab;
window.logout = logout;



function attachVideoControls() {
  const video = document.getElementById("openingVideo");
  const soundBtn = document.getElementById("soundBtn");

  if (video && soundBtn) {
    soundBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      soundBtn.textContent = video.muted ? "🔇 Unmute" : "🔊 Mute";
    });
  }
}


function updateSlide() {
  // ... (same as above)
  attachVideoControls();

}
function showSlide(index) {
  const slidesEls = document.querySelectorAll(".slide");
  if (!slidesEls.length) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slidesEls.forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  currentSlide = index;
}