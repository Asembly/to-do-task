package asembly.todotask.service;

import asembly.todotask.entity.User;
import asembly.todotask.repository.UserRepository;
import asembly.todotask.security.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AuthService {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtService jwtService;

    public ResponseEntity<User> signUp(User user)
    {
        if(userRepository.findByUsername(user.getUsername()).isPresent())
            throw new IllegalStateException("user with username: " + user.getUsername() + " found.");

        user.setPassword(encoder.encode(user.getPassword()));

        return userService.create(user);
    }

    public ResponseEntity<String> signIn(User user)
    {
        User newUser = userRepository.findByUsername(user.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("user with username: " + user.getUsername() + " not found.")
        );

        if(encoder.matches(user.getPassword(), newUser.getPassword()))
            return ResponseEntity.ok(jwtService.genJwt(user.getUsername()));

        return ResponseEntity.badRequest().body("jwt not gen.");
    }
}
