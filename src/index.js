const fetch = require('node-fetch');

/**
 * Solve a Captcha using 2captcha.
 * @param {Object} options Method options.
 * @param {number} [options.MAX_ATTEMPTS=10] Max attempts to call the 2captcha API to find the captcha result. 
 * @param {number} [options.DELAY=30000] Delay between calls to 2captcha API, defaults to 30 seconds (30,000)
 * @param {string} options.URL The URL of the page with Captcha on it.
 * @param {string} options.CAPTCHA_KEY The Captcha's key (in the Captcha URL, it is the ``k`` searchParam).
 * @param {string} options.CAPTCHA_API_KEY Your 2captcha API key.
 * @param {boolean} [options.DEBUG=false] Show debug messages in console (defaults to false).
 * @returns {Promise<string|null>} The key needed to bypass the Captcha. Read 2captcha API docs on how to use this key.
 */
const solveCaptcha = async ({ MAX_ATTEMPTS = 10, DELAY = 30000, URL, CAPTCHA_KEY, CAPTCHA_API_KEY, DEBUG = false } = {}) => {
    const reqURL = `https://2captcha.com/in.php?key=${CAPTCHA_API_KEY}&method=userrecaptcha&googlekey=${CAPTCHA_KEY}&pageurl=${URL}&json=1`;
    const res = await fetch(reqURL);
    const { status, request } = await res.json();
    if(DEBUG) console.log('Sent initial request to 2captcha, received status %d.', status);

    let text;
    while(!text && MAX_ATTEMPTS > 0) {
        if(DEBUG) console.log('No result yet, waiting 30 seconds.');
        await delay(DELAY);

        text = await (await fetch(format('https://2captcha.com/res.php?key=%s&id=%s&action=get', captcha, request))).text();
        text = text === 'CAPCHA_NOT_READY' || text.substring(0, 3) !== 'OK|' ? null : text;
    }

    return MAX_ATTEMPTS === 0 ? null : text.substring(3);
}

/**
 * Halt program execution for ``ms`` milliseconds.
 * @param {number} ms Milliseconds to delay.
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = solveCaptcha;