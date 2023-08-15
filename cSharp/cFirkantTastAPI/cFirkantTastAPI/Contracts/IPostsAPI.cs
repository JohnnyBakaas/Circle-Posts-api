using cFirkantTastAPI.Controllers.Posts.v0___Puke.Model;

namespace cFirkantTastAPI.Contracts
{
    public interface IPostsAPI
    {
        IPost[] GetGlobal(Guid sessionToken);
        IPost[] GetFriens(Guid sessionToken);
        IPost[] GetCircle(Guid sessionToken, Guid circleID);
        IPost GetPost(Guid sessionToken, Guid postId);
        bool MakeNewPost(CreateNewPost data);

    }
}
