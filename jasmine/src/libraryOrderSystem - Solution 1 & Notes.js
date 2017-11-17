//IIFE where root = window
(function (root) {
  debugger;
  var libraryStorage = {};
  var libraryCache = {};

  function librarySystem(libraryName, dependencies, returnLibraryCallback) {
      if (arguments.length > 1) {

          // Set library
          if (libraryName in libraryStorage) {
              throw new Error(libraryName + ' library already exists.');
          } else {
              libraryStorage[libraryName] = {
                  dependencies : dependencies,
                  returnLibraryCallback : returnLibraryCallback
              };
          }

      } else {

          // Get library
          var dependencyArray = [];
          var dependencyList;
          var library;

          if (libraryName in libraryCache) {
              return libraryCache[libraryName];
          }

          if (libraryName in libraryStorage) {
              library = libraryStorage[libraryName];
              dependencyList = library.dependencies;
          } else {
              throw new Error(libraryName + ' library could not be found.');
          }

          if (dependencyList.length) {
              // Gather dependencies then cache library
              dependencyList.forEach(function (depend) {
                  dependencyArray.push(librarySystem(depend));
              });

              libraryCache[libraryName] = library.returnLibraryCallback.apply(this, dependencyArray);
          } else {
              // Cache library with no dependencies
              libraryCache[libraryName] = library.returnLibraryCallback();
          }

          return libraryCache[libraryName];
      }
  }

  root.librarySystem = librarySystem;
})(this);

//Create test functions
librarySystem('workBlurb', ['name', 'company'], function(name, company) {
debugger;
  return name + ' works at ' + company;
});

librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'

