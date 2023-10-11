using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Data.Common;
using VisitorManagement.Models;

namespace VisitorManagement.ContextHelpers
{
    public class DbContextHelper : VisitorManagementContext
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        

        public DbContextHelper(IOptions<DbConnectionInfo> dbConnectionInfo, IConfiguration configuration)
        {
            this._configuration = configuration;
            _connectionString = configuration.GetConnectionString("VisitorManagementConnection");
            
        }

       /* public DbContextHelper(IOptions<DbConnectionInfo> dbConnectionInfo)
        {
            _connectionString = dbConnectionInfo.Value.ZAPI_DBCon;
        }
       */
        public DbContextHelper(DbContextOptions<VisitorManagementContext> options)
            : base(options)
        {
            this.Database.SetCommandTimeout(180);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connectionString).EnableSensitiveDataLogging();
            }
        }

        public IDbContextTransaction GetTransaction()
        {
            IDbContextTransaction transaction;
            if (this.Database.CurrentTransaction == null)
                transaction = this.Database.BeginTransaction();
            else
                transaction = this.Database.CurrentTransaction;

            return transaction;
        }

        public DbTransaction GetDbTransaction()
        {
            DbTransaction transaction;
            if (this.Database.CurrentTransaction == null)
                transaction = this.Database.BeginTransaction().GetDbTransaction();
            else
                transaction = this.Database.CurrentTransaction.GetDbTransaction();

            return transaction;
        }
    }
}

public class DbConnectionInfo
{
    public string VisitorManagementConnection { get; set; }
}