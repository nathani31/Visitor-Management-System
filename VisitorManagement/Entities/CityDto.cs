using VisitorManagement.Models;
using VisitorManagement.Utils;


namespace VistiorManagement.Entities
{
    public class CityDto
    {
        
           public List<CityMaster>? CityMasterList { get; set; }
            public CityMaster? HdrTable { get; set; }
            public List<CountryMasterOne>? CountryList { get; set; }
            public List<StateMaster>? StateList { get; set; }

            public List<CityMaster> CityList { get; set; }
            public ErrorContext? transtatus { get; set; }
        
        
    }
}
