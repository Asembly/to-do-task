package asembly.todotask.service;

import asembly.todotask.dto.CreateTagDto;
import asembly.todotask.entity.Tag;
import asembly.todotask.entity.Task;
import asembly.todotask.repository.TagRepository;
import asembly.todotask.repository.TaskRepository;
import asembly.todotask.util.GeneratorId;
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
    private TagRepository tagRepository;

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

        return ResponseEntity.ok(taskRepository.save(task));
    }

    public ResponseEntity<Tag> addTag(CreateTagDto tagDto, String task_id)
    {
        Task task = taskRepository.findById(task_id).orElseThrow();
        Tag tag = new Tag();
        tag.setName(tagDto.name());
        tag.setColor(tagDto.color());
        tag.setTask(task);
        tag.setId(GeneratorId.generateShortUuid());
        tagRepository.save(tag);
        task.addTag(tag);
        return ResponseEntity.ok(tag);
    }
}