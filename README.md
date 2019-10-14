### Install node_module

$ npm install

### gitignore

Update this file first - remove all # from the first paragraph except assets folder (block that off) AND block _site folder (add a #) so it is uploaded to git.

### Initialise git

$ git init
$ git add .
$ git commit -m "first commit"
$ git remote add origin URL_TO_GITHUB_REPO
$ git push --set-upstream origin master

### config.yml file

Configure the \_config.yml file

### headers file

Change the url under default-src
Use this format <https://url:*>
Change the nonces for:-
favicon manifest.json in head.html
all scripts - including sub-footer script and google analyics default-layout page
add a report uri to \_headers CSP if needed
report-uri <https://davidlowerdesigns.report-uri.com/r/d/csp/enforce>;

### Robots.txt file

Remove the / from the disallow section so it can be crawled when ready for production

### cookie Policy

Make sure you include all the third party additions to the site. Currently it includes only google Analytics

### Cookie banner JS file

Change the name of createCookie section - currently named Website Cookie.