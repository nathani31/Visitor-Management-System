using VisitorManagement.Utils;
using VisitorManagement.Models;

namespace VisitorManagement.Entities
{
    public class RouteDto
    {
        public List<RouteMaster>? RouteMasterList { get; set;}
        public RouteMaster? HdrTable { get; set; }
        public List<CompanyMaster> CompanyList { get; set; }
        public List<PlantMaster> PlantList { get; set; }

        public List<RouteMaster> RouteList { get; set; }
        public ErrorContext? transtatus { get; set; }
    }
}
