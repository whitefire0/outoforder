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

/*Your tests should ensure that libraries can be created out of order. They should also ensure that all the requirements from the previous challenge are still being met.

In addition to the new loading order feature, your solution should ensure that the callback function for each library is run only once. So for example, even if librarySystem('workBlurb') appears 100 times in your app, the 'workBlurb' callback function should only run once. You should definitely have a test for this.*/
    
    
//=============================================================================================================
    /* --- Project Implementation --- */
//=============================================================================================================

/*
Notes/ideas

1) it will need a way to determine whether the dependencies asked for are already in library storage (by name?) - libraryStorage should store what dependencies are required (eg array of objects), or "none"
  - In the create case, if not in storage
2) it will need a way of preventing the creation of libraries that have already been created (e.g. using name as the identifier?)



*/

//librarySystem and libraryStorage initialiser 
(function() {
    
        //object to store appended libraries
        var libraryStorage = {};
    
        function librarySystem(libraryName, dependencies, callback) {

            //Use Case:
            //if arguments.length < 2 (i.e. just library name), it should return the library object
            if (arguments.length < 2) {
                return libraryStorage[libraryName];
            }
            
            //Create Case (no dependencies)
            //if no dependencies are provided, it should execute callback and store the returned library object
            if (dependencies.length < 1) {
                libraryStorage[libraryName] = callback();
            
            //Create Case (1 or more dependencies)
            //if dependencies are present, it should execute callback and pass in the dependency library values
            } else {
                var dependencyLibraries = getLibrariesByName(dependencies);

                //use new array in apply
                libraryStorage[libraryName] = callback.apply(this, dependencyLibraries);
            }

        }

        function getLibrariesByName(dependencies) {
            //to get values, loop through array of dependencies and store property values in new array
            var dependencyLibraries = [];
            
            for (var i = 0; i < dependencies.length; i++) {
                dependencyLibraries.push(libraryStorage[dependencies[i]])
            }

            return dependencyLibraries;
        }
    
        //store librarySystem for window object access outside of IIFE
        window.librarySystem = librarySystem;
    
    })();

//Create test functions
librarySystem('name', [], function() {
    return 'Gordon';
}); // runs successfully and creates object property

librarySystem('company', [], function() {
    return 'Watch and Code';
}); // runs successfully and creates object property

librarySystem('workBlurb', ['name', 'company'], function(name, company) {
    return name + ' works at ' + company;
}); // runs successfully and creates object property using dependecies

//Use test functions
librarySystem('workBlurb'); // ==> returns "Gordon works at Watch and Code"







//=============================================================================================================
    /* --- Project Helper Code --- */
//=============================================================================================================

/* Current approach: One global variable per library
1) 1. Create: Run IIFE containing library, attach library to window object
2) 2: Use: Access library from window object  */

/* Another approach: one global variable to rule them all
1) Create: librarySystem('libraryName', function() { **return library** }
2) Use: librarySystem('libraryName')*/

(function() {
    
        var libraryStorage = {};
    
        function librarySystem(libraryName, callback) {
            if (arguments.length > 1) {
                libraryStorage[libraryName] = callback();
            } else {
                return libraryStorage[libraryName];
            }
        }
    
        window.librarySystem = librarySystem;
    
    })();
    
    librarySystem('happyBirthdayGordon', function() {
        
            //happyBirthdayGordon.js: a simple library to help celebrate the born day of a great teacher
        
            //version 1.0.0
            //copyright Rick Hallett 2017 whitefire0
            //https://github.com/whitefire0/happyBirthdayGordon.js
        
            //primary library object for export to window object
            var lib = {
                //declaration of library variables
                data: {
                    gordonDayOfReincarnation: '01/11', 
                    todayDate: '01/11/2017',
                    numOfHappyCustomers: 202,
                    birthdayShouts: [],
                    songTime: ['Happy Birthday to You, ', 'Happy Birthday to You, ', 'Happy Birthday dear Gordon, ', 'Happy Birthday to Youuuu!!!!'],
                    songTimeCounter: 0,
                    recursionCounter: 0,
                    zhuQuotes: ['collecting buzzwords leads to greatness', 'discipline is freedom', 'no, thats wrong', 'thats basically as good as codeacademy', 'Good questions save time. Bad questions waste time', 'Yes really, actually do this. Do not rush this step.', 'debugger', 'Nobody wants to look for your typos', 'thats not very interesting', 'whatever']
                    // intervalID: window.setInterval(songTime, 500) NOTE: consider implementation of setInterval timer for lib.songTime()
                },
                tutorials: function(){
                    console.log('Gordon highly recommends you do not use tutorials.');
                    console.log(' Please visit https://medium.com/@gordon_zhu/how-to-be-great-at-asking-questions-e37be04d0603 for more information');
                    console.log('Seriously, stop looking at tutorials');
                },
                quoteGenerator: function(){
                    //adjust max depending on (zhuQuote.length - 1)
                    var min = 0;
                    var max = 9;
                    var rnd = Math.floor(Math.random() * (max - min + 1)) + min;
                    console.log(this.data.zhuQuotes[rnd]);
                }
            }
        
            if (typeof librarySystem !== undefined) {
                //handle librarySystem case
                librarySystem('happyBirthdayGordon', function() {
                    return lib;
                });
            } else {
                //handle window object case
                window.happyBirthdayGordonJS = lib;
            }
            
            
            
    });
    
    /* Using this library within our own app would look something like this */
    
    (function() {
        debugger;
        var birthdayLibrary = librarySystem('happyBirthdayGordon');
    
        console.log(birthdayLibrary);
    })();