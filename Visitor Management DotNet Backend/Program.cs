using Microsoft.EntityFrameworkCore;
using visitor_management.Services.Master.Visitor;
using VisitorManagement.Services.Master.Department;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Services.Master.Company;
using VisitorManagement.Services.Master.Country;
using VisitorManagement.Services.Master.Department; 
using VisitorManagement.Services.Master.Employee;
using VisitorManagement.Services.Master.Role;
using VisitorManagement.Services.Master.Route;
using VisitorManagement.Services.Master.State;
using VisitorManagement.Services.Master.Visitor;
using VistiorManagement.Services.Master.City;
using VistorManagement.ContextHelpers.DapperContext;
using VistorManagement.Services.Master.Company;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson(options =>
           options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddDbContext<DbContextHelper>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("VisitorManagementConnection");
    options.UseSqlServer(connectionString);
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IDapperContext, DapperContext>();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<ICompanyService, Companyservice>();
builder.Services.AddScoped<IStateService,StateService>();
builder.Services.AddScoped<IRouteService, RouteService>();  
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IVisitorService, VisitorService>(); 
builder.Services.AddScoped<IDepartmentService, DepartmentService>();




// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

/*builder.Services.AddDbContext<DbContextHelper>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("VisitorManagementConnection")));*/

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
   
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
