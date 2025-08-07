package asembly.todotask;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class AppApplicationTests {

	private static final Logger log = LoggerFactory.getLogger(AppApplicationTests.class);

	@Test
	void contextLoads() {
		log.info("spring boot is started\u001B[32m");
	}

}
