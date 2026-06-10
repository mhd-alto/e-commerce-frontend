const BASE_URL = "http://localhost:5000";
      // Auth (register + login)
      // Connect Sign Up form to backend /auth/register
      // Login wiring can be added similarly if/when needed.
       const apiRegister = async ({ fullName, email, password }) => {
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password }),
        });
        // backend returns JSON on both success and some errors
        let data;
        try {
          data = await res.json();
        } catch {
          data = { message: await res.text() };
        }
        if (!res.ok) {
          const msg = data?.message || "Registration failed";
          throw new Error(msg);
        }
        return data;
      }

      const paneSignup = document.getElementById('pane-signup');
      const signupForm = paneSignup?.querySelector('form');
      const signupInputs = paneSignup?.querySelectorAll('input');
      const signupButton = paneSignup?.querySelector('button[type="submit"]');
      const signupError = paneSignup?.querySelector('#signupError');

      signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!signupInputs || signupInputs.length < 3) return;

        const fullName = signupInputs[0].value.trim();
        const email = signupInputs[1].value.trim();
        const password = signupInputs[2].value;

        // basic front-end validation
        if (!fullName || !email || !password) return;

        if (signupError) {
          signupError.textContent = '';
          signupError.style.display = 'none';
        }

        if (signupButton) {
          signupButton.disabled = true;
        }

        try {
          const result = await apiRegister({ fullName, email, password });
          // Success UX: show message and reset form
          if (signupError) {
            signupError.textContent = result?.message || 'Account created';
            signupError.style.display = 'block';
            signupError.classList.remove('text-danger');
            signupError.classList.add('text-success');
          }
          signupForm.reset();
          const loginData = await apiLogin({ email, password }); // auto-login after registration
          window.location.reload(); // Reload to update UI after logout

          loginData?.token && localStorage.setItem('authToken', loginData.token);
          // close modal after success
          const modalEl = document.getElementById('authModal');
          if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();
          }
        } catch (err) {
          const msg = err?.message || 'Registration failed';
          if (signupError) {
            signupError.textContent = msg;
            signupError.style.display = 'block';
            signupError.classList.remove('text-success');
            signupError.classList.add('text-danger');
          }
        } finally {
          if (signupButton) {
            signupButton.disabled = false;
          }
        }
      });

    
    const apiLogin = async ({ email, password }) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: await res.text() };
    }
    if (!res.ok) {
      const msg = data?.message || "Login failed";
      throw new Error(msg);
    }
    return data;
  }
    // NEW: Admin Register API
    const apiAdminRegister = async ({ fullName, email, password }) => {
      const res = await fetch(`${BASE_URL}/auth/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() };
      }
      if (!res.ok) {
        const msg = data?.message || "Admin registration failed";
        throw new Error(msg);
      }
      return data;
    }
    
