/*
    This file gets current date and if matches 
    specific date it will adjust colour scheme of the entire application
    1.4 => April fools (messed up colours)
    Entire December => xmas theme
*/

console.log('[AutoTheming::Status] autoTheming is loaded.');
console.log('[AutoTheming::Status] autoTheming.state: '+store.get('toggleAutoTheming'));

var $ = jQuery = require('jquery');

var date = new Date();
var day =date.getDate();
var month = (date.getMonth()+1);

var app_snowflakes = document.getElementById('snowflakes');

var app_element_text_dateTime = document.getElementById('dateTime');

if (store.get('toggleAutoTheming') === 'enabled') {
    if (month == '12') {
        console.log('[AutoTheming::Status/CurrentHoliday] Issa me, December');
        app_snowflakes.style.display = 'block';
        $(app_element_text_dateTime).addClass("christmas_gradient_anim_text");
    }
}