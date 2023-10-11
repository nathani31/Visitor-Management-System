
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Utils;
using VistiorManagement.Entities;
using Newtonsoft.Json.Linq;
using VisitorManagement.Models;


namespace VistiorManagement.Services.Master.City
{
    public class CityService : ICityService
    {
        private readonly CityDto dto;
        private readonly DbContextHelper DbContext;
        private readonly IDapperContext dapperContext;
        public CityService(DbContextHelper _dbContextHelper,
         IDapperContext _dapperContext)
            {
                dto = new CityDto();
                DbContext = _dbContextHelper;
                dapperContext = _dapperContext;
                dto.transtatus = new ErrorContext();
                dto.transtatus.lstErrorItem = new List<ErrorItem>();

       
        }
        public async Task<object> ChangeStatus(JObject obj)
            {
                int Cityid = obj["Cityid"].ToObject<int>();
                try
                {
                  CityMaster CityMaster = DbContext.CityMasters.Where(y => y.Cityid == Cityid).SingleOrDefault();
                  CityMaster.Status = 2;
                  DbContext.CityMasters.Update(CityMaster);
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
                CityMaster CityMaster = obj["CityMaster"].ToObject<CityMaster>();
                try
                {

                   DbContext.CityMasters.Add(CityMaster);
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
            int Cityid = obj["Cityid"].ToObject<int>();
            string Type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_CITY_CI ", new
                    {
                        Type,
                        Cityid
                    });

                    dto.CityMasterList = (await spcall.ReadAsync<CityMaster>()).ToList();
                    if (Cityid > 0)
                    {
                        dto.HdrTable= (await spcall.ReadAsync<CityMaster>()).SingleOrDefault();
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
            int Cityid = obj["Cityid"].ToObject<int>();
            string Type = "SearchInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_CITY_CI ", new
                    {
                        Type,
                        Cityid
                    });

                    dto.CityMasterList = (await spcall.ReadAsync<CityMaster>()).ToList();
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
                CityMaster CityMaster = obj["CityMaster"].ToObject<CityMaster>();
                    DbContext.CityMasters.Update(CityMaster);
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




