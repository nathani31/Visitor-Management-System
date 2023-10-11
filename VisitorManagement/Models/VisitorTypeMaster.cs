using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class VisitorTypeMaster
{
    public int Visitortypeid { get; set; }

    public string? Visitortypename { get; set; }

    public int? Companyid { get; set; }

    public int? Plantid { get; set; }

    public short? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual PlantMaster? Plant { get; set; }
}
