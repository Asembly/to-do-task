package asembly.todotask.service;

import asembly.todotask.dto.SignUpUserDto;
import asembly.todotask.entity.User;
import asembly.todotask.repository.UserRepository;
import asembly.todotask.security.JwtService;
import asembly.todotask.util.GeneratorId;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

    public ResponseEntity<?> signUp(SignUpUserDto userDto)
    {
        if(userRepository.findByUsername(userDto.username()).isPresent())
            return ResponseEntity
                    .badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("user with username: \" + userDto.username() + \" found.");

        User user = new User(
                GeneratorId.generateShortUuid(),
                userDto.username(),
                encoder.encode(userDto.password()),
                userDto.email(),
                null
        );

        return ResponseEntity.ok(userService.create(user));
    }

    public ResponseEntity<String> signIn(User user) {
        User newUser = userRepository.findByUsername(user.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("user with username: " + user.getUsername() + " not found.")
        );


        if (encoder.matches(user.getPassword(), newUser.getPassword()))
        {
            JSONObject userJson = new JSONObject();
            userJson.put("id", newUser.getId());
            userJson.put("username", newUser.getUsername());
            userJson.put("email", newUser.getEmail());

            JSONObject json = new JSONObject();
            json.put("user", userJson);
            json.put("token", jwtService.genJwt(user.getUsername()));
            return ResponseEntity.ok(json.toString());
        }

        return ResponseEntity.badRequest().body("jwt not gen.");
    }
}
