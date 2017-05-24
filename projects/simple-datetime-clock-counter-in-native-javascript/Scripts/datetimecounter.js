window.onload = function () {
    var day = document.getElementById('day');
    var month = document.getElementById('month');
    var year = document.getElementById('year');

    var hour = document.getElementById('hour');
    var minute = document.getElementById('minute');

    function startTime(previous) {
        var today = new Date();

        if (previous.getDate() !== today.getDate()) {
            // do something previous date isn't equal to current date
        }

        day.value = today.getDate();
        month.value = today.getMonth() + 1; //getMonth is zero based
        year.value = today.getFullYear();

        hour.value = today.getHours();
        minute.value = today.getMinutes();
        second.value = today.getSeconds();

        var t = setTimeout(startTime.bind(this, today), 500);
    }
    startTime(new Date());
}