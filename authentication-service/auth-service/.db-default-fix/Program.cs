using Npgsql;

var cs = "Host=localhost;Port=5435;Database=kinal_sports;Username=IN6AM;Password=In6amKnl!";
await using var conn = new NpgsqlConnection(cs);
await conn.OpenAsync();

var sql = @"
ALTER TABLE IF EXISTS user_emails ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE IF EXISTS user_emails ALTER COLUMN updated_at SET DEFAULT now();
ALTER TABLE IF EXISTS user_password_resets ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE IF EXISTS user_password_resets ALTER COLUMN updated_at SET DEFAULT now();
ALTER TABLE IF EXISTS user_profiles ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE IF EXISTS user_profiles ALTER COLUMN updated_at SET DEFAULT now();
";

await using (var cmd = new NpgsqlCommand(sql, conn))
{
    await cmd.ExecuteNonQueryAsync();
}

var checkSql = @"
SELECT table_name, column_name, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('user_emails','user_password_resets','user_profiles')
  AND column_name IN ('created_at','updated_at')
ORDER BY table_name, column_name;
";

await using var check = new NpgsqlCommand(checkSql, conn);
await using var reader = await check.ExecuteReaderAsync();
while (await reader.ReadAsync())
{
    Console.WriteLine($"{reader.GetString(0)}.{reader.GetString(1)}={reader.GetString(2)}");
}
