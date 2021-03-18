
import * as v from "./lib/index";
import "./lib/console";




let // creo un po' di matrici
  m     = new v.Matrice([[1,2,3],[2,3,4],[3,4,5]]),
  m0    = new v.Matrice([[0]]),
  m00   = new v.Matrice([[0,0],[0,0]]),
  m000  = new v.Matrice([[0,0,0],[0,0,0],[0,0,0]]),
  
  m11   = new v.Matrice([[1,1],[1,1]]),
  m111  = new v.Matrice([[1,1,1],[1,1,1],[1,1,1]]),
  
  m1 = new v.Matrice([[1,2,3],[1,1,1],[0,0,0]]),
  m2 = new v.Matrice([[0,1,2],[0,1,2],[0,1,2]]),
  m3 = new v.Matrice([[1,2],[1,2],[1,2]]),
  m4 = new v.Matrice([[1,1/2],[1,1/2],[1,1/2]]),
  m5 = new v.Matrice([[0,1,2],[3,4],[5,6,7]]),
  m6    = new v.Matrice([[1,2,3,4,5],[1,1,1,2,2],[0,0,0,0,0],[3,3,0,0,2]]),
  m7    = new v.Matrice([ 
              [1,1,1,2,2,1,3],
              [1,1,2,2,3,3,3],
              [0,2,2,2,2,2,1],
              [3,3,3,3,1,1,2]
            ]),
  m8    = new v.Matrice([[2],[1],[3],[2]]),
  m9    = new v.Matrice([[2,2],[1,2],[3,1],[2,3]]);




// *** Operazioni con le matrici ***

console.print( m000, "   +   ", m000, "   =   ", m000.somma(m000) );
console.print( m111, "   +   ", m111, "   =   ", m111.somma(m111) );
console.print( m2,   "   -   ", m111, "   =   ", m2.sottrai(m111) );
console.print( m1,   "   *   ", m4,   "   =   ", m1.moltiplica(m4) );
console.print( m1,   "   /   ", m3,   "   =   ", m1.dividi(m3) );

//! il metodo moltiplicaPerScalare() vuole un oggetto di tipo Reale
console.print( m1,   "   *   ", 0.5,  "   =   ", m1.moltiplicaPerScalare(v.reale(0.5)) );
console.print( m1,   "   *   ", 0,    "   =   ", m1.moltiplicaPerScalare(v.reale(0)) );




// *** Operazioni con i vettori riga e colonna ***

let vettsRiga = m.toRighe();   // creo un array di vettori riga
let vettsCol  = m.toColonne(); // creo un array di vettori colonna

console.log("----------------------------------\n");
console.print( vettsRiga[0], "   +   ", vettsRiga[0], "   =   ", vettsRiga[0].somma(vettsRiga[0]) );
console.print( vettsRiga[0], "   -   ", vettsRiga[1], "   =   ", vettsRiga[0].sottrai(vettsRiga[1]) );
console.print( vettsRiga[0], "   *   ", 2, "   =   ", vettsRiga[0].moltiplicaPerScalare(v.reale(2)) );

console.print( vettsCol[0], "   +   ", vettsCol[0], "   =   ", vettsCol[0].somma(vettsCol[0]) );
console.print( vettsCol[0], "   -   ", vettsCol[1], "   =   ", vettsCol[0].sottrai(vettsCol[1]) );
console.print( vettsCol[0], "   *   ", 2, "   =   ", vettsCol[0].moltiplicaPerScalare(v.reale(2)) );




// *** Basi canoniche ***

console.log("----------------------------------\n");
console.log("Basi canoniche - Vettori Riga");
console.print( "dim 1 → ", ...commas(v.VettoreRiga.baseCanonica(v.naturale(1))) );
console.print( "dim 2 → ", ...commas(v.VettoreRiga.baseCanonica(v.naturale(2))) );
console.print( "dim 3 → ", ...commas(v.VettoreRiga.baseCanonica(v.naturale(3))) );

console.log("Basi canoniche - Vettori Colonna");
console.print( "dim 1 → ", ...commas(v.VettoreColonna.baseCanonica(v.naturale(1))) );
console.print( "dim 2 → ", ...commas(v.VettoreColonna.baseCanonica(v.naturale(2))) );
console.print( "dim 3 → ", ...commas(v.VettoreColonna.baseCanonica(v.naturale(3))) );


let
  // creo 9 vettori riga
  righe = v.VettoreRiga.baseCanonica(v.naturale(9)),
  // mappo i vettori in array di reali
  righeR = righe.map( u => u.toArray() ),
  // mappo ogni array in una matrice
  base3x3 = righeR.map( u => v.Matrice.byArray(u, v.naturale(3), v.naturale(3) ));

console.log("Basi canoniche - Matrici");
console.print( "dim 9 → ", ...commas(base3x3) );


// *** Esempi di utilizzo dell'algoritmo di Gauss ***

m1 = new v.Matrice([[1]]),
m2 = new v.Matrice([[1,0],[0,1]]),
m3 = new v.Matrice([[1,1],[2,2]]),
m4 = new v.Matrice([[1,1,2],[2,2,3],[3,3,4]]),
m5 = new v.Matrice([[1,2,3]]);

console.log("----------------------------------\n");
console.print( m,     "   (gauss) →   ", v.gauss(m,0.001) );
console.print( m0,    "   (gauss) →   ", v.gauss(m0) );
console.print( m00,   "   (gauss) →   ", v.gauss(m00) );
console.print( m000,  "   (gauss) →   ", v.gauss(m000) );
console.print( m1,    "   (gauss) →   ", v.gauss(m1) );
console.print( m11,   "   (gauss) →   ", v.gauss(m11) );
console.print( m111,  "   (gauss) →   ", v.gauss(m111) );
console.print( m2,    "   (gauss) →   ", v.gauss(m2) );
console.print( m3,    "   (gauss) →   ", v.gauss(m3) );
console.print( m4,    "   (gauss) →   ", v.gauss(m4) );
console.print( m5,    "   (gauss) →   ", v.gauss(m5) );
console.print( m6,    "   (gauss) →   ", v.gauss(m6) );
console.print( m7,    "   (gauss) →   ", v.gauss(m7) );
console.print( m8,    "   (gauss) →   ", v.gauss(m8) );
console.print( m9,    "   (gauss) →   ", v.gauss(m9) );




// Utilità

/**
 * Aggiunge una carattere ',' tra un elemento e l'altro
 * di un generico array.
 */
function commas(a: any[]) : any[] {
  let _a: any[] = [];
  for (let e of a) {
    if (_a.length > 0)
      _a.push(',')
    _a.push(e)
  }
  return _a;
}
