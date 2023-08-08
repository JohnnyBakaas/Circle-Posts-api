using cFirkantTastAPI.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace cFirkantTastAPI.Controllers.Posts.v0___Puke
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private IPostsAPI _postsAPI;
        public PostsController(IPostsAPI postsAPI)
        {
            _postsAPI = postsAPI;
        }

        [HttpGet("global-v0")]
        public IPost[] GetGlobal([FromHeader] Guid sessionToken)
        {
            return _postsAPI.GetGlobal(sessionToken);
        }

        [HttpGet("friends-v0")]
        public IPost[] GetFriens([FromHeader] Guid sessionToken)
        {
            if (sessionToken == Guid.Empty) { throw new ArgumentNullException(nameof(sessionToken)); }
            return _postsAPI.GetFriens(sessionToken);
        }

        [HttpGet("circle-v0")]
        public IPost[] GetCircle([FromHeader] Guid sessionToken, string circleID) // Legg til en mellom klasse her
        {
            if (sessionToken == Guid.Empty) { throw new ArgumentNullException(nameof(sessionToken)); }
            if (circleID == null) { throw new ArgumentNullException(nameof(circleID)); }
            return _postsAPI.GetCircle(sessionToken, circleID);
        }

    }
}
