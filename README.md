
# Stew Anderson's Tech Blog: Code to Boardroom

Welcome to the source code for Stew Anderson's personal tech blog, where engineering meets leadership. This site hosts articles on technology, business strategy, automation, and scaling teams.

**Live Site:** [stew.andersonuk.org](https://stew.andersonuk.org)

---

## Project Overview

This blog is built with Jekyll and uses Gulp for asset management and automation. It features:
- Long-form technical and leadership articles
- Custom styles with Sass
- Automated image optimisation
- Fast local development with BrowserSync

## Technologies Used

- Jekyll (static site generator)
- Gulp (task runner)
- Sass (CSS preprocessor)
- Autoprefixer
- BrowserSync
- Imagemin

## Getting Started

### Prerequisites
- Ruby & Bundler (for Jekyll)
- Node.js & npm (for Gulp and frontend tooling)

### Installation
1. Clone the repository:
	```sh
	git clone https://github.com/stew-anderson/blog.git
	cd blog
	```
2. Install Ruby dependencies:
	```sh
	bundle install
	```
3. Install Node.js dependencies:
	```sh
	npm install
	```

### Running Locally
To build and serve the site locally with live reload:
```sh
npm run gulp
```
Or, for Jekyll only:
```sh
bundle exec jekyll serve --baseurl=""
```

## Contact

- [LinkedIn](https://www.linkedin.com/in/stewart-anderson-095bb634/)

---