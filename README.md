# Predictive Fault Analytics (PFA) Frontend

A modern React frontend for the Predictive Fault Analytics system with real-time monitoring, interactive dashboards, and empathetic user experience.

## Features

- **Real-time Dashboard**: Live sensor data with WebSocket integration
- **Interactive Floor Plan**: 2D visualization of sensor locations and user movement
- **Risk Assessment**: Animated fluid-fill gauges for risk visualization
- **Alert System**: Empathetic alert management with severity levels
- **Trend Analysis**: Interactive charts for sensor data trends
- **Authentication**: Secure JWT-based authentication
- **Responsive Design**: Mobile-first responsive layout
- **Dark Mode Support**: Built-in dark mode capabilities
- **TypeScript**: Full TypeScript support for type safety

## Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Zustand** - Client state management
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Data visualization and charts
- **Socket.IO Client** - Real-time WebSocket communication
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard/           # Dashboard components
│   │   │   ├── RiskGauge.tsx    # Animated risk gauge
│   │   │   ├── TrendChart.tsx   # Data visualization
│   │   │   ├── AlertPanel.tsx   # Alert management
│   │   │   └── Floorplan.tsx    # Interactive floor plan
│   │   ├── Layout/              # Layout components
│   │   │   ├── MainLayout.tsx   # Main app layout
│   │   │   └── Navbar.tsx       # Navigation bar
│   │   └── Auth/                # Authentication components
│   │       ├── LoginForm.tsx    # Login form
│   │       └── ProtectedRoute.tsx # Route protection
│   ├── hooks/                   # Custom React hooks
│   │   ├── useWebSocket.ts      # WebSocket integration
│   │   ├── useSensorData.ts     # Sensor data management
│   │   └── useAnimationFrame.ts # Animation utilities
│   ├── services/                # API and external services
│   │   ├── api.ts               # Axios configuration
│   │   ├── websocket.ts         # WebSocket service
│   │   └── authStore.ts         # Authentication state
│   ├── types/                   # TypeScript type definitions
│   │   ├── index.ts             # Main types
│   │   └── enums.ts             # Enumerations
│   ├── utils/                   # Utility functions
│   │   ├── floorplanHelpers.ts  # Floor plan utilities
│   │   └── formatDate.ts        # Date formatting
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:8000)
- `VITE_WS_URL` - WebSocket URL (default: ws://localhost:8000)
- `VITE_NODE_ENV` - Environment (development/production)
- `VITE_ENABLE_DEVTOOLS` - Enable React Query Devtools

## Key Features

### Real-time Dashboard
- Live sensor data updates via WebSocket
- Animated risk gauges with fluid-fill effects
- Interactive trend charts with Recharts
- Empathetic alert system with severity indicators

### Interactive Floor Plan
- 2D SVG-based floor plan visualization
- Real-time sensor status indicators
- User position simulation
- Room-based sensor organization

### Authentication
- JWT-based authentication
- Protected routes
- Automatic token refresh
- Persistent login state

### State Management
- React Query for server state
- Zustand for client state
- Optimistic updates
- Caching and background refetching

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Conventional commits

### Component Architecture
- Composition over inheritance
- Reusable UI components
- Custom hooks for logic
- Separation of concerns

### Performance
- Code splitting with React.lazy
- Optimized re-renders with React.memo
- Efficient state updates
- Bundle size optimization

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

1. Follow the existing code style
2. Write TypeScript for all new code
3. Add tests for new features
4. Update documentation as needed
5. Use conventional commit messages

## License

This project is licensed under the MIT License.
