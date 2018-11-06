# React Boilerplate
## SRC
### index.jsx
index.jsx is the entry for our app, it is what will be injected into the .html file that **Webpack** generates using our template index.html file, it is better to keep this one simple.
### index.html
This file will be used as a template for the generated html file of the website, which **webpack** takes care of.
### app.jsx
this is where the root of our app lives, where we apply wrappers(things that propagate props to all components that need them), initiate connections to **DB**s, start **service workers**, **routers**, **internalisation**, **theming** and whatever else we need.
### i18n/{lang}.js
JS files containing the keys: values for translated values in our app.
### components/routing/current-route.jsx
this is where the routing is handled, for a specific url, we display a specific component. **TODO** implement authenticated routes
### components/home/home.jsx
a simple test component for the default route
### components/register/register.jsx
A component to handle registration, it could be a page, or just a small pop-up, or thing to the side of the screen. (for now it has its own url)
## BABEL
Babel is a compiler for JS that makes modern code transpile into older versions of Javascript
### .babelrc
The "env" preset lets use use all modern js, and takes away the responsibility of specifying which we are using.
the "react" preset makes babel understand React code so it doesn't freak out when it parses it.
## ESLINT
This is the equivalent of the Norminette at 42, it can be annoying, but it's generally trying to do the right thing. You can disable it for a line `// eslint-disable-line
or for a block
```
/* eslint-disable */
{
    // code
}
/* eslint-enable */
```
### .eslintrc
The extends section specifies that we are using the recommended settings, some settings related to React, settings related to imports, and the whole AIRBNB config files(which are generally accepted as a good config when writing React)
#### .eslintrc.env .eslintrc.globals
The env section specifies certain environment variables that we have access to, so that it doesn't consider them as underfined, same goes for globals...
#### .eslintrc.rules
These are the rules I've modified myself, we can change them depending on what we need.
## SERVER.js
Probably going to remove this for this project.
### tsconfig.json
Just something to shut up Visual studio code about lack of typing for js...
## WEBPACK
Webpack is a bundling tool, I use it to take all my sources, and compile a **compatible, zipped, and pruned** JS file to the client.
### webpack.config.js
This configuration file is used for both webpack development build and prod build, it parses all sources.
### webpack.dev.js
This might be vestigial, since we're going to use another server client than (Webpack dev server) which is usually configured here...
### webpack.prod.js
This config is used when building the production output, it specifies how to name and compress files, and how to seperate code chunks(for browser caching)
