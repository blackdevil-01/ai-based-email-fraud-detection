# AI-Based Email Fraud Detection System

A rule-based phishing detection system that analyzes email text and image-based emails to detect potential fraud using keyword risk scoring, suspicious link detection, and OCR-based text extraction.

---

## 📖 Project Overview

This project is a cybersecurity-focused web application built using Python and Flask. It detects phishing or fraudulent emails by analyzing:

- Urgency and fear-based language
- Banking and account scam patterns
- Money and lottery-related scams
- Government or authority impersonation
- Suspicious URLs and attachments
- Suspicious formatting patterns
- Image-based phishing emails using OCR

The system classifies emails into:

- ✅ Safe
- ⚠ Suspicious
- 🚨 High Risk

---

## 🧠 Technologies Used

### Backend
- Python
- Flask

### Text Processing
- Regular Expressions (re)
- collections (Counter)

### OCR & Image Processing
- OpenCV
- pytesseract
- Tesseract OCR Engine

---

## 🏗 Project Structure
email_fraud_detector/
│
├── app.py
├── detection_engine.py
├── ocr_engine.py
├── config.py
├── utils.py
│
├── uploads/
│
└── templates/
└── index.html


---

## ⚙ How It Works

### Step 1: Input
User submits:
- Email text
OR
- Image containing email content

### Step 2: OCR (If Image)
Image → Grayscale conversion → Text extraction using Tesseract

### Step 3: Text Preprocessing
- Convert to lowercase
- Pattern normalization
- Clean formatting

### Step 4: Risk Analysis
- Keyword scoring (weighted)
- Suspicious link detection
- Attachment type detection
- Formatting pattern analysis

### Step 5: Risk Calculation

Risk Percentage Formula:


Risk % = (Total Score / Maximum Score) × 100


Classification:

- 0–30 → Safe
- 31–70 → Suspicious
- 71–100 → High Risk

---

## 📊 Data Structures & Algorithms Used

- Dictionary (HashMap) → O(1) keyword lookup
- List → Token storage
- Linear Scan → O(n) time complexity
- Regex Pattern Matching
- Frequency Counting

Overall detection complexity:

O(n)

Where n = number of words in email.

---

## 🚀 Installation

### 1. Clone Repository


git clone https://github.com/yourusername/email-fraud-detector.git

cd email-fraud-detector


### 2. Install Dependencies


pip install flask opencv-python pytesseract


### 3. Install Tesseract OCR Engine

Download and install from:
https://github.com/tesseract-ocr/tesseract

Make sure it is added to system PATH.

---

## ▶ Run the Application


python app.py


Open in browser:


http://127.0.0.1:5000


---

## 📈 Code Size

Rule-based backend:
~350–450 lines of Python code

Future ML integration (optional):
~600+ lines

---

## 🔮 Future Enhancements

- Machine Learning integration (Naive Bayes / TF-IDF)
- Real-time email API integration
- Database logging system
- Admin dashboard analytics
- Domain reputation checking
- Spam dataset training

---

## 🎓 Academic Value

This project demonstrates:

- Cybersecurity fundamentals
- Rule-based AI logic
- OCR integration
- Web application development
- Data Structures & Algorithms usage
- Time complexity analysis

---

## 👨‍💻 Author

Adarsh Kumar  
BCA Student  
Cybersecurity & AI Enthusiast

---

## 📜 License

This project is developed for academic and educational purposes.
