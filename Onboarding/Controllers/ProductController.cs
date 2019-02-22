using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboard.Controllers
{
    public class ProductController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetProduct()
        {
            using (var db = new OnboardingEntities())
            {
                var model = db.Products.Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Price
                }).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddProduct(Product product)
        {
            using (var db = new OnboardingEntities())
            {
                db.Products.Add(product);
                db.SaveChanges();
                return Json(new { Success = true });
            }
        }

        public ActionResult UpdateProduct(Product product)
        {
            using (var db = new OnboardingEntities())
            {
                var update = db.Products.Where(x => x.Id == product.Id).First();
                if (update != null)
                {
                    update.Name = product.Name;
                    update.Price = product.Price;
                    db.SaveChanges();
                }
                return Json(new { Success = true });
            }
        }

        public ActionResult DeleteProduct(Product product)
        {
            using (var db = new OnboardingEntities())
            {
                var deleted = db.Products.FirstOrDefault(x => x.Id == product.Id);
                if (deleted != null)
                {
                    db.Products.Remove(deleted);
                    db.SaveChanges();
                }
                return Json(new { Success = true });
            }
        }
    }
}