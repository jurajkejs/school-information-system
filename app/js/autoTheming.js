/*
    This file gets current date and if matches 
    specific date it will adjust colour scheme of the entire application
    1.4 => April fools (messed up colours)
    Entire December => xmas theme
*/

var $ = jQuery = require('jquery');
var autoThemingState = store.get('toggleAutoTheming');
var date = new Date();
var month = (date.getMonth() + 1);
var app_snowflakes = document.getElementById('snowflakes');
var app_element_text_dateTime = document.getElementById('dateTime');

console.log('autoTheming.init() => Loaded with following state: ' + autoThemingState)

getCurrentHoliday();

function getCurrentHoliday() {
    if (store.get('toggleAutoTheming') === 'enabled') {
        if (month == '12') {
            console.log('autoTheming.getCurrentHoliday() => Issa me, December');
            app_snowflakes.style.display = 'block';
            $(app_element_text_dateTime).addClass("christmas_gradient_anim_text");
        }
    }
}