INSERT INTO department(name)
VALUES
    ('Sales'),
    ('Logistics'),
    ('Engineering'),
    ('Finance'),
    ('Support');

INSERT INTO role(title, salary, department_id)
VALUES
    ('Sales Manager', 100000, 1),
    ('Sales Development Rep', 80000, 1),
    ('Logistics Manager', 120000, 2),
    ('Logistics Coordinator', 100000, 2),
    ('Engineering Manager', 260000, 3),
    ('Technical Lead', 180000, 3),
    ('Software Developer', 120000, 3),
    ('Finance Director', 160000, 4),
    ('Accountant', 110000, 4),
    ('Support Team Lead', 92000, 5),
    ('Support Engineer', 70000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Alex', 'Hartman', 1, NULL),
    ('Cobie', 'Flores', 2, 1),
    ('Gracie', 'Hewitt', 3, NULL),
    ('Kirk', 'French', 4, 3),
    ('Kamil', 'Singh', 5, NULL),
    ('Amani', 'Brown', 6, 5),
    ('Emile', 'Crane', 7, 5),
    ('Jena', 'Huff', 8, NULL),
    ('Arandeep', 'Nguyen', 9, 8),
    ('Vicki', 'Plant', 10, NULL),
    ('Jadene', 'Blackmore', 11, 10);
    