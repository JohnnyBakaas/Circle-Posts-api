using cFirkantTastAPI.Controllers.Circles.v0___Puke.Model;

namespace cFirkantTastAPI.Contracts
{
    public interface ICirclesAPI
    {
        bool MakeNewCircles(MakeNewCirclesData data);
        CircleNameAndId[] GetAllCirles(Guid sessinoToken);
        bool AddUsersToCircle(Guid circleId, string[] handles);
    }
}
