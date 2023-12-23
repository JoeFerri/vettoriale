/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



import { CoordinateCartesiane, CoordinatePolari } from "./coordinate";
import { iNumero, Naturale, Reale, reale, isNaturale } from "./numeri";
import { iSommabile, iMoltiplicabilePerScalare, iToArray } from "./operatori";




/**
 * Astrae il concetto di vettore.
 * Un vettore è un generico oggetto su cui siano definite le operazioni
 * di somma tra vettori e prodotto vettore per scalare.
 * 
 * @template K il tipo numerico dei componenti del vettore
 */
export abstract class Vettore<K extends iNumero>
  implements  iSommabile<Vettore<K>>,
              iMoltiplicabilePerScalare<Vettore<K>, K>,
              iToArray<K> {

  abstract somma(t: Vettore<K>): Vettore<K>;

  abstract sottrai(t: Vettore<K>): Vettore<K>;

  abstract moltiplicaPerScalare(k: K): Vettore<K>;
  
  abstract toArray() : K[];
}


/**
 * Utilizzata dal metodo VettoreLstR.mappa()
 */
const enum fnMap {
  SOMMA,
  SOTTRAI,
  MOLTIPLICA
}


/**
 * Factory per istanziare un vettore di classe concreta.
 * 
 * @template T il tipo di vettore da istanziare
 * @param {Naturale | Reale[]} lst: la dimensione del vettore o la lista dei suoi componenti
 */
interface FactoryVettore<T extends Vettore<Reale>> {
  (lst: Naturale | Reale[]) : T;
}


/**
 * La classe VettoreLstR non viene esportata;
 * il suo scopo è quello di classe intermedia tra la classe astratta Vettore
 * e le sue estensioni VettoreRiga e VettoreColonna.
 * 
 * @template T la classe vettore concreta
 */
abstract class VettoreLstR<T extends VettoreLstR<any>> extends Vettore<Reale> {

  /**
   * costruttore per le nuove istanze della classe concreta T
   */
  protected abstract factory: FactoryVettore<T>;

  /**
   * Lista dei componenti del vettore.
   */
  protected lst: Reale[];

  /**
   * Crea una istanza di VettoreLstR.
   * Se lst viene passato come naturale, l'oggetto risultante avrà un
   * numero di componenti pari a lst tutti uguali a 0.
   * Se lst è un array di numeri reali, questi saranno
   * i componenti del vettore creato.
   * 
   * @param {Naturale | Reale[]} lst: la dimensione del vettore o una lista di numeri reali
   */
  constructor (lst: Naturale | Reale[]) {

    super();

    if (lst instanceof Naturale)
      // creo un array di zeri
      this.lst = new Array<Reale>(lst.valore).fill(reale(0));
    else
      // faccio una copia dei componenti
      this.lst = [...lst];
  }

  /**
   * Funzione di utilità interna per le operazioni algebriche.
   * 
   * @param {T} t: un vettore  
   * @param {fnMap} fn: scelta tra le operazioni eseguibili 
   * @returns un nuovo vettore T
   */
  private mappa(t: T | Reale, fn: fnMap): T {
    let lst: Reale[] = [];
    for (let i = 0; i < this.lst.length; i++) {
      // moltiplico per scalare se t è un reale (uno scalare)
      if (t instanceof Reale)
        lst.push(this.lst[i].moltiplica(t));

      // allora t è un vettore
      else {
        if (fn == fnMap.SOMMA)
          lst.push(this.lst[i].somma(t.lst[i]));
        if (fn == fnMap.SOTTRAI)
          lst.push(this.lst[i].sottrai(t.lst[i]));
      }
    }

    return this.factory(lst);
  }

  coordinateCartesiane(): CoordinateCartesiane<Reale> {
    // TODO da implementare
    throw new Error("Method not implemented.");
  }

  coordinatePolari(): CoordinatePolari<Reale> {
    // TODO da implementare
    throw new Error("Method not implemented.");
  }

  /**
   * Norma del vettore.
   * @returns un numero reale
   */
  norma(): Reale {
    // TODO da implementare
    throw new Error("Method not implemented.");
  }

  /**
   * Distanza tra il vettore e t.
   * @param {T} t: un vettore 
   * @returns un numero reale
   */
  distanza(t: T): Reale {
    // TODO da implementare
    throw new Error("Method not implemented.");
  }

  /**
   * @param {T[]} ts: una lista di vettori 
   * @returns true se il vettore è dipendente dai vettori ts
   */
  dipendenteDa(ts: T[]): true | false {
    // TODO da implementare
    throw new Error("Method not implemented.");
  }

  /**
   * @param {T[]} ts: una lista di vettori 
   * @returns true se il vettore è indipendente dai vettori ts
   */
  indipendenteDa(ts: T[]): true | false {
    // TODO da implementare
    throw new Error("Method not implemented.");
  }

  somma(t: T): T {
    return this.mappa(t, fnMap.SOMMA);
  }

  sottrai(t: T): T {
    return this.mappa(t, fnMap.SOTTRAI);
  }

  moltiplicaPerScalare(k: Reale): T {
    return this.mappa(k, fnMap.MOLTIPLICA);
  }
  
  toArray(): Reale[] {
    return [... this.lst];
  }
}


/**
 * Vettore riga
 */
export class VettoreRiga extends VettoreLstR<VettoreRiga> {

  // utilizzata internamente da VettoreLstR
  protected factory: FactoryVettore<VettoreRiga> = (lst: Naturale | Reale[]) => new VettoreRiga(lst);

  /**
   * Crea e ritorna la base canonica di n vettori riga.
   * @param {Naturale} n: il numero di vettori della base 
   * @returns una lista di vettori
   */
  static baseCanonica(n: Naturale) : VettoreRiga[] {

    let
      lst : VettoreRiga[] = [],
      dim = isNaturale(n) ? n.valore : 0, // gestisce NaN
      v: VettoreRiga;

    for (let i = 0; i < dim; i++) {
      v = new VettoreRiga(n);
      v.lst[i] = reale(1);
      lst.push(v);
    }
      
    return lst;
  }

  /**
   * Converte in vettore colonna.
   * @returns un nuovo vettore colonna 
   */
  toVettoreColonna() : VettoreColonna {
    return new VettoreColonna(this.lst);
  }
  
  toString() : string {
    return '|' + this.lst.map( (v) => v.valore ).join(',') + '|';
  }
}


export class VettoreColonna extends VettoreLstR<VettoreColonna> {

  // utilizzata internamente da VettoreLstR
  protected factory: FactoryVettore<VettoreColonna> = (lst: Naturale | Reale[]) => new VettoreColonna(lst);

  /**
   * Crea e ritorna la base canonica di n vettori colonna.
   * @param {Naturale} n: il numero di vettori della base 
   * @returns una lista di vettori
   */
  static baseCanonica(n: Naturale) : VettoreColonna[] {

    let
      lst : VettoreColonna[] = [],
      dim = isNaturale(n) ? n.valore : 0, // gestisce NaN
      v: VettoreColonna;

    for (let i = 0; i < dim; i++) {
      v = new VettoreColonna(n);
      v.lst[i] = reale(1);
      lst.push(v);
    }
      
    return lst;
  }

  /**
   * Converte in vettore riga.
   * @returns un nuovo vettore riga 
   */
  toVettoreRiga() : VettoreRiga {
    return new VettoreRiga(this.lst);
  }
  
  toString() : string {
    return this.lst.map( (v,index) => (index != 0 ? '\n' : '') + '|' + v.valore + '|' ).join('');
  }
}
