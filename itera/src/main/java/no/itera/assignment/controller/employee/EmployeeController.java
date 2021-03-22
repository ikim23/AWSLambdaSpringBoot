package no.itera.assignment.controller.employee;

import no.itera.assignment.entity.employee.Employee;
import no.itera.assignment.service.EmployeeService;
import no.itera.assignment.utils.BaseController;
import no.itera.assignment.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/employee")
public class EmployeeController extends BaseController {
    @Autowired
    private EmployeeService service;

    /**
     * @param personId employee's personal id
     * @return employee
     */
    @GetMapping("/{personId}")
    public Response<EmployeeDto> fetchEmployeeByPersonId(@PathVariable Integer personId) {
        Optional<Employee> maybePerson = service.getEmployee(personId);

        if (maybePerson.isEmpty())
            return notFound("Employee with id " + personId + " was not found");

        EmployeeDto dto = entityToDto(maybePerson.get());

        return ok(dto);
    }

    /**
     * @return list of active employees (employees that still work for the company)
     */
    @GetMapping("/active")
    public Response<List<EmployeeDto>> fetchAllActiveEmployees() {
        List<EmployeeDto> activeEmployees = service.getActiveEmployees()
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());

        return ok(activeEmployees);
    }

    /**
     * @return list of grouped active employees
     */
    @GetMapping("/active/by-department")
    public Response<Map<String, List<EmployeeDto>>> fetchActiveEmployeesByDepartment() {
        Map<String, List<Employee>> activeEmployeesByDepartment = service.getActiveEmployeesByDepartment();

        Map<String, List<EmployeeDto>> dto = new HashMap<>();
        for (Map.Entry<String, List<Employee>> entry : activeEmployeesByDepartment.entrySet())
            dto.put(entry.getKey(), entry.getValue().stream().map(this::entityToDto).collect(Collectors.toList()));

        return ok(dto);
    }

    private EmployeeDto entityToDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setName(employee.getPerson().getName());
        dto.setAge(employee.getPerson().getAge());
        dto.setDepartmentName(employee.getDepartment().getName());
        dto.setStartDate(employee.getStartDate());
        dto.setEndDate(employee.getEndDate());
        return dto;
    }
}
