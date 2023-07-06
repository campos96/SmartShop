using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartShop.Api.Data;
using SmartShop.Api.Models;
using SmartShop.Core.Models;

namespace SmartShop.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ShopsController : ControllerBase
    {
        private readonly SmartShopContext _context;

        public ShopsController(SmartShopContext context)
        {
            _context = context;
        }

        // GET: api/Shops/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shop>> GetShop(Guid id)
        {
            if (_context.Shops == null)
            {
                return ApiResult.NotFound();
            }
            var shop = await _context.Shops.FindAsync(id);

            if (shop == null)
            {
                return ApiResult.NotFound();
            }

            return ApiResult.Ok(payload: shop);
        }

        // PUT: api/Shops/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShop(Guid id, Shop shop)
        {
            if (id != shop.Id)
            {
                return ApiResult.BadRequest();
            }

            _context.Entry(shop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return ApiResult.Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopExists(id))
                {
                    return ApiResult.NotFound();
                }

                return ApiResult.BadRequest();
            }

        }

        // POST: api/Shops
        [HttpPost]
        public async Task<ActionResult<CreateShop>> PostShop(CreateShop createShop)
        {
            if (_context.Shops == null)
            {
                return Problem("Entity set 'SmartShopContext.Shops'  is null.");
            }

            if (!ModelState.IsValid)
            {
                return ApiResult.BadRequest();
            }

            var account = await _context.Accounts.FindAsync(createShop.AccountId);
            if (account == null)
            {
                return ApiResult.BadRequest(errors: new
                {
                    Account = new[] { "Account does not exist." }
                });
            }

            using (var trx = _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var shop = new Shop
                    {
                        Id = Guid.NewGuid(),
                        Name = createShop.Name,
                        ShortName = createShop.ShortName,
                        Description = createShop.Description
                    };

                    _context.Shops.Add(shop);
                    await _context.SaveChangesAsync();

                    var user = new User
                    {
                        Id = Guid.NewGuid(),
                        AccountId = account.Id,
                        ShopId = shop.Id,
                        UserName = createShop.UserName,
                        IsLocked = false
                    };

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    var userRole = new UserRole
                    {
                        UserId = user.Id,
                        Role = nameof(Role.Administrator)
                    };

                    _context.UserRoles.Add(userRole);
                    await _context.SaveChangesAsync();

                    await trx.Result.CommitAsync();
                    return ApiResult.Ok();
                }
                catch
                {
                    await trx.Result.RollbackAsync();
                    return ApiResult.BadRequest(errors: new
                    {
                        CreateShop = new[] { "An error has ocurred. Please, try again later." }
                    });
                    //log error
                }
            }
        }

        private bool ShopExists(Guid id)
        {
            return (_context.Shops?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
