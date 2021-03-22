package no.itera.assignment.entity.employee;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Department {
    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String name;

    Department() {
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
