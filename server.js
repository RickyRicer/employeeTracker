const connection = require('./config');
const inquirer = require('inquirer');
require('console.table');

const options = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add A Department',
    'Add A Role',
    'Add An Employee',
    'Update An Employee Role',
    'Exit',
]

const greeting = () => {
    console.log(`
    ***********************************
    *                                 *
    *        Employee Tracker         *
    *                                 *
    ***********************************
    `)
}

greeting();

