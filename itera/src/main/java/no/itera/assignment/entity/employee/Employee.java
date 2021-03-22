package no.itera.assignment.entity.employee;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
public class Employee {
    @EmbeddedId
    private EmployeeId employeeId;

    @OneToOne
    @MapsId("personId")
    private Person person;

    @OneToOne
    @MapsId("departmentId")
    private Department department;

    @OneToOne
    private EmploymentType employmentType;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column
    private LocalDateTime endDate;

    Employee() {
    }

    public EmployeeId getEmployeeId() {
        return employeeId;
    }

    public Person getPerson() {
        return person;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
    }

    public Department getDepartment() {
        return department;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    /**
     * @return true if employee still works for company
     */
    public boolean isActive() {
        return endDate == null;
    }
}
