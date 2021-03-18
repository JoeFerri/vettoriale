/**
 * @author Giuseppe Ferri
 */




import * as v from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`modulo insieme`, function() {

  describe(`TInsieme<string> ; TInsieme<any> ; Insieme<string>`, function() {

    let A = new v.TInsieme<string>(['a','b','c','1']);
    let B = new v.TInsieme<string>(['a','b','x','1']);
    
    let obj = {n: "k"};
    let C = new v.TInsieme<any>(['a','b',2,obj]);

    let I: v.Insieme<string> = new v.TInsieme<string>(['a','y','1']);

    it(`#toSet()`, function() {
      A.toSet().should.to.have.deep.property('size', 4);
      A.toSet().should.to.be.a('set').that.includes('b');
    });
    
    it(`#toArray()`, function() {
      A.toArray().should.to.be.an('array').that.includes('b');
      A.toArray().should.to.be.an('array').that.not.includes(1);
    });

    it(`#modulo`, function() {
      A.modulo.valore.should.to.equal(4);
      C.modulo.valore.should.to.equal(4);
      I.modulo.valore.should.to.equal(3);
    });

    it(`#unione(B: TInsieme<T>)`, function() {
      A.unione(B).toArray().should.to.include.members(['a','b','c','1']);
      A.unione(B).modulo.valore.should.to.equal(5);
      
      I.unione(A).modulo.valore.should.to.equal(5);

      C.unione(A).toArray().should.to.include.deep.members(['a','b','c','1',2,{n: "k"}]);
      C.unione(A).modulo.valore.should.to.equal(6);
    });

    it(`#intersezione(B: TInsieme<T>)`, function() {
      A.intersezione(B).toArray().should.to.include.members(['a','b','1']);
      A.intersezione(B).modulo.valore.should.to.equal(3);
      
      I.intersezione(A).modulo.valore.should.to.equal(2);

      C.intersezione(A).toArray().should.to.include.deep.members(['a','b']);
      C.intersezione(A).modulo.valore.should.to.equal(2);
    });

    it(`#appartiene(t: T)`, function() {
      A.appartiene('a').should.to.be.true;
      A.appartiene('y').should.to.be.false;
      
      I.appartiene('a').should.to.be.true;
      I.appartiene('x').should.to.be.false;
      
      C.appartiene('a').should.to.be.true;
      C.appartiene(2).should.to.be.true;
      C.appartiene(obj).should.to.be.true;
      C.appartiene({n: "k"}).should.to.be.false;
      C.appartiene('k').should.to.be.false;
    });

  });
  
  
  describe(`InsiemeNumerico<any> ; N ; Z ; R`, function() {

    let IN: v.InsiemeNumerico<any> = v.N;
    let IZ: v.InsiemeNumerico<any> = v.Z;
    let IR: v.InsiemeNumerico<any> = v.R;
    let N = v.N, Z = v.Z, R = v.R;

    it(`#unione() ; #intersezione()`, function() {
      expect(() => N.unione(N)).to.throw();
      expect(() => N.intersezione(N)).to.throw();
    });

    it(`modulo`, function() {
      N.modulo.valore.should.to.equal(Infinity);
      Z.modulo.valore.should.to.equal(Infinity);
      R.modulo.valore.should.to.equal(Infinity);
      IR.modulo.valore.should.to.equal(Infinity);
    });

    it(`#appartiene()`, function() {
      N.appartiene(v.naturale(2)).should.to.be.true;
      N.appartiene(v.naturale(-2)).should.to.be.false;
      IN.appartiene(v.naturale(2)).should.to.be.true;
      IN.appartiene(v.naturale(-2)).should.to.be.false;
      
      Z.appartiene(v.intero(-2)).should.to.be.true;
      Z.appartiene(v.intero(2.5)).should.to.be.false;
      IZ.appartiene(v.intero(-2)).should.to.be.true;
      IZ.appartiene(v.intero(2.5)).should.to.be.false;
      
      R.appartiene(v.reale(2.5)).should.to.be.true;
      IR.appartiene(v.reale(2.5)).should.to.be.true;

      IN.appartiene(v.intero(-2)).should.to.be.false;
      IZ.appartiene(v.reale(2.5)).should.to.be.false;
    });

    it(`#toArray()`, function() {
      N.toArray(v.naturale(3), v.naturale(30),v.naturale(3)).should.to.be.deep.equal(v.naturali(3,6,9,12,15,18,21,24,27,30));
      N.toArray(v.naturale(3), v.naturale(30),v.naturale(3), (n: v.Naturale) => n.valore%2 == 0).should.to.be.deep.equal(v.naturali(6,12,18,24,30));
      N.toArray(v.naturale(3), v.naturale(3),v.naturale(1)).should.to.be.deep.equal(v.naturali(3));
      N.toArray(v.naturale(3), v.naturale(4),v.naturale(1)).should.to.be.deep.equal(v.naturali(3,4));

      Z.toArray(v.intero(3), v.intero(30),v.intero(-3)).should.to.be.deep.equal(v.interi(30,27,24,21,18,15,12,9,6,3));
      Z.toArray(v.intero(3), v.intero(30),v.intero(-3), (n: v.Intero) => n.valore%2 == 0).should.to.be.deep.equal(v.interi(30,24,18,12,6));
      Z.toArray(v.intero(3), v.intero(3),v.intero(-1)).should.to.be.deep.equal(v.interi(3));
      Z.toArray(v.intero(3), v.intero(4),v.intero(-1)).should.to.be.deep.equal(v.interi(4,3));
      Z.toArray(v.intero(-4), v.intero(4),v.intero(-2)).should.to.be.deep.equal(v.interi(4,2,0,-2,-4));

      N.toArray(v.naturale(-3), v.naturale(3),v.naturale(1)).should.to.be.deep.equal([]);
      N.toArray(v.naturale(3), v.naturale(-3),v.naturale(1)).should.to.be.deep.equal([]);
      N.toArray(v.naturale(3), v.naturale(2),v.naturale(1)).should.to.be.deep.equal([]);
      expect(() => N.toArray(v.naturale(3), v.naturale(3),v.naturale(0))).to.throw();
    });

    it(`#toSet()`, function() {
      N.toSet(v.naturale(3), v.naturale(30),v.naturale(3)).should.to.be.a('set').that.deep.include(v.naturale(18));
      N.toSet(v.naturale(3), v.naturale(30),v.naturale(3)).toArray().should.to.be.an('array').that.deep.include.members(v.naturali(3,6,9,12,15,18,21,24,27,30));
      N.toSet(v.naturale(3), v.naturale(30),v.naturale(3), (n: v.Naturale) => n.valore%2 == 0).toArray().should.to.be.deep.equal(v.naturali(6,12,18,24,30));
      N.toSet(v.naturale(3), v.naturale(3),v.naturale(1)).toArray().should.to.be.deep.equal(v.naturali(3));
      N.toSet(v.naturale(3), v.naturale(4),v.naturale(1)).toArray().should.to.be.deep.equal(v.naturali(3,4));

      Z.toSet(v.intero(3), v.intero(30),v.intero(-3)).toArray().should.to.be.deep.equal(v.interi(30,27,24,21,18,15,12,9,6,3));
      Z.toSet(v.intero(3), v.intero(30),v.intero(-3), (n: v.Intero) => n.valore%2 == 0).toArray().should.to.be.deep.equal(v.interi(30,24,18,12,6));
      Z.toSet(v.intero(3), v.intero(3),v.intero(-1)).toArray().should.to.be.deep.equal(v.interi(3));
      Z.toSet(v.intero(3), v.intero(4),v.intero(-1)).toArray().should.to.be.deep.equal(v.interi(4,3));
      Z.toSet(v.intero(-4), v.intero(4),v.intero(-2)).toArray().should.to.be.deep.equal(v.interi(4,2,0,-2,-4));

      N.toSet(v.naturale(-3), v.naturale(3),v.naturale(1)).toArray().should.to.be.deep.equal([]);
      N.toSet(v.naturale(3), v.naturale(-3),v.naturale(1)).toArray().should.to.be.deep.equal([]);
      N.toSet(v.naturale(3), v.naturale(2),v.naturale(1)).toArray().should.to.be.deep.equal([]);
      expect(() => N.toSet(v.naturale(3), v.naturale(3),v.naturale(0))).to.throw();
    });

  });
  
});
