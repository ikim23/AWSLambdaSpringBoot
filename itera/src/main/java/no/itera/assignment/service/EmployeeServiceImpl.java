package no.itera.assignment.service;

import no.itera.assignment.entity.employee.Employee;
import no.itera.assignment.entity.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository repository;

    /**
     * Get employee by his/hers personal id
     *
     * @param personalId person id
     * @return employee
     */
    @Override
    public Optional<Employee> getEmployee(int personalId) {
        return repository.findByPersonId(personalId);
    }

    /**
     * Retrieve list of all active employees (Employees that still work for the company).
     *
     * @return list of employees
     */
    @Override
    public List<Employee> getActiveEmployees() {
        return repository.findAllByEndDateIsNull();
    }

    /**
     * Retrieve list of all active employees organised by their department
     *
     * @return list of grouped active employees
     */
    @Override
    public Map<String, List<Employee>> getActiveEmployeesByDepartment() {
        List<Employee> activeEmployees = getActiveEmployees();

        return activeEmployees.stream().collect(Collectors.groupingBy(x -> x.getDepartment().getName()));
    }
}
