function сreateRadioBtn(element) {
    const btn = document.createElement('input');
    btn.type = 'radio';
    btn.id = 'radioBtn';
    btn.name = 'radio';
    btn.dataset.id = element.id;
    btn.dataset.swithNotification = 'radioBtn';
    return btn;
}

export function addCreatedRadioBtnInArray(array) {
    return array.map(element => сreateRadioBtn(element));
}