console.log('[App::Debug] Wake up, Neo...');

function startTime() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('dateTime').innerHTML =
        day + "." + month + "." + year + " " + h + ":" + m + ":" + s; // DD.MM.YYYY HH:MM
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })