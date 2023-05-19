namespace SmartShop.Core
{
    public class Account
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public bool IsLocked { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }

        public DateTime? EmailConfirmed { get; set; }

        public Guid? ResetPasswordToken { get; set; }

        public DateTime? ResetPasswordExpiration { get; set; }

    }
}
