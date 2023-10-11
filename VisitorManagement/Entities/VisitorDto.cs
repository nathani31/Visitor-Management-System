using VisitorManagement.Utils;
using VisitorManagement.Models;


namespace VisitorManagement.Entities
{
    public class VisitorDto
    {
        public List<VisitorTypeMaster>?  visitorTypeMasters   { get; set; }
        public VisitorTypeMaster HdrTable { get; set; }
        public List<CompanyMaster> CompanyList { get; set; }
        public List<PlantMaster> PlantList { get; set; }
        public List<VisitorTypeMaster>? visitorlist { get; set; }
        public ErrorContext transtatus { get; set; }
    }
}

