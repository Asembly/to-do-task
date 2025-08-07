package asembly.todotask.service;

import asembly.todotask.entity.User;
import asembly.todotask.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void findAll()
    {

    }

    @Test
    public void findById(){
        //given

        Mockito.doReturn(getUsers().getFirst()).when(this.userRepository).findById("1");

        //when

        var responseEntity = this.userService.findById("1");

        //then

        Assertions.assertNotNull(responseEntity);
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(MediaType.APPLICATION_JSON, responseEntity.getHeaders().getContentType());
        Assertions.assertEquals(getUsers().getFirst(), responseEntity.getBody());
    }

    private List<User> getUsers()
    {
        User user1 = new User(
                "1","test1",
                "123123","test1@mail.ru",
                null);

        User user2 = new User(
                "2","test2",
                "123123","test2@mail.ru",
                null);

        return List.of(user1,user2);
    }

}
