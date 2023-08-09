namespace cFirkantTastAPI.Contracts
{
    public interface IUser
    {
        Guid Id { get; }
        string Handle { get; }
        string UserName { get; }
        string Avatar { get; }
        string Description { get; }
        int Followers { get; }
    }
}
