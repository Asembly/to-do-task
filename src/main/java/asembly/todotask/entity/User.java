package asembly.todotask.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Entity @Data @Table(name = "users")
@AllArgsConstructor
public class User {
    @Id
    private String id;
    @Column(unique = true, nullable = false)
    @Size(min = 5, max = 10)
    private String username;
    @Size(min = 8, max = 255)
    private String password;
    @Column(unique = true, nullable = false)
    @Email
    private String email;
    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    private List<Task> tasks;

    public void addTask(Task task) {
        tasks.add(task);
        task.setUser(this);
    }

    public User(){}
}
