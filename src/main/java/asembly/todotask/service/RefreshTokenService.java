package asembly.todotask.service;

import asembly.todotask.dto.CreateAccessTokenDto;
import asembly.todotask.dto.LogoutDto;
import asembly.todotask.dto.UserIdDto;
import asembly.todotask.entity.RefreshToken;
import asembly.todotask.entity.User;
import asembly.todotask.repository.RefreshTokenRepository;
import asembly.todotask.repository.UserRepository;
import asembly.todotask.security.JwtService;
import asembly.todotask.util.GeneratorId;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenService {

    @Value("${spring.jwt.refresh_expiration}")
    private Long refreshTokenExpiration;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private JwtService jwtService;

    public ResponseEntity<String> delete(LogoutDto tokenDto)
    {
        var token = refreshTokenRepository.findByToken(tokenDto.refreshToken()).orElseThrow();
        refreshTokenRepository.delete(token);
        return ResponseEntity.ok("Token was delete");
    }

    public ResponseEntity<String> generateRefreshToken(String userId)
    {
        User user = userRepository.findById(userId).orElseThrow();
        var token = new RefreshToken(
                    GeneratorId.generateShortUuid(),
                    user,
                    UUID.randomUUID().toString(),
                    Instant.now().plusMillis(refreshTokenExpiration)
                );

        refreshTokenRepository.save(token);

        return ResponseEntity.ok(token.getToken());
    }

    public ResponseEntity<String> updateAccessToken(CreateAccessTokenDto tokenDto)
    {
        log.info(tokenDto.refreshToken());
        var token = refreshTokenRepository.findByToken(tokenDto.refreshToken()).orElseThrow();

        if(isTokenExpired(token))
        {
            refreshTokenRepository.delete(token);
            return ResponseEntity.badRequest().body("Token was expired. login again");
        }

        String newJwt = jwtService.genJwt(token.getUser().getUsername());

        if(newJwt == null)
            return ResponseEntity.badRequest().body("Token not generated");

        return ResponseEntity.ok(newJwt);
    }

    public boolean isTokenExpired(RefreshToken token) {
        return token.getExpiryDate().isBefore(Instant.now());
    }
}
