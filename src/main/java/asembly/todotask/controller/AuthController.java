package asembly.todotask.controller;

import asembly.todotask.dto.CreateAccessTokenDto;
import asembly.todotask.dto.LogoutDto;
import asembly.todotask.dto.SignInUserDto;
import asembly.todotask.dto.SignUpUserDto;
import asembly.todotask.entity.User;
import asembly.todotask.service.AuthService;
import asembly.todotask.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/refresh")
    public ResponseEntity<String> updateAccessToken(@RequestBody CreateAccessTokenDto tokenDto)
    {
        return refreshTokenService.updateAccessToken(tokenDto);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> delete(@RequestBody LogoutDto tokenDto)
    {
        return refreshTokenService.delete(tokenDto);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpUserDto user)
    {
        return authService.signUp(user);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestBody SignInUserDto userDto)
    {
        return authService.signIn(userDto);
    }

}
