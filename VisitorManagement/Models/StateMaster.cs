using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class StateMaster
{
    public int Stateid { get; set; }

    public string? Statename { get; set; }

    public string? Statecode { get; set; }

    public int? Countryid { get; set; }

    public short? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual ICollection<CityMaster> CityMasters { get; set; } = new List<CityMaster>();

    public virtual CountryMasterOne? Country { get; set; }
}
