const root = document.querySelector('html');
const body = document.querySelector('body');
const mainNav = document.querySelector("nav");
const menu = document.querySelector('.nav-links');
const menuButton = document.getElementById('menu-display');
const themeDisplay = document.getElementById('theme-display');
const themeContainer = document.querySelector('.theme-container');
const themeSelectors = document.getElementsByClassName('theme-select');

mainNav.classList.add('js-nav');

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  theme && setActiveSelector(theme);
  root.className = theme;
  const shade = getComputedStyle(document.documentElement).getPropertyValue('--shade-100');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', shade);
}

const setTheme = (className) => {
  var root = document.getElementsByTagName('html')[0];
  root.className = className;
  localStorage.setItem('theme', className);
  const shade = getComputedStyle(document.documentElement).getPropertyValue('--shade-100');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', shade);
  setActiveSelector(className);
}

const setActiveSelector = (className) => {
  var selectedTheme = document.getElementById(`${className}-select`);
  [...themeSelectors].forEach(item => {
    item.classList.remove('active')
  });
  selectedTheme.classList.add('active');
  hideThemeContainer();
}

const showThemeContainer = () => {
  themeContainer.classList.add('visible');
  [...themeSelectors].forEach(item => {
    item.tabIndex = 0
  });
}

const hideThemeContainer = () => {
  themeContainer.classList.remove('visible');
  [...themeSelectors].forEach(item => {
    item.tabIndex = -1
  });
}

const showMenu = () => {
  menu.classList.add('visible');
  menuButton.classList.add('active');
}

const hideMenu = () => {
  menu.classList.remove('visible');
  menuButton.classList.remove('active');
}

let previousScrollPosition = 0;

const isScrollingDown = () => {
  let scrolledPosition = window.scrollY;
  let isScrollDown;

  if (scrolledPosition > previousScrollPosition) {
    isScrollDown = true;
  } else {
    isScrollDown = false;
  }
  previousScrollPosition = scrolledPosition;
  return isScrollDown;
}

const handleNavScroll = () => {
  if (mainNav.classList.contains('visible')) {
    if (isScrollingDown()) {
      mainNav.classList.add('scroll-down');
      mainNav.classList.remove('scroll-up')
    } else {
      mainNav.classList.add('scroll-up');
      mainNav.classList.remove('scroll-down')
    }
  } else {
    mainNav.classList.remove('scroll-up');
    mainNav.classList.remove('scroll-down')
  }
}

getTheme();

themeDisplay.addEventListener("click", function () {
  hideMenu()
  if (themeContainer.classList.contains('visible')) {
    hideThemeContainer();
  } else {
    showThemeContainer();
  }
})

menuButton.addEventListener("click", function () {
  hideThemeContainer();
  if (menu.classList.contains('visible')) {
    hideMenu();
  } else {
    showMenu();
  }
})

menu.addEventListener("click", function () {
  hideThemeContainer();
  hideMenu()
})

window.addEventListener('scroll', () => {
  handleNavScroll()
})




const texts = ["Federico Campi", "Desarrollador", "Full stack"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {
  if (count === texts.length) {
    return; // Detener cuando se hayan mostrado todas las palabras
  }

  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  if (count === 0) {
    const logoElement = document.getElementById("logo");
    logoElement.textContent = letter;
    logoElement.classList.add("blinking-cursor");
  } else if (count === 1) {
    const text1Element = document.getElementById("text1");
    text1Element.textContent = letter;
    text1Element.classList.add("blinking-cursor");
  } else if (count === 2) {
    const text2Element = document.getElementById("text2");
    text2Element.textContent = letter;
    text2Element.classList.add("blinking-cursor");
  }

  if (letter.length === currentText.length) {
    setTimeout(() => {
      if (count === 0) {
        document.getElementById("logo").classList.remove("blinking-cursor", "logo");
      } else if (count === 1) {
        document.getElementById("text1").classList.remove("blinking-cursor", "animate-text-1");
      } else if (count === 2) {
        document.getElementById("text2").classList.remove("blinking-cursor", "animate-text-2");
      }

      count++;
      index = 0;
      setTimeout(type, 100); // Pausa antes de empezar con la siguiente palabra
    }, 100); // Pausa breve para permitir ver la línea al final
  } else {
    setTimeout(type, 150); // Velocidad de tipeo
  }
}

type();

document.querySelectorAll('.link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});


