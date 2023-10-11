using Newtonsoft.Json.Linq;

namespace VisitorManagement.Services.Master.Company

{
        public interface ICompanyService
        {
            Task<object> CreateInitialize(JObject input);
            Task<object> Create(JObject input);
            Task<object> Update(JObject input);
            Task<object> ChangeStatus(JObject input);
            Task<object> SearchInitialize(JObject input);
        }
    }

