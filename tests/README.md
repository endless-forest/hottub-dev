# End-to-End Tests

This directory contains comprehensive end-to-end tests for the Santa Rosa Spas application using Playwright.

## Test Coverage

### 1. Product Listing and Filtering (`products.spec.ts`)
- Display products page and grid
- Search functionality
- Brand filtering
- Clear filters
- Product card navigation

### 2. Product Detail Pages (`product-details.spec.ts`)
- Navigation to product details
- Display product information
- Back navigation
- Request quote with pre-filled data
- Contact options

### 3. Contact Form (`contact-form.spec.ts`)
- Form display and validation
- Field filling and submission
- Success and error handling
- Form clearing after submission
- Email validation

### 4. Appointment Booking (`booking.spec.ts`)
- Booking form display and validation
- Date and time selection
- Form submission
- Date restrictions (no past dates)
- Success and error handling

### 5. Admin Dashboard (`admin-dashboard.spec.ts`)
- Dashboard display
- Statistics cards
- Tab navigation (Leads/Appointments)
- Lead and appointment lists
- Status management
- Empty states

### 6. Navigation and SEO (`navigation.spec.ts`)
- Navigation bar on all pages
- Menu navigation
- Footer display
- Page titles and meta tags
- Open Graph tags
- Structured data (JSON-LD)
- Mobile responsiveness

## Running Tests

### Run all tests (headless)
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests in headed mode
```bash
npm run test:headed
```

### View test report
```bash
npm run test:report
```

### Run specific test file
```bash
npx playwright test tests/products.spec.ts
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

## Prerequisites

1. Ensure the dev server is running or will be auto-started
2. Supabase environment variables must be configured in `.env`
3. Database should have some test data for comprehensive testing

## Test Data

Tests will interact with your actual Supabase database. For best results:
- Have at least one product in the `products` table
- Tests will create new leads and appointments during execution
- Admin dashboard tests will read actual data

## Configuration

Test configuration is in `playwright.config.ts`:
- Base URL: `http://localhost:3000`
- Browser: Chromium (Desktop Chrome)
- Screenshots: On failure
- Trace: On first retry
- Auto-starts dev server if not running

## CI/CD

Tests are configured to run in CI environments with:
- 2 retries on failure
- Single worker for consistency
- HTML report generation
