using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class DepartmentMaster
{
    public int Deptid { get; set; }

    public string? Deptname { get; set; }

    public string? Deptcode { get; set; }

    public int? Companyid { get; set; }

    public int? Plantid { get; set; }

    public int? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual ICollection<EmployeeMaster> EmployeeMasters { get; set; } = new List<EmployeeMaster>();

    public virtual PlantMaster? Plant { get; set; }
}
