/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



import {printOnOneLine} from "./print";

declare global {
  interface Console  {
    /**
     * Metodo di utilità per la stampa su console.
     */
    print: (...strs: any[]) => void;
  }
}

console.print = (...strs: any[]) => console.log(printOnOneLine(...strs.map( s => s != undefined && s != null && s.toString ? s.toString() : (s+"") )),'\n');
