-- DEPARTMENTS --
INSERT INTO `employees_db`.`department` (`name`) VALUES ('Finance');
INSERT INTO `employees_db`.`department` (`name`) VALUES ('Sales');
INSERT INTO `employees_db`.`department` (`name`) VALUES ('IT');

-- ROLES --
INSERT INTO `employees_db`.`role` (`title`, `salary`, `department_id`) VALUES ('Accountant', '25000.00', '1');
INSERT INTO `employees_db`.`role` (`title`, `salary`, `department_id`) VALUES ('Credit Controller', '30000.00', '1');
INSERT INTO `employees_db`.`role` (`title`, `salary`, `department_id`) VALUES ('Sales Executive', '40000.00', '2');
INSERT INTO `employees_db`.`role` (`title`, `salary`, `department_id`) VALUES ('Developer', '40000.00', '3');

-- EMPLOYEES --
INSERT INTO `employees_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Leon', 'Wheeler', '4');
INSERT INTO `employees_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('John', 'Smith', '3');
INSERT INTO `employees_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Linda', 'Jones', '2');
INSERT INTO `employees_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('James', 'John', '4');
INSERT INTO `employees_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Jane', 'Doe', '1');

UPDATE `employees_db`.`employee` SET `manager_id` = '1' WHERE (`id` = '4');
