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

const registracia = document.getElementById('registracia');
const saxeli = document.getElementById('saxeli');
const meili = document.getElementById('meili');
const paroli = document.getElementById('paroli');
const gaimeoreparoli = document.getElementById('gaimeore-paroli');
const shecdomasaxelshi = document.getElementById('shecdoma-saxelshi');
const shecdomameilshi = document.getElementById('shecdoma-meilshi');
const shecdomaparolshi = document.getElementById('shecdoma-parolshi');
const shecdomagameorebashi = document.getElementById('shecdoma-gameorebashi');
const parolisnaxva = document.getElementById('parolis-naxva');
const ganmeorebisnaxva = document.getElementById('ganmeorebis-naxva');
const USERS_KEY = 'data';
const SESSION_KEY = 'momxmarebeli';

parolisnaxva.addEventListener("click", function() {
    if (paroli.type === "password") {
        paroli.type = "text";
    } 
    else {
        paroli.type = "password";
    }
});

ganmeorebisnaxva.addEventListener("click", function() {
    if (gaimeoreparoli.type == "password") {
        gaimeoreparoli.type = "text";
    } else {
        gaimeoreparoli.type = "password";
    }
});

function meilisworia(a) {
    if (a.indexOf("@") == -1) {
        return false;
    }
    if (a.indexOf(".") == -1) {
        return false;
    }
    if (a.indexOf(" ") != -1) {
        return false;
    }
    return true;
}

function userebi() {
    var data = localStorage.getItem(USERS_KEY);
    
    if (data === null) {
        return [];
    }

    return JSON.parse(data);
}

function userebisshenaxva(u) {
    localStorage.setItem(USERS_KEY, JSON.stringify(u));
}

function meilidakavebulia(meili) {
    var u = userebi();
    var m = meili.trim().toLowerCase();
    for (var i = 0; i < u.length; i++) {
        if (u[i].email.toLowerCase() == m) {
            return true;
        }
    }
    return false;
}

function main(movlena) {
    movlena.preventDefault();

    shecdomasaxelshi.textContent = "";
    shecdomameilshi.textContent = "";
    shecdomaparolshi.textContent = "";
    shecdomagameorebashi.textContent = "";

    var valid = true;
    var name = saxeli.value.trim();
    var email = meili.value.trim();
    var password = paroli.value;
    var repeatpassword = gaimeoreparoli.value;

    if (name.length < 2) {
        shecdomasaxelshi.textContent = "შეიყვანე სახელი";
        valid = false;
    }
    if (!meilisworia(email)) {
        shecdomameilshi.textContent = "შეიყვანე კორექტული ფოსტა";
        valid = false;
    } 
    else if (meilidakavebulia(email)) {
        shecdomameilshi.textContent = "ფოსტა დაკავებულია";
        valid = false;
    }
    if (password.length < 8) {
        shecdomaparolshi.textContent = "პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან";
        valid = false;
    }
    if (repeatpassword != password) {
        shecdomagameorebashi.textContent = "პაროლები არ ემთხვევა";
        valid = false;
    }
    if (!valid) return;

    var u = userebi();

    var axaliuseri = {
        name: name,
        email: email,
        password: password
    };

    u.push(axaliuseri);
    userebisshenaxva(u);

    var session = {
        email: axaliuseri.email,
        name: axaliuseri.name,
        remember: true
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    window.location.href = "/index.html";
}
registracia.addEventListener("submit", main);