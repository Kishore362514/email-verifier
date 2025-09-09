# Email Verifier

A comprehensive, user-friendly web application for validating email addresses with an enhanced user interface design.

## Features

✅ **Format Validation** - Checks if the email follows proper format standards  
🌐 **Domain Verification** - Validates domain format and structure  
🔍 **Syntax Analysis** - Comprehensive syntax and structure validation  
⚡ **Instant Results** - Get immediate feedback on email validity  
📱 **Responsive Design** - Works perfectly on all devices  

## How to Use

1. Open `index.html` in your web browser
2. Enter an email address in the input field
3. Click "Verify Email" to validate the address
4. View detailed validation results with pass/fail indicators

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Kishore362514/email-verifier.git

# Navigate to the directory
cd email-verifier

# Open in browser (or use a local server)
open index.html

# Or serve with Python
python3 -m http.server 8000
```

## Sample Emails for Testing

The application includes sample emails to test different validation scenarios:
- `user@example.com` - Valid email
- `invalid.email` - Missing @ symbol
- `test@domain` - Missing TLD
- `valid.email@company.org` - Valid complex email
- `user.name+tag@domain.co.uk` - Valid email with tags

## Validation Checks

The verifier performs multiple checks:
- Basic email format validation
- Syntax structure analysis
- Domain format verification
- Email length validation (RFC compliant)
- Valid character validation

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactive functionality and validation logic
- **Responsive Design** - Mobile-first approach

## Browser Support

Works in all modern browsers including:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

---

Built with ❤️ for reliable email validation