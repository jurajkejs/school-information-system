const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const settingsStorage = new(require('electron-store'))
const Mousetrap = require('mousetrap')

/* Application defaults */
const application_defaults_appName = "Školský informačný systém"
const application_defaults_appIcon = "../assets/app.png"

/* Stored settings */
var application_storedSettings_schoolName = settingsStorage.get('schoolName')
var application_storedSettings_schoolLogo = settingsStorage.get('schoolLogoFileName')
/* Unused vars, for now. Except autoTheming */
var application_storedSettings_web_EdupageServer = settingsStorage.get('edupageServerAddress')
var application_storedSettings_web_aPages1 = settingsStorage.get('aPages1')
var application_storedSettings_web_aPages2 = settingsStorage.get('aPages2')
var application_storedSettings_web_aPages3 = settingsStorage.get('aPages3')
var application_storedSettings_app_motdInTitle = settingsStorage.get('motdInTitle')
var application_storedSettings_app_autoThemingState = settingsStorage.get('autoThemingState')

/* UI elements - App.html -> mainUI */
var application_mainUI_appIcon = document.getElementById('application__navbar_appIcon')
var application_mainUI_appTitle = document.getElementById('application__navbar_appTitle')
var application_mainUI_loaderOverlayTitle = document.getElementById('application__loaderOverlay__Text_Title')
var application_mainUI_loaderOverlaySubtitle = document.getElementById('application__loaderOverlay__Text_Substitle')
var application_mainUI_card_dateTime_innerText = document.getElementById('application__sidebar__card_dateTime')
var application_mainUI_card_classInfo_currentClassIcon = document.getElementById('application__sidebar__card_classNumber_Icon')
var application_mainUI_card_classInfo_currentClassName = document.getElementById('application__sidebar__card_classNumber_Title')
var application_mainUI_card_classInfo_upcomingClassName = document.getElementById('application__sidebar__card_classNumber_Upcomming')

/* UI elements - Additional */
var application_mainUI_snowflakes = document.getElementById('snowflakes')

/* Font Awesome icons (https://fontawesome.com/icons?d=gallery) */
var fa_smoking = "<i class='fas fa-smoking'></i>"
var fa_chalkboard_teacher = "<i class='fas fa-chalkboard-teacher'></i>"
var fa_utensils = "<i class='fas fa-utensils'></i>"
var fa_cookie_bite = "<i class='fas fa-cookie-bite'></i>"
var fa_surprise = '<i class="far fa-surprise"></i>'
var fa_coffee_mug = '<i class="fas fa-mug-hot"></i>'
var fa_bed = '<i class="fas fa-bed"></i>'

/* Files, URLs */
var application_internals_url_settings = 'file://' + __dirname + '/Settings.html'
var application_internals_url_wiki = 'https://www.github.com/ttomovcik/school-information-system/wiki'

setTimeout(function () {
    applicationStartup()
}, 500)

/*
    Function: getCurrentDateTime()
    ==============================
    Check current time and return it's values as array. Following variables will be returned:
        [0] day     [1] month   [2] year
        [3] hour    [4] minute  [5] second
*/
function getCurrentDateTime() {
    var date = new Date();
    var day = date.getDate();
    var month = (date.getMonth() + 1); // Add +1 to returned month. Reason: returned values start from 0
    var year = date.getFullYear();
    var hour = prettifyLTTValues(date.getHours());
    var minute = prettifyLTTValues(date.getMinutes());
    var second = prettifyLTTValues(date.getSeconds());
    //     [ 0  ,  1  ,   2  ,  3 ,   4   ,   5   ]
    return [day, month, year, hour, minute, second];
};

/*
    Function: showCurrentDateTimeInMainUI()
    =======================================
    Self-explanatory. Shows current date and time in main UI.
*/
function showCurrentDateTimeInMainUI() {
    var cdt = getCurrentDateTime()[0] + '.' +
        getCurrentDateTime()[1] + '.' +
        getCurrentDateTime()[2] + ' ' +
        getCurrentDateTime()[3] + ':' +
        getCurrentDateTime()[4]
    application_mainUI_card_dateTime_innerText.innerHTML = cdt
    setInterval(function () {
        application_mainUI_card_dateTime_innerText.innerHTML = cdt
    }, 10000)
}

/*
    Function: prettifyLTTValues()
    ============================
    Takes value as an input and checks if the input value is <10. If yes, adds zero before the value.
*/
function prettifyLTTValues(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i
};

/*
    Function: applicationStartup()
    ==============================
    This will be called every time the app starts, hence the name.
*/
function applicationStartup() {
    console.log('[mainUI::applicationStartup] Starting at: ' + getCurrentDateTime()[0] + '.' +
        getCurrentDateTime()[1] + '.' +
        getCurrentDateTime()[2] + ' ' +
        getCurrentDateTime()[3] + ':' +
        getCurrentDateTime()[4])
    console.log('======================================================================')

    // Set application name
    console.log('[mainUI::applicationStartup] Setting up: schoolName')
    if (application_storedSettings_schoolName == '*' || application_storedSettings_schoolName == '') {
        application_mainUI_appTitle.innerHTML = application_defaults_appName
    } else {
        application_mainUI_appTitle.innerHTML = application_storedSettings_schoolName
    }

    // Set application icon (school logo)
    console.log('[mainUI::applicationStartup] Setting up: schoolLogo')
    if (!application_storedSettings_schoolLogo == '*' || !application_storedSettings_schoolLogo == '') {
        application_mainUI_appIcon.src = application_storedSettings_schoolLogo
    }

    // Keyboard shortcuts
    // Settings
    console.log('[mainUI::applicationStartup] Setting up: Mousetrap')
    Mousetrap.bind(['command+n', 'ctrl+n'], function () {
        let settingsWindow;
        settingsWindow = new BrowserWindow({
            width: 800,
            height: 600,
        });
        settingsWindow.on('close', function () {
            settingsWindow = null
        });
        settingsWindow.setMenuBarVisibility(false);
        settingsWindow.loadURL(application_internals_url_settings);
        settingsWindow.show();
        if (runningInDevMode) {
            settingsWindow.webContents.openDevTools();
        }
    })

    // Wiki
    Mousetrap.bind('?', function () {
        electron.shell.openExternal(application_internals_url_wiki)
    })

    // Show current lesson (or break.)
    console.log('[mainUI::applicationStartup] Setting up: showLessonState()')
    showLessonState()

    // Show current date and time
    console.log('[mainUI::applicationStartup] Setting up: showCurrentDateTimeInMainUI()')
    showCurrentDateTimeInMainUI()

    // autoTheming
    console.log('[mainUI::applicationStartup] Setting up: startAutoTheming()')
    startAutoTheming()

    // Remove blur from wrapper and finish loading
    application_mainUI_loaderOverlayTitle.innerHTML = 'Prebieha dokončovanie spúšťania'
    application_mainUI_loaderOverlaySubtitle.innerHTML = 'Čaká sa na dokončenie zvyšných procesov'

    console.log('======================================================================')
    console.log('[mainUI::applicationStartup] Startup finished at: ' + getCurrentDateTime()[0] + '.' +
        getCurrentDateTime()[1] + '.' +
        getCurrentDateTime()[2] + ' ' +
        getCurrentDateTime()[3] + ':' +
        getCurrentDateTime()[4])

    // ...but the loading screen looks kinda nice
    setTimeout(function () {
        application__loaderOverlay.style.display = 'none'
        $('#wrapper').removeClass('blur')
    }, 3000)
};

/*
    Function: showLessonState()
    ==========================
    Checks what lesson is ongoing (if any) and sets it's value in the main UI.
    TODO: Add option to customize in settings.
*/
function showLessonState() {
    var currentHourMinutes = getCurrentDateTime()[3] + '' + getCurrentDateTime()[4];
    setInterval(function () {
        showLessonState()
    }, 60000)
    switch (true) {
        case (currentHourMinutes < 0700):
            // c_null
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_surprise + ' ' + fa_coffee_mug
            application_mainUI_card_classInfo_currentClassName.innerHTML = 'Dobré ráno'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = 'Vyučovanie začína o 7:00'
            break;
        case (currentHourMinutes < 0745):
            // c0
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_chalkboard_teacher
            application_mainUI_card_classInfo_currentClassName.innerHTML = '0. hodina'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 0750):
            // c0 - b5 => c1
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_smoking
            application_mainUI_card_classInfo_currentClassName.innerHTML = '5-minútová prestávka'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 0835):
            // c1
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_chalkboard_teacher
            application_mainUI_card_classInfo_currentClassName.innerHTML = '1. hodina'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 0840):
            // c1 - b5 => c2
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_cookie_bite + ' ' + fa_smoking
            application_mainUI_card_classInfo_currentClassName.innerHTML = '5-minútová prestávka'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 0925):
            // c2
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_chalkboard_teacher
            application_mainUI_card_classInfo_currentClassName.innerHTML = '2. hodina'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 0935):
            // c2 - b10 => c3
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_cookie_bite
            application_mainUI_card_classInfo_currentClassName.innerHTML = '10-minútová prestávka'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1020):
            // c3
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_chalkboard_teacher
            application_mainUI_card_classInfo_currentClassName.innerHTML = '3. hodina'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1030):
            // c3 - b10 => c4
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_cookie_bite
            application_mainUI_card_classInfo_currentClassName.innerHTML = '10-minútová prestávka'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1115):
            // c4
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_chalkboard_teacher
            application_mainUI_card_classInfo_currentClassName.innerHTML = '4. hodina'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1120):
            // c4 - b5 => c5
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_smoking
            application_mainUI_card_classInfo_currentClassName.innerHTML = '5-minútová prestávka'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1205):
            // c5
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_chalkboard_teacher
            application_mainUI_card_classInfo_currentClassName.innerHTML = '5. hodina'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1240):
            // c5 - b30 => c6
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_utensils
            application_mainUI_card_classInfo_currentClassName.innerHTML = '30-minútová prestávka'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1325):
            // c6
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_chalkboard_teacher
            application_mainUI_card_classInfo_currentClassName.innerHTML = '6. hodina'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1330):
            // c6 - b5 => c7
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_cookie_bite + ' ' + fa_cookie_bite
            application_mainUI_card_classInfo_currentClassName.innerHTML = '5-minútová prestávka'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        case (currentHourMinutes < 1415):
            // c7
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_chalkboard_teacher
            application_mainUI_card_classInfo_currentClassName.innerHTML = '7. hodina'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = ''
            break;
        default:
            // null. Just show error or some shit.
            application_mainUI_card_classInfo_currentClassIcon.innerHTML = fa_bed
            application_mainUI_card_classInfo_currentClassName.innerHTML = 'Koniec vyučovania'
            application_mainUI_card_classInfo_upcomingClassName.innerHTML = 'You can\'t rest while enemies are nearby'
    };
};

/*
    Function: startAutoTheming()
    ======================================
    Starts the autoTheming function if enabled in settings.
*/
function startAutoTheming() {
    var cm = getCurrentDateTime()[1]
    if (application_storedSettings_app_autoThemingState === 'enabled') {
        switch (true) {
            case (cm == '12'):
                application_mainUI_snowflakes.style.display = 'block'
                $('#application__sidebar__card_dateTime_container').addClass('border-success')
                $('#application__sidebar__card_classNumber_container').addClass('border-warning')
                $('#application__sidebar__card_weather_container').addClass('border-danger')
                break;
            default:
                break;
        }
    }
};

/*
    Function: showSubstitutionForNextDay()
    ======================================
    Edupage only. Clicks in substitution for next day if available.
*/
function showSubstitutionForNextDay() {
    var currentDate_ep = getCurrentDateTime()[0] + '.' + getCurrentDateTime()[1] + '.'
    // Think twice about this you fag. 
    // Google: click div from remote website inside webiew.
}

/*
    Function: loadWebPages()
    ========================
    Loads stored edupage server address and 3 additional ones, 
    and keeps loading each one after like 10 seconds
*/
function loadWebPages() {}

/*
    Function: getDebugData()
    ========================
    Logs to console every stored value, function returns and version info.
*/
function getDebugData() {
    console.log(
        "application_defaults_appName: " + application_defaults_appName + "\n" +
        "application_defaults_appIcon: " + application_defaults_appIcon + "\n"
    )
};