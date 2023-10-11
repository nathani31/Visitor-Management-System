using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class PlantMaster
{
    public int Plantid { get; set; }

    public string? Plantname { get; set; }

    public string? Plantcode { get; set; }

    public string? Plantaddress { get; set; }

    public string? Headoftheplant { get; set; }

    public int? Plantcityid { get; set; }

    public string? Planttype { get; set; }

    public int? Companyid { get; set; }

    public short? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual ICollection<DepartmentMaster> DepartmentMasters { get; set; } = new List<DepartmentMaster>();

    public virtual ICollection<DesignationMaster> DesignationMasters { get; set; } = new List<DesignationMaster>();

    public virtual ICollection<EmployeeMaster> EmployeeMasters { get; set; } = new List<EmployeeMaster>();

    public virtual ICollection<RoleMaster> RoleMasters { get; set; } = new List<RoleMaster>();

    public virtual ICollection<RouteMaster> RouteMasters { get; set; } = new List<RouteMaster>();

    public virtual ICollection<VisitorTypeMaster> VisitorTypeMasters { get; set; } = new List<VisitorTypeMaster>();
}
