/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */




import { iSommabile, iMoltiplicabile } from "./operatori";




// pubblico
export const enum TipoNumero {
  NUMERO = 1
}


// privato
// in questo modo i tipi seguenti possono essere implementati solo in questo modulo
const enum TipoNumeroPrvt {
  NATURALE = 2,
  INTERO,
  REALE,
}


/**
 * Determina se un numero possiede dei decimali dopo la virgola.
 * 
 * @todo gestire la notazione scientifica (es. 1e-7,1e+7)
 * @param {number} n: il numero da verificare
 * @returns true se n possiede dei decimali, altrimenti false
 */
function hasDecimali(n: number) : true | false {
  // TODO: numeri in notazione scientifica non gestiti (es. 1e-7,1e+7)
  return n.toString().indexOf('.') != -1;
}


/**
 * iNumero astrae il concetto di numero sommabile e moltiplicabile.
 * 
 * Un numero è definito come un oggetto che implementa l'interfaccia iNumero,
 * e che ha quindi un valore e un tipo tra quelli ammissibili.
 * I tipi NATURALE, INTERO e REALE sono esclusivi del modulo numeri, mentre
 * esternamente è possibile utilizzare il tipo generico TipoNumero.NUMERO.
 * 
 * @property {number} valore: il valore del numero
 * @property {TipoNumero} tipo: un tipo tra quelli accettabili
 */
export interface iNumero extends iSommabile<iNumero>, iMoltiplicabile<iNumero> {
  valore: number;
  tipo: TipoNumero | TipoNumeroPrvt;
}


/**
 * Numero rappresenta una parziale implementazione dell'interfaccia iNumero,
 * e quindi può essere visto come un numero astratto utile come base per
 * la costruzione di una classe numerica concreta.
 * Numero è parametrizzato a un generico tipo iNumero T per il quale
 * fornisce metodi generali o astratti.
 * 
 * @template T una classe estensione di iNumero
 * 
 */
export abstract class Numero<T extends iNumero> implements iNumero {

  valore: number;

  tipo: TipoNumero | TipoNumeroPrvt = TipoNumero.NUMERO;

  /**
   * Condizione necessaria affinché il valore del numero abbia senso
   * (ad esempio un numero naturale deve essere un intero maggiore o uguale a 0).
   * 
   * @param {number} n: il valore del numero
   * 
   * @returns true se il valore rispetta la condizione, altrimenti false 
   */
  protected abstract condizione(n: number) : true | false;

  /**
   * Il metodo factory è utilizzato internamente dalla classe
   * che estende concretamente Numero per creare di fatto gli
   * oggetti ritornati dalle funzioni somma(), sottrai(),
   * moltiplica() e dividi().
   * 
   * Nota: poiché Numero è definito come classe astratta e
   *       il tipo ritornato dai metodi sopra citati è un generics T
   *       non sarebbe possibile creare un oggetto di tipo T
   *       senza una factory.
   * 
   * @param {number} n: un numero
   * @returns un numero concreto di tipo T
   */
  protected abstract factory(n: number) : T;

  /**
   * Crea una istanza di tipo Numero.
   * Il valore passato deve rispettare una condizione prefissata.
   * Se il valore passato non rispetta la condizione allora
   * tale valore verrà registrato come NaN.
   * 
   * @param {number} n: il valore del numero 
   */
  protected constructor(n: number | iNumero) {
    this.valore = typeof n == "number" ? n : n.valore;
    if (!this.condizione(this.valore))
      this.valore = NaN;
  }

  somma(t: T) : T {
    let s = this.valore + t.valore;
    return this.factory(s);
  }

  sottrai(t: T) : T {
    let s = this.valore - t.valore;
    return this.factory(s);
  }

  moltiplica(t: T) : T {
    let s = this.valore * t.valore;
    return this.factory(s);
  }

  dividi(t: T) : T {
    let s = this.valore / t.valore;
    return this.factory(s);
  }

  toString() : string {
    return this.valore.toString();
  }
}


/**
 * Naturale concretizza il concetto di numero naturale.
 */
export class Naturale extends Numero<Naturale> {

  tipo: TipoNumeroPrvt = TipoNumeroPrvt.NATURALE;

  protected condizione(n: number) {
    return n >= 0 && !hasDecimali(n);
  }

  protected factory(n: number) : Naturale {
    return new Naturale(n);
  }

  constructor(n: number | iNumero) {
    super(n);
  }
}


/**
 * Intero concretizza il concetto di numero intero.
 */
export class Intero extends Numero<Intero> {

  tipo: TipoNumeroPrvt = TipoNumeroPrvt.INTERO;

  protected condizione(n: number) {
    return !hasDecimali(n);
  }

  protected factory(n: number) : Intero {
    return new Intero(n);
  }

  constructor(n: number | iNumero) {
    super(n);
  }
}


/**
 * Reale concretizza il concetto di numero reale.
 */
export class Reale extends Numero<Reale> {

  tipo: TipoNumeroPrvt = TipoNumeroPrvt.REALE;

  protected condizione(n: number) {
    return true;
  }

  protected factory(n: number) : Reale {
    return new Reale(n);
  }

  constructor(n: number | iNumero) {
    super(n);
  }
}


// funzioni di utilità

/**
 * La funzione naturale() è una alternativa
 * rispetto all'uso esplicito di new.
 * 
 * @param {number|iNumero} n: un numero
 * @returns un numero naturale
 */
export function naturale(n: number | iNumero) {
  return new Naturale(n);
}


/**
 * La funzione intero() è una alternativa
 * rispetto all'uso esplicito di new.
 * 
 * @param {number|iNumero} n: un numero
 * @returns un numero intero
 */
export function intero(n: number | iNumero) {
  return new Intero(n);
}


/**
 * La funzione reale() è una alternativa
 * rispetto all'uso esplicito di new.
 * 
 * @param {number|iNumero} n: un numero
 * @returns un numero reale
 */
export function reale(n: number | iNumero) {
  return new Reale(n);
}


/**
 * La funzione naturali() è una alternativa
 * rispetto all'uso esplicito di più chiamate new.
 * 
 * @param {(number|iNumero)[]} ns: una lista di numeri
 * @returns un array di numeri naturali
 */
export function naturali(...ns: (number | iNumero)[]) : Naturale[] {
  return [...ns].map( (v) => naturale(v) );
}


/**
 * La funzione interi() è una alternativa
 * rispetto all'uso esplicito di più chiamate new.
 * 
 * @param {(number|iNumero)[]} ns: una lista di numeri
 * @returns un array di numeri interi
 */
export function interi(...ns: (number | iNumero)[]) : Intero[] {
  return [...ns].map( (v) => intero(v) );
}


/**
 * La funzione reali() è una alternativa
 * rispetto all'uso esplicito di più chiamate new.
 * 
 * @param {(number|iNumero)[]} ns: una lista di numeri
 * @returns un array di numeri reali
 */
export function reali(...ns: (number | iNumero)[]) : Reale[] {
  return [...ns].map( (v) => reale(v) );
}


// guardie

/**
 * Determina se un numero è un naturale.
 * 
 * Nota: un numero il cui valore è NaN non è considerato naturale
 *       da questa funzione.
 * 
 * @param {iNumero} n: un numero 
 * @returns (is Naturale) se n è un naturale 
 */
export function isNaturale(n: iNumero): n is Naturale {
  return n.tipo === TipoNumeroPrvt.NATURALE && !isNaN((n as Naturale).valore);
}


/**
 * Determina se un numero è un intero.
 * 
 * Nota: un numero il cui valore è NaN non è considerato naturale
 *       da questa funzione.
 * 
 * @param {iNumero} n: un numero 
 * @returns (is Naturale) se n è un intero 
 */
export function isIntero(n: iNumero): n is Intero {
  return n.tipo === TipoNumeroPrvt.INTERO  && !isNaN((n as Intero).valore);
}


/**
 * Determina se un numero è un reale.
 * 
 * Nota: un numero il cui valore è NaN non è considerato naturale
 *       da questa funzione.
 * 
 * @param {iNumero} n: un numero 
 * @returns (is Naturale) se n è un reale (sempre vero in questa libreria) 
 */
export function isReale(n: iNumero): n is Reale {
  return n.tipo === TipoNumeroPrvt.REALE  && !isNaN((n as Reale).valore);
}
