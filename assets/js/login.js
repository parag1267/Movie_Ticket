const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("loginPassword");

togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    } else {
        password.type = "password";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    }
});

document.getElementById("loginBtn").addEventListener("click", login);

function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const emailError = document.getElementById("loginEmailError");
    const passwordError = document.getElementById("loginPasswordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    let valid = true;

    if (email === "") {
        emailError.textContent = "Please enter your email";
        valid = false;
    }

    if (password === "") {
        passwordError.textContent = "Please enter your password";
        valid = false;
    }

    if(!valid) return;

    const adminEmail = "admin@cinemavaale.com";
    const adminPassword = "admin@1234"; 

    if(email === adminEmail && password === adminPassword){
        alert("Admin login");
        localStorage.setItem("loggedInAdmin",JSON.stringify({ email }));
        window.location.href = "./admin/admin-cinema.html";
        return;
    }


    if (valid) {
        let users = JSON.parse(localStorage.getItem("registerUser"));
        if (!Array.isArray(users)) {
            alert("No registered users found! Please register first.");
        }

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "./user/user-home.html";
        }
        else {
            alert("Invalid email or password");
        }
    }

    password.type = "password";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");


}