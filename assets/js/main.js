(function() { 

    // RSS Modal logic
    document.addEventListener('DOMContentLoaded', function () {
        var rssLink = document.getElementById('rss-link');

        if (rssLink) {
            rssLink.addEventListener('click', function (e) {
                e.preventDefault();

                console.log('RSS link clicked');

                // Create modal if it doesn't exist
                if (!document.getElementById('rss-modal')) {
                    var modal = document.createElement('div');

                    modal.className = 'rss-modal';
                    modal.id = 'rss-modal';
                    modal.innerHTML = `
                        <div class="rss-inner">
                            <h2>RSS Feed</h2>
                            <p>This link is for RSS readers.<br />To subscribe, copy this link into your reader.<br /><br />Would you like to view the raw feed?</p>
                            <div class="rss-buttons">
                                <button class="continue" id="rss-modal-continue">Continue</button>
                                <button class="cancel" id="rss-modal-cancel" >Cancel</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);

                    // Button event listeners once appended to DOM
                    document.getElementById('rss-modal-continue').onclick = function() {
                        window.location.href = rssLink.href;
                    };
                    document.getElementById('rss-modal-cancel').onclick = function() {
                        document.body.removeChild(modal);
                    };
                }
            });
        }
    });
})();