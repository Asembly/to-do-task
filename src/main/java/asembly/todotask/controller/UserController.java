package asembly.todotask.controller;

import asembly.todotask.dto.CreateTaskDto;
import asembly.todotask.entity.Task;
import asembly.todotask.entity.User;
import asembly.todotask.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll()
    {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable String id)
    {
        return userService.findById(id);
    }

    @PostMapping("/{id}/tasks")
    public ResponseEntity<Task> addTask(@PathVariable String id, @RequestBody CreateTaskDto taskDto)
    {
        return userService.addTask(taskDto, id);
    }
}
