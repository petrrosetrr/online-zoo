import Slider from './slider.js';

function watchChangeActive (sliderItems, target) {
    let index;
    let offset = 0;
    let gap = Number.parseInt(window.getComputedStyle(target.parentElement).columnGap);

    sliderItems.forEach(item => item.classList.remove('animal-item_active'));
    if ((index = Array.from(sliderItems).indexOf(target)) > 1) {
        offset = target.getBoundingClientRect().width  * (index - 1) + (gap * (index - 1));
    }
    sliderItems.forEach(item => item.style.transform = `translate(-${offset}px)`);
    target.classList.add('animal-item_active');
}

const sliderWatch = new Slider(document.querySelector('.watch__slider'),    undefined,1, undefined, watchChangeActive);
const sliderHow = new Slider(document.querySelector('.how-it-works__slider'));
const sliderPets = new Slider(document.querySelector('.pets-in-zoo__slider'), 'animal-item');
