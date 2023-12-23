/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */




import { iNumero } from "./numeri";




/**
 * Astrae il concetto generico di coordinata di un punto/vettore
 * parametrizzata ad un tipo numerico T.
 * 
 * @template T 
 */
export class Coordinata<T extends iNumero> {
  // TODO da implementare
}


/**
 * Astrae il concetto generico di coordinate di un punto/vettore
 * parametrizzate ad un tipo numerico T.
 * 
 * @template T 
 */
export class Coordinate<T extends iNumero> {
  // TODO da implementare
}


/**
 * Astrae il congetto generico di coordinate cartesiane di un punto/vettore
 * parametrizzate ad un tipo numerico T.
 * 
 * @template T 
 */
export class CoordinateCartesiane<T extends iNumero> extends Coordinate<T> {
  // TODO da implementare
}


/**
 * Astrae il congetto generico di coordinate polari di un punto/vettore
 * parametrizzate ad un tipo numerico T.
 * 
 * @template T 
 */
export class CoordinatePolari<T extends iNumero> extends Coordinate<T> {
  // TODO da implementare
}
