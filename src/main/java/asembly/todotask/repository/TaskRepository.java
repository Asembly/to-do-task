package asembly.todotask.repository;

import asembly.todotask.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {}
