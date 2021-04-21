--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-04-21 15:06:42

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 16437)
-- Name: tb_customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_customer (
    id integer NOT NULL,
    nama character varying NOT NULL,
    alamat character varying NOT NULL,
    kota character varying NOT NULL,
    pendapatan bigint NOT NULL
);


ALTER TABLE public.tb_customer OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16435)
-- Name: tb_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_customer_id_seq OWNER TO postgres;

--
-- TOC entry 2991 (class 0 OID 0)
-- Dependencies: 200
-- Name: tb_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_customer_id_seq OWNED BY public.tb_customer.id;


--
-- TOC entry 2851 (class 2604 OID 16447)
-- Name: tb_customer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_customer ALTER COLUMN id SET DEFAULT nextval('public.tb_customer_id_seq'::regclass);


--
-- TOC entry 2985 (class 0 OID 16437)
-- Dependencies: 201
-- Data for Name: tb_customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_customer (id, nama, alamat, kota, pendapatan) FROM stdin;
1	Gani	Antapani	Bandung	5000000
2	Haem	Kopo	Bandung	3000000
3	Haem	Kopo	Bandung	1000000
4	Gani	Kopo	Bandung	4000000
5	Gani	Kopo	Bandung	4000000
6	Haum	Kopo	Bandung	1000000
\.


--
-- TOC entry 2992 (class 0 OID 0)
-- Dependencies: 200
-- Name: tb_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_customer_id_seq', 6, true);


--
-- TOC entry 2853 (class 2606 OID 16445)
-- Name: tb_customer tb_customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_customer
    ADD CONSTRAINT tb_customer_pkey PRIMARY KEY (id);


-- Completed on 2021-04-21 15:06:43

--
-- PostgreSQL database dump complete
--

