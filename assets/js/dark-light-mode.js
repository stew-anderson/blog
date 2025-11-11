/*
 * dark-light-mode.js
 * Toggles a class on the <body>: either 'dark' or 'light'
 * Persists choice to localStorage under key 'color-scheme'
 * Initializes on DOMContentLoaded: applies stored choice if present.
 */

(function () {
    'use strict';

    // namespace for dark mode functionality
    var darkMode = darkMode || {};

    // stored value: 'dark' or 'light'
    darkMode.STORAGE_KEY = 'color-scheme'; 

    /**
     * set
     * sets the class on the body and stores the choice
     * 
     * @param {*} scheme 
     * @returns 
     */
     darkMode.set = function (scheme) {

		if (!scheme) return;

		document.body.classList.remove('dark', 'light');
		document.body.classList.add(scheme);
		
        try {
			localStorage.setItem(STORAGE_KEY, scheme);
		} catch (e) {
			// ignore storage errors (e.g., privacy mode)
            console.log(e)
		}
	};

    /**
     * get
     * gets the stored scheme
     * @returns 
     */
    darkMode.get = function () {
		
        try {
			return localStorage.getItem(STORAGE_KEY);
		} catch (e) {
			return 'light';
		}
	};

    /**
     * toggle
     * toggles between dark and light modes
     */
    darkMode.toggle = function () {

        var current = 'dark';

        if (document.body.classList.contains('dark')) {
            current = 'light';
        }

		darkMode.set(current);
    };

    /**
     * init
     * initializes dark mode on page load
     */
    darkMode.init = function () { 
        darkMode.set(darkMode.get());
	};


    // load when run
    if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () { 
            darkMode.init(); 
        });
	} else {
		darkMode.init();
	}
});