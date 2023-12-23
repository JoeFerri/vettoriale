/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */




 import { iToArray } from "./operatori";



 
/**
 * SSet estende la classe Set<T> con una funzione toArray().
 * 
 * @template T 
 */
 export class SSet<T> extends Set<T> implements iToArray<T> {
  toArray() : T[] {
    return [...this];
  }
}
