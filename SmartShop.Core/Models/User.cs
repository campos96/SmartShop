namespace SmartShop.Core.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public Guid AccountId { get; set; }

        public Guid ShopId { get; set; }

        public string UserName { get; set; }

        public bool IsLocked { get; set; }

        public IEnumerable<UserRole>? Roles { get; set; }

        public Shop? Shop { get; set; }
    }
}
