namespace SmartShop.Core
{
    public enum Role { Administrator, Supervisor, Sales, Inventory, Client }

    public class UserRole
    {
        public Guid Id { get; set; }    

        public Guid UserId { get; set; }
    
        public string Role { get; set; }
    }
}
