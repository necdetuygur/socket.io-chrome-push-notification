document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        return;
    }
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});

function NotificationOpen(data) {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    } else {
        var notification = new Notification(data.title, {
            icon: data.icon,
            body: data.text
        });
        notification.onclick = function () {
            window.open(data.url);
        };
    }
};