using VisitorManagement.Models;
using VisitorManagement.Utils;
 

namespace VisitorManagement.Entities
{
    public class CountryDto
    {

        //public List<CountryMaster> CountryMasterList { get; set; }
        //public CountryMaster HdrTable { get; set; }

        public List<CountryMasterOne> CountryMasterOneList { get; set; }
        public CountryMasterOne HdrTableOne { get; set; }

        public ErrorContext transtatus { get; set; }
    }

}
