using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.User.v0___Puke.Model;
using MySql.Data.MySqlClient;

namespace cFirkantTastAPI.Controllers.User.v0___Puke
{
    public class UserAPI : IUserAPI
    {
        public Guid LoggInn(LoggInnInfo loggInnInfo)
        {
            var userId = CheckLoggin(loggInnInfo);
            if (userId == Guid.Empty) { return Guid.Empty; }
            return GetSesionToken(userId);
        }

        public bool ValidateSessionToken(Guid sessionToken)
        {
            if (sessionToken == Guid.Empty) { return false; }

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                string sql = "SELECT COUNT(*) FROM sesiontoken WHERE Token = @Token AND ManualDeactivated = false AND CreateDate > @ExpirationDate";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@Token", sessionToken);
                cmd.Parameters.AddWithValue("@ExpirationDate", DateTime.Now.AddMinutes(-1));

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

        private Guid GetSesionToken(Guid userId)
        {
            var tokenValidTimeInMinuts = 1;

            if (userId == Guid.Empty) { return Guid.Empty; }
            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                string sql = "SELECT Token FROM sesiontoken WHERE UserId = @UserId AND ManualDeactivated = false AND CreateDate > @ExpirationDate";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@UserId", userId);
                cmd.Parameters.AddWithValue("@ExpirationDate", DateTime.Now.AddMinutes(-tokenValidTimeInMinuts));

                object result = cmd.ExecuteScalar();
                if (result != null)
                {
                    return Guid.Parse(result.ToString());
                }


                Guid newToken = Guid.NewGuid();
                sql = "INSERT INTO sesiontoken (UserId, Token, CreateDate, ManualDeactivated) VALUES (@UserId, @Token, @CreateDate, false)";
                cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@UserId", userId);
                cmd.Parameters.AddWithValue("@Token", newToken);
                cmd.Parameters.AddWithValue("@CreateDate", DateTime.Now);

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
