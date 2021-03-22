package no.itera.assignment.service;

import no.itera.assignment.entity.employee.Employee;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface EmployeeService {
    /**
     * Get employee by his/hers personal id
     *
     * @param personalId person id
     * @return employee
     */
    Optional<Employee> getEmployee(int personalId);

    /**
     * Retrieve list of all active employees (Employees that still work for the company).
     *
     * @return list of employees
     */
    List<Employee> getActiveEmployees();

    /**
     * Retrieve list of all active employees organised by their department
     *
     * @return list of grouped active employees
     */
    Map<String, List<Employee>> getActiveEmployeesByDepartment();
}
