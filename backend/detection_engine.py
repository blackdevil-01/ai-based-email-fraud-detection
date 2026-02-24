import re
from config import (
    URGENCY_KEYWORDS,
    MONEY_KEYWORDS,
    BANKING_KEYWORDS,
    DELIVERY_KEYWORDS,
    AUTHORITY_KEYWORDS,
    SUSPICIOUS_ATTACHMENTS,
    SUSPICIOUS_LINK_PATTERNS,
    MAX_SCORE
)


def analyze_email(text):
    original_text = text
    text = text.lower()

    score = 0
    detected_keywords = []

    # Function to process keyword groups
    def process_keywords(keyword_list, weight):
        nonlocal score
        for keyword in keyword_list:
            if keyword in text:
                score += weight
                detected_keywords.append(keyword)

    # Apply weighted scoring
    process_keywords(URGENCY_KEYWORDS, 15)
    process_keywords(MONEY_KEYWORDS, 25)
    process_keywords(BANKING_KEYWORDS, 30)
    process_keywords(DELIVERY_KEYWORDS, 15)
    process_keywords(AUTHORITY_KEYWORDS, 35)

    # Suspicious links
    for pattern in SUSPICIOUS_LINK_PATTERNS:
        if pattern in text:
            score += 40
            break

    # Suspicious attachments
    for ext in SUSPICIOUS_ATTACHMENTS:
        if ext in text:
            score += 40
            break

    # Formatting detection
    if re.search(r'\b[A-Z]{4,}\b', original_text):
        score += 20

    if "!!!!" in original_text:
        score += 15

    if re.search(r'\d{6,}', original_text):
        score += 15

    # Risk percentage calculation
    risk_percentage = min((score / MAX_SCORE) * 100, 100)

    if risk_percentage <= 30:
        level = "Safe"
    elif risk_percentage <= 70:
        level = "Suspicious"
    else:
        level = "High Risk"

    return {
        "risk_percentage": round(risk_percentage, 2),
        "level": level,
        "detected_keywords": detected_keywords,
        "total_score": score
    }