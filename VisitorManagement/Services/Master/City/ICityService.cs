using Newtonsoft.Json.Linq;

namespace VistiorManagement.Services.Master.City
{
    public interface ICityService

    {

        Task<object> CreateInitialize(JObject input);
        Task<object> Create(JObject input);
        Task<object> Update(JObject input);
        Task<object> ChangeStatus(JObject input);
        Task<object> SearchInitialize(JObject input);


    }
}
