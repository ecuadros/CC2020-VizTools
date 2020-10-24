package exception;

import org.springframework.stereotype.Component;

@Component
public class RoleException {
    
    public static class RoleNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public RoleNotFoundException(Long id) {
            super("Could not find the Role with the ID " + id);
        }
    }

}
