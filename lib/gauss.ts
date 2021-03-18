/**
 * @author Giuseppe Ferri
 * @copyright 2021 Giuseppe Ferri. All rights reserved.
 * See LICENSE file in root directory for full license.
 */




 import { Reale, reale } from "./numeri";
 import { Matrice } from "./matrice";
 import { VettoreRiga } from "./spazio-vettoriale";
 
 
 
 
 /**
  * Utilizzato come algoritmo di ordinamento lessicografico tra vettori riga.
  * 
  * @param {Reale[] } r1: un vettore riga di reali 
  * @param {Reale[] } r2: un vettore riga di reali 
  * @returns 0 se r1 == r2, altrimenti un numero negativo o positivo
  *          rispettivamente se r2 < r1, o r2 > r1
  */
 function sortRList(r1: Reale[], r2: Reale[]) : number {
 
   for (let i = 0; i < r1.length; i++)
     if (r1[i].valore != r2[i].valore)
       return r2[i].valore - r1[i].valore;
 
   return 0;
 }
 
 
 /**
  * Utilizzato come filtro.
  * 
  * @param {Reale[]} v: un vettore di reali 
  * @returns true se la somma dei valori in v è diversa da 0, altrimenti false 
  */
 function filterR(v: Reale[]) {
   return v.reduce(
     (prev,curr) => prev.somma(curr), reale(0)
   )
   .valore != 0
 }
 
 
 /**
  * Calcola il numero di zeri a sinistra del primo valore non nullo.
  * 
  * @param {Reale[]} riga: una lista di reali 
  * @returns un numero
  */
 function sx0(riga: Reale[]) : number {
   let lst: number[] = riga.map( v => v.valore ), count = 0;
   for (let i = 0; i < lst.length; i++)
     if (lst[i] == 0)
       count++;
     else
       break;
   return count;
 }
 
 
 /**
  * "L'algoritmo, attraverso l'applicazione di operazioni elementari dette mosse di Gauss,
  *  riduce la matrice in una forma detta a scalini." - Wikipedia
  * 
  * Nota: Non sono affatto sicuro che funzioni per ogni caso...
  * 
  * @todo riscrivere l'algoritmo poiché è stato buttato giu alla buona
  * @param {Matrice} matrice 
  * @param {number} precisione: sia aij il valore alla riga i e colonna j
  *                             se aij > -precisione and aij < precisione
  *                             allora aij viene interpretato uguale a 0
  * @param {number} fixed: massimo numero di cifre dopo la virgola dei valori aij 
  * @returns una nuova matrice a scalini
  */
 export function gauss(matrice: Matrice, precisione: number = 0.000000001, fixed: number = 4) : Matrice {
 
   // caso limite, formalmente non sarebbe una matrice
   if (matrice.n == 0)
     return new Matrice([[]]);
 
   // lavoro su una matrice di reali
   let rrighe: Reale[][] =
         matrice.toRighe()
           .map( (v) => v.toArray() )
           .sort(sortRList) // le righe sono ordinate con ordinamento lessicografico
           .filter(filterR); // elimino i vettori riga nulli (tutti zeri)
   
   // tutte le righe erano vettori riga nulli
   if (rrighe.length == 0)
     return new Matrice([[]]);
 
   // caso base: una sola riga
   if (matrice.n == 1)
     return Matrice.byArray(matrice.toArray(), matrice.n, matrice.m);
 
   // scorro tutte le colonne dopo la prima
   for (let i = 1; i < rrighe.length; i++) {
     // scorro tutte le colonne dalla i-esima in poi
     for (let j = i; j < rrighe.length; j++) {
       // ii è la posizione del pivot da considerare
       let ii = i-1;
       // gestisco il caso in cui ci siano degli zeri a sinistra del pivot
       // scorro la posizione ii verso destra fino a trovare un valore non 0
       while (rrighe[j][ii].valore == 0 && ii < rrighe.length) {
         ii++;
       }
       
       // modifico la riga soltanto se c'è lo stesso numero di zeri a sinistra dei pivot
       // alle righe j e i-1
       if (rrighe[j][ii].valore != 0 && ii < rrighe.length && sx0(rrighe[j]) == sx0(rrighe[i-1])) {
 
         let lambda = rrighe[j][ii].dividi(rrighe[i-1][ii]);
 
         rrighe[j] =
           new VettoreRiga(rrighe[j])
             .sottrai(
               new VettoreRiga(rrighe[i-1])
                 .moltiplicaPerScalare(lambda)
             )
             .toArray()
             .map( v => v.valore > -precisione && v.valore < precisione ? reale(0) : reale( Number( v.valore.toFixed(fixed) ) ) );
       }
     }
     rrighe =
       rrighe.sort(sortRList) // è necessaria?
         .filter(filterR);
   }
 
   return new Matrice(rrighe);
 }
 
 
 export function gaussJordan(matrice: Matrice) : Matrice {
   // TODO da implementare
   throw new Error("Method not implemented.");
 }