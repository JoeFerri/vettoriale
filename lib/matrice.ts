/**
 * @author Giuseppe Ferri
 * @copyright 2021 Giuseppe Ferri. All rights reserved.
 * See LICENSE file in root directory for full license.
 */




import { Naturale, isNaturale, Reale, reale } from "./numeri";
import { Vettore, VettoreRiga, VettoreColonna } from "./spazio-vettoriale";




/**
 * Utilizzata dal metodo Matrice.mappa()
 */
const enum fnMap {
  SOMMA,
  SOTTRAI,
  MOLTIPLICA
}


/**
 * Astrae il concetto di Matrice.
 * Una Matrice è un generico oggetto su cui siano definite le operazioni
 * di somma tra matrici e prodotto matrice per scalare, quindi in questa visione
 * è una estensione della classe Vettore.
 */
export class Matrice extends Vettore<Reale> {

  /**
   * Array di array n×m di reali
   */
  protected matrice: Reale[][];

  protected _n: number; // numero righe
  protected _m: number; // numero colonne

  protected regolare: true | false | undefined; // ogni colonna ha la stessa dimensione
  protected quadrata: true | false | undefined; // n == m and n != 0

  /**
   * Crea una istanza di tipo Matrice.
   * 
   * @param matrice un array di array di reali o numeri in generale
   */
  constructor (matrice: Reale[][] | number[][]) {
    super();

    if ( matrice.length > 0 && typeof matrice[0][0] == "number" ) {
      this.matrice = (matrice as number[][]).map( (riga) => riga.map( (v) => reale(v) ) );
    }
    else this.matrice = (matrice as Reale[][]);

    this._n = matrice.length > 0 && matrice[0].length > 0 ? matrice.length : 0;  // numero righe

    this._m = Infinity; // numero minimo colonne, _m deve essere calcolata se la matrice non è regolare

    let
      flagReg = true, // flag di controllo per la regolarità delle colonne
      dimColonna: number = matrice.length == 0 ? 0 : matrice[0].length;

    for (let riga of matrice) {
      if (riga.length < this._m)
        this._m = riga.length; // in caso i irregolarità, m = min(m0, m1, ..., mk)
      if (dimColonna != riga.length)
        flagReg = false;
    }

    if (this._m == Infinity) // non sono passato per il for
      this._m = 0;

    this.regolare = this._n == 0 && this._m == 0 ? undefined : flagReg;
    this.quadrata = this._n == 0 && this._m == 0 ? undefined : this.regolare && this._n == this._m;
  }

  /**
   * Da la dimensione n, ovvero il numero di righe.
   */
  get n() {
    return this._n;
  }

  /**
   * Da la dimensione m, ovvero il numero delle colonne.
   * Se la matrice non è regolare, m rappresenta il numero di colonne
   * della riga con meno colonne.
   */
  get m() {
    return this._m;
  }

  protected _toRighe(): VettoreRiga[] {
    let righe: VettoreRiga[] = [];
    for (let riga of this.matrice)
      righe.push(new VettoreRiga(riga));
    return righe;
  }

  /**
   * Converte la matrice in un array di vettori riga.
   * 
   * @returns un array di vettori riga
   */
  toRighe(): VettoreRiga[] {
    return this._toRighe();
  }

  protected _toColonne(): VettoreColonna[] {
    let colonne: VettoreColonna[] = [];
    
    for (let j = 0; j < this.m; j++) {
      let colonna: Reale[] = [];
      for (let i = 0; i < this.n; i++)
        colonna.push(this.matrice[i][j]);
      colonne.push(new VettoreColonna(colonna));
    }

    return colonne;
  }

  /**
   * Converte la matrice in un array di vettori colonna.
   * 
   * Nota: se la matrice non è regolare, l'array non coprirà
   *       tutti i componenti della matrice.
   * 
   * @returns un array di vettori colonna 
   */
  toColonne(): VettoreColonna[] {
    return this._toColonne();
  }

  /**
   * Determina se la matrice è regolare.
   * 
   * @returns true se è regolare, undefined se n == m == 0, false altrimenti
   */
  isRegolare() : true | false | undefined {
    return this.regolare;
  }

  /**
   * Determina se la matrice è quadrata.
   * 
   * @returns true se è quadrata, undefined se n == m == 0, false altrimenti
   */
  isQuadrata() : true | false | undefined {
    return this.quadrata;
  }

  /**
   * Funzione di utilità interna per le operazioni algebriche.
   * 
   * @param {Matrice} t: una matrice 
   * @param {fnMap} fn: scelta tra le operazioni eseguibili 
   * @returns una nuova matrice 
   */
  private mappa(t: Matrice | Reale, fn: fnMap): Matrice {

    if (!this.isRegolare() || (t instanceof Matrice && (!t.isRegolare() || this.n != t.n || this.m != t.m )) )
      throw new Error("Le matrici devono essere regolari ed avere lo stesso numero di righe e colonne!");

    let
      matrice: Reale[][] = [],
      riga1: VettoreRiga, riga2: VettoreRiga,
      thisRighe: VettoreRiga[] = this.toRighe(),
      thatRighe: VettoreRiga[] = t instanceof Matrice ? t.toRighe() : [];

    for (let i = 0; i < this.n; i++) {
      riga1 = thisRighe[i];
      
      if (t instanceof Reale)
        matrice.push( riga1.moltiplicaPerScalare(t).toArray() );
      else {
        riga2 = thatRighe[i];

        if (fn == fnMap.SOMMA) {
          matrice.push( riga1.somma(riga2).toArray() );
        }
        if (fn == fnMap.SOTTRAI) {
          matrice.push( riga1.sottrai(riga2).toArray() );
        }
      }
    }
    return new Matrice(matrice);
  }

  somma(t: Matrice): Matrice {
    return this.mappa(t, fnMap.SOMMA);
  }

  sottrai(t: Matrice): Matrice {
    return this.mappa(t, fnMap.SOTTRAI);
  }

  moltiplicaPerScalare(k: Reale): Matrice {
    return this.mappa(k, fnMap.MOLTIPLICA);
  }

  /**
   * Prodotto righe per colonne
   * @param {Matrice} t: una matrice 
   * @returns una nuova matrice 
   */
  moltiplica(t: Matrice): Matrice {

    if (!this.isRegolare() || !t.isRegolare() || this.m != t.n)
      throw new Error("Le matrici devono essere regolari e la seconda matrice deve avere un numero di righe uguale al numero di colonne della prima!");

    let
      matrice: Reale[][] = [],
      thisRighe: VettoreRiga[] = this.toRighe(),
      thatColonne: VettoreColonna[] = t.toColonne();

    for (let riga of thisRighe) {
      let rigaMatrice: Reale[] = [];
      let rRiga: Reale[] = riga.toArray();

      for(let colonna of thatColonne) {
        let rColonna: Reale[] = colonna.toArray();

        rigaMatrice.push( rRiga.reduce( (prev,curr,index) => prev.somma(curr.moltiplica(rColonna[index])), reale(0) ) );
      }

      matrice.push(rigaMatrice);
    }

    return new Matrice(matrice);
  }

  /**
   * Mappa tutti i valori della matrice t in valori del tipo 1/t,
   * quindi effettua una moltiplicazione righe per colonne tra
   * la matrice e t.
   * 
   * @param {Matrice} t: una matrice 
   * @returns una nuova matrice 
   */
  dividi(t: Matrice): Matrice {
    return this.moltiplica( Matrice.byArray( t.toArray().map( (v) => reale(1).dividi(v)),t.n,t.m ) );
  }

  // vedi le applicazioni in Algebra Lineare
  toArray(): Reale[] {
    let lst: Reale[] = [];
    for (let riga of this.matrice)
      lst = lst.concat(riga);
    return lst;
  }

  /**
   * Crea una nuova matrice a partire da un array di reali o numeri generici.
   * 
   * @param {Reale[] | number[]} v: un array di valori 
   * @param {Naturale} n: il numero di righe della nuova matrice 
   * @param {Naturale} m: il numero di colonne della nuova matrice 
   * @returns una matrice n×m
   */
  static byArray(v: Reale[] | number[], n: Naturale | number, m: Naturale | number) : Matrice {

    let
      matrice: Reale[][] = [],
      dimRighe: number = 0, dimColonne: number = 0;

    if ( v.length > 0 && typeof v[0] == "number" ) {
      v = (v as number[]).map( (n) => reale(n) );
    }

    if (n instanceof Naturale) {
      if (isNaturale(n))
        dimRighe = n.valore;
    }
    else dimRighe = n;

    if (m instanceof Naturale) {
      if (isNaturale(m))
      dimColonne = m.valore;
    }
    else dimColonne = m;

    for (let i = 0; i < dimRighe; i++) {
      let riga: Reale[] = [];
      for (let j = 0; j < dimColonne; j++)
        riga.push((v as Reale[])[i * dimColonne + j]);
      matrice.push(riga);
    }

    return new Matrice(matrice);
  }

  /**
   * Crea una nuova matrice a partire da un vettore riga o colonna.
   * 
   * @param {VettoreRiga | VettoreColonna} v: un vettore 
   * @returns una matrice 1×m o n×1
   */
  static byVettoreRC(v: VettoreRiga | VettoreColonna) : Matrice {
    let lst = v.toArray();
    return v instanceof VettoreRiga ? Matrice.byArray(lst, 1, lst.length) : Matrice.byArray(lst, lst.length, 1);
  }

  toString() {
    let max = 0;
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.m; j++)
        max = Math.max(max, this.matrice[i][j].valore.toString().length)

    let s = this.toRighe()
      .map(
        (v) => v.toArray().map( (v) => stringaCentrata(""+v.valore,max) ).join('|')
      )
      .reduce( (prev,curr) => prev + '\n' + curr );

    return s;
  }

}


function stringaCentrata(s: string, max: number) : string {
  let
    r = s,
    sx = Math.floor(max/2),
    i = s.length;
  for (; i <= sx; i++ )
    r = ' ' + r;
  for (; i < max; i++ )
    r += ' ';
  return r;
}
