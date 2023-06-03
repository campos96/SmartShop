using System.ComponentModel.DataAnnotations;

namespace SmartShop.Core.Models
{
    public class Account
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool IsLocked { get; set; }

        [Required]
        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }

        public DateTime? EmailConfirmed { get; set; }

        public Guid? ResetPasswordToken { get; set; }

        public DateTime? ResetPasswordExpiration { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public virtual ICollection<User>? Users { get; set; }

    }
}
