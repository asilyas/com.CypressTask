import { defineConfig } from "cypress";

export default defineConfig({
//viewportHeight:1000,
//viewportWidth:1200,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

   // baseUrl:"https://www.google.com"



  },
});
