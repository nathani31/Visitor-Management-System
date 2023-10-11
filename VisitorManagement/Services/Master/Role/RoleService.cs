using Newtonsoft.Json.Linq;
using VisitorManagement.ContextHelpers;
using VisitorManagement.ContextHelpers.DapperContext;
using VisitorManagement.Entities;
using VisitorManagement.Utils;
using VisitorManagement.Models;

namespace VisitorManagement.Services.Master.Role
{
    public class RoleService : IRoleService
    {
        private readonly RoleDto dto;
        private readonly DbContextHelper DbContext;
        private readonly IDapperContext dapperContext;

        public RoleService(DbContextHelper _dbContextHelper, IDapperContext _dapperContext)
        {
            dto = new RoleDto();
            DbContext = _dbContextHelper;
            dapperContext = _dapperContext;
            dto.transtatus = new ErrorContext();
            dto.transtatus.lstErrorItem = new List<ErrorItem>();

        }

        public async Task<object> ChangeStatus(JObject obj)

        {

            int roleid = obj["roleid"].ToObject<int>();
            try
            {
                RoleMaster RoleMaster = DbContext.RoleMasters.Where(y => y.Roleid == roleid).SingleOrDefault();
                RoleMaster.Status = 2;
                DbContext.RoleMasters.Update(RoleMaster);
                await DbContext.SaveChangesAsync();
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                    {
                        Message = "Status Change Sucessfully"
                    });
            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                    {
                        ErrorNo = "VM0000",
                        Message = ex.Message
                    });



            }
            return dto;

        }

        //public async Task<object> Create(JObject obj)
        //{


        //    try
        //    {
        //        var rolemasterarray = obj["RoleMaster"].ToObject<jarray>();
        //        if (rolemasterarray != null && rolemasterarray.Count > 0)
        //        {
        //            foreach (var rolemasterValue in rolemasterarray)
        //            {
        //                RoleMaster roleMaster = rolemasterValue.ToString<RoleMaster>();
        //                DbContext.RoleMasters.Add(roleMaster);

        //            }

        //        }

        //        await DbContext.SaveChangesAsync();
        //        dto.transtatus.result = true;
        //        dto.transtatus.lstErrorItem.Add(
        //            new ErrorItem
        //            {
        //                Message = "Create Successfully"
        //            });
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
        //            );
        //    }
        //    return dto;
        //}

        public async Task<object> Create(JObject obj)
        {
            RoleMaster roleMaster = obj["RoleMaster"].ToObject<RoleMaster>();
            try
            {

                DbContext.RoleMasters.Add(roleMaster);
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

            int roleid = obj["roleid"].ToObject<int>();
            String type = "CreateInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync
                        (spName: "SP_ROLE_CI", new
                        {
                            type,
                            roleid

                        });

                    dto.RoleMasterList = (await spcall.ReadAsync<RoleMaster>()).ToList();
                    if (roleid > 0)
                    {
                        dto.Hdrtable = (await spcall.ReadAsync<RoleMaster>()).SingleOrDefault();
                    }
                }
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add(new ErrorItem
                {
                    Message = "createInitialize Successfull"
                });

            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add(
                    new ErrorItem
                    {
                        ErrorNo = "VM0000",
                        Message = ex.Message
                    });

            }
            return dto;
        }

        public async Task<object> SearchInitialize(JObject obj)
        {

            int roleid = obj["roleid"].ToObject<int>();
            string type = "SearchInitialize";
            try
            {
                using (dapperContext)
                {
                    var spcall = await dapperContext.ExecuteStoredProcedureAsync
                        (spName: "SP_ROLE_CI", new
                        {
                            type,
                            roleid
                        });
                    dto.RoleList = (await spcall.ReadAsync<RoleMaster>()).ToList();
                }
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add
                    (new ErrorItem
                    {
                        Message = "Searcinitialize Successfull"
                    });
            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add
                    (new ErrorItem
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
                var rolemaster = obj["RoleMaster"].ToObject<RoleMaster>();

                DbContext.RoleMasters.Update(rolemaster);
                await DbContext.SaveChangesAsync();

                //if (rolemasterarray != null && rolemasterarray.Count > 0)
                //{
                //    foreach (var rolemasterValue in rolemasterarray)
                //    {
                //        RoleMaster roleMaster = rolemasterValue.ToObject<RoleMaster>();
                //        DbContext.RoleMasters.Update(roleMaster);
                //    }

                //}
                // DbContext.RoleMasters.Update(rolemasterarray);
               // await DbContext.SaveChangesAsync();
                dto.transtatus.result = true;
                dto.transtatus.lstErrorItem.Add
                    (new ErrorItem
                    {
                        Message = "Updated Successfully"
                    });
            }
            catch (Exception ex)
            {
                dto.transtatus.result = false;
                dto.transtatus.lstErrorItem.Add
                    (new ErrorItem
                    {
                        ErrorNo = "VM0000",
                        Message = ex.Message
                    });
            }
            return dto;
        }
    }
}
