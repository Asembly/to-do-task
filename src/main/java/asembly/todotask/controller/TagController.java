package asembly.todotask.controller;

import asembly.todotask.entity.Tag;
import asembly.todotask.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tag")
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<List<Tag>> findAll()
    {
        return tagService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tag> findById(@PathVariable String id)
    {
        return tagService.findById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id)
    {
        return tagService.delete(id);
    }
}
