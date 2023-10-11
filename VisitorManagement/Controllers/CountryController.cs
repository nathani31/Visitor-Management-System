using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using VisitorManagement.Services.Master.Country;

namespace VistorManagementOne.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    
        public class CountryController : ControllerBase
        {
            private readonly ICountryService countryService;

            public CountryController(ICountryService _countryService)
            {
            countryService = _countryService;
            }
        
            [HttpPost("CreateInitialize")]

            public async Task<IActionResult> CreateInitialize(JObject input)
        {
            try
            {
                    return Ok(await countryService.CreateInitialize(input));
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
                    return Ok(await countryService.Create(input));
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

                    return Ok(await countryService.Update(input));
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
                    return Ok(await countryService.ChangeStatus(input));
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
            }
            [HttpPost("SearchInitialize")]
            public async Task<IActionResult> SearchInitialize(JObject input)
            {
                try
                {
                    return Ok(await countryService.SearchInitialize(input));
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
            }
    }
    }

