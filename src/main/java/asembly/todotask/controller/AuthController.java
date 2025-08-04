package asembly.todotask.controller;

import asembly.todotask.entity.User;
import asembly.todotask.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("sign-up")
    public ResponseEntity<User> signUp(@RequestBody User user)
    {
        return authService.signUp(user);
    }

    @PostMapping("sign-in")
    public ResponseEntity<String> signIn(@RequestBody User user)
    {
        return authService.signIn(user);
    }

}
