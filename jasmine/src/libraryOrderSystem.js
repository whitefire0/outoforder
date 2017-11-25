/*!
 * "The Beasts of Watch And Code"
 * Improving librarySystem Out of Order v0.0.2
 * Copyright 2017 whitefires0 / Rick Hallett
 *
 * Freely distributable under the creative commons license.
 *
 * Full details and documentation:
 * http://
 */
//===============================================================================================================
	/* --- Project Specification --- */
//===============================================================================================================

/*Your task is to rewrite librarySystem so that the following code works too. The only difference is that we're loading the libraries out of order (i.e. 'workBlurb' is created before its dependencies, 'name' and 'company').*/

// librarySystem('workBlurb', ['name', 'company'], function(name, company) {
//   return name + ' works at ' + company;
// });

// librarySystem('name', [], function() {
//   return 'Gordon';
// });

// librarySystem('company', [], function() {
//   return 'Watch and Code';
// });

// librarySystem('workBlurb'); // 'Gordon works at Watch and Code'

/*Your tests should ensure that libraries can be created out of order. They should also ensure that all the requirements from the previous challenge are still being met.

In addition to the new loading order feature, your solution should ensure that the callback function for each library is run only once. So for example, even if librarySystem('workBlurb') appears 100 times in your app, the 'workBlurb' callback function should only run once. You should definitely have a test for this.*/
    
    
//=============================================================================================================
    /* --- Project Implementation --- */
//=============================================================================================================

/*
Notes/ideas
- sketch out function first
1) Write out sequence of required tests
2) Use these tests to progressively develop and test the function
3)
*/

(function() {
  //object to store appended libraries
  var libraryStorage = {};

  function librarySystem(libraryName, dependencies, callback) {

    //Set library
    if(arguments > 1) {
        libraryStorage[libraryName] = {
            dependencies: dependencies,
            callback: callback,
        }
    } else {
        getLibrary(libraryName);
    }


    //Get library
    function getLibrary(libraryName) {
        if(libraryName in libraryStorage) {
            return libraryStorage[libraryName]
        } else {
            return 'library does not exist'
        }
    }

    
  }
    //store librarySystem for window object access outside of IIFE
    window.librarySystem = librarySystem;

})();

/*
//Create test functions
librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
*/
