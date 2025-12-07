
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src


COPY ["CoreLedger.sln", "."]


COPY ["src/CoreLedger.API/CoreLedger.API.csproj", "src/CoreLedger.API/"]
COPY ["src/CoreLedger.Domain/CoreLedger.Domain.csproj", "src/CoreLedger.Domain/"]
COPY ["src/CoreLedger.Application/CoreLedger.Application.csproj", "src/CoreLedger.Application/"]
COPY ["src/CoreLedger.Infrastructure/CoreLedger.Infrastructure.csproj", "src/CoreLedger.Infrastructure/"]

RUN dotnet restore "CoreLedger.sln"

COPY . .

WORKDIR /src/src/CoreLedger.API
RUN dotnet publish "CoreLedger.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "CoreLedger.API.dll"]