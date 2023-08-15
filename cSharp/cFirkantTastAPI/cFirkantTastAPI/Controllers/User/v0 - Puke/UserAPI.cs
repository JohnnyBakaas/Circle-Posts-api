using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.User.v0___Puke.Model;
using MySql.Data.MySqlClient;

namespace cFirkantTastAPI.Controllers.User.v0___Puke
{
    public class UserAPI : IUserAPI
    {
        public PublicUserInfo GetPublicUserInfo(string handle)
        {
            if (string.IsNullOrEmpty(handle))
            {
                return new PublicUserInfo();
            }

            var user = new PublicUserInfo();

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                Console.WriteLine("Open");
                conn.Open();

                string sql = "SELECT Handle, DisplayName, Avatar, Followers, Description FROM user WHERE Handle = @Handle";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@Handle", handle);

                Console.WriteLine("Using greia");
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    Console.WriteLine("if?");
                    if (reader.Read())
                        Console.WriteLine("if JA");
                    {
                        user = new PublicUserInfo
                        {
                            Handle = reader.GetString("Handle"),
                            DisplayName = reader.GetString("DisplayName"),
                            Avatar = reader.GetString("Avatar"),
                            Description = reader.GetString("Description"),
                            Followers = reader.GetInt32("Followers"),
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                conn.Close();
            }

            return user;
        }

        public Guid LoggInn(LoggInnInfo loggInnInfo)
        {
            var userId = CheckLoggin(loggInnInfo);
            if (userId == Guid.Empty) { return Guid.Empty; }
            return GetSessionToken(userId);
        }

        public bool ValidateSessionToken(Guid sessionToken)
        {
            if (sessionToken == Guid.Empty) { return false; }

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                string sql = "SELECT COUNT(*) FROM sesiontoken WHERE Token = @Token AND ManualDeactivated = false AND ExpiredDate > NOW()";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@Token", sessionToken);

                object result = cmd.ExecuteScalar();
                return Convert.ToInt32(result) > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                conn.Close();
            }

            return false;
        }

        private Guid CheckLoggin(LoggInnInfo loggInnInfo)
        {
            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                Console.WriteLine("Connecting to MySQL...");
                conn.Open();

                string sql = "SELECT Id FROM login WHERE Email = @Email AND HashedPassword = @Password";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@Email", loggInnInfo.Email);
                cmd.Parameters.AddWithValue("@Password", loggInnInfo.Password);

                object result = cmd.ExecuteScalar();

                if (result != null)
                {
                    Guid guid = Guid.Parse(result.ToString());
                    Console.WriteLine($"User found: {guid}");
                    return guid;
                }
                else
                {
                    Console.WriteLine("User not found.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            conn.Close();
            Console.WriteLine("Done.");

            return Guid.Empty;
        }

        private Guid GetSessionToken(Guid userId)
        {
            if (userId == Guid.Empty) { return Guid.Empty; }

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                // Select the token that is not expired
                string sql = "SELECT Token FROM sesiontoken WHERE UserId = @UserId AND ManualDeactivated = false AND ExpiredDate > NOW()";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@UserId", userId);

                object result = cmd.ExecuteScalar();
                if (result != null)
                {
                    return Guid.Parse(result.ToString());
                }

                Guid newToken = Guid.NewGuid();

                DateTime expirationDate = DateTime.Now.AddMinutes(600); // Endrer hvor lenge token er aktiv

                sql = "INSERT INTO sesiontoken (UserId, Token, ExpiredDate, ManualDeactivated) VALUES (@UserId, @Token, @ExpiredDate, false)";
                cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@UserId", userId);
                cmd.Parameters.AddWithValue("@Token", newToken);
                cmd.Parameters.AddWithValue("@ExpiredDate", expirationDate);

                cmd.ExecuteNonQuery();

                return newToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                conn.Close();
            }

            return Guid.Empty;
        }

    }
}