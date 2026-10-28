-- Fuso do banco igual ao da API, para now() e datas gravadas baterem.
-- As tabelas são criadas pela própria API ao subir.
DO $$
BEGIN
    EXECUTE format('ALTER DATABASE %I SET timezone TO %L', current_database(), 'America/Sao_Paulo');
END
$$;
