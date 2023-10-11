using Newtonsoft.Json.Linq;
using VisitorManagement.Utils;
using VisitorManagement.Models;
using VisitorManagement.Services.Master.Company;
using VisitorManagement.Entities;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;

namespace VistorManagement.Services.Master.Company
{
    public class Companyservice : ICompanyService
    {
        // Constructor and other members...
        private readonly CompanyDTO dto;
        private readonly DbContextHelper DbContext;
        private readonly IDapperContext dapperContext;
        public Companyservice(DbContextHelper _dbContextHelper,
         IDapperContext _dapperContext
         )
        {
            dto = new CompanyDTO();
            DbContext = _dbContextHelper;
            dapperContext = _dapperContext;
            dto.transtatus = new ErrorContext();
            dto.transtatus.lstErrorItem = new List<ErrorItem>();

        }


        public async Task<object> CreateInitialize(JObject obj)
        {
            // Implement your CreateInitialize logic here
            int Companyid = obj["Companyid"].ToObject<int>();
            string Type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "CI_Company_SI", new
                    {
                        Type,
                        Companyid
                    });
                    dto.CompanyMasterList = (await spcall.ReadAsync<CompanyMaster>()).ToList();
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
        /*  public async Task<object> Create(JObject obj)
         {
             CompanyMaster CompanyMaster = obj["CompanyMaster"].ToObject<CompanyMaster>();
             try
             {

                 DbContext.CompanyMasters.Add(CompanyMaster);
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
        */


        public async Task<object> Create(JObject obj)
         {
             CompanyMaster CompanyMaster = obj["CompanyMaster"].ToObject<CompanyMaster>();
             try
             {

                 DbContext.CompanyMasters.Add(CompanyMaster);
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

        public async Task<object> Update(JObject obj)
        {
            try
            {
                CompanyMaster CompanyMaster = obj["CompanyMaster"].ToObject<CompanyMaster>();
                DbContext.CompanyMasters.Update(CompanyMaster);
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

        public async Task<object> ChangeStatus(JObject obj)
        {
            int Companyid = obj["Companyid"].ToObject<int>();
            try
            {
                CompanyMaster CompanyMaster = DbContext.CompanyMasters.Where(y => y.Companyid == Companyid).SingleOrDefault();
                CompanyMaster.Status = 2;
                DbContext.CompanyMasters.Update(CompanyMaster);
                await DbContext.SaveChangesAsync();
                dto.transtatus.result = true; // Setting result to true to indicate success
                dto.transtatus.lstErrorItem.Add(
                   new ErrorItem
                   {
                       Message = "Status Change Successfully"
                   }
               );

            }
            catch (Exception ex)
            {
                dto.transtatus.result = false; // Setting result to false to indicate failure
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
            int Companyid = obj["Companyid"].ToObject<int>();
            String Type = "SearchInitialize";



            try
            {
                using (dapperContext)
                {
                    
                var spcall = await dapperContext.ExecuteStoredProcedureAsync(spName: "CI_Company_SI", new
                    {
                        Type,
                        Companyid
                    });

                    // Create a DTO with only company information
                    dto.CompanyMasterList = (await spcall.ReadAsync<CompanyMaster>()).ToList();
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
               



         
            }
            return dto;

        }
    }
}


    



   