const navi = document.getElementById("nav");
const overlay = document.getElementById("overlay");
const burger = document.getElementById("burger-button");
const closebutton = document.getElementById("close-button");

function openburger() {
    navi.classList.add("open");
    overlay.classList.add("active");
}

function closeburger() {
    navi.classList.remove("open");
    overlay.classList.remove("active");
}

burger.addEventListener("click", openburger);
closebutton.addEventListener("click", closeburger);

const login = document.getElementById("login");
const meili = document.getElementById("meili");
const paroli = document.getElementById("paroli");
const shecdomameilshi = document.getElementById("shecdomameilshi");
const shecdomaparolshi = document.getElementById("shecdomaparolshi");
const parolisnaxva = document.getElementById("parolisnaxva");
const parolisnaxvaicon = document.getElementById("parolisnaxvaicon");
const USERS_KEY = "data";
const SESSION_KEY = "momxmarebeli";

parolisnaxva.addEventListener("click", function() {
    if (paroli.type === "password") {
        paroli.type = "text";
    } 
    else {
        paroli.type = "password";
    }
});



function userebi() {
    var data = localStorage.getItem(USERS_KEY);
    
    if (data === null) {
        return [];
    }

    return JSON.parse(data);
}

function findUser(meili) {
    var u = userebi();
    var m = meili.trim().toLowerCase();
    for (var i = 0; i < u.length; i++) {
        if (u[i].email.toLowerCase() === m) {
            return u[i];
        }
    }
    return null;
}
function main(movlena){
    movlena.preventDefault();

    shecdomameilshi.textContent = "";
    shecdomaparolshi.textContent = "";

    var email = meili.value.trim();
    var password = paroli.value;

    var user = findUser(email);

    if (user === null) {
        shecdomameilshi.textContent = "მეილი ვერ მოიძებნა";
        return;
    }

    if (user.password !== password) {
        shecdomaparolshi.textContent = "პაროლი არასწორია";
        return;
    }

    var session = {
        email: user.email,
        name: user.name || ""
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    window.location.href = "../index.html";
}
login.addEventListener("submit", main);