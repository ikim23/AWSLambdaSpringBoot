package no.itera.assignment.entity.employee;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EmployeeId implements Serializable {
    private static final long serialVersionUID = -7295028846641187028L;

    @Column(nullable = false)
    private int personId;

    @Column(nullable = false)
    private int departmentId;

    EmployeeId() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmployeeId that = (EmployeeId) o;
        return personId == that.personId && departmentId == that.departmentId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(personId, departmentId);
    }
}
