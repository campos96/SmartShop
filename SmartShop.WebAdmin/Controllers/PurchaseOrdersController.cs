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
    public class PurchaseOrdersController : Controller
    {
        private readonly SmartShopContext _context;

        public PurchaseOrdersController(SmartShopContext context)
        {
            _context = context;
        }

        // GET: PurchaseOrders
        public async Task<IActionResult> Index()
        {
            var smartShopContext = _context.PurchaseOrders.Include(p => p.Product).Include(p => p.Shop);
            return View(await smartShopContext.ToListAsync());
        }

        // GET: PurchaseOrders/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.PurchaseOrders == null)
            {
                return NotFound();
            }

            var purchaseOrder = await _context.PurchaseOrders
                .Include(p => p.Product)
                .Include(p => p.Shop)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (purchaseOrder == null)
            {
                return NotFound();
            }

            return View(purchaseOrder);
        }

        // GET: PurchaseOrders/Create
        public IActionResult Create()
        {
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Brand");
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name");
            return View();
        }

        // POST: PurchaseOrders/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ShopId,ProductId,PurchaseOrderNumber,Price,PriceInUSD,Created,Updated")] PurchaseOrder purchaseOrder)
        {
            if (ModelState.IsValid)
            {
                purchaseOrder.Id = Guid.NewGuid();
                _context.Add(purchaseOrder);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Brand", purchaseOrder.ProductId);
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", purchaseOrder.ShopId);
            return View(purchaseOrder);
        }

        // GET: PurchaseOrders/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.PurchaseOrders == null)
            {
                return NotFound();
            }

            var purchaseOrder = await _context.PurchaseOrders.FindAsync(id);
            if (purchaseOrder == null)
            {
                return NotFound();
            }
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Brand", purchaseOrder.ProductId);
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", purchaseOrder.ShopId);
            return View(purchaseOrder);
        }

        // POST: PurchaseOrders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,ShopId,ProductId,PurchaseOrderNumber,Price,PriceInUSD,Created,Updated")] PurchaseOrder purchaseOrder)
        {
            if (id != purchaseOrder.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(purchaseOrder);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PurchaseOrderExists(purchaseOrder.Id))
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
            ViewData["ProductId"] = new SelectList(_context.Products, "Id", "Brand", purchaseOrder.ProductId);
            ViewData["ShopId"] = new SelectList(_context.Shops, "Id", "Name", purchaseOrder.ShopId);
            return View(purchaseOrder);
        }

        // GET: PurchaseOrders/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.PurchaseOrders == null)
            {
                return NotFound();
            }

            var purchaseOrder = await _context.PurchaseOrders
                .Include(p => p.Product)
                .Include(p => p.Shop)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (purchaseOrder == null)
            {
                return NotFound();
            }

            return View(purchaseOrder);
        }

        // POST: PurchaseOrders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.PurchaseOrders == null)
            {
                return Problem("Entity set 'SmartShopContext.PurchaseOrders'  is null.");
            }
            var purchaseOrder = await _context.PurchaseOrders.FindAsync(id);
            if (purchaseOrder != null)
            {
                _context.PurchaseOrders.Remove(purchaseOrder);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PurchaseOrderExists(Guid id)
        {
          return (_context.PurchaseOrders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
