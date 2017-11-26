/*!
 * "The Beasts of Watch And Code"
 * Improving librarySystem Out of Order v0.1.1
 * Copyright 2017 whitefires0 / Rick Hallett
 *
 * Freely distributable under the creative commons license.
 *
 * Full details and documentation:
 * https://github.com/gordonmzhu/beasts/issues/3
 */
//=============================================================================================================
    /* --- Project Implementation --- */
//=============================================================================================================

/*
Process:

Check to see how the function is being used by arguments.length -> this leads to set/get sections of the function

* --- Set library --- *
1) Check is the named library is already in storage - if it is, alert user. If it isn't, store libraryStorage[libraryName] = {dependencies: x, libraryCallback: y}

* --- Get library --- *
1) if named library is in the cache, return it (to prevent its callback being ran more than once)
2) if named library is in storage, gather dependency content into an array recursively and then cache the library callback with dependencies .apply(). If not in storage, alert the user that it cannot be found.
    2.5) if named library is in storage but has no named dependencies, simply store the callback in the cache
3) return the named library cache - this either returns the no dependency library, or breaks recursion if retrieving a library that requires dependencies

 */
  (function main(root) {
      //closure variables for access within librarySystem
      var storage = {};
      var cache = {};

      function librarySystem(libraryName, dependencies, libraryCallback) {

          if (arguments.length > 1) {
              // * --- Set library --- *
              //check to see if library has already been stored
              if (libraryName in storage) {
                  throw new Error(libraryName + ' has already been stored. Access its contents by calling librarySystem(libraryName)');
              } else {
                //if it hasn't been stored, store it
                  storage[libraryName] = {
                      dependencies: dependencies,
                      callback: libraryCallback
                  };

                  //for testing ONLY
                  return storage;
              }
          } else {
              // * --- Get library --- *
              var library, dependencies;
              var dependencyStorage = [];

              //if an attempt is made to retrieve a library that doesn't exist, throw an error message
              if (!(libraryName in storage)) {
                throw new Error(libraryName + ' cannot be found. Please store library first or search for another library.')
              } else {
                library = storage[libraryName];
                dependencies = library.dependencies;
              }
            
              //if the requested library has dependencies, store the dependency callback contents within dependencyStorage
              if (dependencies.length) {

                dependencies.forEach(function(dependencyName){
                  //recursive case
                  dependencyStorage.push(librarySystem(dependencyName));
                })
                //store library callback contents by applying the dependencyStorage array
                cache[libraryName] = library.callback.apply(this, dependencyStorage);
              } else {
                //just store the callback without dependencies
                cache[libraryName] = library.callback();
              }

              //base case
              return cache[libraryName];
          }
      }

      //export library for window access (where root = window object)
      root.librarySystem = librarySystem;

  })(this);