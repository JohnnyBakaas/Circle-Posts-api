using cFirkantTastAPI.Contracts;

namespace cFirkantTastAPI.Controllers.Posts.v0___Puke
{
    public class Posts : IPostsAPI
    {
        public IPost[] GetGlobal(Guid sessionToken)
        {
            throw new NotImplementedException();
        }

        public IPost[] GetFriens(Guid sessionToken)
        {
            throw new NotImplementedException();
        }

        public IPost[] GetCircle(Guid sessionToken, string circleID)
        {
            throw new NotImplementedException();
        }
    }
}
