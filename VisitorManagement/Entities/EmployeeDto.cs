
using System.Diagnostics.Metrics;
using VisitorManagement.Models;
using VisitorManagement.Utils;

namespace VisitorManagement.Entities
{
    public class EmployeeDto
    {
        public List<EmployeeMaster>? EmployeeMasterList { get; set; }
        public EmployeeMaster? HdrTable { get; set; }
        public List<CompanyMaster> CompanyMasterList { get; set; }
        public List<DepartmentMaster> DepartmentMasterList { get; set; }
        public List<DesignationMaster> DesignationMasterList { get; set; }
        public List<PlantMaster> PlantMasterList { get; set; }
        public List<EmployeeMaster> EmployeeList { get; set; }
        public ErrorContext? transtatus { get; set; }
    }
}
