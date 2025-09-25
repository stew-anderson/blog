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

    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) || 
      post.tags.toLowerCase().includes(query)
    );

    filtered.forEach(post => {
      const item = document.createElement('div');

      item.innerHTML = '<a href="${post.url}">${post.title} | ${post.date} | ${post.excerpt}</a>';
      resultsContainer.appendChild(item);
    });
  });
});