--
-- PostgreSQL database dump
--

-- Dumped from database version 13.8 (Ubuntu 13.8-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: heroku_ext; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA heroku_ext;


ALTER SCHEMA heroku_ext OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Image; Type: TABLE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE TABLE public."Image" (
    id integer NOT NULL,
    url character varying(500) NOT NULL,
    width integer,
    height integer,
    "position" integer,
    "recipeId" integer,
    "cloudinaryPublicId" character varying(255) NOT NULL
);


ALTER TABLE public."Image" OWNER TO udgtkmzwehgahz;

--
-- Name: Image_id_seq; Type: SEQUENCE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE SEQUENCE public."Image_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Image_id_seq" OWNER TO udgtkmzwehgahz;

--
-- Name: Image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udgtkmzwehgahz
--

ALTER SEQUENCE public."Image_id_seq" OWNED BY public."Image".id;


--
-- Name: Ingredient; Type: TABLE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE TABLE public."Ingredient" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "calorieCount" integer
);


ALTER TABLE public."Ingredient" OWNER TO udgtkmzwehgahz;

--
-- Name: Ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE SEQUENCE public."Ingredient_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Ingredient_id_seq" OWNER TO udgtkmzwehgahz;

--
-- Name: Ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udgtkmzwehgahz
--

ALTER SEQUENCE public."Ingredient_id_seq" OWNED BY public."Ingredient".id;


--
-- Name: Recipe; Type: TABLE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE TABLE public."Recipe" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone,
    published boolean DEFAULT false,
    "authorId" integer,
    description character varying(500),
    course character varying(500) NOT NULL,
    "calorieCount" integer,
    "cookingDuration" integer,
    "difficultyRating" integer,
    rating integer
);


ALTER TABLE public."Recipe" OWNER TO udgtkmzwehgahz;

--
-- Name: Recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE SEQUENCE public."Recipe_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Recipe_id_seq" OWNER TO udgtkmzwehgahz;

--
-- Name: Recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udgtkmzwehgahz
--

ALTER SEQUENCE public."Recipe_id_seq" OWNED BY public."Recipe".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    name text
);


ALTER TABLE public."User" OWNER TO udgtkmzwehgahz;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO udgtkmzwehgahz;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udgtkmzwehgahz
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: udgtkmzwehgahz
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO udgtkmzwehgahz;

--
-- Name: Image id; Type: DEFAULT; Schema: public; Owner: udgtkmzwehgahz
--

ALTER TABLE ONLY public."Image" ALTER COLUMN id SET DEFAULT nextval('public."Image_id_seq"'::regclass);


--
-- Name: Ingredient id; Type: DEFAULT; Schema: public; Owner: udgtkmzwehgahz
--

ALTER TABLE ONLY public."Ingredient" ALTER COLUMN id SET DEFAULT nextval('public."Ingredient_id_seq"'::regclass);


--
-- Name: Recipe id; Type: DEFAULT; Schema: public; Owner: udgtkmzwehgahz
--

ALTER TABLE ONLY public."Recipe" ALTER COLUMN id SET DEFAULT nextval('public."Recipe_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: udgtkmzwehgahz
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Image; Type: TABLE DATA; Schema: public; Owner: udgtkmzwehgahz
--

COPY public."Image" (id, url, width, height, "position", "recipeId", "cloudinaryPublicId") FROM stdin;
224	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653991330/recipes/gs75qrhrzhhawmzvx6af.jpg	1075	1291	1	175	recipes/gs75qrhrzhhawmzvx6af
232	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653992278/recipes/wsrlqdxedt8cnegogzas.jpg	1200	1200	\N	172	recipes/wsrlqdxedt8cnegogzas
233	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653992362/recipes/vduhoorm7quienjmjtbn.jpg	924	924	\N	173	recipes/vduhoorm7quienjmjtbn
234	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653992431/recipes/yr4fsribxl4kctfk5zb2.jpg	1776	1332	\N	16	recipes/yr4fsribxl4kctfk5zb2
235	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653992454/recipes/xkvjlvakv6hn1wbjglod.webp	667	1000	1	171	recipes/xkvjlvakv6hn1wbjglod
236	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653992512/recipes/tftx8vzc58bhlayrokor.jpg	1920	1280	0	52	recipes/tftx8vzc58bhlayrokor
237	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653997206/recipes/wzc32joc24y0i8xg9f26.jpg	3000	2001	0	111	recipes/wzc32joc24y0i8xg9f26
238	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653997221/recipes/v4yjtfmadhhjpstfcdhj.jpg	1350	900	0	110	recipes/v4yjtfmadhhjpstfcdhj
239	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653997233/recipes/izaqqf8tnzomu4rc3nxk.jpg	3200	2137	0	47	recipes/izaqqf8tnzomu4rc3nxk
240	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653997259/recipes/wnbaav4gmclsvo8ovnxt.jpg	2473	2473	0	39	recipes/wnbaav4gmclsvo8ovnxt
241	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653997276/recipes/atmr9ofpggg9mpshkqve.jpg	1423	1067	0	6	recipes/atmr9ofpggg9mpshkqve
228	http://res.cloudinary.com/dqnks1cyu/image/upload/v1653991637/recipes/aqoquomfpglsiczwxakd.jpg	1080	1080	2	55	recipes/aqoquomfpglsiczwxakd
243	http://res.cloudinary.com/dqnks1cyu/image/upload/v1654092155/recipes/hmdtnnchivau2biqaj2y.jpg	3200	2137	1	55	recipes/hmdtnnchivau2biqaj2y
244	http://res.cloudinary.com/dqnks1cyu/image/upload/v1654196825/recipes/rvw95cw3lxpofqfegydb.jpg	1024	577	0	\N	recipes/rvw95cw3lxpofqfegydb
245	http://res.cloudinary.com/dqnks1cyu/image/upload/v1654196938/recipes/bgqmcjfwduvp9aezrjjt.webp	1200	1200	0	90	recipes/bgqmcjfwduvp9aezrjjt
246	http://res.cloudinary.com/dqnks1cyu/image/upload/v1654196954/recipes/vncdtu4hokdnnyccjvwl.webp	994	697	0	89	recipes/vncdtu4hokdnnyccjvwl
247	http://res.cloudinary.com/dqnks1cyu/image/upload/v1664964749/recipes/il8fzbl5npx5wvigymzh.jpg	1200	1200	0	198	recipes/il8fzbl5npx5wvigymzh
\.


--
-- Data for Name: Ingredient; Type: TABLE DATA; Schema: public; Owner: udgtkmzwehgahz
--

COPY public."Ingredient" (id, name, "calorieCount") FROM stdin;
\.


--
-- Data for Name: Recipe; Type: TABLE DATA; Schema: public; Owner: udgtkmzwehgahz
--

COPY public."Recipe" (id, name, "createdAt", "updatedAt", published, "authorId", description, course, "calorieCount", "cookingDuration", "difficultyRating", rating) FROM stdin;
175	Red curry	2022-05-24 07:37:44.604	2022-06-01 14:02:12.132	f	\N	Rich and creamy, Thai red Curry has chicken and vegetables. It packs fresh flavours, and you need just 30 minutes to make it. It tastes fantastic when served with Jasmin rice.	lunch	\N	\N	\N	\N
172	Vegetarian Ragu	2022-05-23 18:21:28.69	2022-05-23 20:18:43.382	f	\N	Another nice Italian recipe	dinner	\N	\N	\N	\N
111	Pizza margherita	2022-05-13 17:00:21.323	2022-05-19 18:28:49.982	f	\N	lekkere pizza	lunch	\N	\N	\N	\N
6	Grilled pumpkin	2022-01-05 18:03:04.946	2022-05-11 15:33:10.376	f	\N	Curries are an essential part of Thai cuisine. Colorful, fragrant, and powered with an army of fresh flavors, curries have many versions, but they all follow some basics and they all rely on some vital ingredients to achieve the classic depth of flavor. Green curry is thick, creamy, filling, and bright. Between red, yellow, or green, the latter is one of the most famous and sought-after dishes—beautifully vibrant thanks to the addition of Thai basil, cilantro, and makrut lime leaf and peel.	snack	\N	\N	\N	\N
47	Erwtensoep	2022-01-07 14:30:11.982	2022-05-19 18:32:31.078	f	\N	Met rookworst	lunch	\N	\N	\N	\N
55	Bread	2022-01-13 14:21:51.772	2022-06-01 14:02:39.877	f	\N	Homemade bread from a cast iron pan.	breakfast	\N	\N	\N	\N
110	Salmon in the oven	2022-05-12 20:46:32.011	2022-05-20 09:41:03.422	f	\N	With ricotta, and spinach	lunch	\N	\N	\N	\N
198	Aloo gobi	2022-10-05 09:18:28.838	2022-10-08 07:52:34.551	f	\N	With potato and cauliflower and some delicious spices..	dinner	\N	\N	\N	\N
39	Aardappelgratin	2022-01-07 00:10:15.043	2022-05-13 12:35:46.187	f	\N	lekker!	lunch	\N	\N	\N	\N
52	Tom Kha Kai	2022-01-11 20:40:45.36	2022-05-23 11:17:09.366	f	\N	Lekker pittig soepje, hallo!	aperitivo	\N	\N	\N	\N
173	Pumpkin soup	2022-05-23 18:21:58.731	2022-05-23 18:21:58.731	f	\N	...	aperitivo	\N	\N	\N	\N
90	Cheese board	2022-02-04 13:07:43.04	2022-06-02 19:08:53.209	f	\N	With sausages and grapes	snack	\N	\N	\N	\N
16	Green Curry	2022-01-06 23:46:25.084	2022-05-23 20:15:34.658	f	\N	Curries are an essential part of Thai cuisine. Colorful, fragrant, and powered with an army of fresh flavors, curries have many versions, but they all follow some basics and they all rely on some vital ingredients to achieve the classic depth of flavor. Green curry is thick, creamy, filling, and bright. Between red, yellow, or green, the latter is one of the most famous and sought-after dishes—beautifully vibrant thanks to the addition of Thai basil, cilantro, and makrut lime leaf and peel.	dinner	\N	\N	\N	\N
171	Baked eggs	2022-05-23 18:20:52.662	2022-05-31 10:21:40.226	f	\N	Nice and crispy	lunch	\N	\N	\N	\N
89	Avocado cracker	2022-02-04 11:55:17.915	2022-06-02 21:33:49.949	f	\N	Just a snack with a cracker stuffed with avocado	snack	\N	\N	\N	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: udgtkmzwehgahz
--

COPY public."User" (id, email, name) FROM stdin;
1	hello@nouryjanse.nl	Noury
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: udgtkmzwehgahz
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2cd33395-059f-495c-ade9-0367746e7d26	508d79053245a14d387fcd5119144d8383faa10c2bd9b926bb584df1690e2af5	2022-01-04 11:37:52.528394+00	20220104113751_init	\N	\N	2022-01-04 11:37:52.280593+00	1
f48ddd7d-0710-44b2-8527-e55d63e80fa2	3602ef3c4fa126e93b52ad90cb4090c14cf22e35f46a84a49ee5ea7bb5d2c7ca	2022-01-04 21:05:43.30663+00	20220104210542_init	\N	\N	2022-01-04 21:05:43.12337+00	1
4dbd33e7-4bc7-474d-97c2-1c0ca5068ff8	6b95a00903f300685f3d9545ad8892c9951dac7096a84396c71f39b3d30f78d5	2022-01-05 18:10:50.315244+00	20220105181049_init	\N	\N	2022-01-05 18:10:50.146703+00	1
607c896d-0cb9-45ad-b222-f173be481bc8	a89c7f85cd8f0cb5606ee9f3074eb31b0b7c4caf47a43b81e070a053786d5737	2022-01-13 12:27:37.564265+00	20220113122736_init	\N	\N	2022-01-13 12:27:37.422529+00	1
fed2219a-6986-449d-9be6-884283322fd5	096377360c50752e135d2b29f6dad2e6002aa105532847c3c8561253a7a80e3b	2022-01-13 14:06:51.753612+00	20220113140651_init	\N	\N	2022-01-13 14:06:51.623998+00	1
078dacc3-646c-4dfa-a45e-ee59af862e73	4b9243713aeda20db245a31f20d17602706a1af51d9a8b2b78a9bbba5ecdae3d	2022-04-26 17:55:46.731931+00	20220426175545_init	\N	\N	2022-04-26 17:55:46.481537+00	1
d57a87ee-4772-4ac8-9e30-5fa5a0eea3fb	a412e710735823835cc1fd9b66b0715124e26ff75d292001ffa77241120c006b	2022-04-26 18:52:43.121678+00	20220426185242_init	\N	\N	2022-04-26 18:52:42.947267+00	1
acbe39e6-b7df-4e1f-8fdb-e8089a004d0e	465dba91bb0c30a357891b948a3fab44686d8f95eb2c105f9a5c45c7516661cc	2022-04-26 19:45:45.098148+00	20220426194544_init	\N	\N	2022-04-26 19:45:44.89152+00	1
b5ca7f8b-5816-4536-b18f-606405614fb0	e588bc98b9d86a81f331848633723a5dcaf30fe58b45826dda26f48fb25eb791	2022-05-11 15:00:46.870659+00	20220511150046_init	\N	\N	2022-05-11 15:00:46.720622+00	1
076e7159-1360-4b9d-a43f-a454fb7f4642	c190cd18840bc4850df01392eabc7c54e020badbb299f7d57a88891e19f98df3	2022-05-11 15:12:58.00384+00	20220511151257_init	\N	\N	2022-05-11 15:12:57.861085+00	1
1a4c8673-d6cc-45b3-8d1e-5193dae5975a	a63a10d8724a3dfcce4bc529706bc1ae182109c5710923d1d49d32abc7d6104f	2022-05-11 15:18:52.700319+00	20220511151852_init	\N	\N	2022-05-11 15:18:52.568308+00	1
563285b4-8530-4df4-9cbc-7d7cb2923401	36b35c808c73430ec4cb8c5686b48841088998b714020b444365fe51b22ee71e	2022-05-11 15:20:45.625447+00	20220511152045_init	\N	\N	2022-05-11 15:20:45.502231+00	1
f3cce49b-c9f5-4933-9ddc-4222b817a116	3b81460e2ca0d42224b826cb4009c9c3d82130ea9148e7eeaf5c23bd5d052348	2022-05-11 15:25:56.66534+00	20220511152556_init	\N	\N	2022-05-11 15:25:56.538231+00	1
80bb4c09-bc5d-49a8-b37f-b832247359af	be2eed2eba5e93f4526b01d985cee39a9b1cfa13654477cf70a6ab131987cb83	2022-05-30 19:55:06.79843+00	20220530195506_init	\N	\N	2022-05-30 19:55:06.64058+00	1
\.


--
-- Name: Image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udgtkmzwehgahz
--

SELECT pg_catalog.setval('public."Image_id_seq"', 247, true);


--
-- Name: Ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udgtkmzwehgahz
--

SELECT pg_catalog.setval('public."Ingredient_id_seq"', 1, false);


--
-- Name: Recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udgtkmzwehgahz
--

SELECT pg_catalog.setval('public."Recipe_id_seq"', 198, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udgtkmzwehgahz
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: udgtkmzwehgahz
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: udgtkmzwehgahz
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Image_cloudinaryPublicId_key; Type: INDEX; Schema: public; Owner: udgtkmzwehgahz
--

CREATE UNIQUE INDEX "Image_cloudinaryPublicId_key" ON public."Image" USING btree ("cloudinaryPublicId");


--
-- Name: Image_id_key; Type: INDEX; Schema: public; Owner: udgtkmzwehgahz
--

CREATE UNIQUE INDEX "Image_id_key" ON public."Image" USING btree (id);


--
-- Name: Image_url_key; Type: INDEX; Schema: public; Owner: udgtkmzwehgahz
--

CREATE UNIQUE INDEX "Image_url_key" ON public."Image" USING btree (url);


--
-- Name: Ingredient_id_key; Type: INDEX; Schema: public; Owner: udgtkmzwehgahz
--

CREATE UNIQUE INDEX "Ingredient_id_key" ON public."Ingredient" USING btree (id);


--
-- Name: Ingredient_name_key; Type: INDEX; Schema: public; Owner: udgtkmzwehgahz
--

CREATE UNIQUE INDEX "Ingredient_name_key" ON public."Ingredient" USING btree (name);


--
-- Name: Recipe_id_key; Type: INDEX; Schema: public; Owner: udgtkmzwehgahz
--

CREATE UNIQUE INDEX "Recipe_id_key" ON public."Recipe" USING btree (id);


--
-- Name: Recipe_name_key; Type: INDEX; Schema: public; Owner: udgtkmzwehgahz
--

CREATE UNIQUE INDEX "Recipe_name_key" ON public."Recipe" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: udgtkmzwehgahz
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Image Image_recipeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udgtkmzwehgahz
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Image_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Recipe Recipe_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udgtkmzwehgahz
--

ALTER TABLE ONLY public."Recipe"
    ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA heroku_ext; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA heroku_ext TO udgtkmzwehgahz WITH GRANT OPTION;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO udgtkmzwehgahz;


--
-- PostgreSQL database dump complete
--

