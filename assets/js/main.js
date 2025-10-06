(function() { 

    var blogsearch = blogsearch || {};

    /**
     * findPosts
     * Checks title, description, excerpt, and tags for matches
     * 
     * @param {*} query 
     * @param {*} posts 
     * @return array
     */
    blogsearch.findPosts = function (query, posts) {

        return posts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query) || 
            post.tags.toLowerCase().includes(query)
        );
    }

    /**
     * truncateWords
     * Truncates a string to n words, adding ellipsis if needed.
     * 
     * @param {*} str
     * @param {*} n
     * @return string
     */
    blogsearch.truncateWords = function (str, n) {
        const words = str.split(' ');

        return (words.length > n) ? words.slice(0, n).join(' ') + '...' : str;
    }

    /**
     * formatDate
     * Formats a date string as 'MMM DD, YYYY'.
     * 
     * @param {*} dateStr
     * @return string
     */
    blogsearch.formatDate = function (dateStr) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateStr);

        return date.toLocaleDateString(undefined, options);
    }

    /**
     * render
     * Generates HTML markup for a single post result
     * 
     * @returns string
     */
    blogsearch.render = function (post) {

        return `
            <a class="post-thumbnail" style="background-image: url(/assets/img/${post.img})" href="${post.url}"></a>
            <div class="post-content">
                <h2 class="post-title"><a href="${post.url}">${post.title}</a></h2>
                <p>${blogsearch.truncateWords(post.excerpt, 22) || ''} <a href="${post.url}">Read more</a></p>
                <span class="post-date">${blogsearch.formatDate(post.date)}&nbsp;&nbsp;&nbsp;—&nbsp</span>
                <span class="post-words">${post.words} minute read</span>
            </div>
            `;
    }

    /**
     * Wait for DOM to be ready before initializing search
     */
    document.addEventListener('DOMContentLoaded', function () {
        // Get references to input and results container
        const searchInput = document.getElementById('search-input');
        const resultsContainer = document.getElementById('search-results');
        let posts = [];

        // Fetch post data from search.json
        fetch('/search.json')
            .then(response => response.json())
            .then(data => posts = data);

        // Listen for input events on the search field
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();

            resultsContainer.innerHTML = '';

            // Only search if query is at least 2 characters
            if (query.length < 2) return;

            const filtered = blogsearch.findPosts(query, posts);

            // Render each matching post
            filtered.forEach(post => {
                const item = document.createElement('article');

                item.classList.add('post');
                item.innerHTML = blogsearch.render(post);
                resultsContainer.appendChild(item);
            });
        });
    });
})();