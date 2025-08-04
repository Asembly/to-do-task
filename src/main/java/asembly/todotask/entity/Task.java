package asembly.todotask.entity;

import asembly.todotask.type.TaskProgress;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity @Data @Table(name = "tasks")
public class Task {
    @Id
    private String id;
    @Column(nullable = false)
    private String title;
    @Enumerated(EnumType.ORDINAL)
    private TaskProgress progress;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private User user;
}
