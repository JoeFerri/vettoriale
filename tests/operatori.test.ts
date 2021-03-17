/**
 * @author Giuseppe Ferri
 */




import * as v from "../lib/index";
// import { expect } from 'chai';
require('chai').should()



describe(`modulo operatori`, function() {

  let ia: v.iNumero, ib: v.iNumero;

  describe(`naturali`, function() {

    let a: v.Naturale, b: v.Naturale;

    [a,b] = v.naturali(1,2);
    [ia,ib] = [a,b];

    describe(`somma`, function() {

      it(`1 + 2`, function() {
        v.somma(a,b).should.to.have.deep.property('valore', 3);
        v.somma(a,b).constructor.name.should.to.deep.equal('Naturale');
        v.somma(ia,ib).constructor.name.should.to.deep.equal('Naturale');
      });

    });

    describe(`differenza`, function() {

      it(`2 - 1`, function() {
        v.differenza(b,a).should.to.have.deep.property('valore', 1);
        v.differenza(b,a).constructor.name.should.to.deep.equal('Naturale');
        v.differenza(ib,ia).constructor.name.should.to.deep.equal('Naturale');
      });

    });

    describe(`moltiplicazione`, function() {

      it(`1 * 2`, function() {
        v.moltiplicazione(a,b).should.to.have.deep.property('valore', 2);
        v.moltiplicazione(a,b).constructor.name.should.to.deep.equal('Naturale');
        v.moltiplicazione(ia,ib).constructor.name.should.to.deep.equal('Naturale');
      });

    });

    describe(`divisione`, function() {

      it(`2 / 1`, function() {
        v.divisione(b,a).should.to.have.deep.property('valore', 2);
        v.divisione(b,a).constructor.name.should.to.deep.equal('Naturale');
        v.divisione(ib,ia).constructor.name.should.to.deep.equal('Naturale');
      });

    });

  });

});
