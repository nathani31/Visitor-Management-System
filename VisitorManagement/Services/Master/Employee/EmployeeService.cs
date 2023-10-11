using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Entities;
using VisitorManagement.Models;
using VisitorManagement.Utils;

namespace VisitorManagement.Services.Master.Employee
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EmployeeDto dto;
        private readonly DbContextHelper dbContext;
        private readonly IDapperContext dapperContext;

        public EmployeeService(DbContextHelper _dbcontextHelper, IDapperContext _dapperContext)
        {
            dto = new EmployeeDto();
            dbContext = _dbcontextHelper;
            dapperContext = _dapperContext;
            dto.transtatus = new ErrorContext
            {
                lstErrorItem = new List<ErrorItem>()
            };
        }

        public async Task<object> ChangeStatus(JObject obj)
        {
            int empid = obj["empid"].ToObject<int>();
            try
            {
                EmployeeMaster employeeMaster = await dbContext.EmployeeMasters.FirstOrDefaultAsync(y => y.Empid == empid);
                if (employeeMaster != null)
                {
                    employeeMaster.Status = 2;
                    await dbContext.SaveChangesAsync();

                    dto.transtatus.result = true;
                    dto.transtatus.lstErrorItem.Add(new ErrorItem
                    {
                        Message = "Status Change Successfully"
                    });
                }
                else
                {
                    dto.transtatus.result = false;
                    dto.transtatus.lstErrorItem.Add(new ErrorItem
                    {
                        Message = "Employee not found"
                    });
                }
            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(new ErrorItem
                {
                    ErrorNo = "VM0000",
                    Message = ex.Message
                });
            }
            return dto;
        }

        public async Task<object> Create(JObject obj)
        {
            EmployeeMaster employeeMaster = obj["EmployeeMaster"].ToObject<EmployeeMaster>();
            try
            {
                dbContext.EmployeeMasters.Add(employeeMaster);
                await dbContext.SaveChangesAsync();

                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(new ErrorItem
                {
                    Message = "Create Successfully"
                });
            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(new ErrorItem
                {
                    ErrorNo = "VM0000",
                    Message = ex.Message
                });
            }

            return dto;
        }

        public async Task<object> CreateInitialize(JObject obj)
        {
            int empid = obj["empid"].ToObject<int>();
            string Type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_EMP_CI", new
                    {
                        Type,
                        empid
                    });

                    dto.EmployeeMasterList = (await spcall.ReadAsync<EmployeeMaster>()).ToList();
                    if (empid > 0)
                    {
                        dto.HdrTable = (await spcall.ReadAsync<EmployeeMaster>()).SingleOrDefault();
                    }
                }
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(new ErrorItem
                {
                    Message = "CreateInitialize Successfully"
                });
            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(new ErrorItem
                {
                    ErrorNo = "VM0000",
                    Message = ex.Message
                });
            }

            return dto;
        }


      
        public async Task<object> SearchInitialize(JObject obj)
        {
            int empid = obj["empid"].ToObject<int>();
            string Type = "SearchInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_EMP_CI", new
                    {
                        Type,
                        empid
                    });

                    dto.EmployeeList = (await spcall.ReadAsync<EmployeeMaster>()).ToList();
                }
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                {
                    Message = "SearchInitialize Successfully"
                }
                    );
            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(new 
                    ErrorItem
                {
                    ErrorNo = "VM0000",
                    Message = ex.Message
                });
            }
            return dto;
        }

        public async Task<object> Update(JObject obj)
        {
            try
            {
                var employeemaster = obj["EmployeeMaster"].ToObject<EmployeeMaster>();
                dbContext.EmployeeMasters.Update(employeemaster);
                await dbContext.SaveChangesAsync();
                //if (employeemasterArray != null && employeemasterArray.Count > 0)
                //{
                //    foreach (var employeemasterValue in employeemasterArray)
                //    {
                //        EmployeeMaster employeemaster = employeemasterValue.ToObject<EmployeeMaster>();
                //        dbContext.EmployeeMasters.Update(employeemaster);
                //    }

                //    await dbContext.SaveChangesAsync();

                    dto.transtatus.result = true;
                    dto.transtatus.lstErrorItem.Add(new ErrorItem
                    {
                        Message = "Updated Successfully"
                    });
                }
            //    else
            //    {
            //        dto.transtatus.result = false;
            //        dto.transtatus.lstErrorItem.Add(new ErrorItem
            //        {
            //            Message = "No EmployeeMaster data provided for update"
            //        });
            //    }
            //}
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(new ErrorItem
                {
                    ErrorNo = "VM0000",
                    Message = ex.Message
                });
            }
            return dto;
        }





    }
}










