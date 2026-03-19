// === GLOBAL STATE ===
let currentPage = 'home';
let selectedFile = null;
let extractedText = '';
let riskScore = 0;
let detectedKeywords = [];
let fileName = '';

// === CUSTOM CURSOR ===
(function initCustomCursor() {
  // Check if device has fine pointer (desktop)
  const hasFinePo = window.matchMedia('(pointer: fine)').matches;
  if (!hasFinePo) return;

  const cursor = document.getElementById('custom-cursor');
  let isHovering = false;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a') ||
      target.classList.contains('cursor-hover') ||
      target.classList.contains('upload-area')
    ) {
      cursor.classList.add('hover');
    } else {
      cursor.classList.remove('hover');
    }
  });
})();

// === NAVIGATION ===
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show target page
  const targetPage = document.getElementById(page + '-page');
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = page;
    window.scrollTo(0, 0);
  }

  // Reset upload page when navigating back to it
  if (page === 'upload') {
    resetUploadPage();
  }
}

// === UPLOAD PAGE ===
function resetUploadPage() {
  selectedFile = null;
  document.getElementById('upload-area').style.display = 'block';
  document.getElementById('preview-area').style.display = 'none';
  document.getElementById('processing-area').style.display = 'none';
  document.getElementById('analyze-btn').style.display = 'none';
  document.getElementById('file-input').value = '';
}

// File input setup
const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');

uploadArea.addEventListener('click', () => {
  fileInput.click();
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragging');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragging');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragging');
  
  const file = e.dataTransfer.files[0];
  if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
    handleFileSelect(file);
  }
});

// File input change
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFileSelect(file);
  }
});

function handleFileSelect(file) {
  selectedFile = file;
  fileName = file.name;
  
  const reader = new FileReader();
  reader.onloadend = () => {
    document.getElementById('preview-image').src = reader.result;
    document.getElementById('file-name').textContent = file.name;
    
    // Show preview, hide upload area
    document.getElementById('upload-area').style.display = 'none';
    document.getElementById('preview-area').style.display = 'flex';
    document.getElementById('analyze-btn').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function removeFile() {
  selectedFile = null;
  document.getElementById('upload-area').style.display = 'block';
  document.getElementById('preview-area').style.display = 'none';
  document.getElementById('analyze-btn').style.display = 'none';
  fileInput.value = '';
}

// === ANALYZE EMAIL ===
async function analyzeEmail() {
  if (!selectedFile) return;

  // Hide preview and button, show processing
  document.getElementById('preview-area').style.display = 'none';
  document.getElementById('analyze-btn').style.display = 'none';
  document.getElementById('processing-area').style.display = 'flex';

  const steps = [
    {
      icon: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
      label: 'Extracting Text'
    },
    {
      icon: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>',
      label: 'Analyzing Risk'
    },
    {
      icon: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline>',
      label: 'Generating Report'
    }
  ];

  // Animate through steps
  for (let i = 0; i < steps.length; i++) {
    const stepItems = document.querySelectorAll('.step-item');
    const processingIcon = document.getElementById('processing-icon');
    const processingTitle = document.getElementById('processing-title');

    // Update current step
    stepItems.forEach((item, index) => {
      item.classList.remove('active', 'completed');
      if (index < i) {
        item.classList.add('completed');
      } else if (index === i) {
        item.classList.add('active');
      }
    });

    // Update processing icon and title
    processingIcon.innerHTML = steps[i].icon;
    processingTitle.textContent = steps[i].label;

    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  // Simulate OCR extraction
  extractedText = `Dear Valued Customer,

Your account has been temporarily suspended due to unusual activity detected.

To restore full access, please verify your identity immediately by clicking the link below:

https://secure-verify-account.suspicious-domain.xyz/verify

You have 24 hours to complete this verification or your account will be permanently closed.

This is an automated security measure to protect your account.

Best regards,
Security Team`;

  // Calculate risk
  const suspiciousKeywords = [
    'suspended', 'verify', 'unusual activity', 'click', 'immediately',
    'account', 'restore', 'security', 'automated', 'temporary'
  ];

  const lowerText = extractedText.toLowerCase();
  detectedKeywords = suspiciousKeywords.filter(keyword =>
    lowerText.includes(keyword)
  );

  const baseRisk = Math.min(detectedKeywords.length * 12, 85);
  const randomVariance = Math.floor(Math.random() * 15);
  riskScore = Math.min(baseRisk + randomVariance, 95);

  // Navigate to results
  showResults();
}

// === RESULTS PAGE ===
function showResults() {
  navigateTo('result');
  
  // Set filename
  document.getElementById('result-filename').textContent = fileName ? `Analyzed: ${fileName}` : '';

  // Animate score
  animateScore();

  // Set extracted text
  document.getElementById('extracted-text').textContent = extractedText;

  // Set keywords
  const keywordsContainer = document.getElementById('keywords-container');
  keywordsContainer.innerHTML = '';
  detectedKeywords.forEach(keyword => {
    const tag = document.createElement('span');
    tag.className = 'keyword-tag';
    tag.textContent = keyword;
    keywordsContainer.appendChild(tag);
  });

  // Set recommendation
  setRecommendation();
}

function animateScore() {
  const scoreElement = document.getElementById('risk-score');
  const progressCircle = document.getElementById('progress-circle');
  const riskBadge = document.getElementById('risk-badge');
  
  // Calculate progress
  const circumference = 2 * Math.PI * 120;
  const progress = circumference - (riskScore / 100) * circumference;

  // Animate score number
  let currentScore = 0;
  const duration = 1500;
  const increment = riskScore / (duration / 16);
  
  const timer = setInterval(() => {
    currentScore += increment;
    if (currentScore >= riskScore) {
      currentScore = riskScore;
      clearInterval(timer);
    }
    scoreElement.textContent = Math.floor(currentScore) + '%';
  }, 16);

  // Animate progress circle
  setTimeout(() => {
    progressCircle.style.strokeDashoffset = progress;
  }, 100);

  // Update risk badge
  const riskLevel = getRiskLevel();
  riskBadge.className = 'risk-badge ' + riskLevel.className;
  riskBadge.innerHTML = `
    <svg class="risk-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${riskLevel.icon}
    </svg>
    <span class="risk-badge-label">${riskLevel.label}</span>
  `;
}

function getRiskLevel() {
  if (riskScore < 30) {
    return {
      label: 'Safe',
      className: 'safe',
      icon: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
    };
  } else if (riskScore < 70) {
    return {
      label: 'Suspicious',
      className: 'suspicious',
      icon: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>'
    };
  } else {
    return {
      label: 'High Risk',
      className: 'high-risk',
      icon: '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
    };
  }
}

function setRecommendation() {
  const recommendationText = document.getElementById('recommendation-text');
  const recommendationsCard = document.getElementById('recommendations-card');
  
  let text = '';
  let className = '';

  if (riskScore < 30) {
    text = "This email appears to be safe based on our analysis. However, always verify sender information and exercise caution with links or attachments from unknown sources.";
    className = 'safe';
  } else if (riskScore < 70) {
    text = "This email shows suspicious characteristics that warrant caution. We recommend verifying the sender's identity through official channels before taking any action, clicking links, or providing information.";
    className = 'suspicious';
  } else {
    text = "⚠️ This email exhibits multiple indicators of fraud or phishing. DO NOT click any links, download attachments, or provide personal information. Delete this email immediately and report it to your IT security team.";
    className = 'high-risk';
  }

  recommendationText.textContent = text;
  recommendationsCard.classList.add(className);
}

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
  // Show home page by default
  navigateTo('home');
});
