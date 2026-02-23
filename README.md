# AI-Based Email Fraud Detection System

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Flask](https://img.shields.io/badge/Flask-Web_Framework-black)
![Status](https://img.shields.io/badge/Status-Under_Development-orange)
![License](https://img.shields.io/badge/License-Academic-green)

A cybersecurity-focused web application that detects phishing and fraudulent emails using a rule-based detection engine with OCR support for image-based emails.

---

## 📌 Project Overview

Phishing attacks are one of the most common cybersecurity threats.  
This system analyzes email content and identifies fraud using:

- Urgency/Fear-based keywords
- Banking & account scam patterns
- Prize and lottery scams
- Government impersonation
- Suspicious links & attachments
- OCR for image-based phishing emails

---

## 🎯 Objectives

- Build a rule-based phishing detection system
- Apply Data Structures & Algorithms in real-world scenario
- Integrate OCR for image fraud detection
- Create scalable backend for future ML integration

---

## 🧠 Core Technical Concepts

### Data Structures
- Dictionary (HashMap) → O(1) keyword lookup
- List → token storage
- Regex → pattern detection

### Algorithm
Linear scanning algorithm with overall complexity:

O(n)

Where n = number of words in email.

---

## 🏗 System Architecture


User Input (Text / Image)
↓
OCR (if image)
↓
Text Preprocessing
↓
Keyword & Pattern Detection
↓
Risk Score Calculation
↓
Classification
↓
Output


---

## 🛠 Technologies

Backend:
- Python
- Flask

OCR:
- OpenCV
- pytesseract
- Tesseract OCR Engine

Text Processing:
- re (Regular Expressions)
- collections

---

## 📂 Project Structure


email_fraud_detector/
│
├── app.py
├── detection_engine.py
├── ocr_engine.py
├── config.py
├── templates/
│ └── index.html
└── uploads/


---

## 👥 Team Members

| Name | Role | Responsibility |
|------|------|----------------|
| Adarsh kumar | Backend Developer | Detection logic & OCR |
| Rohan sharma | Frontend Developer | UI design |
| Dhruv | Documentation & Testing | Research & report |

---

## 🚀 Development Phases

Phase 1:
- Rule-based detection
- OCR integration
- Risk scoring

Phase 2:
- Machine Learning integration
- Naive Bayes classifier
- Dataset training

---

## 📈 Expected Code Size

Rule-based backend: ~350–450 LOC  
With ML integration: ~600+ LOC  

---

## 📌 Status

Currently under development.  
Backend implementation starting phase.

---

## 📜 License

Developed for academic purposes.
