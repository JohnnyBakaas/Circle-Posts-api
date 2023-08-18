using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.Friends.v0___Puke.Model;
using MySql.Data.MySqlClient;

namespace cFirkantTastAPI.Controllers.Friends.v0___Puke
{
    public class FriendsAPI : IFriendsAPI
    {
        public FriendsData[] GetAllFriends(Guid sessionToken)
        {
            var userId = GetUserIdFromSessionToken(sessionToken);

            var res = new List<FriendsData>();


            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();

                string sql = @"
            SELECT u.Avatar, u.DisplayName, u.Handle, u.Followers, f.AddDate
            FROM user u
            JOIN friends f ON u.Id = f.UserOneId OR u.Id = f.UserTwoId
            WHERE (f.UserOneId = u.Id OR f.UserTwoId = u.Id)";

                MySqlCommand cmd = new MySqlCommand(sql, conn);

                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        res.Add(new FriendsData
                        {
                            Avatar = reader["Avatar"].ToString(),
                            DispayName = reader["DisplayName"].ToString(),
                            Handle = reader["Handle"].ToString(),
                            Followers = Convert.ToInt32(reader["Followers"]),
                            AddDate = DateOnly.Parse(reader["AddDate"].ToString())
                        });
                    }
                }
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }
            finally { conn.Close(); }

            return res.ToArray();
        }

        private Guid GetUserIdFromSessionToken(Guid sessionToken)
        {
            var res = Guid.Empty;

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = "SELECT UserId FROM sesiontoken WHERE Token = @SessionToken AND ManualDeactivated = false AND ExpiredDate > NOW()";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@SessionToken", sessionToken);

                object result = cmd.ExecuteScalar();

                if (result != null)
                {
                    res = Guid.Parse(result.ToString());
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

            return res;
        }
    }
}
