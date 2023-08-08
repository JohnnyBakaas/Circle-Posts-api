using cFirkantTastAPI.Contracts;
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

        [HttpPut("ValidateSessionToken-0")]
        public bool ValidateSessionToken([FromBody] Guid token)
        {
            return false;
        }
    }
}
