describe('bankdatencheck', function() {
  var bankdatencheck = new (require('../lib/bankdatencheck').Bankdatencheck)();
  
  it('should return a correct bank name and an invalid bank account number', function(done) {
    bankdatencheck.checkAccount('4974161', '33070024', function(err, result) {
      result.should.have.property('BLZ');
      result.BLZ.should.equal('1');
      
      result.should.have.property('KontoNummer');
      result.KontoNummer.should.equal('0');
      
      return done();
    });
  });
  
  it('should return an invalid bank name and bank account number', function(done) {
    bankdatencheck.checkAccount('9141405', '52069246', function(err, result) {
      result.should.have.property('BLZ');
      result.BLZ.should.equal('0');
      
      result.should.have.property('KontoNummer');
      result.KontoNummer.should.equal('0');
      
      return done();
    });
  });
  
  it('should return a correct bank name and bank account number', function(done) {
    bankdatencheck.checkAccount('9012345600', '33080030', function(err, result) {
      result.should.have.property('BLZ');
      result.BLZ.should.equal('1');
      
      result.should.have.property('KontoNummer');
      result.KontoNummer.should.equal('1');
      
      return done();
    });
  });
});

