using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartShop.WebAdmin.Migrations
{
    /// <inheritdoc />
    public partial class addProductForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrders_Shops_ShopId",
                table: "PurchaseOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_SalesOrders_Shops_ShopId",
                table: "SalesOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Stock_Shops_ShopId",
                table: "Stock");

            migrationBuilder.CreateIndex(
                name: "IX_ProductConditions_ShopId",
                table: "ProductConditions",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategories_ShopId",
                table: "ProductCategories",
                column: "ShopId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategories_Shops_ShopId",
                table: "ProductCategories",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductConditions_Shops_ShopId",
                table: "ProductConditions",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrders_Shops_ShopId",
                table: "PurchaseOrders",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SalesOrders_Shops_ShopId",
                table: "SalesOrders",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Stock_Shops_ShopId",
                table: "Stock",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategories_Shops_ShopId",
                table: "ProductCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductConditions_Shops_ShopId",
                table: "ProductConditions");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrders_Shops_ShopId",
                table: "PurchaseOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_SalesOrders_Shops_ShopId",
                table: "SalesOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Stock_Shops_ShopId",
                table: "Stock");

            migrationBuilder.DropIndex(
                name: "IX_ProductConditions_ShopId",
                table: "ProductConditions");

            migrationBuilder.DropIndex(
                name: "IX_ProductCategories_ShopId",
                table: "ProductCategories");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrders_Shops_ShopId",
                table: "PurchaseOrders",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SalesOrders_Shops_ShopId",
                table: "SalesOrders",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Stock_Shops_ShopId",
                table: "Stock",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id");
        }
    }
}
