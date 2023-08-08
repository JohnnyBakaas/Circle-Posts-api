using cFirkantTastAPI.Contracts;

namespace cFirkantTastAPI.Controllers.Posts.v0___Puke.Model
{
    public class Post : IPost
    {
        public string Avatar { get; set; }
        public string DisplayName { get; set; }
        public string Handle { get; set; }
        public int Followers { get; set; }
        public string Content { get; set; }
        public int Comments { get; set; }
        public int Likes { get; set; }
        public int DisLikes { get; set; }
        public int Views { get; set; }
        public bool You { get; set; }
        public bool Following { get; set; }
        public bool Liking { get; set; }
        public bool DisLikeing { get; set; }
        public Guid Id { get; set; }
    }
}
