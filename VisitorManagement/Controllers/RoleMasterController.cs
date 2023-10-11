using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using VisitorManagement.Services.Master.Role;

namespace VisitorManagement.Controllers
{
    [Route("RoleMasterController")]
    [ApiController]
    
    public class RoleMasterController : ControllerBase
    {
        private readonly IRoleService roleService;
        public RoleMasterController(IRoleService _roleService) 
        {
          roleService = _roleService;
        }
        [HttpPost("CreateInitialize")]
        public async Task<IActionResult>  CreateInitialize (JObject input)
        {
            try
            {
                return Ok(await roleService.CreateInitialize(input));
           }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create(JObject input)
        {
            try
            {
                return Ok(await roleService.Create(input));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update(JObject input)
        {
            try
            {
                return Ok(await roleService.Update(input));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("ChangeStatus")]
        public async Task<IActionResult> ChangeStatus(JObject input)
        {
            try
            {
                return Ok(await roleService.ChangeStatus(input));
            }
            catch (Exception ex)  
            {
                return BadRequest(new {message = ex.Message});
            }
        }
        [HttpPost("SearchInitialize")]
        public async Task<IActionResult>SearchInitialize(JObject input)
        {
            try
            {
                return Ok(await roleService.SearchInitialize(input));
            }
            catch (Exception ex)
            {
                return BadRequest (new {message = ex.Message});
            }
        }
    }
}
