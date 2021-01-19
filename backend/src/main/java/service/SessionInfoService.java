package service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import model.SessionInfo;
import model.User;
import repository.SessionInfoRepository;

@Service
@Transactional
public class SessionInfoService {

    @Autowired
    private SessionInfoRepository repository;

    @Autowired
    private UserService userService;

    public SessionInfo findByUser(Long userId) {
        User user = userService.findById(userId);

        if (user.getSessionInfo() == null) {
            SessionInfo item = new SessionInfo();
            user.setSessionInfo(item);
        }

        return user.getSessionInfo();
    }

    public SessionInfo save(SessionInfo item) {
        return repository.save(item);
    }

}
