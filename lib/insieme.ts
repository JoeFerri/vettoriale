/**
 * @author Giuseppe Ferri
 * @copyright 2021 Giuseppe Ferri. All rights reserved.
 * See LICENSE file in root directory for full license.
 */




import { Naturale, Intero, Reale, iNumero, isNaturale, isIntero, isReale } from "./numeri";
import { naturale, intero, reale } from "./numeri";
import { ucondizione, iToArray, iToSet } from "./operatori";
import { SSet } from "./set";
import "./array";




/**
 * Un Campo è una struttura algebrica (un insieme) in cui
 * sono definite le operazioni di somma e prodotto.
 * 
 * @template T 
 */
export interface Campo<T> {

  /**
   * Operazione algebrica binaria di somma.
   * 
   * @param {T} a 
   * @param {T} b 
   * @returns a + b 
   */
  somma(a: T, b: T) : T;

  /**
   * Operazione algebrica binaria di prodotto.
   * 
   * @param {T} a 
   * @param {T} b 
   * @returns a * b 
   */
  prodotto(a: T, b: T) : T;
}


/**
 * Determina se un oggetto è un insieme.
 * 
 * @param {any} A: un oggetto 
 * @returns (is Insieme) se A è un insieme 
 */
export function isInsieme(A: any): A is Insieme<any> {
  return A.unione && A.intersezione && A.appartiene && A.modulo != undefined;
}


/**
 * Astrae il concetto di insieme.
 * Un insieme è qui definito come un oggetto in cui siano definite
 * le operazioni di unione(), intersezione(), appartenenza, e sia
 * definita una proprietà modulo.
 * 
 * @template T 
 */
export interface Insieme<T> {

  /**
   * Operazione di unione.
   * @param {Insieme<T>} B: un insieme 
   * @returns un nuovo insieme 
   */
  unione(B: Insieme<T>) : Insieme<T>;

  /**
   * Operazione di intersezione.
   * @param {Insieme<T>} B: un insieme 
   * @returns un nuovo insieme 
   */
  intersezione(B: Insieme<T>) : Insieme<T>;

  /**
   * Operazione di appartenenza.
   * @param {T} t: un elemento 
   * @returns true se t appartiene a questo insieme, altrimenti false 
   */
  appartiene(t: T) : true | false;

  /**
   * Il numero di elementi dell'insieme (finito o infinito).
   */
  modulo : Naturale;
}


/**
 * Effettua l'operazione di unione tra due oggetti di tipo Set<T>.
 * 
 * @param {Set<T>} s1: un insieme 
 * @param {Set<T>} s2: un insieme 
 * 
 * @returns un nuovo oggetto SSet<T>
 */
function unione<T>(s1: Set<T>, s2: Set<T>): SSet<T> {
  let s = new SSet<T>(s1);
  for (let elem of s2) {
    s.add(elem);
  }
  return s;
}


/**
 * Effettua l'operazione di intersezione tra due oggetti di tipo Set<T>.
 * 
 * @param {Set<T>} s1: un insieme 
 * @param {Set<T>} s2: un insieme 
 * 
 * @returns un nuovo oggetto SSet<T>
 */
function intersezione<T>(s1: Set<T>, s2: Set<T>): SSet<T> {
  let s = new SSet<T>();
  for (let elem of s2) {
    if (s1.has(elem)) {
      s.add(elem);
    }
  }
  return s;
}


/**
 * Un Tinsieme è un insieme parametrizzato su un tipo T.
 * 
 * @template T 
 */
export class TInsieme<T> implements Insieme<T>, iToArray<T>, iToSet<T> {

  protected set: SSet<T>;

  /**
   * Crea una istanza di tipo TInsieme.
   * 
   * @param {Iterable<T> | null | undefined} lst: una lista di elementi 
   */
  constructor (lst: Iterable<T> | null | undefined) {
    if (lst == undefined || lst == null)
      this.set = new SSet<T>();
    else
      //? gli elementi sono memorizzati senza rispettare un ordinamento
      this.set = new SSet<T>([...lst].shuffle());
  }

  unione(B: TInsieme<T>): TInsieme<T> {
    return new TInsieme(unione(this.set, B.set));
  }

  intersezione(B: TInsieme<T>): TInsieme<T> {
    return new TInsieme(intersezione(this.set, B.set));
  }

  appartiene(t: T): boolean {
    return this.set.has(t);
  }

  get modulo() : Naturale {
    return naturale(this.set.size);
  }

  /**
   * Converte l'insieme in un oggetto SSet<T>.
   * Più chiamate possono produrre diverse combinazioni degli elementi.
   * 
   * Nota: in generale in un insieme non è definito un ordine tra gli elementi.
   * 
   * @returns un oggetto di tipo SSet<T>
   */
  toSet() : SSet<T> {
    return new SSet(this.set.toArray().shuffle());
  }

  /**
   * Converte l'insieme in un Array<T>.
   * Più chiamate possono produrre diverse combinazioni degli elementi.
   * 
   * Nota: in generale in un insieme non è definito un ordine tra gli elementi.
   * 
   * @returns un Array<T>
   */
  toArray() : T[] {
    return this.set.toArray().shuffle();
  }

  /**
   * Converte l'insieme in una stringa di n elementi.
   * 
   * @param {number} [n] il numero di elementi da stampare 
   * @returns la rappresentazione dell'insieme come stringa 
   */
  toString(n: number = 6) : string {
    let s: T[] = [], lst = this.toArray();
    for (let i = 0; i < lst.length && i < n; i++)
      s.push(lst[i]);
    let coda = lst.length > n ? ", ..." : "";
    return "{" + lst.join(',') + coda + "}";
  }
}


/**
 * Astrae il concetto di insieme numerico, e in particolare di un insieme
 * infinito di numeri.
 * I metodi unione() e intersezione() non sono definiti (e in questa libreria
 * probabilmente non sarebbero definibili).
 * 
 * In un insieme numerico è definito un ordinamento tra gli elementi (numeri).
 * 
 * @template T un tipo numerico
 */
export abstract class InsiemeNumerico<T extends iNumero> implements Insieme<T> {

  // modulo
  private mod: Naturale = naturale(Infinity);

  // non avrei idea di come implementarli :D
  unione(B: Insieme<T>): Insieme<T> {
    throw new Error("Method not implemented.");
  }
  intersezione(B: Insieme<T>): Insieme<T> {
    throw new Error("Method not implemented.");
  }

  appartiene(t: T): boolean  {
    return !isNaN(t.valore);
  }

  get modulo() : Naturale {
    return this.mod;
  }

  /**
   * Crea un sotto-insieme di tipo Set<T> utilizzando gli elementi
   * dell'intervallo [a,b] estremi inclusi, saltando un numero di elementi pari
   * al parametro passo, escludendo gli elementi che non soddisfino una
   * eventuale condizione.
   * 
   * Se passo è un numero negativo, saranno considerati gli elementi
   * dell'intervallo [a,b] partendo da b e spostandosi verso a dal
   * più grande al più piccolo.
   * 
   * @param {T} a: elemento numerico più piccolo 
   * @param {T} b: elemento numerico più grande 
   * @param {T} passo: distanza numerica tra un elemento e l'altro 
   * @param {ucondizione<T>} [condizione] opzionale
   * 
   * @returns un sotto-insieme finito di tipo Set<T>
   */
  abstract toSet(a: T, b: T, passo: T, condizione?: ucondizione<T>) : SSet<T>;

  /**
   * Crea un sotto-insieme di tipo Array<T> utilizzando gli elementi
   * dell'intervallo [a,b] estremi inclusi, saltando un numero di elementi pari
   * al parametro passo, escludendo gli elementi che non soddisfino una
   * eventuale condizione.
   * 
   * Se passo è un numero negativo, saranno considerati gli elementi
   * dell'intervallo [a,b] partendo da b e spostandosi verso a dal
   * più grande al più piccolo.
   * 
   * Nota: gli elementi dell'array ritornato saranno rispettivamente
   *       in ordine crescente o decrescente in base al passo positivo o negativo.
   * 
   * @param {T} a: elemento numerico più piccolo 
   * @param {T} b: elemento numerico più grande 
   * @param {T} passo: distanza numerica tra un elemento e l'altro 
   * @param {ucondizione<T>} [condizione] opzionale
   * 
   * @returns un sotto-insieme finito di tipo Array<T>
   */
  abstract toArray(a: T, b: T, passo: T, condizione?: ucondizione<T>) : T[];

}


/**
 * Astrae il concetto di insieme dei numeri naturali.
 */
export class Naturali extends InsiemeNumerico<Naturale> {

  appartiene(n: Naturale): boolean  {
    return isNaturale(n);
  }

  toSet(a: Naturale, b: Naturale, passo: Naturale, condizione?: ucondizione<Naturale>): SSet<Naturale> {
    return new SSet(this.toArray(a,b,passo,condizione));
  }

  toArray(a: Naturale, b: Naturale, passo: Naturale, condizione?: ucondizione<Naturale>): Naturale[] {
    return numericoToArray<Naturale>(naturale, a, b, passo, condizione);
  }
}


/**
 * Astrae il concetto di insieme dei numeri interi.
 */
export class Interi extends InsiemeNumerico<Intero> {

  appartiene(n: Intero): boolean  {
    return isIntero(n);
  }

  toSet(a: Intero, b: Intero, passo: Intero, condizione?: ucondizione<Intero>): SSet<Intero> {
    return new SSet(this.toArray(a,b,passo,condizione));
  }

  toArray(a: Intero, b: Intero, passo: Intero, condizione?: ucondizione<Intero>): Intero[] {
    return numericoToArray<Intero>(intero, a, b, passo, condizione);
  }
}


/**
 * Astrae il concetto di insieme dei numeri reali.
 * 
 * Nota: l'insieme dei numeri reali è un Campo.
 */
export class Reali extends InsiemeNumerico<Reale> implements Campo<Reale> {

  appartiene(n: Reale): boolean  {
    return isReale(n);
  }

  somma(a: Reale, b: Reale): Reale {
    return a.somma(b);
  }

  prodotto(a: Reale, b: Reale): Reale {
    return a.moltiplica(b);
  }

  toSet(a: Reale, b: Reale, passo: Reale, condizione?: ucondizione<Reale>): SSet<Reale> {
    return new SSet(this.toArray(a,b,passo,condizione));
  }

  toArray(a: Reale, b: Reale, passo: Reale, condizione?: ucondizione<Reale>): Reale[] {
    return numericoToArray<Reale>(reale, a, b, passo, condizione);
  }
}


/**
 * L'insieme ℕ.
 */
export let N = new Naturali();

/**
 * L'insieme ℤ.
 */
export let Z = new Interi();

/**
 * L'insieme ℝ.
 */
export let R = new Reali();


/**
 * Funzione di utilità per la generazione di un array di numeri a partire
 * da un insieme numerico infinito.
 * L'array generato rappresenta un sotto-insieme dell'intervallo [a,b].
 * 
 * @template T 
 * 
 * @param {(n: number) => T} c: funzione factory 
 * @param {T} a: elemento numerico più piccolo 
 * @param {T} b: elemento numerico più grande 
 * @param {T} passo: distanza numerica tra un elemento e l'altro 
 * @param {ucondizione<T>} [condizione] opzionale
 * 
 * @returns un sotto-insieme finito di tipo Array<T>
 */
function numericoToArray<T extends iNumero>(c: (n: number) => T, a: T, b: T, passo: T, condizione?: ucondizione<T>): T[] {

  let
    start = a.valore,
    end   = b.valore,
    step  = passo.valore;

  if (isNaN(start) || isNaN(end) || start > end)
    return [];

  if (step == 0)
    throw new Error("Loop infinito con passo = 0!");

  // se non viene passata una condizione allora considero validi tutti gli elementi
  let cond: ucondizione<T> = (n: T) => true;
  condizione = condizione || cond;

  if (step < 0)
    [start, end] = [end,start];

  // la condizione del for in base al passo minore o maggiore di 0
  let forcond = step > 0 ? (i: number, j: number) => i <= j : (i: number, j: number) => i >= j;

  let lst: T[] = [], n: T;

  for (let i = start; forcond(i,end); i += step)
    if (condizione(n = c(i)))
      lst.push(n)

  return lst;
}
