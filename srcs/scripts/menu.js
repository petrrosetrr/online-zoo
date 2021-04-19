let burger = document.querySelector("#burger");

burger.addEventListener('click', ()=>{
    burger.classList.toggle("header__menu-btn_active");
    document.querySelector("#menu").classList.toggle("header__nav_active");
    console.log(burger);
    console.log(document.querySelector("#menu"));
});
