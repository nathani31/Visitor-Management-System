using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class CityMaster
{
    public int Cityid { get; set; }

    public string? Cityname { get; set; }

    public int? Citycode { get; set; }

    public int? Countryid { get; set; }

    public int? Stateid { get; set; }

    public short? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual CountryMasterOne? Country { get; set; }

    public virtual StateMaster? State { get; set; }
}
