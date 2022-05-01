INSERT INTO department(department_name)
VALUES
    ('Sales'),
    ('Used Cars'),
    ('Service'),
    ('Finance'),
    ('Parts');

INSERT INTO role(title, salary, department_id)
VALUES
    ('General Manager', 1000000, 1),
    ('Sales Manager', 150000, 1),
    ('Vehicle Appraiser', 120000, 2),
    ('Assistant Appraiser', 65000, 2),
    ('Service Director', 260000, 3),
    ('Service Manager', 160000, 3),
    ('Service Advisor', 105000, 3),
    ('Finance Director', 259000, 4),
    ('Finance Manager', 175000, 4),
    ('Parts Manager', 92000, 5),
    ('Parts Rep', 70000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Steve', 'Powers', 1, NULL),
    ('Enrico', 'Burrows', 2, 1),
    ('Rick', 'Ansay', 3, NULL),
    ('Robert', 'Jackson', 4, 3),
    ('Keith', 'Florian', 5, NULL),
    ('Randall', 'Watson', 6, 5),
    ('Jared', 'Chipkin', 7, 5),
    ('Scott', 'Shevlin', 8, NULL),
    ('Andy', 'Benevides', 9, 8),
    ('Scott', 'Sievers', 10, NULL),
    ('Tony', 'Stone', 11, 10);
    