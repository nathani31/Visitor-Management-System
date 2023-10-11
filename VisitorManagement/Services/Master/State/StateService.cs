using Newtonsoft.Json.Linq;
using VisitorManagement.Entities;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Utils;
using VisitorManagement.Models;

namespace VisitorManagement.Services.Master.State
{
    public class StateService : IStateService
    {
        private readonly StateDto dto;
        private readonly DbContextHelper DbContext;
        private readonly IDapperContext dapperContext;
        public StateService(DbContextHelper _dbContextHelper, IDapperContext _dapperContext)
        {
            dto = new StateDto();
            DbContext = _dbContextHelper;
            dapperContext = _dapperContext;
            dto.transtatus = new ErrorContext();
            dto.transtatus.lstErrorItem = new List<ErrorItem>();
        }

        public async Task<object> ChangeStatus(JObject obj)
        {
            int Stateid = obj["Stateid"].ToObject<int>();
            try
            {
                StateMaster StateMaster = DbContext.StateMasters.Where(y => y.Stateid == Stateid).SingleOrDefault();
                StateMaster.Status = 2;
                DbContext.StateMasters.Update(StateMaster);
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
            StateMaster StateMaster = obj["StateMaster"].ToObject<StateMaster>();
            try
            {

                DbContext.StateMasters.Add(StateMaster);
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
            int Stateid = obj["Stateid"].ToObject<int>();
            string Type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_STAT_CI", new
                    {
                        Type,
                        Stateid
                    });

                    dto.StateList = (await spcall.ReadAsync<StateMaster>()).ToList();
                    if (Stateid > 0)
                    {
                    dto.HdrTable = (await spcall.ReadAsync<StateMaster>()).SingleOrDefault();
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
            int Stateid = obj["stateid"].ToObject<int>();
            string Type = "SearchInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_STAT_CI", new
                    {
                         Type,
                         Stateid


                    });

                dto.StateList = (await spcall.ReadAsync<StateMaster>()).ToList();
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
                StateMaster StateMaster = obj["StateMaster"].ToObject<StateMaster>();
                DbContext.StateMasters.Update(StateMaster);
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