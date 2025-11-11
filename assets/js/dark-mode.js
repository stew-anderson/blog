/*
 * dark-light-mode.js
 * Toggles a class on the <body>: either 'dark' or 'light'
 * Persists choice to localStorage under key 'color-scheme'
 * Initializes on DOMContentLoaded: applies stored choice if present.
 */

(function () {
    'use strict';

    // namespace for dark mode functionality
    var darkMode = darkMode || {},
        STORAGE_KEY = 'color-scheme'; // stored value: 'dark' or 'light'

    /**
     * set
     * sets the class on the body and stores the choice
     * 
     * @param {*} scheme 
     * @returns 
     */
     darkMode.set = function (scheme) {

        var bodyclass = document.body.classList;

		if (!scheme) return;

		bodyclass.remove('dark', 'light');
		bodyclass.add(scheme);
		
        try {
			localStorage.setItem(STORAGE_KEY, scheme);
		} catch (e) {
			// ignore storage errors (e.g., privacy mode)
		}
	};

    /**
     * get
     * gets the stored scheme
     * @returns 
     */
    darkMode.get = function () {
		
        try {
			return localStorage.getItem(STORAGE_KEY) || 'light';
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
    document.addEventListener('DOMContentLoaded', function () { 
        
        var toggleButton;

        toggleButton = document.getElementById('darkMode');  

        toggleButton.addEventListener('click', function (e) {

            e.preventDefault();
            darkMode.toggle();
        });

        // run init to set mode on page load
        darkMode.init(); 
    });
})();