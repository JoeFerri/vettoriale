/**
 * @author Giuseppe Ferri
 */




 import * as v from "../lib/index";
 import { expect, should } from 'chai';
 should();



describe(`modulo numeri`, function() {

  describe(`istanze`, function() {

    let
      numeri = [0, 1, 2, 99, -1, -2, -99, 0.1, 1.0, -0.1, -1.0, Infinity, -Infinity, NaN],
  
      naturali = numeri
        .map( (n) => new v.Naturale(n) )
        .map( (n) => n.valore ),
      interi = numeri
        .map( (n) => new v.Intero(n) )
        .map( (n) => n.valore ),
      reali = numeri
        .map( (n) => new v.Reale(n) )
        .map( (n) => n.valore ),
  
      naturali_out =
        [0, 1, 2, 99, NaN, NaN, NaN, NaN, 1, NaN, NaN, Infinity, NaN, NaN],
      interi_out =
        [0, 1, 2, 99, -1, -2, -99, NaN, 1, NaN, -1, Infinity, -Infinity, NaN],
      reali_out =
        [0, 1, 2, 99, -1, -2, -99, 0.1, 1.0, -0.1, -1.0, Infinity, -Infinity, NaN];
    
    describe(`Naturale`, function() {
      describe(`se l'argomento passato non è un naturale, la proprietà valore deve essere NaN`, function() {
        it(``, function() {
          naturali.should.deep.equal(naturali_out);
          v.naturali(...numeri, ...naturali).map( (n) => n.valore ).should.deep.equal([...naturali_out, ...naturali]);
        });
      });
    });
    
    describe(`Intero`, function() {
      describe(`se l'argomento passato non è un intero, la proprietà valore deve essere NaN`, function() {
        it(``, function() {
          interi.should.deep.equal(interi_out);
          v.interi(...numeri, ...interi).map( (n) => n.valore ).should.deep.equal([...interi_out, ...interi]);
        });
      });
    });
    
    describe(`Reale`, function() {
      describe(`se l'argomento passato non è un reale, la proprietà valore deve essere NaN`, function() {
        it(``, function() {
          reali.should.deep.equal(reali_out);
          v.reali(...numeri, ...reali).map( (n) => n.valore ).should.deep.equal([...reali_out, ...reali]);
        });
      });
    });

  });

  
  describe(`is`, function() {
    
    describe(`#isNaturale(n: iNumero)`, function() {
      describe(`n è un naturale se è un'istanza della classe Naturale e se il suo valore è diverso da NaN`, function() {
        it(``, function() {
          new v.Naturale(0).should.to.have.deep.property('valore', 0);
          v.isNaturale(new v.Naturale(0)).should.to.have.deep.equal(true);
          new v.Naturale(-1).should.to.have.deep.property('valore', NaN);
          v.isNaturale(new v.Naturale(-1)).should.to.have.deep.equal(false);
        });
      });
    });
    
    describe(`#isIntero(n: iNumero)`, function() {
      describe(`n è un intero se è un'istanza della classe Intero e se il suo valore è diverso da NaN`, function() {
        it(``, function() {
          new v.Intero(0).should.to.have.deep.property('valore', 0);
          v.isIntero(new v.Intero(0)).should.to.have.deep.equal(true);
          new v.Intero(0.5).should.to.have.deep.property('valore', NaN);
          v.isIntero(new v.Intero(0.5)).should.to.have.deep.equal(false);
        });
      });
    });
    
    describe(`#isReale(n: iNumero)`, function() {
      describe(`n è un reale se è un'istanza della classe Reale e se il suo valore è diverso da NaN`, function() {
        it(``, function() {
          new v.Reale(0).should.to.have.deep.property('valore', 0);
          v.isReale(new v.Reale(0)).should.to.have.deep.equal(true);
          new v.Reale(NaN).should.to.have.deep.property('valore', NaN);
          v.isReale(new v.Reale(NaN)).should.to.have.deep.equal(false);
        });
      });
    });

  });

  
  describe(`operazioni`, function() {
    
    describe(`naturali`, function() {

      let [a,b,c,d,e,f,g] = v.naturali(0,1,-1,2,3,1.5,Infinity);

      describe(`per i naturali sono ben definite la somma e la moltiplicazione, ma non la differenza e la divisione`, function() {

        describe(`somma`, function() {

          it(``, function() {
            a.somma(a).should.to.have.deep.property('valore', 0);
            b.somma(a).should.to.have.deep.property('valore', 1);
            b.somma(b).should.to.have.deep.property('valore', 2);
            b.somma(c).should.to.have.deep.property('valore', NaN);
            d.somma(e).should.to.have.deep.property('valore', 5);
            d.somma(f).should.to.have.deep.property('valore', NaN);
            b.somma(g).should.to.have.deep.property('valore', Infinity);
          });

        });

        describe(`differenza`, function() {

          it(``, function() {
            a.sottrai(a).should.to.have.deep.property('valore', 0);
            b.sottrai(a).should.to.have.deep.property('valore', 1);
            b.sottrai(b).should.to.have.deep.property('valore', 0);
            b.sottrai(c).should.to.have.deep.property('valore', NaN);
            d.sottrai(e).should.to.have.deep.property('valore', NaN);
            d.sottrai(f).should.to.have.deep.property('valore', NaN);
            b.sottrai(g).should.to.have.deep.property('valore', NaN);
          });

        });

        describe(`moltiplicazione`, function() {

          it(``, function() {
            a.moltiplica(a).should.to.have.deep.property('valore', 0);
            b.moltiplica(a).should.to.have.deep.property('valore', 0);
            b.moltiplica(b).should.to.have.deep.property('valore', 1);
            b.moltiplica(c).should.to.have.deep.property('valore', NaN);
            d.moltiplica(e).should.to.have.deep.property('valore', 6);
            d.moltiplica(f).should.to.have.deep.property('valore', NaN);
            b.moltiplica(g).should.to.have.deep.property('valore', Infinity);
          });

        });

        describe(`divisione`, function() {

          it(``, function() {
            a.dividi(a).should.to.have.deep.property('valore', NaN);
            b.dividi(a).should.to.have.deep.property('valore', Infinity);
            b.dividi(b).should.to.have.deep.property('valore', 1);
            b.dividi(c).should.to.have.deep.property('valore', NaN);
            d.dividi(e).should.to.have.deep.property('valore', NaN);
            d.dividi(f).should.to.have.deep.property('valore', NaN);
            b.dividi(g).should.to.have.deep.property('valore', 0);
          });

        });

      });
    });
    

    describe(`interi`, function() {

      let [a,b,c,d,e,f,g] = v.interi(0,1,-1,2,3,1.5,Infinity);

      describe(`per gli interi sono ben definite la somma, la differenza e la moltiplicazione, ma non la divisione`, function() {

        describe(`somma`, function() {

          it(``, function() {
            a.somma(a).should.to.have.deep.property('valore', 0);
            b.somma(a).should.to.have.deep.property('valore', 1);
            b.somma(b).should.to.have.deep.property('valore', 2);
            b.somma(c).should.to.have.deep.property('valore', 0);
            d.somma(e).should.to.have.deep.property('valore', 5);
            d.somma(f).should.to.have.deep.property('valore', NaN);
            b.somma(g).should.to.have.deep.property('valore', Infinity);
          });

        });

        describe(`differenza`, function() {

          it(``, function() {
            a.sottrai(a).should.to.have.deep.property('valore', 0);
            b.sottrai(a).should.to.have.deep.property('valore', 1);
            b.sottrai(b).should.to.have.deep.property('valore', 0);
            b.sottrai(c).should.to.have.deep.property('valore', 2);
            d.sottrai(e).should.to.have.deep.property('valore', -1);
            d.sottrai(f).should.to.have.deep.property('valore', NaN);
            b.sottrai(g).should.to.have.deep.property('valore', -Infinity);
          });

        });

        describe(`moltiplicazione`, function() {

          it(``, function() {
            a.moltiplica(a).should.to.have.deep.property('valore', 0);
            b.moltiplica(a).should.to.have.deep.property('valore', 0);
            b.moltiplica(b).should.to.have.deep.property('valore', 1);
            b.moltiplica(c).should.to.have.deep.property('valore', -1);
            d.moltiplica(e).should.to.have.deep.property('valore', 6);
            d.moltiplica(f).should.to.have.deep.property('valore', NaN);
            b.moltiplica(g).should.to.have.deep.property('valore', Infinity);
          });

        });

        describe(`divisione`, function() {

          it(``, function() {
            a.dividi(a).should.to.have.deep.property('valore', NaN);
            b.dividi(a).should.to.have.deep.property('valore', Infinity);
            b.dividi(b).should.to.have.deep.property('valore', 1);
            b.dividi(c).should.to.have.deep.property('valore', -1);
            d.dividi(e).should.to.have.deep.property('valore', NaN);
            d.dividi(f).should.to.have.deep.property('valore', NaN);
            b.dividi(g).should.to.have.deep.property('valore', 0);
          });

        });

      });
    });


    
    describe(`reali`, function() {

      let [a,b,c,d,e,f,g] = v.reali(0,1,-1,2,3,1.5,Infinity);

      describe(`per i reali sono ben definite tutte le operazioni algebriche`, function() {

        describe(`somma`, function() {

          it(``, function() {
            a.somma(a).should.to.have.deep.property('valore', 0);
            b.somma(a).should.to.have.deep.property('valore', 1);
            b.somma(b).should.to.have.deep.property('valore', 2);
            b.somma(c).should.to.have.deep.property('valore', 0);
            d.somma(e).should.to.have.deep.property('valore', 5);
            d.somma(f).should.to.have.deep.property('valore', 3.5);
            b.somma(g).should.to.have.deep.property('valore', Infinity);
          });

        });

        describe(`differenza`, function() {

          it(``, function() {
            a.sottrai(a).should.to.have.deep.property('valore', 0);
            b.sottrai(a).should.to.have.deep.property('valore', 1);
            b.sottrai(b).should.to.have.deep.property('valore', 0);
            b.sottrai(c).should.to.have.deep.property('valore', 2);
            d.sottrai(e).should.to.have.deep.property('valore', -1);
            d.sottrai(f).should.to.have.deep.property('valore', 0.5);
            b.sottrai(g).should.to.have.deep.property('valore', -Infinity);
          });

        });

        describe(`moltiplicazione`, function() {

          it(``, function() {
            a.moltiplica(a).should.to.have.deep.property('valore', 0);
            b.moltiplica(a).should.to.have.deep.property('valore', 0);
            b.moltiplica(b).should.to.have.deep.property('valore', 1);
            b.moltiplica(c).should.to.have.deep.property('valore', -1);
            d.moltiplica(e).should.to.have.deep.property('valore', 6);
            d.moltiplica(f).should.to.have.deep.property('valore', 3);
            b.moltiplica(g).should.to.have.deep.property('valore', Infinity);
          });

        });

        describe(`divisione`, function() {

          it(``, function() {
            a.dividi(a).should.to.have.deep.property('valore', NaN);
            b.dividi(a).should.to.have.deep.property('valore', Infinity);
            b.dividi(b).should.to.have.deep.property('valore', 1);
            b.dividi(c).should.to.have.deep.property('valore', -1);
            d.dividi(e).should.to.have.deep.property('valore', 2/3);
            d.dividi(f).should.to.have.deep.property('valore', 2/1.5);
            b.dividi(g).should.to.have.deep.property('valore', 0);
          });

        });

      });
    });


  });

});
