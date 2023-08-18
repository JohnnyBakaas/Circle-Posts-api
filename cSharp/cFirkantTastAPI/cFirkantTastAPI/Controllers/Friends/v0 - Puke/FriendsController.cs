using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.Friends.v0___Puke.Model;
using Microsoft.AspNetCore.Mvc;

namespace cFirkantTastAPI.Controllers.Friends.v0___Puke
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private IFriendsAPI _friendsAPI;
        public FriendsController(IFriendsAPI friendsAPI)
        {
            _friendsAPI = friendsAPI;
        }

        [HttpPost("HeiXDDDD")]
        public FriendsData[] GetAllFriends([FromBody] SessionTokenWrapper data)
        {
            return _friendsAPI.GetAllFriends(data.SessionToken);
        }
    }
}
