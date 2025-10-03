(function() { 

    var blogsearch = blogsearch || {};

    /**
     * findPosts
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
     * 
     */
    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('search-input');
        const resultsContainer = document.getElementById('search-results');
        let posts = [];

        fetch('/search.json')
            .then(response => response.json())
            .then(data => posts = data);

        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();

            resultsContainer.innerHTML = '';

            if (query.length < 2) return;

            const filtered = blogsearch.findPosts(query, posts);

            filtered.forEach(post => {
            const item = document.createElement('article');

            item.classList.add('post');
            item.innerHTML = blogsearch.render(post);
            resultsContainer.appendChild(item);
            });
        });
    });
})();