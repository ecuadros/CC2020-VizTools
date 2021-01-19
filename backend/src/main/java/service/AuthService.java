package service;

import model.User;
import repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service(value = "authService")
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOp = repository.findByEmail(username);
        
        if (!userOp.isPresent()) {
            throw new UsernameNotFoundException("Invalid username or password");
        }

        User user = userOp.get();
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
    }

    private List<GrantedAuthority> getAuthority(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());
        return authorities;
    }

    private String getSessionUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
          username = ((UserDetails) principal).getUsername();
        } else {
          username = principal.toString();
        }

        return username;
    }

    public User getSessionUser() {
        String username = getSessionUsername();
        Optional<User> userOp = repository.findByEmail(username);
        
        if (!userOp.isPresent()) {
            throw new UsernameNotFoundException("Unauthenticated user");
        }

        return userOp.get();
    }

}
