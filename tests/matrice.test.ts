/**
 * @author Giuseppe Ferri
 */




import * as v from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`modulo matrice`, function() {
  
  let mNull = new v.Matrice([[]]);

  let m0 = new v.Matrice([[0]]);
  let m00 = new v.Matrice([[0,0],[0,0]]);
  let m000 = new v.Matrice([[0,0,0],[0,0,0],[0,0,0]]);

  let m11 = new v.Matrice([[1,1],[1,1],[1,1]]);
  let m111 = new v.Matrice([[1,1,1],[1,1,1],[1,1,1]]);

  let m1 = new v.Matrice([[1,2,3],[1,1,1],[0,0,0]]);
  let m2 = new v.Matrice([[0,1,2],[0,1,2],[0,1,2]]);
  let m3 = new v.Matrice([[1,2],[1,2],[1,2]]);
  let m4 = new v.Matrice([[1,1/2],[1,1/2],[1,1/2]]);
  let m5 = new v.Matrice([[0,1,2],[3,4],[5,6,7]]);

  it(`#somma() ; #sottrai()`, function() {

    expect( () => m0.somma(m00) ).to.throw();
    expect( () => m00.somma(m0) ).to.throw();

    m00.somma(m00)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("0,0,0,0");

    m1.somma(m000)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("1,2,3,1,1,1,0,0,0");
      
    m000.somma(m1)
    .toArray()
    .map( (v) => v.valore )
    .join(',')
    .should.to.be.equal("1,2,3,1,1,1,0,0,0");

    m1.sottrai(m000)
    .toArray()
    .map( (v) => v.valore )
    .join(',')
    .should.to.be.equal("1,2,3,1,1,1,0,0,0");

    m000.sottrai(m1)
    .toArray()
    .map( (v) => v.valore )
    .join(',')
    .should.to.be.equal("-1,-2,-3,-1,-1,-1,0,0,0");

    m1.somma(m2)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("1,3,5,1,2,3,0,1,2");

    m1.sottrai(m2)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("1,1,1,1,0,-1,0,-1,-2");

  });

  it(`#moltiplicaPerScalare()`, function() {

    expect( () => m5.moltiplicaPerScalare(v.reale(0)) ).to.throw();

    m1.moltiplicaPerScalare(v.reale(0.5))
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("0.5,1,1.5,0.5,0.5,0.5,0,0,0");

    m1.moltiplicaPerScalare(v.reale(0))
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("0,0,0,0,0,0,0,0,0");

  });

  it(`#moltiplica()`, function() {

    m1.moltiplica(m000)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("0,0,0,0,0,0,0,0,0");

    m1.moltiplica(m111)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("6,6,6,3,3,3,0,0,0");

    m1.moltiplica(m11)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("6,6,3,3,0,0");

    m1.moltiplica(m4)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("6,3,3,1.5,0,0");

  });

  it(`#byArray()`, function() {

    v.Matrice.byArray([1,2,3,3,4,5,6,7,8],3,3)
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("1,2,3,3,4,5,6,7,8");

  });

  it(`#byVettoreRC(VettoreRiga)`, function() {

    v.Matrice.byVettoreRC(new v.VettoreRiga(v.reali(1,2,3,3,4,5,6,7,8)))
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("1,2,3,3,4,5,6,7,8");

  });

  it(`#byVettoreRC(VettoreColonna)`, function() {

    v.Matrice.byVettoreRC(new v.VettoreColonna(v.reali(1,2,3,3,4,5,6,7,8)))
      .toArray()
      .map( (v) => v.valore )
      .join(',')
      .should.to.be.equal("1,2,3,3,4,5,6,7,8");

  });

  it(`#toRighe()`, function() {

    new v.Matrice([[1,2,3],[3,4,5],[6,7,8]]).toRighe()
      .map( (v) => ""+v )
      .reduce( (prev,curr) => prev + '\n' + curr )
      .should.to.be.equal("|1,2,3|\n|3,4,5|\n|6,7,8|");

  });

  it(`#toColonne()`, function() {

    new v.Matrice([[1,2,3],[3,4,5],[6,7,8]]).toColonne()
      .map( (v) => ""+v )
      .reduce( (prev,curr) => prev + '\n--' + curr )
      .should.to.be.equal("|1|\n|3|\n|6|\n--|2|\n|4|\n|7|\n--|3|\n|5|\n|8|");

  });

  it(`#isRegolare()`, function() {

    expect(new v.Matrice([[]]).isRegolare()).to.be.equal(undefined);
    expect(new v.Matrice([[1]]).isRegolare()).to.be.true;
    expect(new v.Matrice([[1,2],[3,4]]).isRegolare()).to.be.true;
    expect(new v.Matrice([[1,2,3],[3,4,5],[6,7,8]]).isRegolare()).to.be.true;
    expect(new v.Matrice([[1,2]]).isRegolare()).to.be.true;
    expect(new v.Matrice([[1,2,3],[3,4,3]]).isRegolare()).to.be.true;
    expect(new v.Matrice([[1,2],[3,4,3]]).isRegolare()).to.be.false;
    expect(new v.Matrice([[1,2,3],[3,4]]).isRegolare()).to.be.false;
    expect(new v.Matrice([[1,2],[3,4,5],[6,7,8]]).isRegolare()).to.be.false;
    expect(new v.Matrice([[1,2,3],[3,4],[6,7,8]]).isRegolare()).to.be.false;
    expect(new v.Matrice([[1,2,3],[3,4,5],[6,7]]).isRegolare()).to.be.false;

  });

  it(`#isQuadrata()`, function() {

    expect(new v.Matrice([[]]).isQuadrata()).to.be.equal(undefined);
    expect(new v.Matrice([[1]]).isQuadrata()).to.be.true;
    expect(new v.Matrice([[1,2],[3,4]]).isQuadrata()).to.be.true;
    expect(new v.Matrice([[1,2,3],[3,4,5],[6,7,8]]).isQuadrata()).to.be.true;
    expect(new v.Matrice([[1,2]]).isQuadrata()).to.be.false;
    expect(new v.Matrice([[1,2,3],[3,4,3]]).isQuadrata()).to.be.false;
    expect(new v.Matrice([[1,2],[3,4,3]]).isQuadrata()).to.be.false;
    expect(new v.Matrice([[1,2,3],[3,4]]).isQuadrata()).to.be.false;
    expect(new v.Matrice([[1,2],[3,4,5],[6,7,8]]).isQuadrata()).to.be.false;
    expect(new v.Matrice([[1,2,3],[3,4],[6,7,8]]).isQuadrata()).to.be.false;
    expect(new v.Matrice([[1,2,3],[3,4,5],[6,7]]).isQuadrata()).to.be.false;

  });

});
