package asembly.todotask.service;

import asembly.todotask.entity.Task;
import asembly.todotask.repository.TaskRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class TaskService {

    private TaskRepository taskRepository;

    public ResponseEntity<List<Task>> findAll()
    {
        return ResponseEntity.ok(taskRepository.findAll());
    }

    public ResponseEntity<Task> findById(String id)
    {
        return ResponseEntity.ok(taskRepository.findById(id).orElseThrow());
    }

    public ResponseEntity<String> delete(String id)
    {
        Task task = taskRepository.findById(id).orElseThrow();
        taskRepository.delete(task);
        return ResponseEntity.ok("task success deleted");
    }

    public ResponseEntity<Task> patch(Task newTask, String id)
    {
        Task task = taskRepository.findById(id).orElseThrow();

        if(newTask == null)
            throw new IllegalStateException("user is null");

        if(newTask.getTitle() != null)
            task.setTitle(newTask.getTitle());

        if(newTask.getProgress() != null)
            task.setProgress(newTask.getProgress());

        return ResponseEntity.ok(taskRepository.save(task));
    }

}
