document.querySelector('.donate-btn').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.popup-donate').classList.toggle('popup-donate_active');
    document.querySelector('body').style.overflow = 'hidden';
});

document.querySelector('.popup-donate').addEventListener('click', (e) => {
    if (e.target.matches('.popup-donate'))
        e.target.classList.toggle('popup-donate_active');
    document.querySelector('body').style.overflow = '';
})
