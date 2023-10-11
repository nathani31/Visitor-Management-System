using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class RouteMaster
{
    public int Routeid { get; set; }

    public string? Routename { get; set; }

    public string? Routecode { get; set; }

    public string? Routedes { get; set; }

    public decimal? Routedistanceinkm { get; set; }

    public int? Companyid { get; set; }

    public int? Plantid { get; set; }

    public int? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual PlantMaster? Plant { get; set; }
}
