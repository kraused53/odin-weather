# odin-template
A skeleton HTML/CSS/JavaScript template for use in The Odin Project projects

## To setup:

Run these to initialize NPM modules and install plugins
```bash
npm init -y --init-type=module
npm install --save-dev webpack webpack-cli
npm install --save-dev html-webpack-plugin
npm install --save-dev style-loader css-loader
npm install --save-dev html-loader
npm install --save-dev webpack-dev-server
```

Open package.json and update the scripts section:
```JSON
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack serve --open --config webpack.dev.js",
    "deploy": "git subtree push --prefix dist origin gh-pages"
},
```

Commands:


This will build the production version of the webpage and store it inside dist/
```bash
npm run build
```


This will build the development version of the webpage and store it inside dist/
Then, it will start and open a development server.
```bash
npm run dev
```

To deploy to gh-pages:
```bash
npm run build
git checkout gh-pages && git merge main --no-edit
git add dist -f && git commit -m "Deployment commit"
git subtree push --prefix dist origin gh-pages
git checkout main
```
