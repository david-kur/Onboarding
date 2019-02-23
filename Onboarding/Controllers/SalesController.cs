using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboard.Controllers
{
    public class SalesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetSales()
        {
            using (var db = new OnboardingEntities())
            {
                var sales = db.Sales.Select(x => new
                {
                    x.Id,
                    x.CustomerId,
                    Customer = x.Customer.Name,
                    x.ProductId,
                    Product = x.Product.Name,
                    x.StoreId,
                    Store = x.Store.Name,
                    x.DateSold
                }).ToList();

                return Json(sales, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetSalesPopulate()
        {
            using (var db = new OnboardingEntities())
            {
                var populate = new
                {
                    Customer = db.Customers.Select(x => new
                    {
                        x.Id,
                        x.Name
                    }).ToList(),
                    Product = db.Products.Select(x => new
                    {
                        x.Id,
                        x.Name
                    }).ToList(),
                    Store = db.Stores.Select(x => new
                    {
                        x.Id,
                        x.Name
                    }).ToList()
                };
                return Json(populate, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddSales(Sales sales)
        {
            using (var db = new OnboardingEntities())
            {
                db.Sales.Add(sales);
                db.SaveChanges();
                return Json(new { Success = true });
            }
        }

        public ActionResult UpdateSales(Sales sales)
        {
            using (var db = new OnboardingEntities())
            {
                var update = db.Sales.Where(x => x.Id == sales.Id).First();
                if (update != null)
                {
                    update.ProductId = sales.ProductId;
                    update.CustomerId = sales.CustomerId;
                    update.StoreId = sales.StoreId;
                    update.DateSold = sales.DateSold;
                    db.SaveChanges();
                }
                return Json(new { Success = true });
            }
        }

        public ActionResult DeleteSales(Sales sales)
        {
            using (var db = new OnboardingEntities())
            {
                var deleted = db.Sales.SingleOrDefault(x => x.Id == sales.Id);
                if (deleted != null)
                {
                    db.Sales.Remove(deleted);
                    db.SaveChanges();
                }
                return Json(new { Success = true });
            }
        }
    }
}