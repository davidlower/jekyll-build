### Initializing jekyll to your site build

$ gem install bundler jekyll

this will install Jekyll and bundler

$ bundle update

updates all the gems for jekyll to run correctly
NOT SURE THIS STEP NEEDS TO BE DONE ANYMORE

### Install node_module

$ npm install

### gitignore

Update this file first - remove all # from the first paragraph of files.

### headers file

Change the url under default-src
Use this format <https://url:*>
Change the nonces for favicon manifest.json in head.html and nonce for all scripts - including sub-footer script and default-layout page
add a report uri to \_headers CSP if needed
report-uri <https://davidlowerdesigns.report-uri.com/r/d/csp/enforce>;

### Robots.txt file

Remove the / from the disallow section so it can be crawled when ready for production

### cookie Policy

Make sure you include all the third party additions to the site. Currently it includes only google Analytics
