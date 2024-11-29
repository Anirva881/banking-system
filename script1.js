window.onload = function(){
    const form = document.querySelector('form');
    form.onsubmit = function(event){
        event.preventDefault();
        window.location.href="login.html"
    };
};