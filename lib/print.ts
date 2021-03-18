/**
 * @author Giuseppe Ferri
 * @copyright 2021 Giuseppe Ferri. All rights reserved.
 * See LICENSE file in root directory for full license.
 */




/**
 * Compatta una lista di stringhe passate come argomenti
 * ritornando un'unica stringa.
 * 
 * @param {string[]} strs: una lista di stringhe 
 * @returns una nuova stringa
 */
export function printOnOneLine(...strs: string[]) {

  // riempie una stringa s di max spazi a destra
  function fill(s: string, max: number) {
    let r = s;
    
    for (let i = s.length; i < max; i++)
      r += ' ';

    return r;
  }

  let
    a: string[][] = [],       // a[i][j] è una sottostringa della matrice di stampa n×m
    maxRighe: number = 0,     // dimensione n della matrice
    lenRighe: number[] = [],  // numero massimo di caratteri di una riga a[i]
    ss: string[],
    matrice: string[][] = []; // matrice di supporto

  // scorro i parametri e taglio sugli "a capo"
  for (let s of strs) {
    // a[i] = [s1, s2, ..., sk] dove k ≤ lenRighe[i]
    a.push(ss = s.split('\n'));
    // aggiorno lenRighe
    lenRighe.push( Math.max( ...(ss.map( v => v.length )) ) );
    // aggiorno maxRighe
    maxRighe = Math.max(maxRighe, ss.length)
  }

  // riempio la matrice di supporto
  for (let i = 0; i < a.length; i++) {
    let riga = [];
    for (let j = 0; j < maxRighe; j++) {
      // top è la prima posizione teorica non vuota
      let top = Math.floor( (maxRighe - a[i].length)/2 );

      if (j >= top && j < (top + a[i].length))
        riga.push( fill( a[i][j-top], lenRighe[i] ) );
      else
        riga.push( new Array(lenRighe[i]).fill(' ').join('') );
    }
    matrice.push(riga);
  }

  let stampa = "";
  // creo la matrice inversa per il terminale
  for (let j = 0; j < maxRighe; j++) {
    let colonna = "";
    for (let i = 0; i < matrice.length; i++) {
      colonna += matrice[i][j];
    }
    stampa += (stampa == "" ? "" : "\n") + colonna;
  }

  return stampa;
}
