package org.acm.viztools.service.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EmailService {

	@Value("${spring.mail.username}")
	private String ADMIN_EMAIL;

	@Value("${viztools.frontend.url}")
	private String FRONTEND_URL;

	private final JavaMailSender javaMailSender;

	private final TemplateEngine templateEngine;

	private String generateMailContent(String name, String token) {
		Context context = new Context();
		context.setVariable("frontend_url", FRONTEND_URL);
		context.setVariable("name", name);
		context.setVariable("token", token);

		return templateEngine.process("email-template", context);
	}

	@Async
	public void sendVerificationEmail(String name, String email, String token) {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = null;

		try {
			helper = new MimeMessageHelper(message, true, "UTF-8");

			helper.setFrom(ADMIN_EMAIL, "ACM-IEEE VizTools");
			helper.setTo(email);
			helper.setSubject("Complete Registration");

			String url = FRONTEND_URL + "/auth/activate-account/" + token;
			String text = generateMailContent(name, url);

			helper.setText(text, true);
			helper.addInline("logoacm", new ClassPathResource("images/acm-ieee.jpg"));

			javaMailSender.send(message);

		} catch (Exception e) {
			throw new RuntimeException("Error sending email");
		}
	}

}
