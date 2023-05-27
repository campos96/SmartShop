using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SmartShop.Core.Models;
using SmartShop.WebAdmin.Data;

namespace SmartShop.WebAdmin.Controllers
{
    public class ProductConditionsController : Controller
    {
        private readonly SmartShopContext _context;

        public ProductConditionsController(SmartShopContext context)
        {
            _context = context;
        }

        // GET: ProductConditions
        public async Task<IActionResult> Index()
        {
              return _context.ProductConditions != null ? 
                          View(await _context.ProductConditions.ToListAsync()) :
                          Problem("Entity set 'SmartShopContext.ProductConditions'  is null.");
        }

        // GET: ProductConditions/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.ProductConditions == null)
            {
                return NotFound();
            }

            var productCondition = await _context.ProductConditions
                .FirstOrDefaultAsync(m => m.Id == id);
            if (productCondition == null)
            {
                return NotFound();
            }

            return View(productCondition);
        }

        // GET: ProductConditions/Create
        public IActionResult Create()
        {
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name");
            return View();
        }

        // POST: ProductConditions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ShopId,Name,Description")] ProductCondition productCondition)
        {
            if (ModelState.IsValid)
            {
                productCondition.Id = Guid.NewGuid();
                _context.Add(productCondition);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name");
            return View(productCondition);
        }

        // GET: ProductConditions/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.ProductConditions == null)
            {
                return NotFound();
            }

            var productCondition = await _context.ProductConditions.FindAsync(id);
            if (productCondition == null)
            {
                return NotFound();
            }
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name");
            return View(productCondition);
        }

        // POST: ProductConditions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,ShopId,Name,Description")] ProductCondition productCondition)
        {
            if (id != productCondition.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(productCondition);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductConditionExists(productCondition.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name");
            return View(productCondition);
        }

        // GET: ProductConditions/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.ProductConditions == null)
            {
                return NotFound();
            }

            var productCondition = await _context.ProductConditions
                .FirstOrDefaultAsync(m => m.Id == id);
            if (productCondition == null)
            {
                return NotFound();
            }

            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name");
            return View(productCondition);
        }

        // POST: ProductConditions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.ProductConditions == null)
            {
                return Problem("Entity set 'SmartShopContext.ProductConditions'  is null.");
            }
            var productCondition = await _context.ProductConditions.FindAsync(id);
            if (productCondition != null)
            {
                _context.ProductConditions.Remove(productCondition);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProductConditionExists(Guid id)
        {
          return (_context.ProductConditions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
