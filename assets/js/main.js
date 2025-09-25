let blogsearch = blogsearch || {};

/**
 * findPosts
 * 
 * @param {*} query 
 * @param {*} posts 
 */
blogsearch.findPosts = function (query, posts) {

    posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) || 
      post.tags.toLowerCase().includes(query)
    );
}

/**
 * render
 * 
 * @returns string
 */
blogsearch.render = function () {

  return `
    <article class="post">
      <a class="post-thumbnail" style="background-image: url(${post.img})" href="${post.url}"></a>
      <div class="post-content">
        <h2 class="post-title"><a href="${post.url}">${post.title}</a></h2>
        <p>${post.excerpt || ''} <a href="${post.url}">Read more</a></p>
        <span class="post-date">${post.date}&nbsp;&nbsp;&nbsp;—&nbsp;</span>
      </div>
    </article>
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

      item.addClass('post');
      item.innerHTML = blogsearch.render(post);
      resultsContainer.appendChild(item);
    });
  });
});