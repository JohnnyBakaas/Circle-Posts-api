using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.Posts.v0___Puke.Model;
using cFirkantTastAPI.Controllers.User.v0___Puke.Model;
using Microsoft.AspNetCore.Mvc;

namespace cFirkantTastAPI.Controllers.User.v0___Puke
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserAPI _userAPI;
        public UserController(IUserAPI userAPI)
        {
            _userAPI = userAPI;
        }


        [HttpPost("LoggInn-v0")]
        public Guid LoggInn([FromBody] LoggInnInfo loggInnInfo)
        {
            if (loggInnInfo == null) { throw new ArgumentNullException("username"); }
            return _userAPI.LoggInn(loggInnInfo);
        }

        [HttpPut("ValidateSessionToken-v0")]
        public bool ValidateSessionToken([FromBody] SessionTokenRequest request)
        {
            if (request.sessionToken == Guid.Empty) { throw new ArgumentNullException("token"); }
            return _userAPI.ValidateSessionToken(request.sessionToken);
        }

        [HttpGet("GetPublicUserInfo-v0")]
        public PublicUserInfo GetPublicUserInfo(string handle)
        {
            if (string.IsNullOrEmpty(handle)) { throw new ArgumentNullException("handle"); }
            return _userAPI.GetPublicUserInfo(handle);
        }
    }
}
