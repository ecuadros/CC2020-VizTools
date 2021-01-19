package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static security.Constants.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String adminEmail;

    private TemplateEngine templateEngine;

    @Autowired
    public void MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    private String generateMailContent(String name, String token) {
        Context context = new Context();
        context.setVariable("frontend_url", FRONTEND_URL);
        context.setVariable("name", name);
        context.setVariable("token", token);

        return templateEngine.process("email-template", context);
    }

    @Async
    public void sendComplexMail(String name, String userEmail, String token) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true);

            helper.setFrom(adminEmail);
            helper.setTo(userEmail);
            helper.setSubject("Complete Registration");
            
            String url = FRONTEND_URL + "/auth/activate-account/" + token;
            String text = generateMailContent(name, url);
            helper.setText(text,true);
            
            helper.addInline("logoacm", new ClassPathResource("acm-ieee.jpg"));

            javaMailSender.send(message);

            logger.info("Mail sent to: {}", userEmail);

        } catch (MessagingException e) {
            logger.error(e.getMessage());
        }
    }

}
