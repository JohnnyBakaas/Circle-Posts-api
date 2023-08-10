namespace cFirkantTastAPI.Controllers.Posts.v0___Puke.Model
{
    public class CreateNewPost
    {
        public Guid SessionToken { get; set; }
        public string Content { get; set; }
        public bool IsGlobal { get; set; }
        public Guid? CircleId { get; set; }
    }
}
