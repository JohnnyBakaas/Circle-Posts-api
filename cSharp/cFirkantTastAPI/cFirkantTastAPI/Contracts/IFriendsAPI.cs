using cFirkantTastAPI.Controllers.Friends.v0___Puke.Model;

namespace cFirkantTastAPI.Contracts
{
    public interface IFriendsAPI
    {
        public FriendsData[] GetAllFriends(Guid sessionToken);
    }
}
