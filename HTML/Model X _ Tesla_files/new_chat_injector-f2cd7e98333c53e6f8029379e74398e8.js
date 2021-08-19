const loadDynamicScript = (url, callback) => {
    const script = document.createElement('script');
    script.src = url;
    script.setAttribute('defer', '');
    document.body.appendChild(script);
    script.onload = () => {
        if (callback) callback();
    };
};
const loadDynamicStylesheet = (url) => {
    var link = document.createElement('link');
    link.href = url;
    link.type = 'text/css';
    link.rel = 'stylesheet';

    document.getElementsByTagName('head')[0].appendChild(link);
};

document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget';
    document.body.classList.add("twilio-button-hide-mobile");
    document.body.appendChild(chatWidget);

    loadDynamicStylesheet('/app-assets/tesla-react-chat-tds4/styles.min.css');

    loadDynamicScript('/app-assets/tesla-react-chat-tds4/vendor.min.js', () => {
        loadDynamicScript('/app-assets/tesla-react-chat-tds4/vendor-react.min.js', () => {
            loadDynamicScript('/app-assets/tesla-react-chat-tds4/main.min.js', () => {
                const chatServiceHost = '/conversation/check-availability';
                let locale = 'en';
                if (
                    typeof window.Tesla !== 'undefined' &&
                    typeof window.Tesla.locale !== 'undefined'
                ) {
                    locale = window.Tesla.locale.toLowerCase();
                }
                if (locale === 'en') {
                    locale = 'en_us';
                }
                const config =  {
                        url: chatServiceHost,
                        typeOfPage: 'Sales',
                        locale,
                        logo: 'https://www.tesla.com/app-assets/img/tsla_logo.svg',
                        callbackFormUrlId: `179|${window.Tesla.locale.toLowerCase()}`,
                        callbackFormEnabled: true,
                    };
                  
                const teslaChat = new window.ChatWidget(null,
                    (err) => {
                        // eslint-disable-next-line no-console
                        console.warn('Chat init error', err);
                    }, config, 'chat-widget');
            });
        });
    });
});