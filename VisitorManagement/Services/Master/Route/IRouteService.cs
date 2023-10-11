using Newtonsoft.Json.Linq;

namespace VisitorManagement.Services.Master.Route
{
    public interface IRouteService
    {
        Task<Object> CreateInitialize(JObject input);
        Task<Object> Create(JObject input);
        Task<Object> Update(JObject input);
        Task<Object> ChangeStatus(JObject input);
        Task<Object> SearchInitialize(JObject input);
    }
}
