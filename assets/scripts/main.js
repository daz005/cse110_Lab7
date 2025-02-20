// main.js

// CONSTANTS
const RECIPE_URLS = [
  'https://introweb.tech/assets/json/1_50-thanksgiving-side-dishes.json',
  'https://introweb.tech/assets/json/2_roasting-turkey-breast-with-stuffing.json',
  'https://introweb.tech/assets/json/3_moms-cornbread-stuffing.json',
  'https://introweb.tech/assets/json/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
  'https://introweb.tech/assets/json/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
  'https://introweb.tech/assets/json/6_one-pot-thanksgiving-dinner.json',
];

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
async function init() 
{
  //console.log("init");

  // initialize ServiceWorker
  initializeServiceWorker();
  
  // Get the recipes from localStorage
  let recipes=[];
  
  try 
  {
    recipes = await getRecipes();
  } 
  catch (err) 
  {
    console.error(err);
  }
  
  // Add each recipe to the <main> element
  //console.log("-------async function init():");
 // console.log(recipes);
  
  addRecipesToDocument(recipes);
}

/**
 * Detects if there's a service worker, then loads it and begins the process
 * of installing it and getting it running
 */
function initializeServiceWorker() 
{
  // EXPLORE - START (All explore numbers start with B)
  /*******************/
  // ServiceWorkers have many uses, the most common of which is to manage
  // local caches, intercept network requests, and conditionally serve from
  // those local caches. This increases performance since users aren't
  // re-downloading the same resources every single page visit. This also allows
  // websites to have some (if not all) functionality offline! I highly
  // recommend reading up on ServiceWorkers on MDN before continuing.
  /*******************/

  // We first must register our ServiceWorker here before any of the code in
  // sw.js is executed.
  // B1. TODO - Check if 'serviceWorker' is supported in the current browser
  if ('serviceWorker' in navigator) 
  {
    //console.log("****B1. done!");
    // B2. TODO - Listen for the 'load' event on the window object.
    window.addEventListener('load', 
    (event) => 
    {
      //console.log("****B2. done!");
      // Steps B3-B6 will be *inside* the event listener's function created in B2
      // B3. TODO - Register './sw.js' as a service worker (The MDN article
      //            "Using Service Workers" will help you here)
      navigator.serviceWorker.register('./sw.js').then(
        (registration) => 
        {
          //console.log("****B3. done!");
          
          // B4. TODO - Once the service worker has been successfully registered, console
          //            log that it was successful.      
          console.log('Service worker registration succeeded:', registration);

          //console.log("****B4. done!");

        }, /*catch*/ 
        (error) => 
        {
          // B5. TODO - In the event that the service worker registration fails, console
          //            log that it has failed.
          //console.log("****B5. done!");
          console.error(`Service worker registration failed: ${error}`);
          //return;
        }
      );

      // STEPS B6 ONWARDS WILL BE IN /sw.js

    });
  } 
  else 
  {
    //console.log("-----B1. TODO");
    console.error('Service workers are not supported.');
  };
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage, network requests are made to all
 * of the URLs in RECIPE_URLs, an array is made from those recipes, that
 * array is saved to localStorage, and then the array is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
async function getRecipes() 
{
  // EXPOSE - START (All expose numbers start with A)

  // A3. TODO - Return a new Promise. If you are unfamiliar with promises, MDN
  //            has a great article on them. A promise takes one parameter - A
  //            function (we call these callback functions). That function will
  //            take two parameters - resolve, and reject. These are functions
  //            you can call to either resolve the Promise or Reject it.
  return await new Promise(  (resolve, reject)  => {
    // A2. TODO - Create an empty array to hold the recipes that you will fetch
    let y = [];

    //setTimeout(() => {

      // A1. TODO - Check local storage to see if there are any recipes.
      // If there are recipes, return them.

      let recipes =[];
      let x= localStorage.getItem('recipes')|null;
      //console.log("****A1. Done");
      //console.log(x);

      //var y =[];
      if (!!x)
      {
        y = JSON.parse(x);
       
        if (y.length > 0)
        {
          console.log("resolve(y) 1:");
          console.log(y);
          resolve(y);
        }
      }

      // The rest of this method will be concerned with requesting the recipes
      // from the network



      /**************************/
      // A4-A11 will all be *inside* the callback function we passed to the Promise
      // we're returning
      /**************************/

      // A4. TODO - Loop through each recipe in the RECIPE_URLS array constant
      //            declared above     
      for (var i = 0; i < RECIPE_URLS.length; i++) 
      {

        // A5. TODO - Since we are going to be dealing with asynchronous code, create
        //            a try / catch block. A6-A9 will be in the try portion, A10-A11
        //            will be in the catch portion.        
        try 
        {
          // A6. TODO - For each URL in that array, fetch the URL - MDN also has a great
          //            article on fetch(). NOTE: Fetches are ASYNCHRONOUS, meaning that
          //            you must either use "await fetch(...)" or "fetch.then(...)". This
          //            function is using the async keyword so we recommend "await"          
          let x = fetch(RECIPE_URLS[i]).then((response) => 
          {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // A7. TODO - For each fetch response, retrieve the JSON from it using .json().
            //            NOTE: .json() is ALSO asynchronous, so you will need to use
            //            "await" again            
            let recipe = response.json().then((recipe) =>{

              // A8. TODO - Add the new recipe to the recipes array
              //console.log("// A8. TODO - Add the new recipe to the recipes array:");
              let recipeObject = new Object();
              
              const keys = Object.keys(recipe);
              for (let k = 0; k < keys.length; k++) 
              {
                const key = keys[k];
                recipeObject[key]=recipe[key];
              }
              y.push(recipeObject);

              //y[y.length] = recipe;

              // console.log(recipe);
              // console.log("JSON.stringify(recipe)");
              // console.log(JSON.stringify(recipe));
              // console.log("y");
              // console.log(y);

              //console.log("inside --------JSON.stringify(y)");
              //console.log(JSON.stringify(y));

              // A9. TODO - Check to see if you have finished retrieving all of the recipes,
              //            if you have, then save the recipes to storage using the function
              //            we have provided. Then, pass the recipes array to the Promise's
              //            resolve() method.              
              if (y.length == RECIPE_URLS.length)
              {
                //console.log("A9 done");
                saveRecipesToStorage(y);
                resolve(y);
              }

            });
          });

        } 
        catch (err) 
        {
          // A10. TODO - Log any errors from catch using console.error
          console.log("-----A10. done");
          console.log(err);

          // A11. TODO - Pass any errors to the Promise's reject() function
          console.log("-----A11. TODO");
          reject(err);
        }
      };
    //}, 1000000);
    //resolve(y);

  });
  // .then( (y)=>
  // {
     
  //   console.log("****A7. Done");
  //   console.log("resolve(y) 2:");
  //   console.log(y);
  //   console.log("outside --------JSON.stringify(y)");
  //   console.log(JSON.stringify(y));      
  //   saveRecipesToStorage(y);
  //   //resolve(y);
  // }
  // );

}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) 
{
  if(recipes)
  {
    //console.log("**** before saveRecipesToStorage:");
    //let x= localStorage.getItem('recipes');
    // console.log(x);
    // console.log(recipes);
    // console.log(JSON.stringify(recipes));
    localStorage.setItem('recipes', JSON.stringify(recipes));
    // localStorage.setItem('recipes', recipes);
    
    //let x= localStorage.getItem('recipes');
    //console.log("**** after saveRecipesToStorage:");
    //console.log(x);
  }
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) 
{
  if (!recipes) return;
  
  let main = document.querySelector('main');
  
  // console.log("(1) add recipes to doc:");
  // console.log("Array.isArray(recipes)");
  // console.log( Array.isArray(recipes));
  // console.log(recipes.length);
  // console.log(recipes);

  recipes.forEach((recipe) => 
  {
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    
    //console.log("(2) add recipe to doc:");
    //console.log(recipe);
    main.append(recipeCard);
  });

  //console.log(main);
}
