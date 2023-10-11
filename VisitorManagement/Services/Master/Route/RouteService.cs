
using Newtonsoft.Json.Linq;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Entities;
using VisitorManagement.Utils;
using VisitorManagement.Models;

namespace VisitorManagement.Services.Master.Route
{
    public class RouteService : IRouteService
    {
        private readonly RouteDto dto;
        private readonly DbContextHelper DbContext;
        private readonly IDapperContext dapperContext;
        public RouteService(DbContextHelper _dbContextHelper,
         IDapperContext _dapperContext
         )
        {
            dto = new RouteDto();
            DbContext = _dbContextHelper;
            dapperContext = _dapperContext;
            dto.transtatus = new ErrorContext();
            dto.transtatus.lstErrorItem = new List<ErrorItem>();

        }

        public async Task<object> ChangeStatus(JObject obj)
        {
            int Routeid = obj["Routeid"].ToObject<int>();
            try
            {
                RouteMaster RouteMaster = DbContext.RouteMasters.Where(y => y.Routeid == Routeid).SingleOrDefault();
                RouteMaster.Status = 2;
                DbContext.RouteMasters.Update(RouteMaster);
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
            RouteMaster RouteMaster = obj["RouteMaster"].ToObject<RouteMaster>();
            try
            {
                //RouteMaster RouteMaster = obj["RouteMaster"].ToObject<RouteMaster>();

                DbContext.RouteMasters.Add(RouteMaster);
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
            int Routeid = obj["Routeid"].ToObject<int>();
            string Type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_ROUTE", new
                    {
                        Type,
                        Routeid
                    });

                    dto.RouteList = (await spcall.ReadAsync<RouteMaster>()).ToList();
                    if (Routeid > 0)
                    {
                        dto.HdrTable= (await spcall.ReadAsync<RouteMaster>()).SingleOrDefault();
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
            int Routeid = obj["routeid"].ToObject<int>();
            string Type = "SearchInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_ROUTE", new
                    {
                        Type,
                        Routeid
                    });

                    dto.RouteList = (await spcall.ReadAsync<RouteMaster>()).ToList();
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
            //RouteMaster RouteMaster = obj["RouteMaster"].ToObject<RouteMaster>();
            try
            {
                RouteMaster RouteMaster = obj["RouteMaster"].ToObject<RouteMaster>();
                DbContext.RouteMasters.Update(RouteMaster);
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


