describe('config.js', function() {

  var config = require('../index');

  describe('set()', function() {
    
    it('should not fail', function() {
      config.set('foo', 'bar');
    });

  });

  describe('get()', function() {

    beforeEach(function() {
      process.env.FOO = 'BAR';
    });

    it('should return an environment variable', function() {
      expect(config.get('FOO')).toBe('BAR');
    });
 
    it('should return what I\'ve set', function() {
      config.set('FOO', 'bar');
      expect(config.get('FOO')).toBe('bar');
    });

    it('should return a default value', function() {
      expect(config.get('BAR', 'FOO')).toBe('FOO');
    });

  });
 
});

