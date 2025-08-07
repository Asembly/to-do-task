package asembly.todotask.controller;

import asembly.todotask.dto.CreateTagDto;
import asembly.todotask.entity.Tag;
import asembly.todotask.entity.Task;
import asembly.todotask.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> findAll()
    {
        return taskService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> findById(@PathVariable String id)
    {
        return taskService.findById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id)
    {
        return taskService.delete(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Task> patch(@PathVariable String id, @RequestBody Task task)
    {
        return taskService.patch(task, id);
    }

    @PostMapping("/{id}/tags")
    public ResponseEntity<Tag> addTag(@PathVariable String id, @RequestBody CreateTagDto tagDto)
    {
        return taskService.addTag(tagDto, id);
    }

}
