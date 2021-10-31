import { addCreatedRadioBtnInArray } from './button.js';

import { checkedNextElem, showText } from './utills.js';

const modalWindow = document.querySelector('#modalWindow');
const btnCloseModalWindow = modalWindow.querySelector('#btnClose');
const containerRadioBtn = modalWindow.querySelector('#containerRadioBtn');
const arrowLeft = modalWindow.querySelector('#arrowLeft');
const arrowRight = modalWindow.querySelector('#arrowRight');
const checkBox = modalWindow.querySelector('#checkBox');
const notificationTitle = modalWindow.querySelector('#notificationTitle');
const notificationDescription = modalWindow.querySelector('#notificationDescription');
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';
const ESCAPE_KEY = 'Escape';
const HIDDEN_CSS_CLASS = 'hidden';
const firstDataNatificationToStart = {
    'title': 'custom title', "phrase": 'custom description'
};
let checkedBtn;

export function showModalWindowNotifications(notifications, disableTipHandler) {

    function checkRadioBtnToStart() {
        if (notifications.length) {
            containerRadioBtn.append(...addCreatedRadioBtnInArray(notifications));
            checkedBtn = containerRadioBtn.firstElementChild;
            containerRadioBtn.firstElementChild.checked = true;
            showText(notifications[0], notificationTitle, notificationDescription);
        } else if (!notifications.length) {
            showText(firstDataNatificationToStart, notificationTitle, notificationDescription);
            arrowLeft.classList.add(HIDDEN_CSS_CLASS);
            arrowRight.classList.add(HIDDEN_CSS_CLASS);
        }
    }

    function switchNextElement(element) {
        checkedBtn = element;
        checkedNextElem(checkedBtn, notifications);
    }

    function addEventListenerArrowRight() {
        const nextElement = containerRadioBtn.lastElementChild.checked ?
            containerRadioBtn.firstElementChild : checkedBtn.nextSibling;
        switchNextElement(nextElement, notifications);
    }

    function addEventListenerArrowLeft() {
        const nextElement = containerRadioBtn.firstElementChild.checked ?
            containerRadioBtn.lastElementChild : checkedBtn.previousSibling;
        switchNextElement(nextElement, notifications);
    }

    function addEventListenerKeyDown(event) {
        if (event.code === ARROW_RIGHT_KEY) {
            const nextElement = containerRadioBtn.lastElementChild.checked ?
                containerRadioBtn.firstElementChild : checkedBtn.nextSibling;
            switchNextElement(nextElement, notifications);
        } else if (event.code === ARROW_LEFT_KEY) {
            const nextElement = containerRadioBtn.firstElementChild.checked ?
                containerRadioBtn.lastElementChild : checkedBtn.previousSibling;
            switchNextElement(nextElement, notifications);
        } else if (event.code === ESCAPE_KEY) {
            closeModalWindow();
        }
    }

    function closeModalWindow() {
        modalWindow.classList.add(HIDDEN_CSS_CLASS);
        window.removeEventListener('keydown', addEventListenerKeyDown);
        arrowRight.removeEventListener('click', addEventListenerArrowRight);
        arrowLeft.removeEventListener('click', addEventListenerArrowLeft);
    }

    checkBox.addEventListener('click', (event) => {
        disableTipHandler(event);
    });

    containerRadioBtn.addEventListener('click', (event) => {
        if (event.target.dataset.swithNotification === 'radioBtn') {
            checkedNextElem(event.target, notifications);
            checkedBtn = event.target;
        }
    });

    arrowRight.addEventListener('click', () => {
        addEventListenerArrowRight();
    });

    arrowLeft.addEventListener('click', () => {
        addEventListenerArrowLeft();
    });

    window.addEventListener('keydown', addEventListenerKeyDown);

    btnCloseModalWindow.addEventListener('click', () => {
        closeModalWindow();
    });

    modalWindow.classList.remove(HIDDEN_CSS_CLASS);

    checkBox.checked = false;

    checkRadioBtnToStart(notifications);
}