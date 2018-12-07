const runningInDevMode = require('electron-is-dev');

var debugMessageCard = document.getElementById('debugMessageCard');
var bugOfWisdom = document.getElementById('bugOfWisdom');

var bugOfWisdomAndHisThoughts = [
    'Anxiety is like when video game combat music is playing but you can\'t find any enemies.',
    'Somebody at google was just like "yea, just have someone drive down every road on fucking earth".',
    'The sentence "Don\'t objectify women" has "women" as the object of the sentence.',
    'Watching a graduation ceremony is like sitting through a movie thats entirely end credits',
    'Your future self is talking shit about you',
    'At the age of 60, Snoop Dogg will be 420 in dog years',
    'Sunny D tastes like someone made a bet that they could make orange juice without oranges',
    'Replying "k" in morse "-.-", has the same passive aggressive tone',
    'Social anxiety is basically Conspiracy Theories about yourself.',
    'Condoms are made by automated assembly lines, meaning robots are literally helping to prevent human reproduction.',
    'Music is just flavored air',
    'Water is a beverage whose flavor is its temperature.',
]
var randomBugOfWisdomAndHisThoughts = bugOfWisdomAndHisThoughts[Math.floor(Math.random() * bugOfWisdomAndHisThoughts.length)];

bugOfWisdom.innerHTML = randomBugOfWisdomAndHisThoughts;
console.log('[*] Wake up, Neo...');

function startTime() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    // Pri month treba nechať '+1' nech neukazuje jeden mesiac späť. 
    document.getElementById('dateTime').innerHTML =
        day + "." + (month+1) + "." + year + " " + h + ":" + m + ":" + s; // DD.MM.YYYY HH:MM::SS
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

if (runningInDevMode) {
    console.log('[*] Running in dev mode');
    if (debugMessageCard.style.display === 'none') {
        debugMessageCard.style.display = 'block';
    } else {
        debugMessageCard.style.display = 'none';
    }
} else {
    console.log('[*] Running in prod mode');
}