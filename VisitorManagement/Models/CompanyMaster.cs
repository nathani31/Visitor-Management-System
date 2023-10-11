using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class CompanyMaster
{
    public int Companyid { get; set; }

    public string? Companyname { get; set; }

    public string? Companycode { get; set; }

    public int Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual ICollection<DepartmentMaster> DepartmentMasters { get; set; } = new List<DepartmentMaster>();

    public virtual ICollection<DesignationMaster> DesignationMasters { get; set; } = new List<DesignationMaster>();

    public virtual ICollection<EmployeeMaster> EmployeeMasters { get; set; } = new List<EmployeeMaster>();

    public virtual ICollection<PlantMaster> PlantMasters { get; set; } = new List<PlantMaster>();

    public virtual ICollection<RoleMaster> RoleMasters { get; set; } = new List<RoleMaster>();

    public virtual ICollection<RouteMaster> RouteMasters { get; set; } = new List<RouteMaster>();

    public virtual ICollection<VisitorTypeMaster> VisitorTypeMasters { get; set; } = new List<VisitorTypeMaster>();
}
