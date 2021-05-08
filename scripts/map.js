import Slider from './slider.js';

document.querySelector('.map__link_panda').classList.add('map__link_active');

// function watchChangeActive (sliderItems, target) {
//     let index;
//     let offset = 0;
//
//     sliderItems.forEach(item => item.classList.remove('animal-item_active'));
//     if ((index = Array.from(sliderItems).indexOf(target)) > 1) {
//         offset = (target.getBoundingClientRect().width  * (index - 1));
//     }
//     sliderItems.forEach(item => item.style.transform = `translate(-${offset}px)`);
//     target.classList.add('animal-item_active');
// }




function mapHandler (sliderItems, target) {
    target.querySelector('input[type=radio]').checked = true;
    document.querySelectorAll('.map__link').forEach((link) => link.classList.remove('map__link_active'));
    document.querySelector(`.map__link_${target.querySelector('input[type=radio]').attributes.value.value}`)?.classList.add('map__link_active');
}

const sliderMap = new Slider(document.querySelector('.choose__slider'), undefined, 1, 'click', mapHandler);

document.querySelector('.map__list').addEventListener('click', (e) => e.preventDefault());

document.querySelector('.map__list').addEventListener('mouseover', (e) => {
    e.preventDefault();
    if (e.target.matches('a'))
    {
        document.querySelectorAll('.map__link').forEach((link) => link.classList.remove('map__link_active'));
        e.target.closest('.map__link').classList.add('map__link_active');
        sliderMap.activateItem(document.querySelector(`input[type=radio][value=${e.target.closest('.map__link').dataset.animal}]`).closest('.animal-round'));
    }
});
