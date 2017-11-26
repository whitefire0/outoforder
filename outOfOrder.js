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
1) if named library is in the cache, return it (to prevent it's callback being ran more than once)
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
              if (libraryName in storage) {
                  throw new Error(libraryName + ' has already been stored. Access its contents by calling librarySystem(libraryName)');
              } else {
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

              if (libraryName in cache) {
                return cache[libraryName];
              } 
              
              if (!libraryName in libraryStorage) {
                throw new Error(libraryName + ' cannot be found. Please store library first or search for another library.')
              } else {
                library = storage[libraryName];
                dependencies = library.dependencies;
              }
            
              if (dependencies.length) {

              }





          }
      
      }

      //export library for window access (where root = window object)
      root.librarySystem = librarySystem;

  })(this);