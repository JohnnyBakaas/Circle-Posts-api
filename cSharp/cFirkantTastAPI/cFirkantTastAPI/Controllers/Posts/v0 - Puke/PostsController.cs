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

        [HttpPut("global-v0")]
        public IPost[] GetGlobal([FromBody] Guid sessionToken)
        {
            return _postsAPI.GetGlobal(sessionToken);
        }

        [HttpPut("friends-v0")]
        public IPost[] GetFriens([FromBody] Guid sessionToken)
        {
            if (sessionToken == Guid.Empty) { throw new ArgumentNullException(nameof(sessionToken)); }
            return _postsAPI.GetFriens(sessionToken);
        }

        [HttpPut("circle-v0")]
        public IPost[] GetCircle([FromBody] CircleIdAndSessionToken data)
        {
            if (data.SessionToken == Guid.Empty) { throw new ArgumentNullException(nameof(data.SessionToken)); }
            if (data.CircleId == null) { throw new ArgumentNullException(nameof(data.CircleId)); }
            return _postsAPI.GetCircle(data.SessionToken, data.CircleId);
        }

        [HttpPut("post-v0")]
        public IPost GetPost(Guid postId, [FromBody] Guid sessionToken)
        {
            if (postId == Guid.Empty) { throw new ArgumentNullException(nameof(postId)); }
            return _postsAPI.GetPost(sessionToken, postId);
        }

        [HttpPut("MakeNewPost-v0")]
        public bool MakeNewPost([FromBody] CreateNewPost data)
        {
            return _postsAPI.MakeNewPost(data);
        }
    }
}
