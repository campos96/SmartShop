using Microsoft.EntityFrameworkCore;
using SmartShop.Core.Models;

namespace SmartShop.WebAdmin.Data
{
    //Use this context only for migrations, SmartShop.Core.Data.SmartShopContext should be used instead
    public class SmartShopContext : DbContext 
    {
        public SmartShopContext(DbContextOptions<SmartShopContext> options) : base(options)
        {

        }

        public DbSet<Shop> Shops { get; set; } = default!;
        public DbSet<Account> Accounts { get; set; } = default!;
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<UserRole> UserRoles { get; set; } = default!;
    }
}
