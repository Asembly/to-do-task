package asembly.todotask.service;

import asembly.todotask.dto.SignInUserDto;
import asembly.todotask.dto.SignUpUserDto;
import asembly.todotask.dto.UserIdDto;
import asembly.todotask.entity.User;
import asembly.todotask.repository.RefreshTokenRepository;
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
    private RefreshTokenService refreshTokenService;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
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

    public ResponseEntity<String> signIn(SignInUserDto userDto) {
        User newUser = userRepository.findByUsername(userDto.username()).orElseThrow(
                () -> new UsernameNotFoundException("user with username: " + userDto.username() + " not found.")
        );

        if(refreshTokenRepository.findTokenByUserId(newUser.getId()).isPresent())
            return ResponseEntity.badRequest().body("User already login");

        var refreshToken = refreshTokenService.generateRefreshToken(newUser.getId()).getBody();

        var accessToken = jwtService.genJwt(userDto.username());

        if (encoder.matches(userDto.password(), newUser.getPassword()))
        {
            JSONObject userJson = new JSONObject();
            userJson.put("id", newUser.getId());
            userJson.put("username", newUser.getUsername());
            userJson.put("email", newUser.getEmail());

            JSONObject json = new JSONObject();
            json.put("user", userJson);
            json.put("access_token", accessToken);
            json.put("refresh_token", refreshToken);
            json.put("expires_at", jwtService.getExpiresAt(accessToken).getTime());
            return ResponseEntity.ok(json.toString());
        }

        return ResponseEntity.badRequest().body("jwt not gen.");
    }
}
