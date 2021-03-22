package no.itera.assignment.entity.employee;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class EmployeeTests {
    @Test
    public void activeEmployee() {
        Employee employee = new Employee();

        assertTrue(employee.isActive());
    }
}
