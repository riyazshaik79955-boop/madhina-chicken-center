if(localStorage.getItem("isLoggedIn") !== "true"){

    alert("⚠ Please Login First");

    window.location.href = "login.html";

}

window.logout = function(){

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}