using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartShop.Api.Data;
using SmartShop.Core.Models;

namespace SmartShop.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductConditionsController : ControllerBase
    {
        private readonly SmartShopContext _context;

        public ProductConditionsController(SmartShopContext context)
        {
            _context = context;
        }

        // GET: api/ProductConditions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCondition>>> GetProductConditions()
        {
          if (_context.ProductConditions == null)
          {
              return NotFound();
          }
            return await _context.ProductConditions.ToListAsync();
        }

        // GET: api/ProductConditions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCondition>> GetProductCondition(Guid id)
        {
          if (_context.ProductConditions == null)
          {
              return NotFound();
          }
            var productCondition = await _context.ProductConditions.FindAsync(id);

            if (productCondition == null)
            {
                return NotFound();
            }

            return productCondition;
        }

        // PUT: api/ProductConditions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductCondition(Guid id, ProductCondition productCondition)
        {
            if (id != productCondition.Id)
            {
                return BadRequest();
            }

            _context.Entry(productCondition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductConditionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductConditions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductCondition>> PostProductCondition(ProductCondition productCondition)
        {
          if (_context.ProductConditions == null)
          {
              return Problem("Entity set 'SmartShopContext.ProductConditions'  is null.");
          }
            _context.ProductConditions.Add(productCondition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductCondition", new { id = productCondition.Id }, productCondition);
        }

        // DELETE: api/ProductConditions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCondition(Guid id)
        {
            if (_context.ProductConditions == null)
            {
                return NotFound();
            }
            var productCondition = await _context.ProductConditions.FindAsync(id);
            if (productCondition == null)
            {
                return NotFound();
            }

            _context.ProductConditions.Remove(productCondition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductConditionExists(Guid id)
        {
            return (_context.ProductConditions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
