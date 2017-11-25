describe('Project Specification Tests', function() {

  it('It should accept a libraryName', function(){
    expect().nothing();
  });

  it('It should accept a dependencies variable', function(){
    expect().nothing();
  });

  it('It should accept a callback function', function(){
    expect().nothing();
  });

  it('It should be able to store libraries with no dependencies', function(){
    librarySystem('noDependencies', [], function() {
      debugger;
        return 'none';
    });

    var noDependencies = librarySystem('noDependencies');

    expect(noDependencies).toBe('none');

  });

  it('It should be able to store libraries with one dependency', function(){
    expect().nothing();
  });

  it('It should be able to store libraries with two or more dependencies', function(){
    expect().nothing();
  });

  it('It should run the callback function of each library only once', function(){
    expect().nothing();
  });

  it('It should be able to create get get libraries regardless of the order', function(){
    expect().nothing();
  });

    

});
