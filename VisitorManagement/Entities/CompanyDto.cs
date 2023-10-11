using VisitorManagement.Models;
using VisitorManagement.Utils;


namespace VisitorManagement.Entities
{
    public class CompanyDTO
    {
        public List<CompanyMaster>? CompanyMasterList { get; set; }    
        public CompanyMaster? HDRtable { get; set; }

        public ErrorContext transtatus { get; set; }
    }
}
