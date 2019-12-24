# 2captcha-simple-solver
 simple 2captcha solver

# Example
```js
const Solver = require('2captcha-simple-solver');
// ...
const key = await Solver(OPTIONS);
// use key to solve Captcha
```

# Options
 * @param {Object} options Method options.
 * @param {number} [options.MAX_ATTEMPTS=10] Max attempts to call the 2captcha API to find the captcha result. 
 * @param {number} [options.DELAY=30000] Delay between calls to 2captcha API, defaults to 30 seconds (30,000)
 * @param {string} options.URL The URL of the page with Captcha on it.
 * @param {string} options.CAPTCHA_KEY The Captcha's key (in the Captcha URL, it is the ``k`` searchParam).
 * @param {string} options.CAPTCHA_API_KEY Your 2captcha API key.
 * @param {boolean} [options.DEBUG=false] Show debug messages in console (defaults to false).
 * @returns {Promise<string|null>} The key needed to bypass the Captcha. Read 2captcha API docs on how to use this key.