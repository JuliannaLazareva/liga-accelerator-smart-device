import {iosVhFix} from './utils/ios-vh-fix';
// import {initModals} from './modules/modals/init-modals';

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

  let phoneInputs = document.querySelectorAll('[type="tel"]');
  let form = document.querySelector('.feedback__form');
  let modalForm = document.querySelector('.modal__form');

  let getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
  };

  let onPhoneInput = function (e) {
    let input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    let formattedInputValue = '';
    let selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      input.value = '';
      return;
    }

    if (input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (inputNumbersValue.indexOf(inputNumbersValue[0]) > -1) {
      formattedInputValue = '+7' + ' ';
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    }

    input.value = formattedInputValue;

    form.onsubmit = function () {
      if (input.value.length < 18) {
        return false;
      } else {
        return true;
      }
    };

    modalForm.onsubmit = function () {
      if (input.value.length < 18) {
        return false;
      } else {
        return true;
      }
    };
  };

  let onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode === 8 && inputValue.length === 1) {
      e.target.value = '';
    }
  };

  let onPhonePaste = function (e) {
    let pasted = e.clipboardData || window.clipboardData;
    let input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);

    if (pasted) {
      let pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }


  // отправка текста из textarea в localStorage

  if (window.localStorage) {
    const elements = document.querySelectorAll('[name]');

    for (let i = 0, length = elements.length; i < length; i++) {
      (function (element) {
        const name = element.getAttribute('name');

        element.value = localStorage.getItem(name) || element.value;

        element.onkeyup = function () {
          localStorage.setItem(name, element.value);
        };
      })(elements[i]);
    }
  }


  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    // initModals();
    const modal = document.querySelector('.modal');
    const inputName = modal.querySelector('#modal-user-name');
    const isEscapeKey = (evt) => evt.key === 'Escape';

    const onModalEscKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        onCloseModal();
      }
    };

    const onOpenModal = ()=> {
      modal.classList.add('is-active');
      if (modal.classList.contains('is-active')) {
        inputName.focus();
      }
      document.addEventListener('keydown', onModalEscKeydown);
    };

    const onCloseModal = () => {
      modal.classList.remove('is-active');
      document.removeEventListener('keydown', onModalEscKeydown);
    };

    document.querySelector('.page-header__button').addEventListener('click', onOpenModal);

    document.querySelector('.modal__close-btn').addEventListener('click', onCloseModal);

    document.querySelector('.modal__overlay').addEventListener('click', onCloseModal);
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
