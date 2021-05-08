
/*
* Принцип работы класса Slider:
* - Размеры видимой части: Определяются через Dom api
* - Количество отображаемых эл-ов: Определяются через Dom api
* - Активация элемента / переключение между элементами слайдера: Вызов callback'a переданного в конструктор
* - Стартовый активный элемент: Передается в конструтктор
* - Наличие / отсутствие кнопок: Оределяется через dom api
*/

export default class Slider {
    _slider;
    _sliderItems;
    _sliderBtns;
    _sliderPaginator;
    _changeActive;
    _activeItem;

    constructor(slider, itemClass = 'slider__item', activeItem = 0, event = 'click', changeActive) {
        this._slider = slider;
        this._sliderItems = this._slider.querySelector('.slider__list').childNodes;
        this._activeItem = activeItem;

        if (this._slider.querySelector('.paginator') != null) {
            this._sliderPaginator = {};
            this._sliderPaginator.input = this._slider.querySelector('.paginator__stripe');
            this._sliderPaginator.total = this._slider.querySelector('.paginator__total');
            this._sliderPaginator.total.innerHTML = this._sliderItems.length.toString().padStart(2, '0');
            this._sliderPaginator.active = this._slider.querySelector('.paginator__active');
            this._sliderPaginator.active.innerHTML = (this._activeItem + 1).toString().padStart(2, '0') + '/';
            this._sliderPaginator.input.setAttribute('max', this._sliderItems.length.toString());
        }

        if (this._slider.querySelectorAll('.slider__btn')?.length === 2) {
            this._sliderBtns = this._slider.querySelectorAll('.slider__btn');
        }

        this._slider.querySelector('.slider__list').addEventListener(event, this._slideHandler.bind(this));
        this._sliderBtns?.forEach((btn) => {btn.addEventListener('click', this._btnsHandler.bind(this))});
        this._sliderPaginator.input.addEventListener('input', this._paginatorHandler.bind(this));

        if (!changeActive) {
            this._changeActive = (sliderItems, target) => {
                let offset;
                sliderItems.forEach(item => item.classList.remove(itemClass + '_active'));
                offset = (target.getBoundingClientRect().width  * Array.from(sliderItems).indexOf(target));
                sliderItems.forEach(item => item.style.transform = `translate(-${offset}px)`);
                target.classList.add(itemClass + '_active');
            };
        } else {this._changeActive = changeActive;}

        this._changeActive(this._sliderItems, this._sliderItems[activeItem]);
    }


    activateItem(target) {
        this._slideHandler({target})
    }

    _slideHandler({target}) {
        if (Array.from(this._sliderItems).includes(target))
        {
            this._changeActive(this._sliderItems,  target);
            this._activeItem = Array.from(this._sliderItems).indexOf(target) ?? this._activeItem;
            this._sliderPaginator.input.value = this._activeItem + 1;
            this._sliderPaginator.active.innerHTML = (this._activeItem + 1).toString().padStart(2, '0')+ '/';
        }
    }

    _paginatorHandler({target}) {
        this._slideHandler({target: this._sliderItems[target.value - 1]});
    }

    _btnsHandler ({target}) {
        if (target.matches('.slider__btn_prev')) {
            if (this._sliderItems[this._activeItem - 1])
                this._slideHandler({target: this._sliderItems[this._activeItem - 1]})
        } else if (target.matches('.slider__btn_next')) {
            if (this._sliderItems[this._activeItem + 1])
                this._slideHandler({target: this._sliderItems[this._activeItem + 1]})
        }
    }
}
