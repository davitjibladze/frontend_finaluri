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

const container = document.getElementById('cards-container');
const wina = document.getElementById('wina');
const shemdegi = document.getElementById('shemdegi');

let index = 0;
const total = container.children.length;

function getCardWidth() {
    return container.children[0].offsetWidth + 2;
}
/*ამაზე gpt-ს ვკითხე*/ 
shemdegi.onclick = () => {
    const visible = window.innerWidth >= 768 ? 3 : 2;

    if (index < total - visible) {
        index++;
        container.style.transform = `translateX(-${index * getCardWidth()}px)`;
    }
};

wina.onclick = () => {
    if (index > 0) {
        index--;
        container.style.transform = `translateX(-${index * getCardWidth()}px)`;
    }
};



function renderkursebi(courses) {
    const cont = document.querySelector('.kursebi-container');
    cont.innerHTML = '';

    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'kursi-card';

        card.innerHTML = `
            <img class="kursi-picture" src="${course.surati}">
            <div class="kursi-body">
                <div class="reitingi">
                    <div class="shefaseba">
                        <span class="varskvlavebi">★★★★★</span>
                        <span class="kursis-reitingi">${course.reitingi}</span>
                    </div>
                    <span class="kursis-fasi">${course.fasi === 0 ? 'უფასო' : course.fasi + '₾'}</span>
                </div>

                <div class="kursis-saxeli">${course.saxeli}</div>

                <div class="kursis-agwera">
                    <div class="agwera-item">
                        <img src="/assets/gakvetilebi.svg" alt="">
                        ${course.gakvetili} გაკვეთილი
                    </div>

                    <div class="agwera-item">
                        <img src="/assets/dro.svg" alt="">
                        ${course.saati} საათი
                    </div>
                </div>

                <div class="kursis-footer">
                    <div class="avtori">
                        <img class="avtori-avatar" src="${course.avatari}">
                        <span class="avtoris-saxeli">${course.avtori}</span>
                    </div>

                    <button class="kursis-dawyeba">დაწყება</button>
                </div>
            </div>
        `;

        cont.appendChild(card);
    });

    const meti = document.createElement('div');
    meti.className = 'kursi-card meti';
    meti.innerHTML = `
        <button class="meti-btn">ყველას ნახვა</button>
    `;

    cont.appendChild(meti);
}

function renderLektorebi(lektorebi) {
    const cont = document.querySelector('.leqtorebis-fotoebi');
    cont.innerHTML = '';

    lektorebi.forEach(leqtori => {
        const card = document.createElement('div');
        card.className = 'leqtori-card';

        card.innerHTML = `
            <img src="${leqtori.avatari}" alt="">
            <div class="leqtoris-agwera">
                <div class="leqtoris-saxeli">${leqtori.saxeli}</div>
                <div class="leqtoris-pozicia">${leqtori.roli}</div>
            </div>
        `;

        cont.appendChild(card);
    });
}
async function load() {
    const res = await fetch('data.json');
    const data = await res.json();
    renderkursebi(data.kursebi);
    renderLektorebi(data.lektorebi);
}
load();