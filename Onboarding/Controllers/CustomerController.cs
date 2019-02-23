using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboard.Controllers
{
    public class CustomerController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetCustomer()
        {
            using (var db = new OnboardingEntities())
            {
                var model = db.Customers.Select(x=> new
                {
                    x.Id,
                    x.Name,
                    x.Address
                }).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddCustomer(Customer customer)
        {
            using (var db = new OnboardingEntities())
            {
                db.Customers.Add(customer);
                db.SaveChanges();
                return Json(new { Success = true });
            }
        }

        public ActionResult UpdateCustomer(Customer customer)
        {
            using (var db=new OnboardingEntities())
            {
                var update = db.Customers.Where(x => x.Id == customer.Id).First();
                if (update!=null)
                {
                    update.Name = customer.Name;
                    update.Address = customer.Address;
                    db.SaveChanges();
                }
                return Json(new { Success = true });
            }
        }

        public ActionResult DeleteCustomer(Customer customer)
        {
            using (var db = new OnboardingEntities())
            {
                var deleted = db.Customers.SingleOrDefault(x => x.Id == customer.Id);
                if (deleted != null)
                {
                    db.Sales.RemoveRange(deleted.ProductSold);
                    db.Customers.Remove(deleted);
                    db.SaveChanges();
                }
                return Json(new { Success = true });
            }
        }
    }
}