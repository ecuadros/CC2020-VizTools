package exception;

import org.springframework.stereotype.Component;

@Component
public class UniversityException {
    
    public static class UniversityNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public UniversityNotFoundException(Long id) {
            super("Could not find the University with the ID " + id);
        }
    }

    public static class UniversityNullException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public UniversityNullException() {
            super("The University cannot be null");
        }
    }

}
