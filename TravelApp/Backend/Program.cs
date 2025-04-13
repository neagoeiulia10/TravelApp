
using Microsoft.EntityFrameworkCore;
using TravelApp.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()  // Allow requests from any frontend (change for production)
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Add SQLite database connection
builder.Services.AddDbContext<TravelappContext>(opt =>
     opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS before authorization
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();

