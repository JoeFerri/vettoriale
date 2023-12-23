/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



declare global {

  interface Array<T>  { // per estendere il prototype di Array
    
  /**
   * Mescola gli elementi di un array chiamante o dell'array
   * passato come argomento.
   * 
   * Non modifica l'array chiamante.
   * 
   * Utilizza l'algoritmo Fisher–Yates shuffle.
   * 
   * Es. [0,1,2,3].shuffle()   ---> [3,1,0,2]
   * Es. [].shuffle([0,1,2,3]) ---> [3,1,0,2]
   * 
   * @param {T[]} array: un generico array
   * 
   * @see https://javascript.info/task/shuffle
   * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
   * 
   * @returns un nuovo array con gli elementi mescolati
   */
    shuffle: (array?: T[]) => T[];
  }

}

Array.prototype.shuffle = function<T>(array?: T[]) : T[] {

  // shuffle è chiamata come funzione su un array o come un metodo di un array
  array = array != undefined ? [...array] : [...this];

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export {};
