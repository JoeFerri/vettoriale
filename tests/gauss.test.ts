/**
 * @author Giuseppe Ferri
 */




 import * as v from "../lib/index";
 import { expect, should } from 'chai';
 should();
 
 
 describe(`modulo gauss`, function() {
 
   let m0 = new v.Matrice([[0]]);
   let m00 = new v.Matrice([[0,0],[0,0]]);
   let m000 = new v.Matrice([[0,0,0],[0,0,0],[0,0,0]]);
 
   let m1 = new v.Matrice([[1]]);
   let m11 = new v.Matrice([[1,1],[1,1]]);
   let m111 = new v.Matrice([[1,1,1],[1,1,1],[1,1,1]]);
 
   let m2 = new v.Matrice([[1,0],[0,1]]);
   let m3 = new v.Matrice([[1,1],[2,2]]);
   let m4 = new v.Matrice([[1,1,2],[2,2,3],[3,3,4]]);
   let m5 = new v.Matrice([[1,2,3]]);
   let m6 = new v.Matrice([[1,2,3,4,5],[1,1,1,2,2],[0,0,0,0,0],[3,3,0,0,2]]);
   let m7 = new v.Matrice([ 
     [1,1,1,2,2,1,3],
     [1,1,2,2,3,3,3],
     [0,2,2,2,2,2,1],
     [3,3,3,3,1,1,2]
   ]);
   let m8 = new v.Matrice([[2],[1],[3],[2]]);
   let m9 = new v.Matrice([[2,2],[1,2],[3,1],[2,3]]);
 
 
   it(``, function() {
 
     console.log(  v.printOnOneLine( m0.toString(), '    →    ', v.gauss(m0).toString() ),     '\n'  );
     v.gauss(m0).toString().should.to.be.equal("||");
 
     console.log( v.printOnOneLine(  m00.toString(), '    →    ', v.gauss(m00).toString() ),   '\n'  );
     v.gauss(m00).toString().should.to.be.equal("||");
 
     console.log(  v.printOnOneLine( m000.toString(), '    →    ', v.gauss(m000).toString() ),'\n'  );
     v.gauss(m000).toString().should.to.be.equal("||");
     
     console.log(  v.printOnOneLine( m1.toString() , '    →    ', v.gauss(m1).toString() ),    '\n'  );
     v.gauss(m1).toString().should.to.be.equal("|1|");
 
     console.log(  v.printOnOneLine( m11.toString(), '    →    ', v.gauss(m11).toString() ),   '\n'  );
     v.gauss(m11).toString().should.to.be.equal("|1|1|");
 
     console.log(  v.printOnOneLine( m111.toString(), '    →    ', v.gauss(m111).toString() ),'\n'  );
     v.gauss(m111).toString().should.to.be.equal("|1|1|1|");
 
     console.log(  v.printOnOneLine( m2.toString() , '    →    ', v.gauss(m2).toString() ),    '\n'  );
     v.gauss(m2).toString().should.to.be.equal("|1|0|\n|0|1|");
 
     console.log(  v.printOnOneLine( m3.toString() , '    →    ', v.gauss(m3).toString() ),    '\n'  );
     v.gauss(m3).toString().should.to.be.equal("|2|2|");
 
     console.log(  v.printOnOneLine( m4.toString() , '    →    ', v.gauss(m4).toString() ),    '\n'  );
     v.gauss(m4).toString().clean(/ /g).should.to.be.equal("|3|3|4|\n|0|0|0.6667|");
     
     console.log(  v.printOnOneLine( m5.toString() , '    →    ', v.gauss(m5).toString() ),    '\n'  );
     v.gauss(m5).toString().clean(/ /g).should.to.be.equal("|1|2|3|");
 
     console.log(  v.printOnOneLine( m6.toString() , '    →    ', v.gauss(m6).toString() ),    '\n'  );
     v.gauss(m6).toString().clean(/ /g).should.to.be.equal("|3|3|0|0|2|\n|0|1|3|4|4.3333|\n|0|0|1|2|1.3333|");
 
     console.log(  v.printOnOneLine( m7.toString() , '    →    ', v.gauss(m7).toString() ),    '\n'  );
     v.gauss(m7).toString().clean(/ /g).should.to.be.equal("|3|3|3|3|1|1|2|\n|0|2|2|2|2|2|1|\n|0|0|1|1|2.6667|2.6667|2.3333|\n|0|0|0|1|1.6667|0.6667|2.3333|");
     
     console.log(  v.printOnOneLine( m8.toString() , '    →    ', v.gauss(m8).toString() ),    '\n'  );
     v.gauss(m8).toString().clean(/ /g).should.to.be.equal("|3|");
 
     console.log(  v.printOnOneLine( m9.toString() , '    →    ', v.gauss(m9).toString() ),    '\n'  );
     v.gauss(m9).toString().clean(/ /g).should.to.be.equal("|3|1|\n|0|2.3333|");
 
   });
 
 });
 