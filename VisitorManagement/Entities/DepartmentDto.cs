using VisitorManagement.Utils;
using VisitorManagement.Models;

namespace VisitorManagement.Entities
{
    public class DepartmentDto
    {
        public List<DepartmentMaster>? DepartmentMastersList { get; set; }
        public DepartmentMaster Hdrtable { get; set; }
        public List<CompanyMaster> CompanyMasterList { get; set; }
        //public List<PlantidMaster> PlantMasterList { get; set; }

        public List<PlantMaster> PlantMasterList { get; set; }
        public List<DepartmentMaster> DepartmentMasters { get; set; }
        public ErrorContext transtatus { get; set; }



    }
}
