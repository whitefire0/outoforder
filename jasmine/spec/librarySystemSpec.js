describe('Previous librarySystem Features', function() {

  it('It should be able to handle the previous Beast Challenge order of use.', function(){
    //generates the three libraries, with the last taking the dependencies created by the first two.

    libraryOrderSystem('name', [], function() {
      return 'Gordon';
    }); 
  
    libraryOrderSystem('company', [], function() {
        return 'Watch and Code';
    }); 
    
    libraryOrderSystem('workBlurb', ['name', 'company'], function(name, company) {
        return name + ' works at ' + company;
    }); 
    
    var normalLibraryOrder = libraryOrderSystem('workBlurb'); 

    expect(normalLibraryOrder).toBe('Gordon works at Watch and Code');
  });

  
});

describe('libraryOrderSystem Features', function(){

  xit('It should create a dependReqs property on the libraryOrderStorage object to store the number of dependency requirements.', function(){
    
    libraryOrderSystem('name', [], function() {
      return 'Gordon';
    });

    expect(libraryOrderStorage['name'].libraryContent).toBe('Gordon')

  });

  it('It should set the libraryOrderSystem create case return value to a seperate libraryContent property on the libraryOrderStorage object', function(){
    
    var storageTester;

    //
    libraryOrderSystem('name', [], function() {
      return 'Gordon';
    });

    libraryOrderSystem('getStorage')

    expect(libraryOrderStorage['name'].libraryContent).toBe('Gordon');

  });

  

});