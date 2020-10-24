package exception;

import org.springframework.stereotype.Component;

@Component
public class CountryException {
    
    public static class CountryNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public CountryNotFoundException(Long id) {
            super("Could not find the Country with the ID " + id);
        }
    }

    public static class CountryNullException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public CountryNullException() {
            super("The Country cannot be null");
        }
    }


}
