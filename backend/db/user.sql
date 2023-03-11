-- Password: "qwerty"
INSERT INTO public._user(id, email, password, first_name, last_name, is_account_non_locked, is_enabled, role) VALUES (1, 'computing.curricula@gmail.com', '$2a$10$5kJmRwMcOZLCjC1ZB56HB.aJCB9wktE593b58EYdDDsaZOhBgWGIi', 'Admin', 'CS', true, true, 'ADMIN')

ALTER SEQUENCE _user_id_seq RESTART WITH 2