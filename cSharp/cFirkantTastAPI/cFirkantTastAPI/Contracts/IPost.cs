namespace cFirkantTastAPI.Contracts
{
    public interface IPost
    {
        string Avatar { get; }
        string DisplayName { get; }
        string Handle { get; }
        int Followers { get; }
        string Content { get; }
        int Comments { get; }
        int Likes { get; }
        int DisLikes { get; }
        int Views { get; }

        bool You { get; }
        bool Following { get; }
        bool Liking { get; }
        bool DisLikeing { get; }
        Guid Id { get; }

    }
}
