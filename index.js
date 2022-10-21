//--active header nav==============--

const container = document.querySelector('.header__menu');
container.addEventListener('click', function (e) {
    const items = document.querySelectorAll('.menu__link');
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
}