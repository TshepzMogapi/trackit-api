'use strict';

class User {
  
    constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

}

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *        example:
 *           firstName: John
 *           lastName: Doe
 */

module.exports = User;