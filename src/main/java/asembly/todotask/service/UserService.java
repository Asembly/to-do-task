package asembly.todotask.service;

import asembly.todotask.dto.CreateTaskDto;
import asembly.todotask.entity.Task;
import asembly.todotask.entity.User;
import asembly.todotask.repository.TaskRepository;
import asembly.todotask.repository.UserRepository;
import asembly.todotask.util.GeneratorId;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private TaskRepository taskRepository;

    public ResponseEntity<User> create(User user)
    {
        return ResponseEntity.ok(userRepository.save(user));
    }

    public ResponseEntity<List<User>> findAll()
    {
        return ResponseEntity.ok(userRepository.findAll());
    }

    public ResponseEntity<User> findById(String id){
        return ResponseEntity.ok(userRepository.findById(id).orElseThrow());
    }

    public ResponseEntity<Task> addTask(CreateTaskDto taskDto, String user_id)
    {
        User user = userRepository.findById(user_id).orElseThrow();
        Task task = new Task();
        task.setTitle(taskDto.title());
        task.setUser(user);
        task.setId(GeneratorId.generateShortUuid());
        task.setFinish(false);
        taskRepository.save(task);
        user.addTask(task);
        return ResponseEntity.ok(task);
    }
}
