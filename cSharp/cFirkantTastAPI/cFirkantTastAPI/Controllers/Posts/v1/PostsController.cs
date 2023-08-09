using Microsoft.AspNetCore.Mvc;

namespace cFirkantTastAPI.Controllers.Posts.v1
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        /*
        private IPostsAPI _postsAPI;
        public PostsController(IPostsAPI postsAPI)
        {
            _postsAPI = postsAPI;
        }

        [HttpGet("global-v1")]
        public IPost[] GetGlobal([FromHeader] Guid sessionToken)
        {
            return _postsAPI.GetGlobal(sessionToken);
        }

        [HttpGet("friends-v1")]
        public IPost[] GetFriens([FromHeader] Guid sessionToken)
        {
            if (sessionToken == Guid.Empty) { throw new ArgumentNullException(nameof(sessionToken)); }
            return _postsAPI.GetFriens(sessionToken);
        }

        [HttpGet("circle-v1")]
        public IPost[] GetCircle([FromHeader] Guid sessionToken, string circleID)
        {
            if (sessionToken == Guid.Empty) { throw new ArgumentNullException(nameof(sessionToken)); }
            if (circleID == null) { throw new ArgumentNullException(nameof(circleID)); }
            return _postsAPI.GetCircle(sessionToken, circleID);
        }
         */

    }
}
