package asembly.todotask.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity @Data @Table(name = "tasks")
public class Task {
    @Id
    private String id;
    @Column(nullable = false)
    private String title;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "task")
    private List<Tag> tags;

    public void addTag(Tag tag) {
        tags.add(tag);
        tag.setTask(this);
    }
}
