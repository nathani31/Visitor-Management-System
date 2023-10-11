using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class CountryMasterOne
{
    public int Countryid { get; set; }

    public string? Countryname { get; set; }

    public string? Countrycode { get; set; }

    public int? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual ICollection<CityMaster> CityMasters { get; set; } = new List<CityMaster>();

    public virtual ICollection<StateMaster> StateMasters { get; set; } = new List<StateMaster>();
}
