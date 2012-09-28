describe('config.js', function() {

  beforeEach(function() {
    this.config = require('../index');
  });

  describe('set()', function() {

    it('should exist', function() {
      expect(this.config.set).toBeDefined();
    });
    
    it('should not fail', function() {
      this.config.set('foo', 'bar');
    });

  });

  describe('get()', function() {

    beforeEach(function() {
      process.env.FOO = 'BAR';
    });

    it('should exist', function() {
      expect(this.config.get).toBeDefined();
    });

    it('should return an environment variable', function() {
      expect(this.config.get('FOO', 'mung')).toBe('BAR');
    });
 
    it('should return what I\'ve set', function() {
      this.config.set('FOO', 'bar');
      expect(this.config.get('FOO', 'mung')).toBe('bar');
    });

    it('should return a default value', function() {
      expect(this.config.get('BAR', 'FOO')).toBe('FOO');
    });

  });

  describe('unset()', function() {

    beforeEach(function() {
      this.config.set('cheese', 'gromit');
    });

    it('should unset the "cheese" property', function() {
      this.config.unset('cheese');
      expect(this.config.get('cheese')).toBeUndefined();
    });

  });

  describe('use()', function() {

    beforeEach(function() {
      this.obj = jasmine.createSpyObj('user defined config object', ['get']);
      this.obj.get.andCallFake(function(key) {
        if (key === 'mung') {
          return 'face';
        }
      });
      this.config.use(this.obj);
      spyOn(this.config, 'get').andCallThrough();
      process.env.MUNG = 'FACE';
    });

    it('should return an evironment variable, just like the config object', function() {
      var value = this.obj.get('MUNG');
      expect(this.config.get).toHaveBeenCalledWith('MUNG', undefined);
      expect(value).toBe('FACE');
    });

    it('should return a default value, just like the config object', function() {
      var value = this.obj.get('FACE', 'mung');
      expect(this.config.get).toHaveBeenCalledWith('FACE', 'mung');
      expect(value).toBe('mung');
    });

    it('should still work as expected', function() {
      expect(this.obj.get('mung')).toBe('face');
    });

    describe('using 2 objects', function() {

      beforeEach(function() {
        this.obj2 = jasmine.createSpyObj('another user defined object', ['get', 'set']);
        this.obj2.get.andReturn('and nuts');
        this.config.use(this.obj2);
      });

      it('should look through all objects', function() {
        var value = this.config.get('fruit');
        expect(value).toBe('and nuts');
      });

    });

  });
 
});

