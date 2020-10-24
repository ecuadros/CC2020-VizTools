package exception;

import org.springframework.stereotype.Component;

@Component
public class WeightException {
    
    public static class WeightNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public WeightNotFoundException(Long id) {
            super("Could not find the Weight with the ID " + id);
        }
    }

}
