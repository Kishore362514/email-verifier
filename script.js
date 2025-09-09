// Email Verifier JavaScript
class EmailVerifier {
    constructor() {
        this.emailInput = document.getElementById('email-input');
        this.verifyBtn = document.getElementById('verify-btn');
        this.resultContainer = document.getElementById('result-container');
        this.resultIcon = document.getElementById('result-icon');
        this.resultTitle = document.getElementById('result-title');
        this.resultDetails = document.getElementById('result-details');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.verifyBtn.addEventListener('click', () => this.verifyEmail());
        this.emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyEmail();
            }
        });
        
        // Clear results when input changes
        this.emailInput.addEventListener('input', () => {
            this.hideResults();
        });
    }
    
    async verifyEmail() {
        const email = this.emailInput.value.trim();
        
        if (!email) {
            this.showResult('error', 'Please enter an email address', 'Email address is required for verification.');
            return;
        }
        
        this.setLoading(true);
        
        try {
            // Simulate async verification process
            await this.simulateAsyncVerification();
            
            const result = this.performEmailVerification(email);
            this.showResult(result.type, result.title, result.details);
        } catch (error) {
            this.showResult('error', 'Verification Failed', 'An error occurred during verification. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    performEmailVerification(email) {
        const checks = {
            format: this.checkEmailFormat(email),
            syntax: this.checkEmailSyntax(email),
            domain: this.checkDomainFormat(email),
            length: this.checkEmailLength(email),
            characters: this.checkValidCharacters(email)
        };
        
        const passedChecks = Object.values(checks).filter(check => check.passed).length;
        const totalChecks = Object.keys(checks).length;
        
        let resultType, title, details;
        
        if (passedChecks === totalChecks) {
            resultType = 'success';
            title = 'Email is Valid! ✅';
            details = this.generateSuccessDetails(email, checks);
        } else if (passedChecks >= 3) {
            resultType = 'warning';
            title = 'Email has Issues ⚠️';
            details = this.generateWarningDetails(email, checks);
        } else {
            resultType = 'error';
            title = 'Email is Invalid ❌';
            details = this.generateErrorDetails(email, checks);
        }
        
        return { type: resultType, title, details };
    }
    
    checkEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            passed: emailRegex.test(email),
            message: 'Basic email format validation'
        };
    }
    
    checkEmailSyntax(email) {
        const parts = email.split('@');
        if (parts.length !== 2) {
            return { passed: false, message: 'Email must contain exactly one @ symbol' };
        }
        
        const [localPart, domainPart] = parts;
        const validLocal = localPart.length > 0 && localPart.length <= 64;
        const validDomain = domainPart.length > 0 && domainPart.length <= 255;
        
        return {
            passed: validLocal && validDomain,
            message: 'Local and domain parts within length limits'
        };
    }
    
    checkDomainFormat(email) {
        const domain = email.split('@')[1];
        if (!domain) return { passed: false, message: 'No domain found' };
        
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const hasTLD = domain.includes('.') && domain.split('.').pop().length >= 2;
        
        return {
            passed: domainRegex.test(domain) && hasTLD,
            message: 'Domain format and TLD validation'
        };
    }
    
    checkEmailLength(email) {
        return {
            passed: email.length <= 254,
            message: 'Email length within RFC limits (254 characters)'
        };
    }
    
    checkValidCharacters(email) {
        const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return {
            passed: validRegex.test(email),
            message: 'Contains only valid characters'
        };
    }
    
    generateSuccessDetails(email, checks) {
        const details = [`
            <div class="success-message">
                <strong>${email}</strong> passed all validation checks!
            </div>
            <ul>
                <li>✅ Valid email format</li>
                <li>✅ Proper syntax structure</li>
                <li>✅ Valid domain format</li>
                <li>✅ Appropriate length</li>
                <li>✅ Valid characters only</li>
            </ul>
            <div style="margin-top: 15px; font-size: 0.9em; opacity: 0.9;">
                This email address appears to be properly formatted and follows standard conventions.
            </div>
        `];
        
        return details.join('');
    }
    
    generateWarningDetails(email, checks) {
        const passed = [];
        const failed = [];
        
        Object.entries(checks).forEach(([key, check]) => {
            if (check.passed) {
                passed.push(`✅ ${check.message}`);
            } else {
                failed.push(`⚠️ ${check.message}`);
            }
        });
        
        return `
            <div class="warning-message">
                <strong>${email}</strong> has some potential issues:
            </div>
            <ul>
                ${failed.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <div style="margin-top: 10px;">
                <strong>Passed checks:</strong>
                <ul>
                    ${passed.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    generateErrorDetails(email, checks) {
        const failed = [];
        const passed = [];
        
        Object.entries(checks).forEach(([key, check]) => {
            if (!check.passed) {
                failed.push(`❌ ${check.message}`);
            } else {
                passed.push(`✅ ${check.message}`);
            }
        });
        
        return `
            <div class="error-message">
                <strong>${email}</strong> failed validation:
            </div>
            <ul>
                ${failed.map(item => `<li>${item}</li>`).join('')}
            </ul>
            ${passed.length > 0 ? `
                <div style="margin-top: 10px;">
                    <strong>Passed checks:</strong>
                    <ul>
                        ${passed.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;
    }
    
    showResult(type, title, details) {
        this.resultContainer.className = `result-container ${type}`;
        this.resultIcon.textContent = this.getIconForType(type);
        this.resultTitle.textContent = title;
        this.resultDetails.innerHTML = details;
        this.resultContainer.classList.remove('hidden');
        
        // Smooth scroll to results
        this.resultContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
    
    hideResults() {
        this.resultContainer.classList.add('hidden');
    }
    
    getIconForType(type) {
        const icons = {
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        return icons[type] || '❓';
    }
    
    setLoading(isLoading) {
        this.verifyBtn.disabled = isLoading;
        if (isLoading) {
            this.verifyBtn.textContent = 'Verifying...';
            this.verifyBtn.classList.add('loading');
        } else {
            this.verifyBtn.textContent = 'Verify Email';
            this.verifyBtn.classList.remove('loading');
        }
    }
    
    simulateAsyncVerification() {
        return new Promise(resolve => {
            setTimeout(resolve, 1000 + Math.random() * 1000); // 1-2 seconds
        });
    }
}

// Sample email suggestions for demo
const sampleEmails = [
    'user@example.com',
    'invalid.email',
    'test@domain',
    'valid.email@company.org',
    'user.name+tag@domain.co.uk'
];

// Add sample email functionality
function addSampleEmailsFeature() {
    const inputGroup = document.querySelector('.input-group');
    const samplesDiv = document.createElement('div');
    samplesDiv.className = 'sample-emails';
    samplesDiv.innerHTML = `
        <div style="margin-top: 20px; text-align: center;">
            <p style="margin-bottom: 10px; color: #666; font-size: 0.9rem;">Try these sample emails:</p>
            <div class="sample-buttons">
                ${sampleEmails.map(email => 
                    `<button type="button" class="sample-btn" data-email="${email}">${email}</button>`
                ).join('')}
            </div>
        </div>
    `;
    
    inputGroup.appendChild(samplesDiv);
    
    // Add styles for sample buttons
    const style = document.createElement('style');
    style.textContent = `
        .sample-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        }
        .sample-btn {
            background: #f8f9fa;
            border: 1px solid #e1e5e9;
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sample-btn:hover {
            background: #e9ecef;
            border-color: #667eea;
        }
        @media (max-width: 768px) {
            .sample-buttons {
                flex-direction: column;
                align-items: center;
            }
            .sample-btn {
                width: 200px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add click handlers
    document.querySelectorAll('.sample-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('email-input').value = btn.dataset.email;
            document.getElementById('result-container').classList.add('hidden');
        });
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new EmailVerifier();
    addSampleEmailsFeature();
    
    console.log('Email Verifier initialized successfully! 🚀');
});