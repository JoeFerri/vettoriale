/**
 * @author Giuseppe Ferri
 * @copyright 2021 Giuseppe Ferri. All rights reserved.
 * See LICENSE file in root directory for full license.
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
