/**
 * utilitites
 */
var _$ = _$ || function (id) { 
    return document.getElementById(id); 
}

/**
 * RSS Feed Modal functionality.
 * 
 * Displays a modal dialog when the RSS feed link is clicked,
 * warning users that the link is for RSS readers and offering
 * to continue to the raw feed or cancel.
 */
(function () { 
    'use strict';

    // Namespace for RSS modal functionality
    var rssModal = rssModal || {};
    
    rssModal.modal = null;
    
    /**
     * modalExists
     * Checks if there is a modal currently in the DOM.
     * 
     * @returns boolean
     */
    rssModal.modalExists = function () {
        return rssModal.modal !== null && document.body.contains(rssModal.modal);
    }

    /**
     * addListeners
     * Adds event listeners to modal buttons.
     * 
     * @returns void
     */
    rssModal.addListeners = function () {

        _$('rss-modal-continue').onclick = function () {
            window.location.href = _$('rss-link').href;
        };
        _$('rss-modal-cancel').onclick = rssModal.removeModal;
    };

    /**
     * removeModal
     * Removes the modal from the DOM if it exists.
     * 
     * @returns void
     */
    rssModal.removeModal = function () {

        if (rssModal.modalExists()) {
            document.body.removeChild(rssModal.modal);
        }
    };

    /**
     *  showModal
     * Creates and displays the RSS modal.
     * 
     * @returns void
     */
    rssModal.showModal = function () {

        if (rssModal.modalExists()) {
            return;
        };

        rssModal.modal = document.createElement('div');

        rssModal.modal.className = 'rss-modal';
        rssModal.modal.id = 'rss-modal';
        rssModal.modal.innerHTML = `
            <div class="rss-inner">
                <h2>RSS Feed</h2>
                <p>This link is for RSS readers.<br />To subscribe, click continue to see the raw feed and copy the url into your reader.</p>
                <div class="rss-buttons">
                    <button class="continue" id="rss-modal-continue">Continue</button>
                    <button class="cancel" id="rss-modal-cancel">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(rssModal.modal);

        rssModal.addListeners();
    };


    // RSS Modal logic
    document.addEventListener('DOMContentLoaded', function () {

        var rssLink = _$('rss-link');

        if (rssLink) {
            rssLink.addEventListener('click', function (e) {
                
                e.preventDefault();

                // Create modal if it doesn't exist
                if (!_$('rss-modal')) {
                    rssModal.showModal();
                }
            });
        }


        // Listen for Escape key to close modal
        document.addEventListener('keydown', function escListener(e) {

            if (e.key === 'Escape' || e.key === 'Esc') {

                if (rssModal.modalExists()) {
                    rssModal.removeModal();
                }
            }
        });
    });
})();


/*
 * darkMode
 *
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

        darkMode.button.setAttribute('data-tooltip', scheme === 'dark' ? 'Light mode' : 'Dark mode');
		
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
        
        darkMode.button = _$('darkMode');  

        darkMode.button.addEventListener('click', function (e) {

            e.preventDefault();
            darkMode.toggle();
        });

        // run init to set mode on page load
        darkMode.init(); 
    });
})();


/*
 * backToTop
 *
 * Implements a "back to top" button that appears
 * when the user scrolls down the page.
 */

(function () {
    'use strict';

    // namespace for back to top functionality
    var bbt = btt || {};
        btt.scrollthreshold = 300; // pixels scrolled before showing button

    btt.button = _$('back-to-top');

    /**
     * show
     * shows the back to top button
     */
    backToTop.show = function () {
        btt.button.classList.add('visible');
    };

    /**
     * hide
     * hides the back to top button
     */
    backToTop.hide = function () {
        btt.button.classList.remove('visible');
    };


    // Listen for scroll events
    window.addEventListener('scroll', function () {

        if (window.scrollY > btt.scrollthreshold) {
            btt.show();
        } else {
            btt.hide();
        }
    });

    // Listen for click on button
    btt.button.addEventListener('click', function (e) {
       
        e.preventDefault();
       
        window.scrollTo({
            top: 0, 
            behavior: 'smooth' 
        });
    });
}())