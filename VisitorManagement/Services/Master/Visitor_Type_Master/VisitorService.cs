using Newtonsoft.Json.Linq;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Entities;
using VisitorManagement.Models;
using VisitorManagement.Services.Master.Visitor;
using VisitorManagement.Utils;

namespace visitor_management.Services.Master.Visitor
{
    public class VisitorService : IVisitorService
    {
        private readonly VisitorDto dto;
        private readonly DbContextHelper DbContext;
        private readonly IDapperContext dapperContext;
        public VisitorService(DbContextHelper _dbContextHelper,
         IDapperContext _dapperContext
         )
        {
            dto = new VisitorDto();
            DbContext = _dbContextHelper;
            dapperContext = _dapperContext;
            dto.transtatus = new ErrorContext();
            dto.transtatus.lstErrorItem = new List<ErrorItem>();

        }

        public async Task<object> ChangeStatus(JObject obj)
        {
            int visitortypeid = obj["visitortypeid"].ToObject<int>();
            try
            {
                VisitorTypeMaster visitorTypeMaster = DbContext.VisitorTypeMasters.Where(y => y.Visitortypeid == visitortypeid).SingleOrDefault();
                visitorTypeMaster.Status = 2;
                DbContext.VisitorTypeMasters.Update(visitorTypeMaster);
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
            VisitorTypeMaster visitorTypeMaster = obj["visitorTypeMaster"].ToObject<VisitorTypeMaster>();
            try
            {

                DbContext.VisitorTypeMasters.Add(visitorTypeMaster);
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
            int visitortypeid = obj["visitortypeid"].ToObject<int>();
            string Type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_VISITOR_CI", new
                    {
                        Type,
                        visitortypeid
                    });

                    dto.CompanyList = (await spcall.ReadAsync<CompanyMaster>()).ToList();
                    if (visitortypeid > 0)
                    {
                        dto.HdrTable = (await spcall.ReadAsync<VisitorTypeMaster>()).SingleOrDefault();
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
            int visitortypeid = obj["visitortypeid"].ToObject<int>();
            string Type = "SearchInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_VISITOR_CI", new
                    {
                        visitortypeid,
                       Type
                    });

                    dto.visitorlist = (await spcall.ReadAsync<VisitorTypeMaster>()).ToList();
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
                VisitorTypeMaster visitorTypeMaster = obj["VisitorTypeMaster"].ToObject<VisitorTypeMaster>();
                DbContext.VisitorTypeMasters.Update(visitorTypeMaster);
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
