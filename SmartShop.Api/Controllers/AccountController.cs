using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartShop.Api.Data;
using SmartShop.Api.Models;
using SmartShop.Core.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SmartShopContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(SmartShopContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(Signup signup)
        {
            var accounts = await _context.Accounts
                .Where(a => a.UserName == signup.UserName || a.Email == signup.Email)
                .ToListAsync();

            if (accounts.Any(a => a.UserName == signup.UserName))
            {
                return ApiResult.BadRequest(errors: new
                {
                    UserName = new[] { "Username already exist." }
                });
            }

            if (accounts.Any(a => a.Email == signup.Email))
            {
                return ApiResult.BadRequest(errors: new
                {
                    Email = new[] { "Email already registered." }
                });
            }

            var account = new Account
            {
                Id = Guid.NewGuid(),
                UserName = signup.UserName,
                FirstName = signup.FirstName,
                LastName = signup.LastName,
                Email = signup.Email,
                Password = signup.Password,
                IsLocked = false,
                Created = DateTime.Now
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return ApiResult.Ok();
        }

        // GET: api/account/login
        [HttpPost("login")]
        public async Task<ActionResult> Login(Login login)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .Include(a => a.Users!)
                .ThenInclude(u => u.Shop)
                .Where(a => a.UserName == login.Username && a.Password == login.Password)
                .FirstOrDefaultAsync();

            if (account == null)
            {
                return ApiResult.Unauthorized(errors: new
                {
                    userName = new[] { "Invalid username or password." }
                });
            }

            var issuer = _configuration.GetValue<string>("Jwt:Issuer");
            var audience = _configuration.GetValue<string>("Jwt:Audience");
            var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("Jwt:Key")!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, login.Username),
                    new Claim(JwtRegisteredClaimNames.Email, login.Username),
                    new Claim(JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString())
                 }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            var stringToken = tokenHandler.WriteToken(token);

            var authenticationResult = new
            {
                AccessToken = stringToken,
                ExpiresIn = (int)(tokenDescriptor.Expires.Value - DateTime.UtcNow).TotalSeconds,
                UserFullName = account.FullName
            };

            return ApiResult.Ok(payload: authenticationResult);
        }
    }
}
