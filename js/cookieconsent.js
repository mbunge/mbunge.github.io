import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0-rc.17/dist/cookieconsent.umd.js';

// Enable dark mode
document.documentElement.classList.add('cc--darkmode');

function createCookieConsentEvent(category, consent) {
    return new CustomEvent('app:cookieConsent:' + category, {consent: consent});
}

window.addEventListener('cc:onConsent', ({detail}) => {
    console.log('Consented', detail);
    changedCategories.forEach(function(category) {
        window.dispatchEvent(createCookieConsentEvent(category, CookieConsent.acceptedCategory(category)));
    });
});

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "box wide",
            position: "bottom left",
            equalWeightButtons: false,
            flipButtons: true
        },
        preferencesModal: {
            layout: "bar",
            position: "left",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        functionality: {},
        analytics: {}
    },
    language: {
        default: "en",
        autoDetect: "browser",
        translations: {
            en: {
                consentModal: {
                    title: "Hello traveller, it's cookie time!",
                    description: "We implement essential cookies to ensure our website operates smoothly, and to gather anonymous data regarding your session. You have the option to disable these essential cookies through your browser's settings. Additionally, we deploy optional cookies to tailor the content and advertisements, enable social media interactions, and scrutinize web traffic for optimizing the user experience. This includes analyzing website usage to enhance the overall user experience.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    showPreferencesBtn: "Manage preferences",
                    footer: "<a href=\"/privacy-policy.html\">Privacy Policy</a>"
                },
                preferencesModal: {
                    title: "Consent Preferences Center",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close modal",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "Cookie Usage",
                            description: "We implement essential cookies to ensure our website operates smoothly, and to gather anonymous data regarding your session. You have the option to disable these essential cookies through your browser's settings. Additionally, we deploy optional cookies to tailor the content and advertisements, enable social media interactions, and scrutinize web traffic for optimizing the user experience. This includes analyzing website usage to enhance the overall user experience."
                        },
                        {
                            title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                            description: "These cookies are essential for the website's proper functionality and do not store personally identifiable information. Typically set in response to user actions, they enable critical features like maintaining login details or privacy settings. Generally, these cookies cannot be turned off, but some browsers might block or alert you about them. Be aware that blocking these cookies may affect the website's functionality.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Functionality Cookies",
                            description: "These cookies enhance the user experience by offering expanded functionality, such as personalization or display specialized data, like decks or magic cards. If these cookies are disabled, some or all of these features may be impaired.",
                            linkedCategory: "functionality"
                        },
                        {
                            title: "Analytics Cookies",
                            description: "These cookies gather anonymous, aggregated data, helping us identify our most popular pages and content to enhance our website and user experience. Disabling these cookies hinders our efforts to continually improve our products and services.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "More information",
                            description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"/about.html\">contact me</a>."
                        }
                    ]
                }
            }
        }
    }
});