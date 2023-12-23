/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



import * as v from "../lib/index";
import { expect, should } from 'chai';
should();
 
 
  describe(`modulo print`, function() {

    let
      a = `1,2,3,4,5`,
      b = `1,2,3\n4,5,6`,
      c = `22`,
      d = `1,2,3,4\n1,2\n1,2,3,4,5\n1,2`;

    it(``, function() {
      
      ("|" + v.printOnOneLine(d,' + ',b,' - ',c,' = ',a) + "|")
        .should.to.be
        .equal(`|1,2,3,4                           \n1,2       + 1,2,3 - 22 = 1,2,3,4,5\n1,2,3,4,5   4,5,6                 \n1,2                               |`);
      
      ("|" + v.printOnOneLine(b,' - ',b) + "|")
        .should.to.be
        .equal(`|1,2,3 - 1,2,3\n4,5,6   4,5,6|`);

      ("|" + v.printOnOneLine('+') + "|")
      .should.to.be
      .equal(`|+|`);

      ("|" + v.printOnOneLine('') + "|")
      .should.to.be
      .equal(`||`);

      ("|" + v.printOnOneLine() + "|")
      .should.to.be
      .equal(`||`);

    });

});
