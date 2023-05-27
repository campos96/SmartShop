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
    public class SalesOrdersController : Controller
    {
        private readonly SmartShopContext _context;

        public SalesOrdersController(SmartShopContext context)
        {
            _context = context;
        }

        // GET: SalesOrders
        public async Task<IActionResult> Index()
        {
            var smartShopContext = _context.SalesOrders.Include(s => s.Shop).Include(s => s.Stock);
            return View(await smartShopContext.ToListAsync());
        }

        // GET: SalesOrders/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.SalesOrders == null)
            {
                return NotFound();
            }

            var salesOrder = await _context.SalesOrders
                .Include(s => s.Shop)
                .Include(s => s.Stock)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (salesOrder == null)
            {
                return NotFound();
            }

            return View(salesOrder);
        }

        // GET: SalesOrders/Create
        public IActionResult Create()
        {
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name");
            ViewData["StockId"] = new SelectList(_context.Stock, "Id", "Status");
            return View();
        }

        // POST: SalesOrders/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ShopId,StockId,SalesOrderNumber,Price,SaleCost,Created,Updated")] SalesOrder salesOrder)
        {
            if (ModelState.IsValid)
            {
                salesOrder.Id = Guid.NewGuid();
                _context.Add(salesOrder);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", salesOrder.ShopId);
            ViewData["StockId"] = new SelectList(_context.Stock, "Id", "Status", salesOrder.StockId);
            return View(salesOrder);
        }

        // GET: SalesOrders/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.SalesOrders == null)
            {
                return NotFound();
            }

            var salesOrder = await _context.SalesOrders.FindAsync(id);
            if (salesOrder == null)
            {
                return NotFound();
            }
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", salesOrder.ShopId);
            ViewData["StockId"] = new SelectList(_context.Stock, "Id", "Status", salesOrder.StockId);
            return View(salesOrder);
        }

        // POST: SalesOrders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,ShopId,StockId,SalesOrderNumber,Price,SaleCost,Created,Updated")] SalesOrder salesOrder)
        {
            if (id != salesOrder.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(salesOrder);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SalesOrderExists(salesOrder.Id))
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
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", salesOrder.ShopId);
            ViewData["StockId"] = new SelectList(_context.Stock, "Id", "Status", salesOrder.StockId);
            return View(salesOrder);
        }

        // GET: SalesOrders/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.SalesOrders == null)
            {
                return NotFound();
            }

            var salesOrder = await _context.SalesOrders
                .Include(s => s.Shop)
                .Include(s => s.Stock)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (salesOrder == null)
            {
                return NotFound();
            }

            return View(salesOrder);
        }

        // POST: SalesOrders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.SalesOrders == null)
            {
                return Problem("Entity set 'SmartShopContext.SalesOrders'  is null.");
            }
            var salesOrder = await _context.SalesOrders.FindAsync(id);
            if (salesOrder != null)
            {
                _context.SalesOrders.Remove(salesOrder);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SalesOrderExists(Guid id)
        {
          return (_context.SalesOrders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
