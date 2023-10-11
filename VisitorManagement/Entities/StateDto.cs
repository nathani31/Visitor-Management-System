using VisitorManagement.Models;
using VisitorManagement.Utils;

namespace VisitorManagement.Entities
{
    public class StateDto
    {
        public List<StateMaster> StateMasterList { get; set; }
        public StateMaster HdrTable { get; set; }
        public List<CountryMasterOne> CountryList { get; set; }
        public List<StateMaster> StateList { get; set; }
        public ErrorContext transtatus { get; set; }
    }
}
