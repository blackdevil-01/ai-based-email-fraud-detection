# config.py

# 1️⃣ Urgency / Fear Keywords
URGENCY_KEYWORDS = [
    "urgent",
    "immediate action required",
    "act now",
    "final warning",
    "account suspended",
    "account locked",
    "verify immediately",
    "time sensitive",
    "your account will be closed",
    "unusual activity detected",
    "security alert",
    "suspicious login",
    "confirm now",
    "last chance",
    "failure to respond"
]

# 2️⃣ Money / Prize Keywords
MONEY_KEYWORDS = [
    "you have won",
    "lottery winner",
    "claim your prize",
    "free reward",
    "cash bonus",
    "inheritance",
    "tax refund",
    "unclaimed funds",
    "compensation payment",
    "wire transfer",
    "investment opportunity",
    "double your money",
    "withdraw now",
    "payment pending",
    "transaction failed"
]

# 3️⃣ Banking / Account Scams
BANKING_KEYWORDS = [
    "bank alert",
    "update payment information",
    "verify your account",
    "credit card declined",
    "password expired",
    "login attempt detected",
    "confirm your identity",
    "reset your password",
    "billing problem",
    "invoice attached",
    "secure message",
    "account verification required"
]

# 4️⃣ Delivery Scams
DELIVERY_KEYWORDS = [
    "delivery failed",
    "package on hold",
    "track your shipment",
    "courier notification",
    "customs clearance required",
    "shipping update",
    "parcel waiting",
    "click to reschedule"
]

# 5️⃣ Authority Impersonation
AUTHORITY_KEYWORDS = [
    "irs notice",
    "tax department",
    "legal action",
    "court summons",
    "police complaint",
    "government grant",
    "compliance issue",
    "hr department",
    "ceo request",
    "urgent payroll update"
]

# Suspicious Attachments
SUSPICIOUS_ATTACHMENTS = [
    ".exe",
    ".scr",
    ".zip",
    ".html"
]

# Suspicious URL Patterns
SUSPICIOUS_LINK_PATTERNS = [
    "http://",
    "https://",
    "www.",
    "<a href="
]

MAX_SCORE = 1000