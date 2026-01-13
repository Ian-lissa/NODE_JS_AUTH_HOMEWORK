// ====== DOM Elements ======
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

// ====== Utility Functions ======
function showMessage(elementId, message, type = 'success') {
    const messageDiv = document.getElementById(elementId);
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
}

function showAlert(message, type = 'info') {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ====== Register Form Handler ======
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!username || !email || !password) {
            showMessage('message', 'Please fill in all fields', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('message', 'Password must be at least 6 characters', 'error');
            return;
        }
        
        try {
            // Send registration request to server
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage('message', '✅ Account created successfully! Redirecting to login...', 'success');
                
                // Clear form
                registerForm.reset();
                
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showMessage('message', `❌ ${result.message || 'Registration failed'}`, 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showMessage('message', '❌ Network error. Please try again.', 'error');
        }
    });
}

// ====== Login Form Handler ======
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        // Basic validation
        if (!username || !password) {
            showMessage('message', 'Please enter username and password', 'error');
            return;
        }
        
        try {
            // Send login request to server
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage('message', '✅ Login successful! Redirecting to dashboard...', 'success');
                
                // Store user info in localStorage (simple session management)
                if (result.user) {
                    localStorage.setItem('currentUser', JSON.stringify(result.user));
                }
                
                // Redirect to dashboard after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showMessage('message', `❌ ${result.message || 'Invalid credentials'}`, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage('message', '❌ Network error. Please try again.', 'error');
        }
    });
}

// ====== Logout Handler ======
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // Clear user session
        localStorage.removeItem('currentUser');
        
        // Show confirmation
        if (confirm('Are you sure you want to logout?')) {
            // Redirect to home page
            window.location.href = 'index.html';
        }
    });
}

// ====== Dashboard User Display ======
window.addEventListener('DOMContentLoaded', () => {
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    // If on dashboard page, display username
    if (usernameDisplay) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && currentUser.username) {
            usernameDisplay.textContent = currentUser.username;
        } else {
            // If no user is logged in, redirect to login page
            window.location.href = 'login.html';
        }
    }
    
    // Check if user is logged in when accessing dashboard directly
    if (window.location.pathname.includes('dashboard.html')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showAlert('Please login first', 'warning');
            window.location.href = 'login.html';
        }
    }
});

// ====== Form Input Enhancements ======
document.addEventListener('DOMContentLoaded', () => {
    // Add focus styles to all inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Add enter key to submit forms
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const activeForm = document.querySelector('form:focus-within');
            if (activeForm) {
                activeForm.dispatchEvent(new Event('submit', { cancelable: true }));
            }
        }
    });
});