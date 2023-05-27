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
    public class ProductDetailsController : Controller
    {
        private readonly SmartShopContext _context;

        public ProductDetailsController(SmartShopContext context)
        {
            _context = context;
        }

        // GET: ProductDetails
        public async Task<IActionResult> Index()
        {
            var smartShopContext = _context.ProductDetails.Include(p => p.Product);
            return View(await smartShopContext.ToListAsync());
        }

        // GET: ProductDetails/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.ProductDetails == null)
            {
                return NotFound();
            }

            var productDetails = await _context.ProductDetails
                .Include(p => p.Product)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (productDetails == null)
            {
                return NotFound();
            }

            return View(productDetails);
        }

        // GET: ProductDetails/Create
        public IActionResult Create()
        {
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Brand");
            return View();
        }

        // POST: ProductDetails/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ProductId,Description,Color,NetworkStatus,NetworkCompany,StorageCapacity,BatteryLife")] ProductDetails productDetails)
        {
            if (ModelState.IsValid)
            {
                productDetails.Id = Guid.NewGuid();
                _context.Add(productDetails);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Brand", productDetails.ProductId);
            return View(productDetails);
        }

        // GET: ProductDetails/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.ProductDetails == null)
            {
                return NotFound();
            }

            var productDetails = await _context.ProductDetails.FindAsync(id);
            if (productDetails == null)
            {
                return NotFound();
            }
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Brand", productDetails.ProductId);
            return View(productDetails);
        }

        // POST: ProductDetails/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,ProductId,Description,Color,NetworkStatus,NetworkCompany,StorageCapacity,BatteryLife")] ProductDetails productDetails)
        {
            if (id != productDetails.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(productDetails);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductDetailsExists(productDetails.Id))
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
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Brand", productDetails.ProductId);
            return View(productDetails);
        }

        // GET: ProductDetails/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.ProductDetails == null)
            {
                return NotFound();
            }

            var productDetails = await _context.ProductDetails
                .Include(p => p.Product)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (productDetails == null)
            {
                return NotFound();
            }

            return View(productDetails);
        }

        // POST: ProductDetails/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.ProductDetails == null)
            {
                return Problem("Entity set 'SmartShopContext.ProductDetails'  is null.");
            }
            var productDetails = await _context.ProductDetails.FindAsync(id);
            if (productDetails != null)
            {
                _context.ProductDetails.Remove(productDetails);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProductDetailsExists(Guid id)
        {
          return (_context.ProductDetails?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
