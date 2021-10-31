import { data as notifications} from './notifications/data.js';
import { showModalWindowNotifications } from './notifications/modal.js';

const disableTipHandler = function (event) {
    if (event.target.checked) {
        localStorage.setItem('checkbox', event.target.checked);
    }
}

const shouldNotificationBeHidden = localStorage.getItem('checkbox');

if (!shouldNotificationBeHidden) {
    showModalWindowNotifications(notifications, disableTipHandler);
}