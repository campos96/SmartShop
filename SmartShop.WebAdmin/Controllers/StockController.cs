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
    public class StockController : Controller
    {
        private readonly SmartShopContext _context;

        public StockController(SmartShopContext context)
        {
            _context = context;
        }

        // GET: Stock
        public async Task<IActionResult> Index()
        {
            var smartShopContext = _context.Stock.Include(s => s.PurchaseOrder).Include(s => s.Shop);
            return View(await smartShopContext.ToListAsync());
        }

        // GET: Stock/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.Stock == null)
            {
                return NotFound();
            }

            var stock = await _context.Stock
                .Include(s => s.PurchaseOrder)
                .Include(s => s.Shop)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (stock == null)
            {
                return NotFound();
            }

            return View(stock);
        }

        // GET: Stock/Create
        public IActionResult Create()
        {
            ViewData["PurchaseOrderId"] = new SelectList(_context.PurchaseOrders, "Id", "PurchaseOrderNumber");
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name");
            return View();
        }

        // POST: Stock/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ShopId,PurchaseOrderId,Price,EstimatedPrice,Quantity,Created,Updated,Status,Notes")] Stock stock)
        {
            if (ModelState.IsValid)
            {
                stock.Id = Guid.NewGuid();
                _context.Add(stock);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["PurchaseOrderId"] = new SelectList(_context.PurchaseOrders, "Id", "PurchaseOrderNumber", stock.PurchaseOrderId);
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", stock.ShopId);
            return View(stock);
        }

        // GET: Stock/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.Stock == null)
            {
                return NotFound();
            }

            var stock = await _context.Stock.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }
            ViewData["PurchaseOrderId"] = new SelectList(_context.PurchaseOrders, "Id", "PurchaseOrderNumber", stock.PurchaseOrderId);
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", stock.ShopId);
            return View(stock);
        }

        // POST: Stock/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,ShopId,PurchaseOrderId,Price,EstimatedPrice,Quantity,Created,Updated,Status,Notes")] Stock stock)
        {
            if (id != stock.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(stock);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StockExists(stock.Id))
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
            ViewData["PurchaseOrderId"] = new SelectList(_context.PurchaseOrders, "Id", "PurchaseOrderNumber", stock.PurchaseOrderId);
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", stock.ShopId);
            return View(stock);
        }

        // GET: Stock/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.Stock == null)
            {
                return NotFound();
            }

            var stock = await _context.Stock
                .Include(s => s.PurchaseOrder)
                .Include(s => s.Shop)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (stock == null)
            {
                return NotFound();
            }

            return View(stock);
        }

        // POST: Stock/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.Stock == null)
            {
                return Problem("Entity set 'SmartShopContext.Stock'  is null.");
            }
            var stock = await _context.Stock.FindAsync(id);
            if (stock != null)
            {
                _context.Stock.Remove(stock);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool StockExists(Guid id)
        {
          return (_context.Stock?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
