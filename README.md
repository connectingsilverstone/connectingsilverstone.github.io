# collectivedev.com
[Contracted] The Collective website

## Install Dependencies
To begin development for CollectiveDev.com, make sure you have Node installed (it is recommended to have version 6.0+), and install the dependencies:

```
npm install
```

## Running Dev Tests
To run a real-time dev server that will re-transiple the build as you reload, use the `dev` script as so:

```
npm run dev
```

## Build for production/push
To run a quick build to be able to run independently, run the `build` script as shown below:

```
npm run build
```

## Things to know:
* NEVER edit anything in the build/ folder; this should all be done automatically by webpack!
* Please install dependencies from npm so that we have them all in the same place- you can use `import` statements with webpack!
* Feel free to add your own pages and build workflows to `webpack.config.js` :)