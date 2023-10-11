using System;
using System.Collections.Generic;

namespace VisitorManagement.Models;

public partial class EmployeeMaster
{
    public int? Companyid { get; set; }

    public int? Plantid { get; set; }

    public int Empid { get; set; }

    public string? Empname { get; set; }

    public string? Empcode { get; set; }

    public string? Empfirstname { get; set; }

    public string? Emplastname { get; set; }

    public DateTime? Empdob { get; set; }

    public int? Empage { get; set; }

    public int? Empdesignationid { get; set; }

    public int? Empdeptid { get; set; }

    public string? Empemail { get; set; }

    public string? Emptelno { get; set; }

    public string? Empgender { get; set; }

    public int? Emptypeid { get; set; }

    public int? Biometricid { get; set; }

    public string? Empidcardno { get; set; }

    public int? Empplantid { get; set; }

    public short? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdon { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedon { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual DepartmentMaster? Empdept { get; set; }

    public virtual DesignationMaster? Empdesignation { get; set; }

    public virtual PlantMaster? Plant { get; set; }
}
