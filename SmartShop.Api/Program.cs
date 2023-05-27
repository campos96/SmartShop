using Microsoft.EntityFrameworkCore;
using SmartShop.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var AllowedApiClients = "AllowedApiClients";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowedApiClients,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});

// Add services to the container.
builder.Services.AddDbContext<SmartShopContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SmartShopContext") ?? throw new InvalidOperationException("Connection string 'SmartShopContext' not found.")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(AllowedApiClients);

app.UseAuthorization();

app.MapControllers();

app.Run();
