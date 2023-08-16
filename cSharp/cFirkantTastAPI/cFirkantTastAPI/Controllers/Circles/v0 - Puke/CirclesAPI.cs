using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.Circles.v0___Puke.Model;
using MySql.Data.MySqlClient;

namespace cFirkantTastAPI.Controllers.Circles.v0___Puke
{
    public class CirclesAPI : ICirclesAPI
    {
        public CircleNameAndId[] GetAllCirles(Guid sessinoToken)
        {
            var userId = GetUserIdFromSessionToken(sessinoToken);

            if (userId == Guid.Empty)
            {
                return new CircleNameAndId[0];
            }

            var circles = new List<CircleNameAndId>();

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                Console.WriteLine("Open");
                conn.Open();

                string sql = "SELECT Id, Name FROM circles WHERE OwnerId = OwnerId";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@Handle", userId);

                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        circles.Add(new CircleNameAndId
                        {
                            Id = Guid.Parse(reader.GetString("Id")),
                            Name = reader.GetString("Name"),
                        });
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

            return circles.ToArray();


        }

        public bool MakeNewCircles(MakeNewCirclesData data)
        {
            Console.WriteLine("We up in here BOIYS");
            if (data == null) { return false; }
            if (string.IsNullOrEmpty(data.Name)) { return false; }
            if (data.SessionToken == Guid.Empty) { return false; }

            var userId = GetUserIdFromSessionToken(data.SessionToken);

            if (userId == Guid.Empty) { return false; }

            var res = false;
            var circleId = Guid.NewGuid();

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                string sql = @"INSERT INTO circles (OwnerId, Name, Id) VALUES (@OwnerId, @Name, @Id)";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@OwnerId", userId);
                cmd.Parameters.AddWithValue("@Name", data.Name);
                cmd.Parameters.AddWithValue("@Id", circleId);

                cmd.ExecuteNonQuery();

                res = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                res = false;
            }
            finally
            {
                conn.Close();
            }


            if (data.Handles == null || data.Handles.Length == 0) { return res; }

            AddUsersToCircle(circleId, data.Handles);

            return res;

        }

        public bool AddUsersToCircle(Guid circleId, string[] handles)
        {
            var res = true;
            for (int i = 0; i < handles.Length; i++)
            {
                var userId = GetUserIdFromHandle(handles[i]);
                if (!AddUserToCircle(circleId, userId)) { res = false; };
            }

            return res;
        }

        private Guid GetUserIdFromSessionToken(Guid sessionToken)
        {
            var restult = Guid.Empty;
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
                    restult = Guid.Parse(result.ToString());
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

            return restult;
        }

        private Guid GetUserIdFromHandle(string handle)
        {
            var restult = Guid.Empty;
            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();
                string sql = "SELECT Id FROM user WHERE Handle = @Handle";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@Handle", handle);

                object result = cmd.ExecuteScalar();

                if (result != null)
                {
                    restult = Guid.Parse(result.ToString());
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

            return restult;

        }

        private bool AddUserToCircle(Guid circleId, Guid userId)
        {
            if (userId == Guid.Empty) { return false; }
            bool res = false;

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                string sql = @"INSERT INTO circleconnection (CircleId, UserId, Id) VALUES (@CircleId, @UserId, @Id)";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@CircleId", circleId);
                cmd.Parameters.AddWithValue("@UserId", userId);
                cmd.Parameters.AddWithValue("@Id", Guid.NewGuid());

                cmd.ExecuteNonQuery();

                res = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                res = false;
            }
            finally
            {
                conn.Close();
            }

            return res;
        }
    }
}
