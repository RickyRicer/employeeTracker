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
         pageSize: 12,
         message: 'Which option would you like to select?',
         name: 'choice',
         choices: choices,
         default() {
             return 'View All Departments';
         },
     }]).then((response) => {
         let userChoice = response.choice;
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
         .catch((e) => {
             if (e.isTtyError) {
                 console.log(`Error: Prompt couldn't be rendered`);
             } else {
                 console.log(`Error: ${e}`);
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
                            d.department_name AS department,
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

  const viewAllEmployees = async () => {
    try {
      const employeeSelecter = `SELECT e.id,
                                e.first_name, 
                                e.last_name, 
                                r.title AS 'job title',
                                d.department_name AS department,
                                r.salary AS salary,
                                CONCAT (m.first_name, " ", m.last_name) AS manager
                              FROM employee e
                              LEFT JOIN role r ON e.role_id = r.id 
                              LEFT JOIN department d ON r.department_id = d.id
                              LEFT JOIN employee m ON e.manager_id = m.id;`;
      const [employees] = await connection.query(employeeSelecter);
      console.log(`
      
      #### All Employees ####
      `);
      console.table(employees);
      init();
    } catch (e) {
      console.log(`Error: ${e}`);
      process.exit(); 
    }
  }; 


  const addDepartment = () => {
    inquirer
      .prompt([{
        type: 'input',
        name: 'newDepartment',
        message: "What is the name of the new department?",
      }])
      .then(async (response) => {
        try {
          const departmentInsert = 'INSERT INTO department(department_name) VALUES(?);';
          await connection.query(departmentInsert, [response.newDepartment]);
          console.log(`
          ${response.newDepartment} was added successfully.`);
          viewAllDepartments();
        } catch (e) {
          console.log(`Error: ${e}`);
          process.exit();
        }
      });
  };


  const getDepartments = async () => {
    try {
      const departmentSelecter = 'SELECT department_name, id FROM department;';
      let [departments] = await connection.query(departmentSelecter);
      departments = departments.map(({
        name,
        id
      }) => ({
        name,
        value: id
      }));
      return departments;
    } catch (e) {
      console.log(`Error: ${e}`);
      process.exit(); 
    }
  };

  const addRole = () => {
    inquirer
      .prompt([{
          type: 'input',
          name: 'newRoleName',
          message: 'What is the name of the new role?',
        },
        {
          type: 'input',
          name: 'salaryAmount',
          message: 'What is the salary for this role?',
        },
        {
          type: 'list',
          message: 'Which department does this role belong to?',
          name: 'department',
          choices: getDepartments,
        },
      ]).then(async (response) => {
        try {
          const roleData = [response.newRoleName, Number(response.salaryAmount), response.department];
          const roleInsert = `INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?);`;
          await connection.query(roleInsert, roleData);
          console.log(`
          ${response.newRoleName} was added successfully.`);
          viewAllRoles();
        } catch (e) {
          console.log(`Error: ${e}`);
          process.exit(); 
        }
      })
  };

  const getRoles = async () => {
    try {
      const rolesSelect = `SELECT title, id FROM role;`;
      let [roles] = await connection.query(rolesSelect);
      roles = roles.map(({
        title,
        id
      }) => ({
        name: title,
        value: id
      }));
      return roles;
    } catch (e) {
      console.log(`e: ${e}`);
      process.exit();
    }
  };
  

  const getManagers = async () => {
    try {
      const managersSelecter = `SELECT CONCAT(first_name, " ", last_name) AS name, id FROM employee;`;
      let [managers] = await connection.query(managersSelecter);
      managers = managers.map(({
        name,
        id
      }) => ({
        name,
        value: id
      }));
      return managers;
    } catch (e) {
      console.log(`Error: ${e}`);
      process.exit(); 
    }
  };

  const addEmployee = () => {
    inquirer
      .prompt([{
          type: 'input',
          name: 'first_name',
          message: `Please enter the new employee's first name:`,
        },
        {
          type: 'input',
          name: 'last_name',
          message: `Please enter the new employee's last name:`,
        },
        {
          type: 'list',
          name: 'role',
          message: `What is the new employee's role?`,
          choices: getRoles,
        },
        {
          type: 'list',
          name: 'manager',
          message: `Who is the new employee's manager?`,
          choices: getManagers,
        },
      ]).then(async (response) => {
        try {
          const employeeData = [response.first_name, response.last_name, response.role, response.manager];
          const employeeInsert = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?);`;
          await connection.query(employeeInsert, employeeData);
          console.log(`
          ${response.first_name} ${response.last_name} was added successfully.`);
          viewAllEmployees();
        } catch (e) {
          console.log(`Error: ${e}`);
          process.exit(); 
        }
      })
  };  

  const getEmployees = async () => {
    try {
      const employeesSelect = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name, " - ", r.title) AS name
                              FROM employee e
                              LEFT JOIN role r ON e.role_id = r.id;`;
      let [employees] = await connection.query(employeesSelect);
      employees = employees.map(({
        name,
        id
      }) => ({
        name,
        value: id
      }));
      return employees;
    } catch (e) {
      console.log(`Error: ${e}`);
      process.exit(); 
    }
  };


  const updateEmployeeRole = async () => {
    inquirer
      .prompt([{
          type: 'list',
          name: 'employee',
          message: `Which employee needs a role update?`,
          choices: getEmployees,
        },
        {
          type: 'list',
          name: 'newRole',
          message: `What should the new employee's role be?`,
          choices: getRoles,
        },
      ]).then(async (response) => {
        try {
          const employeeRoleData = [response.newRole, response.employee];
          const employeeRoleUpdate = 'UPDATE employee SET role_id = ? WHERE id = ?;';
          connection.query(employeeRoleUpdate, employeeRoleData);
          console.log(`
          Employee's role was updated successfully.`);
          viewAllEmployees();
        } catch (e) {
          console.log(`Error: ${e}`);
          process.exit();
        }
      })
  };
  
init();