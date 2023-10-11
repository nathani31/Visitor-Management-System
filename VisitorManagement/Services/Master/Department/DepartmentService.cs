using Newtonsoft.Json.Linq;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Entities;
using VisitorManagement.Models;
using VisitorManagement.Services.Master.Department;
using VisitorManagement.Utils;

namespace VisitorManagement.Services.Master.Department
{
    public class DepartmentService : IDepartmentService
    {
        private readonly DepartmentDto dto;
        private readonly DbContextHelper DbContext;
        private readonly IDapperContext dapperContext;
        public DepartmentService(DbContextHelper _dbContextHelper,
         IDapperContext _dapperContext
          )
        {
            dto = new DepartmentDto();
            DbContext = _dbContextHelper;
            dapperContext = _dapperContext;
            dto.transtatus = new ErrorContext();
            dto.transtatus.lstErrorItem = new List<ErrorItem>();

        }
        public async Task<object> ChangeStatus(JObject obj)
        {
            
            int Deptid = obj["deptid"].ToObject<int>();
            try
            {
                DepartmentMaster StateMaster = DbContext.DepartmentMasters.Where(y => y.Deptid == Deptid).SingleOrDefault();
                StateMaster.Status = 2;
                DbContext.DepartmentMasters.Update(StateMaster);
                await DbContext.SaveChangesAsync();
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(
                   new ErrorItem
                   {
                       Message = "Status Change Successfully"
                   }
               );
            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                    {
                        ErrorNo = "VM0000",
                        Message = ex.Message
                    }
                );
            }
            return dto;
        }

        public async Task<object> Create(JObject obj)
        {
            DepartmentMaster DepartmentMaster = obj["DepartmentMaster"].ToObject<DepartmentMaster>();
            try
            {

                DbContext.DepartmentMasters.Add(DepartmentMaster);
                await DbContext.SaveChangesAsync();

                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(
                   new ErrorItem
                   {
                       Message = "Create Successfully"
                   }
               );
            }
            catch (Exception ex)
            {

                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                    {
                        ErrorNo = "VM0000",
                        Message = ex.Message
                    }
                );
            }

            return dto;


        }

        public async Task<object> CreateInitialize(JObject obj)
        {
            int deptid = obj["deptid"].ToObject<int>();
            string type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_STAT_CI", new
                    {
                        type,
                        deptid
                    });

                    dto.DepartmentMasters = (await spcall.ReadAsync<DepartmentMaster>()).ToList();
                    
                    if (deptid > 0)
                    {
                        dto.Hdrtable = (await spcall.ReadAsync<DepartmentMaster>()).SingleOrDefault();
                    }

                    
                }
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(
                   new ErrorItem
                   {
                       Message = "CreateInitialize Successfully"
                   }
               );

            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                    {
                        ErrorNo = "VM0000",
                        Message = ex.Message
                    }
                );
            }

            return dto;
        }

        public async Task<object> SearchInitialize(JObject obj)
        {
            int Deptid = obj["deptid"].ToObject<int>();
            string Type = "SearchInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_DEPT_CI", new
                    {
                        Type,
                        Deptid
                    });

                    dto.DepartmentMasters = (await spcall.ReadAsync<DepartmentMaster>()).ToList();

                   
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
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                    {
                        ErrorNo = "VM0000",
                        Message = ex.Message
                    }
                );
            }

            return dto;
        }

        public async Task<object> Update(JObject obj)
        {
            try
            {
                DepartmentMaster StateMaster = obj["DepartmentMaster"].ToObject<DepartmentMaster>();
                DbContext.DepartmentMasters.Update(StateMaster);
                await DbContext.SaveChangesAsync();
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(
                  new ErrorItem
                  {
                      Message = "Updated Successfully"
                  }
              );

            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                    {
                        ErrorNo = "VM0000",
                        Message = ex.Message
                    }
                );
            }
            return dto;
        }
    }
}