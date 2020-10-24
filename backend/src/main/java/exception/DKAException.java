package exception;

import org.springframework.stereotype.Component;

@Component
public class DKAException {
    
    public static class DKANotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public DKANotFoundException(Long id) {
            super("Could not find the DKA with the ID " + id);
        }
    }

}
