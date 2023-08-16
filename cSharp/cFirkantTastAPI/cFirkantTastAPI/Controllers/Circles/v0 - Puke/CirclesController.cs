using cFirkantTastAPI.Contracts;
using cFirkantTastAPI.Controllers.Circles.v0___Puke.Model;
using cFirkantTastAPI.Controllers.Posts.v0___Puke.Model;
using Microsoft.AspNetCore.Mvc;

namespace cFirkantTastAPI.Controllers.Circles.v0___Puke
{
    [Route("api/[controller]")]
    [ApiController]
    public class CirclesController : ControllerBase
    {
        private ICirclesAPI _circlesControllerAPI;
        public CirclesController(ICirclesAPI circlesControllerAPI)
        {
            _circlesControllerAPI = circlesControllerAPI;
        }

        [HttpPost("GetAllCircles-v0")]
        public CircleNameAndId[] GetAllCircles([FromBody] SessionTokenRequest data)
        {
            return _circlesControllerAPI.GetAllCirles(data.sessionToken);
        }

        [HttpPost("MakeNewCircles-v0")]
        public bool MakeNewCircles([FromBody] MakeNewCirclesData data)
        {
            if (data.Handles != null)
            {
                throw new NotImplementedException();
            }
            if (data.SessionToken == Guid.Empty) { return false; }
            if (data.Name == string.Empty) { return false; }

            return _circlesControllerAPI.MakeNewCircles(data);
        }

        [HttpPost("AddUsersToCircle-v0")]
        public bool AddUsersToCircle([FromBody] AddUsersToCircleData data)
        {
            return _circlesControllerAPI.AddUsersToCircle(data.circleId, data.handles);
        }
    }
}
