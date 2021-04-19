const modeSwitch = document.querySelector('#theme-switch');
const storage = window.localStorage;
const toggleTheme = () => {
    document.querySelector('html').classList.toggle('dark-mode');
    if (modeSwitch.checked)
        storage.setItem("mode", "dark");
    else
        storage.setItem("mode", "light");
};

if (storage.getItem("mode") === "dark" ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem("mode"))) {
    modeSwitch.checked = true;
    toggleTheme();
}

modeSwitch.addEventListener('change', toggleTheme);
