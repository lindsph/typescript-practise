# typescript-practise

`npm i` <br />
`npm start` - localhost:3000 <br />
`tsc -w` - start Typescript watch

//////////////////////////////

added webpack <br />
ran `npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader` <br />

updates to ts.config.json: <br />

comment out rootDir <br />
set sourceMap to true <br />

updates to index.html: <br />

change script tag to file that was set up in webpack.config.js (bundle.js) <br />

updates to package.json: <br />

changed the value of "start" line to "webpack-dev-server" <br />
added "build": line <br />

add webpack.config.js: <br />

`npm start`


