using cFirkantTastAPI.Controllers.User.v0___Puke.Model;

namespace cFirkantTastAPI.Contracts
{
    public interface IUserAPI
    {
        Guid LoggInn(LoggInnInfo loggInnInfo);
        bool ValidateSessionToken(Guid sessionToken);
        PublicUserInfo GetPublicUserInfo(string handle);
    }
}
