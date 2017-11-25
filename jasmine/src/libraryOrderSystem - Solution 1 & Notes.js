/*
Documenting libraryStorage vs libraryCache:
- libraryStorage stores libraryName, any dependencies (by libraryName) and the callback function

- libraryCache: when getting libraries for stored callback functions, the cache provides a memory location to store the return value
*/

//IIFE where root = window
(function (root) {
  debugger;
  var libraryStorage = {};
  var libraryCache = {};

  function librarySystem(libraryName, dependencies, returnLibraryCallback) {
      //if librarySystem is being called to create a library
      if (arguments.length > 1) {

          // Set library
          if (libraryName in libraryStorage) {
            //if libraryName (e.g. 'workBlurb' exists in library Storage), throw error
              throw new Error(libraryName + ' library already exists.');
          } else {
              libraryStorage[libraryName] = {
              //create libraryName property, with an object value pair
              //NB we are storing dependencies whether or not they are present, this simplifies the logic as the function is called with the parameter present
                  dependencies : dependencies,
                  //store dependencies function argument
                  returnLibraryCallback : returnLibraryCallback
                  //store libraryCallback function argument
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
            //create seperate variables to avoid overly complex nested if statements (one step at a time approach), and shorten object path names
              library = libraryStorage[libraryName];
              //retreive dependencies [] and callback f by the libraryName and store in var libary {}
              dependencyList = library.dependencies;
              //store the dependencies
          } else {
              throw new Error(libraryName + ' library could not be found.');
          }

          if (dependencyList.length) {
              // if there are dependencies, gather dependency library content into dependencyArray, and then callback applying dependency array
              dependencyList.forEach(function (depend) {
                //forEach dependencyList libraryName, recursively call librarySystem passing in the libraryName, storing
                //dependencyArray stores the library content (e.g. 'Gordon', 'Watch and Code') so that we can store these by library name so the library that requires them can 
                  dependencyArray.push(librarySystem(depend));
              });

              libraryCache[libraryName] = library.returnLibraryCallback.apply(this, dependencyArray);
          } else {
              // Cache library with no dependencies
              //by calling returnLibraryCallback, we hit the call backs return statement which brings back the library content
              //store callback value into libraryCache = {libraryName: /*library content*/}
              libraryCache[libraryName] = library.returnLibraryCallback();
          }
          //when we hit this point, we are ending recursion and returning the library content to store in the dependencyArray
          return libraryCache[libraryName];
      }
  }

  root.librarySystem = librarySystem; //where root is window object
})(this); //where this is window object

//Create test functions
//creates libraryStorage with workBlurb: {dependencies: ['name', 'company'], returnLibraryCallback: callback}
librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

//creates libraryStorage with name: {dependencies: [], returnLibraryCallback: callback}
librarySystem('name', [], function() {
  return 'Gordon';
});

//creates libraryStorage with company: {dependencies: [], returnLibraryCallback: callback}
librarySystem('company', [], function() {
  return 'Watch and Code';
});

//1) gets libraryStorage['workblurb'] into var library, stores dependencyList from library.dependencies
//2) forEach dependency, recursively calls librarySystem to fetch library with that name
//3) in recursion we are repeating step one only with the first dependency 
librarySystem('workBlurb'); // 'Gordon works at Watch and Code'


