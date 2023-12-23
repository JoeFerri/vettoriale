/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */




import { iNumero } from "./numeri";
import { SSet } from "./set";




/**
 * L'oggetto può essere convertito in un array.
 * 
 * @template T 
 */
export interface iToArray<T> {

  /**
   * Converte l'oggetto in un array.
   * @returns un array di tipo T[]
   */
  toArray() : T[];
}


/**
 * L'oggetto può essere convertito in un Set<T>.
 * 
 * @template T 
 */
export interface iToSet<T> {

  /**
   * Converte l'oggetto in un Set<T>.
   * @returns un oggetto di tipo Set<T>
   */
  toSet() : Set<T> | SSet<T>;
}


/**
 * Un oggetto iSommabile<T> può essere sommato ad un oggetto di tipo T.
 * Ad un oggetto iSommabile<T> può essere sottratto un oggetto di tipo T.
 * 
 * Nota: anche se astrae il concetto di somma,
 *       non è richiesto che l'oggetto iSommabile sia un numero.
 * 
 * @template T un tipo qualsiasi
 */
export interface iSommabile<T> {

  /**
   * Somma tra due generici oggetti.
   * @param t 
   * @returns this + t 
   */
  somma(t: T): T;
  
  /**
   * Differenza tra due generici oggetti.
   * @param t 
   * @returns this - t 
   */
  sottrai(t: T): T;
}


/**
 * Un oggetto iMoltiplicabile<T> può essere moltiplicato e diviso per un oggetto di tipo T.
 * 
 * Nota: anche se astrae il concetto di prodotto,
 *       non è richiesto che l'oggetto iMoltiplicabile sia un numero.
 * 
 * @template T un tipo qualsiasi
 */
export interface iMoltiplicabile<T> {
  
  /**
   * Prodotto tra due generici oggetti.
   * @param t 
   * @returns this * t 
   */
  moltiplica(t: T): T;
  
  /**
   * Divisione tra due generici oggetti.
   * @param t 
   * @returns this / t 
   */
  dividi(t: T): T;
}


/**
 * Un oggetto iMoltiplicabilePerScalare<T,K> può essere moltiplicato per un numero scalare di tipo K
 * ritornando un oggetto di tipo T.
 * 
 * Nota: iMoltiplicabilePerScalare astrae il concetto di prodotto per scalare;
 *       non è richiesto che l'oggetto di tipo T sia un numero.
 * 
 * @template T un tipo qualsiasi
 * @template K un tipo numerico (scalare)
 */
export interface iMoltiplicabilePerScalare<T,K extends iNumero> {

  /**
   * Prodotto tra un oggetto e uno scalare.
   * @param k 
   * @returns this * k
   */
  moltiplicaPerScalare(k: K): T;
}


/**
 * Ibop astrae il concetto di operatore binario.
 * 
 * ibop: T × K ⟶ R
 * 
 * @template T 
 * @template K 
 * @template R 
 */
export interface ibop<T,K,R> {
  (t: T, k: K): R;
}


/**
 * trbop astrae il concetto di operatore binario.
 * 
 * trbop: T × T ⟶ R
 * 
 * @template T 
 * @template R 
 */
export interface trbop<T,R> extends ibop<T,T,R> {
  (t1: T, t2: T): R;
}


/**
 * tbop astrae il concetto di operatore binario.
 * 
 * tbop: T × T ⟶ T
 * 
 * @template T
 */
export interface tbop<T> extends ibop<T,T,T> {
  (t1: T, t2: T): T;
}


/**
 * iuop astrae il concetto di operatore unario.
 * 
 * iuop: T ⟶ R
 * 
 * @template T 
 * @template R 
 */
export interface iuop<T,R> {
  (t: T): R;
}


/**
 * tuop astrae il concetto di operatore unario.
 * 
 * tuop: T ⟶ T
 * 
 * @template T
 */
export interface tuop<T> {
  (t: T): T;
}


/**
 * ucondizione astrae il concetto di condizione logica.
 * 
 * ucondizione: T ⟶ {true,false}
 * 
 * @template T 
 */
export interface ucondizione<T> extends iuop<T,  true | false> {
  (t: T) : true | false;
}


/**
 * La funzione somma<T> astrae l'operazione di somma algebrica tra
 * 2 numeri compatibili tra loro.
 * 
 * @param {T} a un numero
 * @param {T} b un numero
 * @returns a + b
 */
export function somma<T extends iNumero>(a: T, b: T) : T | iNumero {
  return a.somma(b);
}


/**
 * La funzione differenza<T> astrae l'operazione di differenza algebrica tra
 * 2 numeri compatibili tra loro.
 * 
 * @param {T} a un numero
 * @param {T} b un numero
 * @returns a - b
 */
export function differenza<T extends iNumero>(a: T, b: T) : T | iNumero{
  return a.sottrai(b);
}


/**
 * La funzione moltiplicazione<T> astrae l'operazione di moltiplicazione algebrica tra
 * 2 numeri compatibili tra loro.
 * 
 * @param {T} a un numero
 * @param {T} b un numero
 * @returns a * b
 */
export function moltiplicazione<T extends iNumero>(a: T, b: T) : T | iNumero {
  return a.moltiplica(b);
}


/**
 * La funzione divisione<T> astrae l'operazione di divisione algebrica tra
 * 2 numeri compatibili tra loro.
 * 
 * @param {T} a un numero
 * @param {T} b un numero
 * @returns a / b
 */
export function divisione<T extends iNumero>(a: T, b: T) : T | iNumero {
  return a.dividi(b);
}
