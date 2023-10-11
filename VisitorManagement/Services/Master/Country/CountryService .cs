using Newtonsoft.Json.Linq;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Entities;
using VisitorManagement.Models;
using VisitorManagement.Utils;

namespace VisitorManagement.Services.Master.Country
{

    public class CountryService : ICountryService
    {
        private readonly CountryDto dto;

     
        private readonly DbContextHelper DbContext;
        private readonly IDapperContext dapperContext;
        public CountryService(DbContextHelper _dbContextHelper, IDapperContext _dapperContext)
        {
            dto = new CountryDto();
            DbContext = _dbContextHelper;
            dapperContext = _dapperContext;
            dto.transtatus = new ErrorContext();
            dto.transtatus.lstErrorItem = new List<ErrorItem>();

        }

        public async Task<object> ChangeStatus(JObject obj)
        {
            int Countryid = obj["Countryid"].ToObject<int>();
            try
            {
                CountryMasterOne CountryMasterOne = DbContext.CountryMasterOnes.Where(y => y.Countryid == Countryid).SingleOrDefault();
                CountryMasterOne.Status = 2;
                DbContext.CountryMasterOnes.Update(CountryMasterOne);
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
            CountryMasterOne CountryMasterOne = obj["CountryMasterOne"].ToObject<CountryMasterOne>();
            try
            {

                DbContext.CountryMasterOnes.Add(CountryMasterOne);
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
            int Countryid = obj["Countryid"].ToObject<int>();
            string Type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_COUNTRYONE_CI", new
                    {
                        Type,
                        Countryid
                    });

                    dto.CountryMasterOneList = (await spcall.ReadAsync<CountryMasterOne>()).ToList();
                    if (Countryid > 0)
                    {
                        dto.HdrTableOne = (await spcall.ReadAsync<CountryMasterOne>()).SingleOrDefault();
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

        //public async Task<object> SearchInitialize(JObject obj)
        //{
        //    int Countryid = obj["Countryid"].ToObject<int>();
        //    string Type = "SearchInitialize";
        //    try
        //    {
        //        using (dapperContext)
        //        {
        //            var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_COUNTRY_CI", new
        //            {
        //                Type,
        //                Countryid
        //            });

        //            dto.CountryMasterList = (await spcall.ReadAsync<CountryMaster>()).ToList();
        //          }
        //        dto.transtatus.result = true;
        //        dto.transtatus.lstErrorItem.Add(
        //           new ErrorItem
        //           {
        //               Message = "SearchInitialize Successfully"
        //           }
        //       );

        //    }
        //    catch (Exception ex)
        //    {
        //        dto.transtatus.result = false;
        //        dto.transtatus.lstErrorItem.Add(
        //            new ErrorItem
        //            {
        //                ErrorNo = "VM0000",
        //                Message = ex.Message
        //            }
        //        );
        //    }

        //    return dto;
        //}


        public async Task<object> SearchInitialize(JObject obj)
        {
            int Countryid = obj["Countryid"].ToObject<int>();
            string Type = "SearchInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "SP_COUNTRYONE_CI", new
                    {
                        Type,
                        Countryid
                    });

                    dto.CountryMasterOneList = (await spcall.ReadAsync<CountryMasterOne>()).ToList();
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
                CountryMasterOne CountryMasterOne = obj["CountryMasterOne"].ToObject<CountryMasterOne>();
                DbContext.CountryMasterOnes.Update(CountryMasterOne);
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
    //public class CountryService
    //{
    //}
}



//using VistorManagementOne.Services.Master.State;
//using Newtonsoft.Json.Linq;
//using VistorManagementOne.Utils;
//using VistorManagementOne.Entities;
//using VistorManagementOne.ContextHelpers;
//using VistorManagementOne.ContextHelpers.DapperContext;
//using VisitorManagementOne.Models;

//namespace VistorManagement.Services.Master.State
//{

   
//}