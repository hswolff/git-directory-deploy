# git-directory-deploy

Easily deploy a directory to a git branch. Primarily of value when deploying to GitHub pages, however this module makes no hard-coded assumption as to what branch you want to deploy to.


## Installation

```shell
npm install -g @hswolff/git-directory-deploy
```

## Setup

`git-directory-deploy` makes one assumption about your git repo when you use it. Namely that the `src` folder is in your `.gitignore` file. Usually this is content that is derived from source files, and as such tends to be .gitignored'd.


## Usage

This tool can be used via the CLI or programmatically. The options that you can set for either usage are the same.

[Documentation for all options can be found in the source code.](index.js)

### Example CLI Usage

```shell
gdd # uses all default options
gdd --verbose # show's verbose output
gdd --branch master --src _site --remote origin # passing in values
```

### Example CLI Usage

```javascript
var gdd = require('@hswolff/git-directory-deploy');

gdd({
  verbose: true,
  branch: 'master',
  src: '_site'
});
```


## Acknowledgements

This project was directly inspired by a couple of projects that did almost what I wanted, but not exactly what I needed. I'd like to give thanks to them for serving as a guiding light for this project.

* [angular-cli-github-pages](https://github.com/IgorMinar/angular-cli-github-pages)
 (and by extension [ember-cli-github-pages](https://github.com/poetic/ember-cli-github-pages))

* [git-directory-deploy](https://github.com/X1011/git-directory-deploy)

* [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages)