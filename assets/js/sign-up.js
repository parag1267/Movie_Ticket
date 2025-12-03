const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

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


document.getElementById("registerBtn").addEventListener("click", registerUser);

function registerUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const date = document.getElementById("date").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const dateError = document.getElementById("dateError");


    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    dateError.textContent = "";


    let valid = true;

    if (name === "") {
        nameError.textContent = "Please enter your name";
        valid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
        emailError.textContent = "Please enter your email";
        valid = false;
    } else if (!email.match(emailPattern)) {
        emailError.textContent = "Please enter a valid email.";
        valid = false;
    }

    if (password === "") {
        passwordError.textContent = "Please enter your password";
        valid = false;
    }
    else if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        valid = false;
    }

    if (date === "") {
        dateError.textContent = "Please select your date of birth.";
        valid = false;
    }

    if (valid) {
        const userData = {
            name: name,
            email: email,
            password: password,
            date: date
        };


        let users = JSON.parse(localStorage.getItem("registerUser"));
        if(!Array.isArray(users)){
            users = [];
        }

        users.push(userData);
        localStorage.setItem("registerUser", JSON.stringify(users));

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("date").value = "";

        password.type = "password";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

        window.location.href = "login.html";
    }
}