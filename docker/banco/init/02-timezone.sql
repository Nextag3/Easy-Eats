-- Fuso do banco igual ao da API, para now() e datas gravadas baterem.
DO $$
BEGIN
    EXECUTE format('ALTER DATABASE %I SET timezone TO %L', current_database(), 'America/Sao_Paulo');
END
$$;
