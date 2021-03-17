/**
 * @author Giuseppe Ferri
 * @copyright 2021 Giuseppe Ferri. All rights reserved.
 * See LICENSE file in root directory for full license.
 */



declare global {

  interface String  { // per estendere il prototype di String

    /**
     * Ripulisce la stringa chiamante dalle sottostringhe
     * soluzioni dell'espressione regolare regex,
     * ovvero sostituisce le sottostringhe con stringhe vuote.
     * 
     * Non modifica la stringa chiamante.
     * 
     * @param {RegExp} regex: una espressione regolare
     * @returns una nuova stringa
     */
    clean: (regex: RegExp) => string;
  }

}

String.prototype.clean = function (regex: RegExp) : string {
  return this.replace(regex,'');
}


export {};