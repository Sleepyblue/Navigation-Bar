'use strict';

const body = document.querySelector('body');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const control = document.querySelector('.control');
const main = document.querySelector('.main');
const gooContainer = document.querySelector('.goo-container');
const gooPath = document.querySelector('.goo--path');
const gooRect = document.querySelector('.goo--rect');
const sections = document.querySelectorAll('.main__section');
const btns = document.querySelectorAll('.btn');
let counter = 0;
let translate;

const showSection = function (e) {
  let currentNavLinkData = e.target.dataset.link;
  let activeSection = document.querySelector('.main--show');
  let futureSection = main.querySelector(`[data-link="${currentNavLinkData}"]`);

  if (activeSection.dataset.link !== currentNavLinkData) {
    [futureSection, activeSection].forEach((section) =>
      section.classList.add('transition')
    );
    activeSection.classList.remove('main--show');
    activeSection.classList.add('main--hide');
    futureSection.classList.remove('main--hide');
    futureSection.classList.add('main--show');

    changeGooColor(futureSection);
    changeButtonsColor(futureSection);
  }
};

const changeGooColor = function (section) {
  [gooPath, gooRect].forEach((el) => {
    let sectionBg = window
      .getComputedStyle(section)
      .getPropertyValue('background-color');
    el.style.fill = sectionBg;
  });
};

const moveGoo = async function (e) {
  let svg = e.target.querySelector('.nav__link-svg');
  let svgPosition = svg.getBoundingClientRect().top;
  let svgHeight = svg.getBoundingClientRect().height;
  let gooPosition = `${svgPosition + svgHeight / 2}px`;

  gooContainer.style.top = gooPosition;
  translate = gooPosition;
};

const activeNavigationLink = function (e) {
  e.target.classList.add('active');

  navLinks.forEach((el) => {
    if (el != e.target) {
      el.classList.remove('active');
    }
  });
};

const noPointerEventsNav = function (e) {
  navLinks.forEach((el) => {
    if (el != e.target) {
      el.classList.add('no--click');
      setTimeout(function () {
        el.classList.remove('no--click');
      }, 1050);
    }
  });
};

const navigationBarPosition = function (e) {
  if (e.target.dataset.position === 'left') {
    console.log('left');

    nav.style.order = 'unset';
    main.style.order = 'unset';
    gooContainer.style.top = translate;
    gooContainer.style.removeProperty('left');
    gooContainer.style.removeProperty('right');
    gooContainer.style.removeProperty('bottom');
    gooContainer.style.removeProperty('transform');
  } else if (e.target.dataset.position === 'right') {
    console.log('right');
    nav.style.order = 2;
    main.style.order = 1;
    gooContainer.style.top = translate;
    gooContainer.style.left = 'unset';
    gooContainer.style.right = '-3.1rem';
    gooContainer.style.bottom = 'unset';
    gooContainer.style.transform = 'translateY(-50%) rotate(180deg)';
  }
};

const changeButtonsColor = function (section) {
  btns.forEach((el) => {
    let sectionBg = window
      .getComputedStyle(section)
      .getPropertyValue('background-color');
    el.style.backgroundColor = sectionBg;
  });
};

const init = function () {
  sections.forEach((section) => {
    if (section.classList.contains('main__section-2')) {
      section.classList.add('main--show');

      changeGooColor(section);
      changeButtonsColor(section);

      navLinks.forEach((link) => {
        if (link.dataset.link === section.dataset.link)
          link.classList.add('active');
      });
    } else section.classList.add('main--hide');
  });
};

init();

nav.addEventListener('click', function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  counter += 1;
  if (counter > 1) {
    counter = 0;
    return;
  }

  if (!e.target.classList.contains('nav__link--active')) noPointerEventsNav(e);

  moveGoo(e);
  activeNavigationLink(e);
  showSection(e);
});

control.addEventListener('click', function (e) {
  if (!e.target.classList.contains('btn')) return;
  navigationBarPosition(e);
});
