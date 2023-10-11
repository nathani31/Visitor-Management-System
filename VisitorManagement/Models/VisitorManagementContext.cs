using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VisitorManagement.Models;

public partial class VisitorManagementContext : DbContext
{
    public VisitorManagementContext()
    {
    }

    public VisitorManagementContext(DbContextOptions<VisitorManagementContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CityMaster> CityMasters { get; set; }

    public virtual DbSet<CompanyMaster> CompanyMasters { get; set; }

    public virtual DbSet<CountryMasterOne> CountryMasterOnes { get; set; }

    public virtual DbSet<DepartmentMaster> DepartmentMasters { get; set; }

    public virtual DbSet<DesignationMaster> DesignationMasters { get; set; }

    public virtual DbSet<EmployeeMaster> EmployeeMasters { get; set; }

    public virtual DbSet<PlantMaster> PlantMasters { get; set; }

    public virtual DbSet<RoleMaster> RoleMasters { get; set; }

    public virtual DbSet<RouteMaster> RouteMasters { get; set; }

    public virtual DbSet<StateMaster> StateMasters { get; set; }

    public virtual DbSet<VisitorTypeMaster> VisitorTypeMasters { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-DJ147CM;Database=VisitorManagement;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CityMaster>(entity =>
        {
            entity.HasKey(e => e.Cityid).HasName("PK__city_Mas__B4BDBD26EE6981F6");

            entity.ToTable("city_Master");

            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.Citycode).HasColumnName("citycode");
            entity.Property(e => e.Cityname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cityname");
            entity.Property(e => e.Countryid).HasColumnName("countryid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("date")
                .HasColumnName("createdon");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("date")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Stateid).HasColumnName("stateid");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Country).WithMany(p => p.CityMasters)
                .HasForeignKey(d => d.Countryid)
                .HasConstraintName("FK__city_Mast__count__3E52440B");

            entity.HasOne(d => d.State).WithMany(p => p.CityMasters)
                .HasForeignKey(d => d.Stateid)
                .HasConstraintName("FK__city_Mast__state__3F466844");
        });

        modelBuilder.Entity<CompanyMaster>(entity =>
        {
            entity.HasKey(e => e.Companyid).HasName("PK__CompanyM__2D9620D4E23D9992");

            entity.ToTable("CompanyMaster");

            entity.Property(e => e.Companycode)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Companyname)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Createdby)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Createdon).HasColumnType("datetime");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Modifiedon).HasColumnType("datetime");
        });

        modelBuilder.Entity<CountryMasterOne>(entity =>
        {
            entity.HasKey(e => e.Countryid).HasName("PK__CountryM__D32342B4A0E6ECD7");

            entity.ToTable("CountryMasterOne");

            entity.Property(e => e.Countryid).HasColumnName("countryid");
            entity.Property(e => e.Countrycode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("countrycode");
            entity.Property(e => e.Countryname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("countryname");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<DepartmentMaster>(entity =>
        {
            entity.HasKey(e => e.Deptid).HasName("PK__Departme__BE2C1AEE1C73DEB2");

            entity.ToTable("Department_Master");

            entity.Property(e => e.Deptid).HasColumnName("deptid");
            entity.Property(e => e.Companyid).HasColumnName("companyid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Deptcode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("deptcode");
            entity.Property(e => e.Deptname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("deptname");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Plantid).HasColumnName("plantid");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Company).WithMany(p => p.DepartmentMasters)
                .HasForeignKey(d => d.Companyid)
                .HasConstraintName("FK__Departmen__compa__5AEE82B9");

            entity.HasOne(d => d.Plant).WithMany(p => p.DepartmentMasters)
                .HasForeignKey(d => d.Plantid)
                .HasConstraintName("FK__Departmen__plant__5BE2A6F2");
        });

        modelBuilder.Entity<DesignationMaster>(entity =>
        {
            entity.HasKey(e => e.Desgid).HasName("PK__Designat__98EC1843EEEAF0BB");

            entity.ToTable("Designation_Master");

            entity.Property(e => e.Desgid).HasColumnName("desgid");
            entity.Property(e => e.Companyid).HasColumnName("companyid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Desgcode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("desgcode");
            entity.Property(e => e.Desgname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("desgname");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Plantid).HasColumnName("plantid");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Company).WithMany(p => p.DesignationMasters)
                .HasForeignKey(d => d.Companyid)
                .HasConstraintName("FK__Designati__compa__5EBF139D");

            entity.HasOne(d => d.Plant).WithMany(p => p.DesignationMasters)
                .HasForeignKey(d => d.Plantid)
                .HasConstraintName("FK__Designati__plant__5FB337D6");
        });

        modelBuilder.Entity<EmployeeMaster>(entity =>
        {
            entity.HasKey(e => e.Empid).HasName("PK__Employee__AF4CE86583F152CF");

            entity.ToTable("Employee_Master");

            entity.Property(e => e.Empid).HasColumnName("empid");
            entity.Property(e => e.Biometricid).HasColumnName("biometricid");
            entity.Property(e => e.Companyid).HasColumnName("companyid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Empage).HasColumnName("empage");
            entity.Property(e => e.Empcode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("empcode");
            entity.Property(e => e.Empdeptid).HasColumnName("empdeptid");
            entity.Property(e => e.Empdesignationid).HasColumnName("empdesignationid");
            entity.Property(e => e.Empdob)
                .HasColumnType("date")
                .HasColumnName("empdob");
            entity.Property(e => e.Empemail)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("empemail");
            entity.Property(e => e.Empfirstname)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("empfirstname");
            entity.Property(e => e.Empgender)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("empgender");
            entity.Property(e => e.Empidcardno)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("empidcardno");
            entity.Property(e => e.Emplastname)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("emplastname");
            entity.Property(e => e.Empname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("empname");
            entity.Property(e => e.Empplantid).HasColumnName("empplantid");
            entity.Property(e => e.Emptelno)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("emptelno");
            entity.Property(e => e.Emptypeid).HasColumnName("emptypeid");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Plantid).HasColumnName("plantid");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Company).WithMany(p => p.EmployeeMasters)
                .HasForeignKey(d => d.Companyid)
                .HasConstraintName("FK__Employee___compa__6754599E");

            entity.HasOne(d => d.Empdept).WithMany(p => p.EmployeeMasters)
                .HasForeignKey(d => d.Empdeptid)
                .HasConstraintName("FK__Employee___empde__6A30C649");

            entity.HasOne(d => d.Empdesignation).WithMany(p => p.EmployeeMasters)
                .HasForeignKey(d => d.Empdesignationid)
                .HasConstraintName("FK__Employee___empde__693CA210");

            entity.HasOne(d => d.Plant).WithMany(p => p.EmployeeMasters)
                .HasForeignKey(d => d.Plantid)
                .HasConstraintName("FK__Employee___plant__68487DD7");
        });

        modelBuilder.Entity<PlantMaster>(entity =>
        {
            entity.HasKey(e => e.Plantid).HasName("PK__PlantMas__871A3EC8684159F1");

            entity.ToTable("PlantMaster");

            entity.Property(e => e.Plantid).HasColumnName("plantid");
            entity.Property(e => e.Companyid).HasColumnName("companyid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Headoftheplant)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("headoftheplant");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Plantaddress)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plantaddress");
            entity.Property(e => e.Plantcityid).HasColumnName("plantcityid");
            entity.Property(e => e.Plantcode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("plantcode");
            entity.Property(e => e.Plantname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plantname");
            entity.Property(e => e.Planttype)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("planttype");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Company).WithMany(p => p.PlantMasters)
                .HasForeignKey(d => d.Companyid)
                .HasConstraintName("FK__PlantMast__compa__36B12243");
        });

        modelBuilder.Entity<RoleMaster>(entity =>
        {
            entity.HasKey(e => e.Roleid).HasName("PK__Role_Mas__CD994BF2FE9A2C11");

            entity.ToTable("Role_Master");

            entity.Property(e => e.Roleid).HasColumnName("roleid");
            entity.Property(e => e.Companyid).HasColumnName("companyid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Plantid).HasColumnName("plantid");
            entity.Property(e => e.Rolecode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("rolecode");
            entity.Property(e => e.Rolename)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("rolename");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Company).WithMany(p => p.RoleMasters)
                .HasForeignKey(d => d.Companyid)
                .HasConstraintName("FK__Role_Mast__compa__440B1D61");

            entity.HasOne(d => d.Plant).WithMany(p => p.RoleMasters)
                .HasForeignKey(d => d.Plantid)
                .HasConstraintName("FK__Role_Mast__plant__44FF419A");
        });

        modelBuilder.Entity<RouteMaster>(entity =>
        {
            entity.HasKey(e => e.Routeid).HasName("PK__Route_Ma__BAC138DF27ABD0E2");

            entity.ToTable("Route_Master");

            entity.Property(e => e.Routeid).HasColumnName("routeid");
            entity.Property(e => e.Companyid).HasColumnName("companyid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Plantid).HasColumnName("plantid");
            entity.Property(e => e.Routecode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("routecode");
            entity.Property(e => e.Routedes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("routedes");
            entity.Property(e => e.Routedistanceinkm)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("routedistanceinkm");
            entity.Property(e => e.Routename)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("routename");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Company).WithMany(p => p.RouteMasters)
                .HasForeignKey(d => d.Companyid)
                .HasConstraintName("FK__Route_Mas__compa__398D8EEE");

            entity.HasOne(d => d.Plant).WithMany(p => p.RouteMasters)
                .HasForeignKey(d => d.Plantid)
                .HasConstraintName("FK__Route_Mas__plant__3A81B327");
        });

        modelBuilder.Entity<StateMaster>(entity =>
        {
            entity.HasKey(e => e.Stateid).HasName("PK__State_Ma__A666BDB9D3673889");

            entity.ToTable("State_Master");

            entity.Property(e => e.Stateid).HasColumnName("stateid");
            entity.Property(e => e.Countryid).HasColumnName("countryid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Statecode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("statecode");
            entity.Property(e => e.Statename)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("statename");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Country).WithMany(p => p.StateMasters)
                .HasForeignKey(d => d.Countryid)
                .HasConstraintName("FK__State_Mas__count__239E4DCF");
        });

        modelBuilder.Entity<VisitorTypeMaster>(entity =>
        {
            entity.HasKey(e => e.Visitortypeid).HasName("PK__Visitor___A76A332EF49F0899");

            entity.ToTable("Visitor_Type_Master");

            entity.Property(e => e.Visitortypeid).HasColumnName("visitortypeid");
            entity.Property(e => e.Companyid).HasColumnName("companyid");
            entity.Property(e => e.Createdby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdby");
            entity.Property(e => e.Createdon)
                .HasColumnType("datetime")
                .HasColumnName("createdon");
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("modifiedby");
            entity.Property(e => e.Modifiedon)
                .HasColumnType("datetime")
                .HasColumnName("modifiedon");
            entity.Property(e => e.Plantid).HasColumnName("plantid");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Visitortypename)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("visitortypename");

            entity.HasOne(d => d.Company).WithMany(p => p.VisitorTypeMasters)
                .HasForeignKey(d => d.Companyid)
                .HasConstraintName("FK__Visitor_T__compa__6EF57B66");

            entity.HasOne(d => d.Plant).WithMany(p => p.VisitorTypeMasters)
                .HasForeignKey(d => d.Plantid)
                .HasConstraintName("FK__Visitor_T__plant__6FE99F9F");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
