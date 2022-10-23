//--active header nav==============--
const container = document.querySelector('.header__menu');
container.addEventListener('click', function (e) {
    const items = document.querySelectorAll('.menu__nav-link');
    const target = e.target;
    Array.from(items).forEach(item => {
        item.classList.remove('active');
    });
    target.classList.add('active');
});
const smoothLinks = document.querySelectorAll('a[href^="#"]');

for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};


//--burger==============--
const burg = document.querySelector(".burger");
burg.addEventListener("click", function () {
    burg.classList.toggle("active");

    if (burg.classList.contains("active")) {
        document.querySelector(".burger span").classList.add("active");
        document.querySelector(".header__menu").classList.add("active");
    } else {
        document.querySelector(".burger span").classList.remove("active");
        document.querySelector(".header__menu").classList.remove("active");
    }
});
const nav = document.querySelector(".header__menu");
nav.addEventListener("click", function () {
    burg.classList.toggle("active");

    if (burg.classList.contains("active")) {
        document.querySelector(".burger span").classList.add("active");
        document.querySelector(".header__menu").classList.add("active");
    } else {
        document.querySelector(".burger span").classList.remove("active");
        document.querySelector(".header__menu").classList.remove("active");
    }
});


//--dropdown==============--
const dropDownBtn = document.querySelector('.dropdown__button');
const dropDownList = document.querySelector('.dropdown__list');
const dropDownListItems = document.querySelectorAll('.dropdown__list-item');
const dropDownInput = document.querySelector('.dropdown__input-hidden');
dropDownBtn.addEventListener('click', function (e) {
    e.preventDefault();
    dropDownList.classList.toggle('dropdown__list--visible');
    this.classList.add('dropdown__button--active');
}); // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун

dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownBtn.innerText = this.innerText;
        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
        dropDownList.classList.remove('dropdown__list--visible');
        dropDownBtn.classList.remove('dropdown__button--active');
    });
}); // Клик снаружи дропдауна. Закрыть дропдаун

document.addEventListener('click', function (e) {
    if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
    }
}); // Нажатие на Tab или Escape. Закрыть дропдаун

document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
    }
});


//--form validate==============--
const form = document.getElementById("form");
form.addEventListener("submit", formSend);

async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
    let popUp = document.querySelector(".pop-up");

    if (error === 0) {
        popUp.classList.add('active');
        form.reset();
        setTimeout(() => {
            popUp.classList.remove('active');
        }, "2000");
    } else { }
}

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll(".required");

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        RemoveError(input);

        if (input.classList.contains("email")) {
            if (emailTest(input)) {
                AddError(input);
                error++;
            }
        } else {
            if (input.value === "") {
                AddError(input);
                error++;
                console.log("No");
            }
        }
    }

    return error;
}

function AddError(input) {
    input.parentElement.classList.add("error");
    input.classList.add("error");
}

function RemoveError(input) {
    input.parentElement.classList.remove("error");
    input.classList.remove("error");
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@(\w+[\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}


//--range==============--
window.addEventListener("DOMContentLoaded", () => {
    let range = new rSlider({
        element: "#range",
        tick: 1
    });
});

class rSlider {
    constructor(args) {
        this.el = document.querySelector(args.element);
        this.min = +this.el.min || 0;
        this.max = +this.el.max || 100;
        this.step = +this.el.step || 1;
        this.tick = args.tick || this.step;
        this.addTicks();
        this.dataRange = document.createElement("div");
        this.dataRange.className = "data-range";
        this.el.parentElement.appendChild(this.dataRange, this.el);
        this.updatePos();
        this.el.addEventListener("input", () => {
            this.updatePos();
        });
    }

    addTicks() {
        let wrap = document.createElement("div");
        wrap.className = "range";
        this.el.parentElement.insertBefore(wrap, this.el);
        wrap.appendChild(this.el);
        let ticks = document.createElement("div");
        ticks.className = "range-ticks";
        wrap.appendChild(ticks);
    }

    updatePos() {
        this.dataRange.innerHTML = this.el.value + "%";
    }
};





