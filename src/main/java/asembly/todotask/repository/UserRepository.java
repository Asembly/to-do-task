package asembly.todotask.repository;

import asembly.todotask.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "select * from users where username = :username", nativeQuery = true)
    public Optional<User> findByUsername(String username);
}
