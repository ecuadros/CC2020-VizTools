package exception;

import org.springframework.stereotype.Component;

@Component
public class UserException {
    
    public static class UserNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public UserNotFoundException(Long id) {
            super("Could not find the User with the ID " + id);
        }
    }

    public static class UserConflictException extends RuntimeException {

        private static final long serialVersionUID = 1L;
        
        public UserConflictException(String email) {
            super("This email (" + email + ") has already been registered");
        }
    }

    public static class UserInfoNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public UserInfoNotFoundException(Long id) {
            super("Could not find the User Info with the ID " + id);
        }
    }

}
