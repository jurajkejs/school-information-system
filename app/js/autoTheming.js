var $ = jQuery = require('jquery');
var autoThemingState = store.get('toggleAutoTheming');
var date = new Date();
var month = (date.getMonth() + 1);
var app_snowflakes = document.getElementById('snowflakes');
var app_element_text_dateTime = document.getElementById('dateTime');
var app_element_card_dateTime = document.getElementById('card_dateTime');
var app_element_card_weather = document.getElementById('card_weather');

console.log('[*] Loaded autoTheming with following state: ' + autoThemingState)

getCurrentHoliday();

function getCurrentHoliday() {
    if (store.get('toggleAutoTheming') === 'enabled') {
        if (month == '12') {
            app_snowflakes.style.display = 'block';
            $(app_element_text_dateTime).addClass('christmas_gradient_anim_text');
            $(app_element_card_dateTime).addClass('border-danger');
            $(app_element_card_weather).addClass('border-success');
        }
    }
}