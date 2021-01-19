package exception;

import org.springframework.stereotype.Component;

@Component
public class TokenException {
    
    public static class TokenNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public TokenNotFoundException() {
            super("The token is invalid or has expired");
        }

        public TokenNotFoundException(Long id) {
            super("Could not find the Token with the ID " + id);
        }

        public TokenNotFoundException(String token) {
            super("Could not find the Token (" + token + ")");
        }

    }

    public static class ExpiredTokenExeception extends RuntimeException {

        private static final long serialVersionUID = 1L;

        public ExpiredTokenExeception() {
            super("The token is invalid or has expired");
        }
    }

}
