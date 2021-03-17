/**
 * @author Giuseppe Ferri
 * @copyright 2021 Giuseppe Ferri. All rights reserved.
 * See LICENSE file in root directory for full license.
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