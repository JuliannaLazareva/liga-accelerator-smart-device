import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  //const acc = document.querySelectorAll(".accordion__item");

  //for (let i = 0; i < acc.length; i++) {
  //  acc[i].addEventListener("click", function() {
      /* Переключение между добавлением и удалением класса "accordion__item_show",
      чтобы выделить кнопку, управляющую панелью */
  //    this.classList.toggle("accordion__item_show");

      /* Переключение между скрытием и отображением активной панели */
    //  const panel = this.document.querySelectorAll(".accordion__body");
      //if (panel.style.display === "block") {
        //panel.style.display = "none";
    //  } else {
      //  panel.style.display = "block";
      //}
    //});
  //}

  const acc = document.querySelectorAll(".accordion__item");
  const panel = document.querySelectorAll(".accordion__body");

  for (let i = 0; i < acc.length; i++) {
      acc[i].onclick = function() {
        const setClasses = !this.classList.contains('accordion__item_show');
          setClass(acc, 'accordion__item_show', 'remove');
          setClass(panel, 'show', 'remove');

           if (setClasses) {
              this.classList.toggle("accordion__item_show");
              this.nextElementSibling.classList.toggle("show");
          }
      }
  }

  function setClass(els, className, fnName) {
      for (let i = 0; i < els.length; i++) {
          els[i].classList[fnName](className);
      }
  }

  //Функция открытия текста по клику на кнопку "Подробнее"
  const btnText = document.querySelector(".about-company__button");
  const breakText = document.querySelector(".about-company__break-text");
  const moreTextMobile = document.querySelector(".about-company__more--mobile-only");
  const moreTextTablet = document.querySelector(".about-company__more--tablet");

  function readMore() {
    if (breakText.style.display === "none") {
      breakText.style.display = "inline";
      btnText.innerHTML = "Подробнее";
      moreTextMobile.style.display = "none";
      moreTextTablet.style.display = "none";
    }  else {
      breakText.style.display = "none";
      btnText.innerHTML = "Свернуть";
      moreTextMobile.style.display = "inline";
      moreTextTablet.style.display = "inline";
    }
  }

  btnText.addEventListener('click', readMore);

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
