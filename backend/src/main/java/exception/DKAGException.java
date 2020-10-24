package exception;

import org.springframework.stereotype.Component;

@Component
public class DKAGException {
    
    public static class DKAGNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public DKAGNotFoundException(Long id) {
            super("Could not find the DKAG with the ID " + id);
        }
    }

}
