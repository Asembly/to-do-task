package asembly.todotask.service;

import asembly.todotask.entity.Tag;
import asembly.todotask.repository.TagRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TagService {

    private TagRepository tagRepository;

    public ResponseEntity<List<Tag>> findAll()
    {
        return ResponseEntity.ok(tagRepository.findAll());
    }

    public ResponseEntity<Tag> findById(String id)
    {
        return ResponseEntity.ok(tagRepository.findById(id).orElseThrow());
    }

    public ResponseEntity<String> delete(String id)
    {
        Tag tag = tagRepository.findById(id).orElseThrow();
        tagRepository.delete(tag);
        return ResponseEntity.ok("tag success deleted");
    }
}
