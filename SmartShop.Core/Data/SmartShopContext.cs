﻿using Microsoft.EntityFrameworkCore;
using SmartShop.Core.Models;

namespace SmartShop.Core.Data
{
    public class SmartShopContext : DbContext
    {
        public SmartShopContext(DbContextOptions<SmartShopContext> options) : base(options)
        {

        }

        public DbSet<Shop> Shops { get; set; } = default!;
        public DbSet<Account> Accounts { get; set; } = default!;
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<UserRole> UserRoles { get; set; } = default!;
        public DbSet<ProductCategory> ProductCategories { get; set; } = default!;
        public DbSet<ProductCondition> ProductConditions { get; set; } = default!;
        public DbSet<ProductDetails> ProductDetails { get; set; } = default!;
        public DbSet<Product> Products { get; set; } = default!;
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; } = default!;
        public DbSet<Stock> Stock { get; set; } = default!;
        public DbSet<SalesOrder> SalesOrders { get; set; } = default!;
    }
}
