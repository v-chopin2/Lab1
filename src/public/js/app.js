let currentUser = null;

function showLoginForm() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
}

function showRegisterForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function updateUIForAuthenticatedUser(user) {
  currentUser = user;
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('userWelcome').style.display = 'block';
  document.getElementById('protectedSection').style.display = 'block';
  document.getElementById('userName').textContent = user.name;
}

function updateUIForUnauthenticatedUser() {
  currentUser = null;
  document.getElementById('authSection').style.display = 'block';
  document.getElementById('userWelcome').style.display = 'none';
  document.getElementById('protectedSection').style.display = 'none';
  showLoginForm();
}

async function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      updateUIForAuthenticatedUser(data.user);
      document.getElementById('loginFormElement').reset();
    } else {
      alert('Login failed: ' + data.message);
    }
  } catch (error) {
    alert('Login error: ' + error.message);
  }
}

async function registerUser() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const age = document.getElementById('registerAge').value;
  const phone = document.getElementById('registerPhone').value;
  
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, age: age || undefined, phone: phone || undefined })
    });
    
    const data = await response.json();
    
    if (data.success) {
      updateUIForAuthenticatedUser(data.user);
      document.getElementById('registerFormElement').reset();
    } else {
      alert('Registration failed: ' + data.message);
    }
  } catch (error) {
    alert('Registration error: ' + error.message);
  }
}

async function logoutUser() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (data.success) {
      updateUIForUnauthenticatedUser();
      document.getElementById('protectedResult').innerHTML = '';
    }
  } catch (error) {
    alert('Logout error: ' + error.message);
  }
}

async function testProtectedEndpoint() {
  try {
    const response = await fetch('/api/protected-test', {
      method: 'GET',
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('protectedResult').innerHTML = `
        <div class="alert alert-success">
          <h6>Protected Endpoint Response:</h6>
          <p><strong>Message:</strong> ${data.message}</p>
          <p><strong>User:</strong> ${data.user.name} (${data.user.email})</p>
          <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          <p><strong>Secret Data:</strong> ${data.secretData}</p>
        </div>
      `;
    } else {
      document.getElementById('protectedResult').innerHTML = `
        <div class="alert alert-danger">
          <strong>Access Denied:</strong> ${data.message}
        </div>
      `;
    }
  } catch (error) {
    document.getElementById('protectedResult').innerHTML = `
      <div class="alert alert-danger">
        <strong>Error:</strong> ${error.message}
      </div>
    `;
  }
}

async function checkAuthStatus() {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (data.success) {
      updateUIForAuthenticatedUser(data.user);
    } else {
      updateUIForUnauthenticatedUser();
    }
  } catch (error) {
    updateUIForUnauthenticatedUser();
  }
}

async function calculatePrice() {
  const salary = document.getElementById('salary').value;
  const days = document.getElementById('days').value;
  
  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ salary, days })
    });
    
    const data = await response.json();

    if (data.success) {
      let finalPrice = Math.round(data.price / 100) * 100;
      document.getElementById("finalPrice").innerHTML = finalPrice;
    } else {
      document.getElementById("finalPrice").innerHTML = "Error calculating price";
    }
  } catch (error) {
    document.getElementById("finalPrice").innerHTML = "Error: " + error.message;
  }
}

window.onload = function() {
  checkAuthStatus();
};