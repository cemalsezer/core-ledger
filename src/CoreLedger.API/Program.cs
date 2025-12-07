using CoreLedger.Application.Interfaces;
using CoreLedger.Application.Services;
using CoreLedger.Domain.Interfaces;
using CoreLedger.Infrastructure.Persistence;
using CoreLedger.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));


builder.Services.AddScoped<IWalletRepository, WalletRepository>();
builder.Services.AddScoped<ITransferService, TransferService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin() // Vercel'den gelen tüm URL'lere izin veriyoruz
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add services to the container.
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment()) // Swagger'ı her ortamda açıyoruz
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }
app.UseCors("AllowAll");

// Otomatik Database Migration işlemini ekliyoruz
// Bu sayede uygulama her başladığında veritabanı tabloları oluşur/güncellenir.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating the database.");
    }
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();


