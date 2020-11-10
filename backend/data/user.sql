INSERT INTO public.role(id, name) VALUES (1, 'ROLE_USER');
INSERT INTO public.role(id, name) VALUES (2, 'ROLE_PM');
INSERT INTO public.role(id, name) VALUES (3, 'ROLE_ADMIN');

INSERT INTO public.users(id, email, password, name, last_name) VALUES (1, 'admin@cs.com', '$2a$10$5kJmRwMcOZLCjC1ZB56HB.aJCB9wktE593b58EYdDDsaZOhBgWGIi', 'Admin', 'CS');

INSERT INTO public.user_roles(user_id, role_id) VALUES (1, 3);

ALTER SEQUENCE role_id_seq RESTART WITH 4;
ALTER SEQUENCE users_id_seq RESTART WITH 2;