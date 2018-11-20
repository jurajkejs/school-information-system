/* SELF-NOTE
Treba zmeniť async funkciu 'switchHTML' z html súborov (alebo odkazov) na novú:
  získať údaje pri prvom spustení a potom ich pridať to app_renderer.js, neskôr z nastavení
        1. Prvé spustenie -> electron-store pre websiteArray
            - pridať pri ukladaní nastavení array websiteArray do app_renderer.js (alebo hneď?!)
        2. electron-store hodnotu 1 pre firstTimeRunFinished  
        3. Po zmene adries v nastaveniach -> regex na websiteArray a prepísať hodnoty, a uložiť do config
        
        tags: webview, html, array, help_me */

const fs = require('fs');
const {
    promisify
} = require('util');
const path = require('path');
const readFile = promisify(fs.readFile);
const htmlArray = [
    'https://www.spspb.edupage.org/substitution',
    ''
];
let index = 0;

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
    document.getElementById('date_time').innerHTML =
        day + "." + month + "." + year + " " + h + ":" + m + ":" + s; // DD.MM.YYYY HH:MM
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

setInterval(switchHTML, 5000);

async function switchHTML() {
    if (index > 4) {
        index = 0;
    }
    const html = htmlArray[index];
    index++;
    const render = await readFile(path.join(__dirname, html), 'utf-8');
    const parser = new DOMParser();
    const childernArray = parser.parseFromString(render, 'text/html').querySelector('body').childNodes;
    const frag = document.createDocumentFragment();
    childrenArray.forEach(item => {
        frag.appendChild(item);
    });
    document.body.appendChild(frag);
};