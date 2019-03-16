### Initializing jekyll to your site build

$ gem install bundler jekyll

this will install Jekyll and bundler

$ bundle update

updates all the gems for jekyll to run correctly
avoid bundle update at the moment.
netlify does not host a website properly if bundle version is higher than 1.16.0
we do not want higher than version 9 - rb-inotify (>= 0.9.7, ~> 0.9)

### headers file

Change the url under default-src
Use this format <https://url:*>
Change the nonces for favicon manifest.json in head.html and nonce for all scripts
add a report uri to \_headers CSP if needed
report-uri <https://davidlowerdesigns.report-uri.com/r/d/csp/enforce>;

### Robots.txt file

Remove the / from the disallow section so it can be crawled when ready for production
