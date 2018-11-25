/* SELF-NOTE
Treba zmeniť async funkciu 'switchHTML' z html súborov (alebo odkazov) na novú:
  získať údaje pri prvom spustení a potom ich pridať to app_renderer.js, neskôr z nastavení
        1. Prvé spustenie -> electron-store pre websiteArray
            - pridať pri ukladaní nastavení array websiteArray do app_renderer.js (alebo hneď?!)
        2. electron-store hodnotu 1 pre firstTimeRunFinished  
        3. Po zmene adries v nastaveniach -> regex na websiteArray a prepísať hodnoty, a uložiť do config
        
        tags: webview, html, array, help_me */

function startTime() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    m = checkTime(minute);
    s = checkTime(second);
    document.getElementById('date_time').innerHTML =
        day + "." + month + "." + year + " " + hour + ":" + minute + ":" + second; // DD.MM.YYYY HH:MM
    setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}