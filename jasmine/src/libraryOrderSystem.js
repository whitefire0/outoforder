/*!
 * "The Beasts of Watch And Code"
 * Improving librarySystem Out of Order v0.0.1
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
1) it will need a way to determine whether the dependencies asked for are already in library storage (by name?) - libraryStorage should store what dependencies are required (eg array of objects), or "none"
  - In the create case, if not in storage, the library should be created in such a way as that if the return value of the creating function requires dependencies, it stores that value as a string that can later be checked to see if it contains the names of any libraries, at which point they can be substituted for the actual values.
2) it will need a way of preventing the creation of libraries that have already been created (e.g. using name as the identifier?) (this conditional will need to be at the beginning of our function)
*/

(function() {
  //object to store appended libraries
  var libraryOrderStorage = {};

  function libraryOrderSystem(libraryName, dependencies, callback) {

    //for testing purposes only
    if(libraryName === 'getStorage'){
        return libraryOrderStorage;
    }

    var passing = false;
    if(passing){
        //if library content is present then don't run it again but simply an alert to user
        console.log('This library has already been created. Here are the library contents:')
        //along with the library content
        //return libraryOrderStorage[libraryName];
    

    //if the library hasn't already been created, create or return the library depending on number of arguments
    } else {
        //Use Case:
        //if arguments.length < 2 (i.e. just library name), it should return the library object
        if (arguments.length < 2) {
            return libraryOrderStorage[libraryName];
        }

        //Create Case (no dependencies)
        //if no dependencies are provided, it should execute callback and store the returned library object, along with a libraryOrderStorage property that indicates dependencies are not required
        if (dependencies.length < 1) {
            libraryOrderStorage[libraryName] = callback();
            // libraryOrderStorage[libraryName].dependReqs = 0;
        
        //Create Case (1 or more dependencies)
        //if dependencies are present, it should execute callback and store the callback and dependencies in the object seperately
        } else {
            var dependencyLibraries = getLibrariesByName(dependencies);

            //use new array in apply
            libraryOrderStorage[libraryName] = callback.apply(this, dependencyLibraries);
        }

    }

  }

    //seperate helper function to get library content
    function getLibrariesByName(dependencies) {
        //to get values, loop through array of dependencies and store property values in new array
        var dependencyLibraries = [];
        
        for (var i = 0; i < dependencies.length; i++) {
            dependencyLibraries.push(libraryOrderStorage[dependencies[i]])
        }

        return dependencyLibraries;
    }
    
    //store librarySystem for window object access outside of IIFE
    window.libraryOrderSystem = libraryOrderSystem;

})();

/*
//Create test functions
libraryOrderSystem('name', [], function() {
    return 'Gordon';
}); // runs successfully and creates object property

libraryOrderSystem('company', [], function() {
    return 'Watch and Code';
}); // runs successfully and creates object property

libraryOrderSystem('workBlurb', ['name', 'company'], function(name, company) {
    return name + ' works at ' + company;
}); // runs successfully and creates object property using dependecies

//Use test functions
libraryOrderSystem('workBlurb'); // ==> returns "Gordon works at Watch and Code"
*/
