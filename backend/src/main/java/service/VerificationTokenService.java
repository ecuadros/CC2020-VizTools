package service;

import java.util.*;
import java.sql.Timestamp;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import exception.TokenException.*;
import model.User;
import model.VerificationToken;
import repository.VerificationTokenRepository;
import static security.Constants.*;

@Service
@Transactional
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepository repository;

    @Autowired
    private UserService userService;

    public VerificationToken findById(Long id) {
        Optional<VerificationToken> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new TokenNotFoundException(id);
        }

        return itemOp.get();
    }

    public VerificationToken findByToken(String token) {
        Optional<VerificationToken> itemOp = repository.findByToken(token);

        if (!itemOp.isPresent()) {
            throw new TokenNotFoundException();
        }

        return itemOp.get();
    }
    
    public VerificationToken create(Long userId) {
        VerificationToken item = new VerificationToken();
        item.setToken(UUID.randomUUID().toString());
        
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Timestamp(calendar.getTime().getTime()));
        calendar.add(Calendar.MINUTE, VERIFICATION_TOKEN_VALIDITY_MINUTES);
        item.setExpiryDate(new Date(calendar.getTime().getTime()));

        User user = userService.findById(userId);
        item.setUser(user);

        return repository.save(item);
    }

    public void activateAccount(String token) {
        VerificationToken verificationToken = findByToken(token);
        Date currentDate = new Date();
        Date expiryDate = verificationToken.getExpiryDate();

        if (currentDate.after(expiryDate)) {
            delete(verificationToken.getId());
            throw new ExpiredTokenExeception();
        }

        User user = verificationToken.getUser();
        userService.activateUser(user.getId());
        delete(verificationToken.getId());
    }

    public void delete(Long id) {
        VerificationToken item = findById(id);
        repository.delete(item);
    }

}
