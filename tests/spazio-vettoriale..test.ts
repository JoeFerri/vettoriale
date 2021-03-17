/**
 * @author Giuseppe Ferri
 */




import * as v from "../lib/index";
import { expect, should } from 'chai';
// require('chai').should()
should();



describe(`modulo spazio-vettoriale`, function() {

  describe(`Vettori`, function() {

    let r = new v.VettoreRiga(v.reali(1,2,3,4,5));
    let c = new v.VettoreColonna(v.reali(1,2,3,4,5));
    let zero = new v.VettoreRiga(v.naturale(5));

    // console.log("\nvettore riga: " + r);
    // console.log("\nvettore colonna:" + c);

    it(`VettoreRiga ; VettoreColonna`, function() {
      r.somma(r).toArray().should.to.be.deep.equal(v.reali(2,4,6,8,10));
      c.somma(c).toArray().should.to.be.deep.equal(v.reali(2,4,6,8,10));
      r.somma(c.toVettoreRiga()).toArray().should.to.be.deep.equal(v.reali(2,4,6,8,10));
      c.somma(r.toVettoreColonna()).toArray().should.to.be.deep.equal(v.reali(2,4,6,8,10));
      
      r.sottrai(r).toArray().should.to.be.deep.equal(zero.toArray());
      r.sottrai(r).toArray().should.to.be.deep.equal(v.reali(0,0,0,0,0));
      c.sottrai(c).toArray().should.to.be.deep.equal(v.reali(0,0,0,0,0));
      c.sottrai(c).toArray().should.to.be.deep.equal(zero.toArray());
      r.sottrai(c.toVettoreRiga()).toArray().should.to.be.deep.equal(v.reali(0,0,0,0,0));
      c.sottrai(r.toVettoreColonna()).toArray().should.to.be.deep.equal(v.reali(0,0,0,0,0));
      
      r.moltiplicaPerScalare(v.reale(2)).toArray().should.to.be.deep.equal(v.reali(2,4,6,8,10));
      c.moltiplicaPerScalare(v.reale(2)).toArray().should.to.be.deep.equal(v.reali(2,4,6,8,10));
    });

    it(`basi canoniche`, function() {
      v.VettoreRiga.baseCanonica(v.naturale(0)).join(',').should.to.be.equal("");
      v.VettoreRiga.baseCanonica(v.naturale(1)).join(',').should.to.be.equal("|1|");
      v.VettoreRiga.baseCanonica(v.naturale(2)).join(',').should.to.be.equal("|1,0|,|0,1|");
      v.VettoreRiga.baseCanonica(v.naturale(3)).join(',').should.to.be.equal("|1,0,0|,|0,1,0|,|0,0,1|");
      
      v.VettoreColonna.baseCanonica(v.naturale(0)).join(',').should.to.be.equal("");
      v.VettoreColonna.baseCanonica(v.naturale(1)).join(',').should.to.be.equal("\n|1|");
      v.VettoreColonna.baseCanonica(v.naturale(2)).join(',').should.to.be.equal("\n|1|\n|0|,\n|0|\n|1|");
      v.VettoreColonna.baseCanonica(v.naturale(3)).join(',').should.to.be.equal("\n|1|\n|0|\n|0|,\n|0|\n|1|\n|0|,\n|0|\n|0|\n|1|");
    });

  });
  
  
});
