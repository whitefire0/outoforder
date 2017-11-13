describe('librarySystem Tests', function() {

  it('Expectation 1:', function(){
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
    var previousSuccessResult = libraryOrderSystem('workBlurb'); // ==> returns "Gordon works at Watch and Code"

    expect(previousSuccessResult).toBe('Gordon works at watch and code');

  });

  it('Expectation 2:', function(){
    expect().nothing();
  });

});