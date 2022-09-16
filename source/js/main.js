import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  const acc = document.querySelectorAll('.accordion__item');

  for (let i = 0; i < acc.length; i++) {
    acc[i].classList.remove('accordion__item--nojs');
    acc[i].onclick = function () {

      const setClasses = !this.classList.contains('accordion__item--show');
      setClass(acc, 'accordion__item--show', 'remove');

      if (setClasses) {
        this.classList.toggle('accordion__item--show');
      }
    };
  }

  function setClass(els, className, fnName) {
    for (let i = 0; i < els.length; i++) {
      els[i].classList[fnName](className);
    }
  }

  // Функция открытия текста по клику на кнопку 'Подробнее'
  const btnText = document.querySelector('.about-company__button');
  const breakText = document.querySelector('.about-company__break-text');
  const moreTextMobile = document.querySelector('.about-company__more--mobile-only');
  const moreTextTablet = document.querySelector('.about-company__more--tablet');
  const moreTextTablet2 = document.querySelector('.about-company__more--tablet-2');

  function readMore() {
    if (breakText.style.display === 'none') {
      breakText.style.display = 'inline';
      btnText.innerHTML = 'Подробнее';
      if (document.documentElement.clientWidth < 767) {
        moreTextMobile.style.display = 'none';
        moreTextTablet.style.display = 'none';
        moreTextTablet2.style.display = 'none';
      } else {
        moreTextTablet.style.display = 'none';
        moreTextTablet2.style.display = 'none';
      }
    } else {
      breakText.style.display = 'none';
      btnText.innerHTML = 'Свернуть';
      if (document.documentElement.clientWidth < 767) {
        moreTextTablet.style.display = 'inline';
        moreTextTablet2.style.display = 'inline';
      } else {
        moreTextMobile.style.display = 'inline';
        moreTextTablet.style.display = 'inline';
        moreTextTablet2.style.display = 'inline';
      }
    }
  }

  btnText.addEventListener('click', readMore);

  // Маска телефона

  [].forEach.call(document.querySelectorAll('[type="tel"]'), function (input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) {
        event.preventDefault();
      }
      let matrix = '+7 (___) ___ ____';
      let i = 0;
      let def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');
      let newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i != -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return '\\d{1,' + a.length + '}';
          }).replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type == 'blur' && this.value.length < 5) {
        this.value = '';
      }
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);

  });


  // Utils
  // ---------------------------------

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
