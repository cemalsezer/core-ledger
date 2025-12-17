# Core Ledger 🚀

**Core Ledger** is a high-performance and secure wallet management system designed for modern financial transfer operations. Developed adhering to **Clean Architecture** principles on the Backend and powered by **React + Tailwind CSS** on the Frontend, it offers a complete end-to-end experience.

![Core Ledger Demo](https://placehold.co/1200x600/2563eb/ffffff?text=Core+Ledger+App)

## 🌍 Live Demo (Deployment)

The project is live and testable:

*   **Backend (Swagger):** [https://core-ledger.onrender.com/swagger](https://core-ledger.onrender.com/swagger)
*   **Frontend:** [https://core-ledger-iota.vercel.app/](https://core-ledger-iota.vercel.app/)


## ✨ Features

*   **Wallet Management:** Users can create new wallets in seconds.
*   **Real-time Balance Tracking:** Wallet balances and details can be viewed instantly.
*   **Secure Money Transfer:** Fast and atomic (transactional) money transfers between wallets.
*   **Validations:** Advanced error handling for insufficient funds, invalid wallet IDs, etc.
*   **Modern UI:** User-friendly, responsive, and stylish design.

## 🛠️ Technologies

This project uses industry-standard technologies:

### Backend (.NET 8)
*   **Clean Architecture:** Layered architecture (Domain, Application, Infrastructure, API).
*   **Entity Framework Core:** ORM and database management (Code-First).
*   **PostgreSQL:** Reliable and robust relational database.
*   **Docker:** Containerization and easy setup.
*   **Swagger/OpenAPI:** API documentation and testing interface.

### Frontend (React)
*   **Vite:** Lightning-fast development server and build tool.
*   **Tailwind CSS (v4):** Modern and customizable CSS framework.
*   **Axios:** HTTP client.
*   **React:** Frontend framework.

## 🚀 Installation & Running

Follow these steps to run the project in your local environment.

### Requirements
*   .NET 8 SDK
*   Node.js (v18+)
*   Docker Desktop (Optional, recommended for database)
*   PostgreSQL (Local installation if Docker is not used)

### 1. Clone the Project
```bash
git clone https://github.com/username/core-ledger.git
cd core-ledger
```

### 2. Backend Setup
Navigate to the backend directory and start the database.

```bash
cd src/CoreLedger.API
# Update the ConnectionString in appsettings.json according to your PostgreSQL settings.
dotnet restore
dotnet ef database update # Creates database tables
dotnet run
```
The Backend will run at `https://localhost:7198` (or similar). You can visit `/swagger` for API documentation.

### 3. Frontend Setup
Open a new terminal and navigate to the Client directory.

```bash
cd client
npm install
npm run dev
```
The Frontend will run at `http://localhost:5173`.

### 4. Running with Docker (Alternative)
You can run the entire application (Db + Backend) with a single command using Docker.

```bash
docker-compose up -d --build
```

## 📂 Project Structure

```
core-ledger/
├── client/                 # React Frontend Application
├── src/
│   ├── CoreLedger.API/            # Web API Layer (Controllers, Middleware)
│   ├── CoreLedger.Application/    # Business Logic (Services, Interfaces, DTOs)
│   ├── CoreLedger.Domain/         # Core (Entities, Domain Exceptions)
│   └── CoreLedger.Infrastructure/ # Data Access (EF Core, Repositories)
└── Dockerfile              # Backend Container Definition
```


## 📝 License

This project is licensed under the MIT License.
