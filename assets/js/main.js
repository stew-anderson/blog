/**
 * main.js
 * 
 * RSS Feed Modal functionality.
 * 
 * Displays a modal dialog when the RSS feed link is clicked,
 * warning users that the link is for RSS readers and offering
 * to continue to the raw feed or cancel.
 */
(function() { 
    'use strict';

    // Namespace for RSS modal functionality
    var rssModal = rssModal || {},
        _$ = function (id) { 
            return document.getElementById(id); 
        };
    
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