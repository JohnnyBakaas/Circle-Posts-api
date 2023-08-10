using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.Posts.v0___Puke.Model;
using MySql.Data.MySqlClient;

namespace cFirkantTastAPI.Controllers.Posts.v0___Puke
{
    public class Posts : IPostsAPI
    {
        public IPost[] GetGlobal(Guid sessionToken)
        {
            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            List<IPost> posts = new List<IPost>();

            Guid userId = Guid.Empty;
            if (sessionToken != Guid.Empty)
            {
                userId = GetUserIdFromSessionToken(sessionToken);
            }

            try
            {
                conn.Open();

                string sql = @"
            SELECT p.*, u.Avatar, u.DisplayName, u.Handle, u.Followers
            FROM posts p
            JOIN user u ON p.Owner = u.Id
            WHERE p.IsGlobal = true";

                MySqlCommand cmd = new MySqlCommand(sql, conn);

                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Guid ownerId = Guid.Parse(reader["Owner"].ToString());
                        posts.Add(new Post
                        {
                            Id = Guid.Parse(reader["Id"].ToString()),
                            Avatar = reader["Avatar"].ToString(),
                            DisplayName = reader["DisplayName"].ToString(),
                            Handle = reader["Handle"].ToString(),
                            Followers = Convert.ToInt32(reader["Followers"]),
                            Content = reader["Content"].ToString(),
                            Comments = Convert.ToInt32(reader["Comments"]), // Reading the Comments column
                            Likes = Convert.ToInt32(reader["Likes"]),
                            DisLikes = Convert.ToInt32(reader["DisLikes"]),
                            Views = Convert.ToInt32(reader["Views"]),
                            You = ownerId == userId,
                            Following = false,
                            Liking = false,
                            DisLikeing = false,
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

            return posts.ToArray();
        }



        public IPost[] GetFriens(Guid sessionToken)
        {
            throw new NotImplementedException();
        }

        public IPost[] GetCircle(Guid sessionToken, string circleID)
        {
            throw new NotImplementedException();
        }

        public IPost GetPost(Guid sessionToken, Guid postId)
        {
            Guid userId = GetUserIdFromSessionToken(sessionToken);

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                string sql = @"SELECT p.Id, u.Avatar, u.DisplayName, u.Handle, u.Followers, p.Content, p.Likes, p.DisLikes, p.Views, p.Owner FROM posts p JOIN user u ON p.Owner = u.Id WHERE p.Id = @Id";

                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@Id", postId);

                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new Post
                        {
                            Id = reader.GetGuid("Id"),
                            Avatar = reader.GetString("Avatar"),
                            DisplayName = reader.GetString("DisplayName"),
                            Handle = reader.GetString("Handle"),
                            Followers = reader.GetInt32("Followers"),
                            Content = reader.GetString("Content"),
                            Likes = reader.GetInt32("Likes"),
                            DisLikes = reader.GetInt32("DisLikes"),
                            Views = reader.GetInt32("Views"),
                            You = reader.GetGuid("Owner") == userId,
                            Following = false,
                            Liking = false,
                            DisLikeing = false
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

            return null; // Return null if no matching post was found
        }

        public bool MakeNewPost(CreateNewPost data)
        {
            Console.WriteLine("Hallo???");
            if (data == null || data.SessionToken == Guid.Empty || string.IsNullOrEmpty(data.Content))
            {
                return false; // Basic validation
            }

            // Validation for the session token might be performed here, if needed

            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                // Assuming you want to insert SessionToken, Content, IsGlobal, and CircleId into the posts table
                string sql = @"INSERT INTO posts (Owner, Content, IsGlobal, CircleId, Id) VALUES (@SessionToken, @Content, @IsGlobal, @CircleId, @Id)";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@Owner", GetUserIdFromSessionToken(data.SessionToken));
                cmd.Parameters.AddWithValue("@Content", data.Content);
                cmd.Parameters.AddWithValue("@IsGlobal", data.IsGlobal);
                cmd.Parameters.AddWithValue("@CircleId", data.CircleId ?? (object)DBNull.Value); // Inserting NULL if CircleId is not provided
                cmd.Parameters.AddWithValue("@Id", Guid.NewGuid());

                int result = cmd.ExecuteNonQuery();

                return result > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
            finally
            {
                conn.Close();
            }
        }



        private Guid GetUserIdFromSessionToken(Guid sessionToken)
        {
            string connStr = "server=localhost;user=root;database=circles;port=3306;";
            MySqlConnection conn = new MySqlConnection(connStr);

            try
            {
                conn.Open();

                // Use the ExpiredDate column to check if the token is still valid.
                string sql = "SELECT UserId FROM sesiontoken WHERE Token = @SessionToken AND ManualDeactivated = false AND ExpiredDate > NOW()";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.Parameters.AddWithValue("@SessionToken", sessionToken);

                object result = cmd.ExecuteScalar();
                if (result != null)
                {
                    return Guid.Parse(result.ToString());
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

            throw new UnauthorizedAccessException("Invalid or expired session token");
        }


    }
}

/*
Id
Owner
Likes
DisLikes
Views
Content
IsGlobal
*/