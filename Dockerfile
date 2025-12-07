COPY ["core-ledger.sln", "."]
COPY ["src/CoreLedger.API/CoreLedger.API.csproj", "src/CoreLedger.API/"]
COPY ["src/CoreLedger.Domain/CoreLedger.Domain.csproj", "src/CoreLedger.Domain/"]
COPY ["src/CoreLedger.Application/CoreLedger.Application.csproj", "src/CoreLedger.Application/"]
COPY ["src/CoreLedger.Infrastructure/CoreLedger.Infrastructure.csproj", "src/CoreLedger.Infrastructure/"]

# 2. Paketleri geri yükle (Restore)
RUN dotnet restore "src/CoreLedger.API/CoreLedger.API.csproj"

# 3. Kalan tüm proje dosyalarını kopyala ve derle
COPY . .
WORKDIR /src/src/CoreLedger.API

# 4. Projeyi yayınla (publish)
RUN dotnet publish "CoreLedger.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# --------------------------------------------------------------------------------
# Stage 2: FINAL (Çalıştırma Aşaması)
# Daha küçük ve güvenli ASP.NET Runtime görüntüsü kullanılır.
# --------------------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render'ın beklediği varsayılan portu ayarla
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# API'yi başlat
ENTRYPOINT ["dotnet", "CoreLedger.API.dll"]