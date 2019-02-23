using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboard.Controllers
{
    public class StoreController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetStore()
        {
            using (var db = new OnboardingEntities())
            {
                var model = db.Stores.Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Address
                }).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddStore(Store store)
        {
            using (var db = new OnboardingEntities())
            {
                db.Stores.Add(store);
                db.SaveChanges();
                return Json(new { Success = true });
            }
        }

        public ActionResult UpdateStore(Store store)
        {
            using (var db = new OnboardingEntities())
            {
                var update = db.Stores.Where(x => x.Id == store.Id).First();
                if (update != null)
                {
                    update.Name = store.Name;
                    update.Address = store.Address;
                    db.SaveChanges();
                }
                return Json(new { Success = true });
            }
        }

        public ActionResult DeleteStore(Store store)
        {
            using (var db = new OnboardingEntities())
            {
                var deleted = db.Stores.SingleOrDefault(x => x.Id == store.Id);
                if (deleted != null)
                {
                    db.Sales.RemoveRange(deleted.ProductSold);
                    db.Stores.Remove(deleted);
                    db.SaveChanges();
                }
                return Json(new { Success = true });
            }
        }
    }
}