INSERT INTO department (name)
VALUES ('Management'),
      ('Sales'),
      ('Warehouse'),
      ('Reception'),
      ('Human Resources'),
      ('Accounting');


INSERT INTO role (title, salary, department_id)
VALUES ('Regional Manager', 60000, 1),
      ('Salesman', 80000, 2),
      ('Worker', 70000, 3),
      ('Receptionist', 65000, 4),
      ('HR Manager', 75000, 5),
      ('Accountant', 80000, 6),
      


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', 1, null),
      ('Jim', 'Harpert', 2, 1),
      ('David', 'Wallace', 1, null),
      ('Dwight', 'Shrute', 2, 1),
      ('Andy', 'Bernard', 2, 1),
      ('Darryl', 'Philbin', 3, 1),
      ('Roy', 'Anderson', 3, 1),
      ('Jo', 'Bennett', 1, null),
      ('Robert', 'California', 1, null),
      ('Stanley', 'Hudson', 2, 1),
      ('Pam', 'Beasley', 4, 1),
      ('Toby', 'Flenderson', 5, null),
      ('Kevin', 'Melone', 6, 1),
      ('Angela', 'Martin', 6, 1);
