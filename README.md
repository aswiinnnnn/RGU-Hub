# RGU Hub Frontend Documentation

## Overview

RGU Hub Frontend is a modern React application built with TypeScript, Vite, and Tailwind CSS. It provides an intuitive interface for students to access study materials and job opportunities from Rahul Gandhi University.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup Instructions](#setup-instructions)
3. [Technology Stack](#technology-stack)
4. [Component Architecture](#component-architecture)
5. [Routing System](#routing-system)
6. [API Integration](#api-integration)
7. [Styling System](#styling-system)
8. [Development Guidelines](#development-guidelines)
9. [Build and Deployment](#build-and-deployment)

## Project Structure

```
rguHub Frontend/
├── public/                     # Static assets
│   ├── favicon.ico            # App icon
│   ├── placeholder.svg        # Placeholder image
│   └── robots.txt             # SEO robots file
├── src/                       # Source code
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── AppHeader.tsx     # Main header component
│   │   ├── SubjectCard.tsx   # Subject display card
│   │   ├── RecruitmentCard.tsx # Job posting card
│   │   └── ...               # Other components
│   ├── pages/                # Page components
│   │   ├── Index.tsx         # Homepage
│   │   ├── CourseSelection.tsx # Course selection
│   │   ├── SemesterSelection.tsx # Semester selection
│   │   ├── SemesterSubjectSelection.tsx # Subject selection (semester-based)
│   │   ├── SemesterMaterialSelection.tsx # Material selection (semester-based)
│   │   ├── SemesterDownloadPage.tsx  # Download page (semester-based)
│   │   ├── Recruitment.tsx   # Job postings
│   │   └── ...               # Other pages
│   ├── config/               # Configuration files
│   │   └── api.ts            # API configuration
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── data/                 # Static data
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rguHub-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Production
npm run build        # Create optimized build
```

## Technology Stack

### Core Technologies

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing

### UI Framework

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### State Management

- **TanStack Query**: Server state management
- **React Hooks**: Local state management

### Development Tools

- **ESLint**: Code linting
- **TypeScript**: Type checking
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## Component Architecture

### Component Hierarchy

```
App
├── QueryClientProvider (API state)
├── TooltipProvider (UI tooltips)
├── Toaster (Notifications)
├── RouterProvider (Routing)
└── Routes
    ├── Index (Homepage)
    ├── CourseSelection
    ├── SemesterSelection
    ├── SemesterSubjectSelection
    ├── SemesterMaterialSelection
    ├── SemesterDownloadPage
    └── Recruitment
```

### Component Types

#### 1. Page Components (`/pages`)
- **Purpose**: Full-page components for routing
- **Examples**: `Index.tsx`, `SubjectSelection.tsx`, `Recruitment.tsx`
- **Features**: API integration, navigation, state management

#### 2. UI Components (`/components/ui`)
- **Purpose**: Reusable UI primitives from shadcn/ui
- **Examples**: `Button.tsx`, `Card.tsx`, `Badge.tsx`
- **Features**: Consistent styling, accessibility, theming

#### 3. Custom Components (`/components`)
- **Purpose**: Application-specific reusable components
- **Examples**: `AppHeader.tsx`, `SubjectCard.tsx`, `RecruitmentCard.tsx`
- **Features**: Business logic, API integration, custom styling

### Component Patterns

#### 1. Props Interface
```typescript
interface ComponentProps {
  /** Description of prop */
  propName: string;
  /** Optional prop with default */
  optionalProp?: number;
}
```

#### 2. Component Structure
```typescript
/**
 * Component documentation
 */
export const Component = ({ propName, optionalProp = 0 }: ComponentProps) => {
  // Component logic
  return (
    <div className="component-styles">
      {/* JSX content */}
    </div>
  );
};
```

## Routing System

### Route Structure

```typescript
// Main routes
/                    # Homepage with latest updates
 /course             # Course selection (BSCN, BPT)
 /semester           # Semester selection (1 to 8)

// Subject routes
 /semester-subjects/:semesterId       # Subject selection for semester-based programs

// Material routes
 /semester-materials/:semesterId/:subjectId       # Material selection for semester-based

// Download routes
 /semester-download/:semesterId/:subjectId/:materialType       # Download for semester-based

// Other routes
/recruitment        # Job postings and opportunities
 /exam-session/:type/:yearId/:subjectId/:materialType  # Exam session selection (semester type used)
/*                 # 404 Not Found
```

### Navigation Flow

```
Homepage (/) 
  ↓
Course Selection (/course)
  ↓
Batch Selection (/batch)
  ↓
Year/Semester Selection (/year or /semester)
  ↓
Subject Selection (/subjects/:yearId or /semester-subjects/:semesterId)
  ↓
Material Selection (/materials/:yearId/:subjectId or /semester-materials/:semesterId/:subjectId)
  ↓
Download Page (/download/:yearId/:subjectId/:materialType or /semester-download/:semesterId/:subjectId/:materialType)
```

### URL Parameters

- `:yearId`: Year identifier for year-based programs
- `:semesterId`: Semester identifier for semester-based programs  
- `:subjectId`: Subject identifier
- `:materialType`: Material type (notes, pyq, question-bank, etc.)
- `:type`: Exam session type

## API Integration

### Configuration

API configuration is centralized in `src/config/api.ts`:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
```

### API Endpoints

#### Materials API
```typescript
// Get all materials
GET /materials/

// Filter by subject
GET /materials/?subject=bn101-anatomy-physiology

// Filter by material type
GET /materials/?type=notes

// Combined filtering
GET /materials/?subject=bn101&type=pyq
```

#### Subjects API
```typescript
// Get all subjects
GET /subjects/

// Filter by program
GET /subjects/?course=BSCN

// Filter by program and semester
GET /subjects/?course=BSCN&sem=1

// Filter by program and year
GET /subjects/?course=BSCN&year=1
```

#### Recruitment API
```typescript
// Get all job postings
GET /recruitments/

// Filter by program
GET /recruitments/?program=BSCN
```

#### Latest Updates API
```typescript
// Get recent materials and jobs
GET /latest-updates/
```

### API Usage Examples

#### Fetching Materials
```typescript
import { API_BASE_URL } from "@/config/api";

const fetchMaterials = async (subjectSlug?: string, materialType?: string) => {
  const params = new URLSearchParams();
  if (subjectSlug) params.append('subject', subjectSlug);
  if (materialType) params.append('type', materialType);
  
  const response = await fetch(`${API_BASE_URL}/materials/?${params}`);
  return response.json();
};
```

#### Fetching Subjects
```typescript
const fetchSubjects = async (course?: string, semester?: number) => {
  const params = new URLSearchParams();
  if (course) params.append('course', course);
  if (semester) params.append('sem', semester.toString());
  
  const response = await fetch(`${API_BASE_URL}/subjects/?${params}`);
  return response.json();
};
```

### Error Handling

```typescript
const fetchWithErrorHandling = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
```

## Styling System

### Tailwind CSS

The application uses Tailwind CSS for styling with custom configuration:

#### Custom Colors
```typescript
// tailwind.config.ts
colors: {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  // ... more colors
}
```

#### Custom CSS Variables
```css
/* index.css */
:root {
  --primary: 210 40% 50%;
  --secondary: 210 40% 95%;
  --accent: 210 40% 85%;
  /* ... more variables */
}
```

### Component Styling Patterns

#### 1. Card Components
```typescript
className="bg-card hover:bg-card-hover border border-border rounded-xl p-5 shadow-soft hover:shadow-medium transition-all duration-300"
```

#### 2. Button Components
```typescript
className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
```

#### 3. Responsive Design
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Animation Classes

- `transition-all duration-300`: Smooth transitions
- `hover:shadow-medium`: Hover effects
- `group-hover:scale-110`: Group hover animations
- `animate-fade-in`: Custom fade-in animation

## Development Guidelines

### Code Style

#### 1. TypeScript
- Use strict TypeScript configuration
- Define interfaces for all props
- Use type annotations for complex types
- Prefer `interface` over `type` for object shapes

#### 2. Component Structure
```typescript
/**
 * Component documentation
 */
interface ComponentProps {
  /** Prop description */
  prop: string;
}

export const Component = ({ prop }: ComponentProps) => {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

#### 3. File Naming
- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utilities: `kebab-case.ts`
- Types: `types.ts` or `types.tsx`

### Best Practices

#### 1. Component Design
- Keep components small and focused
- Use composition over inheritance
- Prefer props over context for simple data
- Use custom hooks for reusable logic

#### 2. Performance
- Use React.memo for expensive components
- Implement proper key props for lists
- Avoid unnecessary re-renders
- Use useCallback for event handlers

#### 3. Accessibility
- Use semantic HTML elements
- Provide alt text for images
- Use aria-labels for interactive elements
- Ensure keyboard navigation works

### State Management

#### 1. Local State
```typescript
const [state, setState] = useState(initialValue);
```

#### 2. Server State (TanStack Query)
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['materials', subjectSlug],
  queryFn: () => fetchMaterials(subjectSlug),
});
```

#### 3. URL State (React Router)
```typescript
const { yearId, subjectId } = useParams();
const navigate = useNavigate();
```

## Build and Deployment

### Development Build

```bash
npm run dev
```

- Hot module replacement
- Fast refresh
- Source maps
- Development optimizations

### Production Build

```bash
npm run build
```

- Minified code
- Tree shaking
- Optimized assets
- Production optimizations

### Build Output

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-[hash].js # Main JavaScript bundle
│   ├── index-[hash].css # Main CSS bundle
│   └── [hash].svg      # Static assets
└── favicon.ico         # App icon
```

### Deployment

#### 1. Static Hosting (Vercel, Netlify)
```bash
npm run build
# Upload dist/ folder to hosting service
```

#### 2. Server Deployment
```bash
npm run build
# Copy dist/ to web server directory
```

#### 3. Docker Deployment
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment Configuration

#### Development
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 5173,
    host: true
  }
});
```

#### Production
```typescript
// Update API_BASE_URL in src/config/api.ts
export const API_BASE_URL = 'https://your-api-domain.com';
```

## Troubleshooting

### Common Issues

#### 1. API Connection Issues
- Check if backend server is running
- Verify API_BASE_URL in config
- Check CORS configuration
- Verify network connectivity

#### 2. Build Issues
- Clear node_modules and reinstall
- Check TypeScript errors
- Verify all imports are correct
- Check for missing dependencies

#### 3. Styling Issues
- Verify Tailwind CSS is properly configured
- Check if custom CSS variables are defined
- Ensure PostCSS is processing correctly
- Verify class names are correct

#### 4. Routing Issues
- Check if all routes are defined in App.tsx
- Verify route parameters are correct
- Check if components are properly imported
- Ensure React Router is configured correctly

### Debug Tools

#### 1. Browser DevTools
- React Developer Tools
- Network tab for API calls
- Console for errors
- Elements tab for styling

#### 2. Vite DevTools
- Hot module replacement status
- Build information
- Error overlay
- Performance metrics

#### 3. ESLint
```bash
npm run lint
```

## Support

For questions or issues:

1. Check this documentation
2. Review React and TypeScript documentation
3. Check Vite and Tailwind CSS documentation
4. Create an issue in the project repository

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Author**: RGU Hub Development Team