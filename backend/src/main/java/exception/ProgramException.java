package exception;

import org.springframework.stereotype.Component;

@Component
public class ProgramException {
    
    public static class ProgramNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public ProgramNotFoundException(Long id) {
            super("Could not find the Program with the ID " + id);
        }
    }

    public static class ProgramNullException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public ProgramNullException() {
            super("The Program cannot be null");
        }
    }

}
