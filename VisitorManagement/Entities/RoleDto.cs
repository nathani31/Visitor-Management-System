
using VisitorManagement.Models;
using VisitorManagement.Utils;

namespace VisitorManagement.Entities
{
    public class RoleDto
    {
        public List<RoleMaster>? RoleMasterList { get; set; }
        public RoleMaster Hdrtable { get; set; }

        public List<CompanyMaster> CompanyMasterList { get; set;}
        public List<PlantMaster> PlantMasterList { get; set;}
        public List<RoleMaster> RoleList { get; set; }  

        public ErrorContext transtatus { get; set; }
    }
}
