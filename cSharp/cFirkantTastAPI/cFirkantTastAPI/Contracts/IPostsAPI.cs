namespace cFirkantTastAPI.Contracts
{
    public interface IPostsAPI
    {
        IPost[] GetGlobal(Guid sessionToken);
        IPost[] GetFriens(Guid sessionToken);
        IPost[] GetCircle(Guid sessionToken, string circleID);
    }
}
