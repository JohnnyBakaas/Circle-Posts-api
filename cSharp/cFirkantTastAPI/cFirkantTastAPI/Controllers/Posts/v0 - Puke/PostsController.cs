using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.Posts.v0___Puke.Model;
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
        public IPost[] GetCircle([FromHeader] CircleIdAndSessionToken data)
        {
            if (data.SessionToken == Guid.Empty) { throw new ArgumentNullException(nameof(data.SessionToken)); }
            if (data.CircleId == null) { throw new ArgumentNullException(nameof(data.CircleId)); }
            return _postsAPI.GetCircle(data.SessionToken, data.CircleId);
        }

        [HttpGet("post-v0")]
        public IPost GetPost(Guid postId, [FromHeader] Guid sessionToken)
        {
            if (sessionToken == Guid.Empty) { throw new ArgumentNullException(nameof(sessionToken)); }
            if (postId == null) { throw new ArgumentNullException(nameof(postId)); }
            return _postsAPI.GetPost(sessionToken, postId);
        }

        [HttpGet("MakeNewPost-v0")]
        public bool MakeNewPost(CreateNewPost data)
        {
            return false;
        }
    }
}
