# ascii-warehouse
Ascii Warehouse project for a job interview.

Angular 2 + Typescript (scaffolded with angular-cli), Bootstrap for styling and moment.js for datetime manipulation

1. Clone, cd and npm install
2. `ng serve` to start live-reload development server (localhost:4200)
3. `ng build -prod` to build for production to /dist/
4. `node ascii-warehouse-server/index.js` to run 'backend' with 'Access-Control-Allow-Origin *' header to allow connections from angular-cli development server.

## Features

- Cat pictures!
- Custom list with scroll-spy to preload 'products' at 90% scroll position and display them at 100%.
- Shopping cart

## Description

On initialization 20 products are pre-loaded and displayed immediately, with an ad inserted after the 20th product.

The scroll-spy on ProductListComponent listens for scroll events and emits a 'preload' event to the parent component (xteam.ts) to signal that the user has almost scrolled to bottom and new products have to be fetched.

The products are pre-loaded and added to a 'preloaded' array. 

When the user has scrolled to bottom (100%) 
- the ProductListComponent adds the pre-loaded products to the items array 
- and inserts ads at every 20th position.
