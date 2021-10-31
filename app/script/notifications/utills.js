const modalWindow = document.querySelector('#modalWindow');
const notificationTitle = modalWindow.querySelector('#notificationTitle');
const notificationDescription = modalWindow.querySelector('#notificationDescription');

export function checkedNextElem(elem, notifications) {
    elem.checked = true;
    const checkedBtnId = elem.dataset.id;
    const notificationText = findText(notifications, checkedBtnId);
    showText(notificationText, notificationTitle, notificationDescription);
}

export function findText(array, id) {
    return array.find((item) => {
        return item.id === +id;
    });
}

export function showText(elem, containerToTitle, containerToPhrase) {
    containerToTitle.innerText = elem.title;
    containerToPhrase.innerText = elem.phrase;
}