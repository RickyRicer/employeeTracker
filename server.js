const connection = require('./config');
const inquirer = require('inquirer');
require('console.table');

const choices = [
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
                                                                                                          
    ###### #    # #####  #       ####  #   # ###### ######    ##### #####    ##    ####  #    # ###### #####  
    #      ##  ## #    # #      #    #  # #  #      #           #   #    #  #  #  #    # #   #  #      #    # 
    #####  # ## # #    # #      #    #   #   #####  #####       #   #    # #    # #      ####   #####  #    # 
    #      #    # #####  #      #    #   #   #      #           #   #####  ###### #      #  #   #      #####  
    #      #    # #      #      #    #   #   #      #           #   #   #  #    # #    # #   #  #      #   #  
    ###### #    # #      ######  ####    #   ###### ######      #   #    # #    #  ####  #    # ###### #    #                                                                                   
    `)
}

greeting();

const init = async () => {
    await inquirer
     .prompt([{
         type: 'list',
         message: 'Which option would you like to select?',
         name: 'choice',
         choices: choices,
         default() {
             return 'View All Departments';
         },
     }]).then((response) => {
         let userChoice = response.option;
         switch (userChoice){
             //User exits
            case choices[7]:
                console.log('Exiting tracker...');
                connection.end();
                process.exit();
            case choices[0]:
                viewAllDepartments();
                break;
            case choices[1]: // View All Roles
                viewAllRoles();
                break;
            case choices[2]: // View All Employees
                viewAllEmployees();
                break;
            case choices[3]: // Add A Department
                addDepartment();
                break;
            case choices[4]: // Add A Role
                addRole();
                break;
            case choices[5]: // Add An Employee
                addEmployee();
                break;
            case choices[6]: // Update An Employee Role
                updateEmployeeRole();
                break;
            default: // Exit
                console.log('Exiting default...');
                connection.end(); 
                process.exit(); 
            } 
         })
         .catch((error) => {
             if (error.isTtyError) {
                 console.log(`Error: Prompt couldn't be rendered`);
             } else {
                 console.log(`Error: ${error}`);
                 process.exit();
             }
         })
};

const viewAllDepartments = async () => {
    try {
        const departmentSelecter = "SELECT * FROM department ORDER BY id;";
        const [departments] = await connection.query(departmentSelecter);
        console.log(`
        #### All Departments ####
        `);
        console.table(departments);
        init();
    } catch (e) {
        console.log(`Error: ${e}`);
    }
};

const viewAllRoles = async () => {
    try {
      const rolesSelecter = `SELECT r.id,
                            r.title AS 'job title',
                            d.name AS department,
                            r.salary
                          FROM role r
                          LEFT JOIN department d 
                          ON r.department_id = d.id;`;
      const [roles] = await connection.query(rolesSelecter);
      console.log(`
      
      #### All Roles ####
      `);
      console.table(roles);
      init();
    } catch (e) {
      console.log(`Error: ${e}`);
      process.exit(); 
    }
  };

  

init();