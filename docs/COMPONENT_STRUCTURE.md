# Component Structure Documentation

## Overview

The CUNY 311 App codebase has been refactored from a monolithic `App.tsx` file into a well-organized, modular component structure. This improves maintainability, reusability, and makes the codebase easier to understand and test.

---

## Directory Structure

```
src/
├── components/
│   ├── Header.tsx                 # Shared header with logo and navigation
│   ├── CampusSelector.tsx         # Campus selection screen
│   ├── CategorySelector.tsx       # Main category selection screen
│   ├── SubcategorySelector.tsx    # Subcategory selection screen
│   ├── RequestForm.tsx            # Request submission form
│   └── AdminDashboard.tsx         # Admin dashboard with filters and CSV export
├── types/
│   └── index.ts                   # TypeScript type definitions
├── constants/
│   └── index.ts                   # App constants (campuses, categories, etc.)
├── utils/
│   ├── validation.ts              # Validation utilities (email validation)
│   └── csv.ts                     # CSV export functionality
├── api/
│   └── requests.ts                # API layer (currently mock data)
├── App.tsx                        # Main app component (orchestration)
├── main.tsx                       # React entry point
└── index.css                      # Global styles
```

---

## Component Breakdown

### 1. **App.tsx** (Main Orchestrator)
- **Purpose**: Manages app-level state and routing between different views
- **State Management**:
  - Current step in the workflow
  - Selected campus, category, and subcategory
  - List of submitted requests
- **Responsibilities**:
  - Routes between different screen components
  - Handles navigation logic
  - Manages request submission and status changes
- **Lines of Code**: ~150 (down from 1,082)

### 2. **Components**

#### `Header.tsx`
- **Purpose**: Reusable header component
- **Props**:
  - `onViewHistory`: Callback to navigate to history/admin view
- **Features**: CUNY logo, app title, tagline, and "View History" button

#### `CampusSelector.tsx`
- **Purpose**: First step - campus selection
- **Props**:
  - `onCampusSelect`: Callback when a campus is selected
  - `onViewHistory`: Navigate to history
- **Features**: Grid of all CUNY campuses with hover effects

#### `CategorySelector.tsx`
- **Purpose**: Second step - main category selection
- **Props**:
  - `campus`: Currently selected campus
  - `message`: Optional success/info message
  - `onCategorySelect`: Callback when category is selected
  - `onChangeCampus`: Navigate back to campus selection
  - `onViewHistory`: Navigate to history
- **Features**: Color-coded category cards with icons and descriptions

#### `SubcategorySelector.tsx`
- **Purpose**: Third step - subcategory selection
- **Props**:
  - `campus`, `mainCategoryId`: Current selections
  - `onSubcategorySelect`: Callback when subcategory is selected
  - `onBackToCategories`: Navigate to previous step
  - `onChangeCampus`: Reset to campus selection
  - `onViewHistory`: Navigate to history
- **Features**: Grid of subcategories specific to selected main category

#### `RequestForm.tsx`
- **Purpose**: Fourth step - request submission form
- **Props**:
  - `campus`, `mainCategoryId`, `subCategory`: Current selections
  - `onSubmit`: Callback when form is submitted
  - `onBackToSubcategories`: Navigate to previous step
  - `onStartOver`: Reset to campus selection
  - `onViewHistory`: Navigate to history
- **Features**:
  - Name field (optional)
  - Email field (required for non-anonymous)
  - Anonymous checkbox
  - Location field (optional)
  - Description field (required)
  - Priority checkbox
  - Comprehensive validation with error messages

#### `AdminDashboard.tsx`
- **Purpose**: Admin view for managing all requests
- **Props**:
  - `requests`: Array of all submitted requests
  - `onStatusChange`: Callback to update request status
  - `onCancelRequest`: Callback to cancel a request
  - `onBackToCampusSelection`: Navigate to home
  - `onViewHistory`: Self-reference for header
- **Features**:
  - Filter by campus, category, status
  - Keyword search
  - Status update dropdowns
  - Cancel request button
  - CSV export for filtered results
  - Reset filters button

### 3. **Types** (`src/types/index.ts`)

All TypeScript type definitions in one place:
- `Campus`: Union type of all CUNY campuses
- `MainCategoryId`: Union type of main category IDs
- `RequestStatus`: "Open" | "In Progress" | "Resolved" | "Cancelled"
- `Request`: Complete request object with all fields
- `Step`: Union type of workflow steps

### 4. **Constants** (`src/constants/index.ts`)

All app constants and configuration:
- `CAMPUSES`: Array of all CUNY campus names
- `MAIN_CATEGORIES`: Array of category objects with:
  - `id`, `title`, `description`
  - `color`: Tailwind gradient classes
  - `accent`: Hover gradient classes
  - `icon`: React Icon component
- `SUBCATEGORIES`: Object mapping category IDs to subcategory arrays
- `STATUS_ORDER`: Ordered array of all statuses
- `STATUS_STYLES`: Object mapping statuses to Tailwind classes

### 5. **Utils**

#### `validation.ts`
- `validateEmail()`: Email validation function using regex

#### `csv.ts`
- `exportToCSV()`: Converts requests array to CSV and triggers download

---

## Benefits of This Structure

### 1. **Maintainability**
- Each component has a single responsibility
- Easy to find and fix bugs
- Changes to one component don't affect others

### 2. **Reusability**
- `Header` component can be used across all screens
- Components can be reused in different contexts
- Utils can be used anywhere in the app

### 3. **Testability**
- Each component can be tested in isolation
- Utils have no dependencies and are easy to unit test
- Mock props for testing edge cases

### 4. **Scalability**
- Easy to add new steps to the workflow
- New categories/subcategories added in one place
- New features can be added as separate components

### 5. **Developer Experience**
- Clear separation of concerns
- Easy onboarding for new developers
- Type safety with TypeScript

---

## Adding New Features

### Adding a New Category
1. Open `src/constants/index.ts`
2. Add new category ID to `MainCategoryId` type in `src/types/index.ts`
3. Add category object to `MAIN_CATEGORIES` array
4. Add subcategories array to `SUBCATEGORIES` object

### Adding a New Step
1. Add step name to `Step` type in `src/types/index.ts`
2. Create new component in `src/components/`
3. Add routing logic in `App.tsx`
4. Update navigation callbacks

### Adding Validation
1. Add validation function to `src/utils/validation.ts`
2. Import and use in relevant form component

---

## Testing the Refactored App

1. **Start the dev server**: `npm run dev`
2. **Build for production**: `npm run build`
3. **Run linter**: `npm run lint`

All functionality remains the same - the refactor is purely structural!

---

## Next Steps

- [ ] Add unit tests for utils
- [ ] Add component tests with React Testing Library
- [ ] Connect `RequestForm` and `AdminDashboard` to real backend API
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Implement optimistic UI updates

---

## Questions?

Refer to the inline comments in each file for detailed explanations of props and functionality.

