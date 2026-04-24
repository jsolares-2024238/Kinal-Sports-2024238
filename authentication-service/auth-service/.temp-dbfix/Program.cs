using Npgsql;

var connectionString = "Host=localhost;Port=5435;Database=kinal_sports;Username=IN6AM;Password=In6amKnl!";
await using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();

var sql = @"
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id uuid NOT NULL,
    token_hash text NOT NULL,
    user_id character varying(16) NOT NULL,
    family_id uuid NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    revoked_at timestamp with time zone NULL,
    created_at timestamp with time zone NOT NULL,
    CONSTRAINT pk_refresh_tokens PRIMARY KEY (id),
    CONSTRAINT fk_refresh_tokens_users_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS ix_refresh_tokens_token_hash ON refresh_tokens (token_hash);
CREATE INDEX IF NOT EXISTS ix_refresh_tokens_family_id ON refresh_tokens (family_id);
";

await using (var command = new NpgsqlCommand(sql, connection))
{
    await command.ExecuteNonQueryAsync();
}

await using (var checkCommand = new NpgsqlCommand("SELECT to_regclass('public.refresh_tokens')::text", connection))
{
    var result = await checkCommand.ExecuteScalarAsync();
    Console.WriteLine($"refresh_tokens={result}");
}
