package asembly.todotask.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity @Data @Table(name = "tags")
public class Tag {
    @Id
    private String id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String color;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "task_id", nullable = false, referencedColumnName = "id")
    private Task task;
}
