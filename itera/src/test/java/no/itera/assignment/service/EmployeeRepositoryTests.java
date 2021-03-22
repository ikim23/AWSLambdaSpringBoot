package no.itera.assignment.service;

import no.itera.assignment.entity.employee.Employee;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureTestDatabase
class EmployeeRepositoryTests {
    @Autowired
    private EmployeeService service;

    @DisplayName("should retrieve single employee by ID")
    @Test
    public void getEmployee() {
        Optional<Employee> employee = service.getEmployee(1);

        assertTrue(employee.isPresent());
        assertThat(employee.get().getPerson().getName(), is("Hasnain Frame"));
        assertThat(employee.get().getDepartment().getName(), is("Technology consulting"));
    }

    @DisplayName("should return empty optional on non-existing employee")
    @Test
    public void getEmployeeWithNoResult() {
        Optional<Employee> employee = service.getEmployee(999);

        assertTrue(employee.isEmpty());
    }

    @DisplayName("should retrieve all active employees")
    @Test
    public void getActiveEmployees() {
        List<Employee> employees = service.getActiveEmployees();

        assertThat(employees, hasSize(17));
    }

    @DisplayName("should retrieve all active employees grouped by department")
    @Test
    public void getActiveEmployeesByDepartment() {
        Map<String, List<Employee>> employees = service.getActiveEmployeesByDepartment();

        assertThat(employees.values(), hasSize(5));
        assertThat(employees.keySet(), hasItems("Management", "Technology consulting", "Quality assurance", "Managed services", "Human resources"));
    }
}
