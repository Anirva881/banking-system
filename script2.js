window.onload = function() {
    const loginForm = document.querySelector('form');
    loginForm.onsubmit = function(event) {
        event.preventDefault();
        window.location.href = "account.html"; 
    };
};