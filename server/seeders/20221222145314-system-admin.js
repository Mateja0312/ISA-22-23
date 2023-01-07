'use strict';
const bcrypt = require( 'bcrypt' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
<<<<<<< Updated upstream:server/seeders/20221222145314-system-admin.js
      email: 'example@example.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Glavni',
      lastName: 'Arhivator',
      role: 'Admin',
      active: 'active',
=======
      email: 'admin@gmail.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Glavni',
      lastName: 'Arhivator',
      role: 'admin',
      active: 'activated',
>>>>>>> Stashed changes:server/seeders/20221222145314-users.js
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'employee@gmail.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Medicinski',
      lastName: 'Radnik',
<<<<<<< Updated upstream:server/seeders/20221222145314-system-admin.js
      role: 'Employee',
      active: 'active',
=======
      role: 'employee',
      active: 'activated',
>>>>>>> Stashed changes:server/seeders/20221222145314-users.js
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'centeradmin@gmail.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Admin',
      lastName: 'Centra',
<<<<<<< Updated upstream:server/seeders/20221222145314-system-admin.js
      role: 'CenterAdmin',
      active: 'active',
=======
      role: 'employee',
      active: 'activated',
>>>>>>> Stashed changes:server/seeders/20221222145314-users.js
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      createdAt: new Date(),
      updatedAt: new Date()
<<<<<<< Updated upstream:server/seeders/20221222145314-system-admin.js
=======
    },
    {
      email: 'client@gmail.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Blood',
      lastName: 'Bag',
      role: 'client',
      active: 'activated',
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      createdAt: new Date(),
      updatedAt: new Date()
>>>>>>> Stashed changes:server/seeders/20221222145314-users.js
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
