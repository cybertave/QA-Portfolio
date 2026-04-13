# ParaBank Online Banking System Test Plan

## Application Overview

ParaBank is a demo online banking website. It provides customer registration, login, password recovery, and banking services. This test plan covers all major user workflows including registration, authentication, account lookup, navigation, and security.

## Test Scenarios

### 1. Registration Tests

**Seed:** `tests/seed.spec.js`

#### 1.1. Successful User Registration

**File:** `tests/registration/successful.spec.ts`

**Steps:**
  1. Navigate to ParaBank home page
    - expect: Home page loads
  2. Click Register link
    - expect: Registration form displays
  3. Fill form: John, Doe, 123 Main St, Springfield, IL, 62701, 555-123-4567, 123-45-6789, user001, Pass123!
    - expect: All fields accept input without errors
  4. Click Register button
    - expect: Success - user can login with new credentials

#### 1.2. Form Validation - Missing Fields

**File:** `tests/registration/validation.spec.ts`

**Steps:**
  1. Navigate to Registration
    - expect: Registration page displays
  2. Leave First Name empty, fill others, click Register
    - expect: Validation error for empty field
  3. Verify error message and repeat for other fields
    - expect: Each required field must be completed

#### 1.3. Password Mismatch Validation

**File:** `tests/registration/password-mismatch.spec.ts`

**Steps:**
  1. Navigate to Registration
    - expect: Form displays
  2. Enter different values in Password and Confirm fields, click Register
    - expect: Passwords do not match error appears
  3. Verify error message displays
    - expect: User cannot register with mismatched passwords

#### 1.4. Duplicate Username Prevention

**File:** `tests/registration/duplicate-username.spec.ts`

**Steps:**
  1. Register user with username testuser001
    - expect: First user registers successfully
  2. Try registering another user with username testuser001
    - expect: Cannot use same username
  3. Verify error is displayed
    - expect: Error message appears: username already exists

### 2. Login Tests

**Seed:** `tests/seed.spec.js`

#### 2.1. Login with Invalid Credentials

**File:** `tests/login/invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Login form appears
  2. Enter username: invalid999, password: any, click Log In
    - expect: Login fails with error
  3. Verify error message and user stays on page
    - expect: Error: The username and password could not be verified

#### 2.2. Login Form Validation - Empty Fields

**File:** `tests/login/empty-fields.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Login form displays
  2. Leave Username empty, enter password, click Log In
    - expect: Validation prevents submission
  3. Verify validation error
    - expect: Error appears for empty Username
  4. Leave Password empty and try again
    - expect: Same for empty password

#### 2.3. SQL Injection Prevention

**File:** `tests/login/sql-injection-prevention.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Login form displays
  2. Enter Username: admin' --, Password: anything, click Log In
    - expect: SQL injection safely blocked
  3. Verify safe error handling
    - expect: Standard error message - no database errors exposed

#### 2.4. Password Field Security

**File:** `tests/login/password-masking.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Login form appears
  2. Click password field and type text
    - expect: Password characters masked as dots/asterisks
  3. Verify masking is working
    - expect: No plain text password visible

### 3. Account Recovery Tests

**Seed:** `tests/seed.spec.js`

#### 3.1. Customer Lookup with Valid Data

**File:** `tests/lookup/successful-lookup.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page displays
  2. Click Forgot login info? link
    - expect: Customer Lookup page loads
  3. Fill with valid registered user data: First, Last, Address, City, State, ZIP, SSN
    - expect: Form accepts account information
  4. Click Find My Login Info button
    - expect: Username displayed or recovery instructions provided

#### 3.2. Lookup with Non-Matching Information

**File:** `tests/lookup/failed-lookup.spec.ts`

**Steps:**
  1. Navigate to lookup page
    - expect: Lookup page displays
  2. Fill with non-existent account info: NonExistent, User, 999 Fake St, Unknown, XX, 00000, 000-00-0000
    - expect: Form accepts data
  3. Click Find My Login Info button
    - expect: Lookup fails securely - account not found
  4. Verify security is maintained
    - expect: Error message displayed, no info exposed

#### 3.3. Lookup Form Validation

**File:** `tests/lookup/validation.spec.ts`

**Steps:**
  1. Navigate to lookup page
    - expect: Lookup page displays
  2. Leave each field empty and attempt submission
    - expect: All fields required
  3. Verify error messages appear
    - expect: Validation error for each required field
  4. Enter SSN as INVALID and try submission
    - expect: Invalid SSN format rejected

### 4. Navigation & Content

**Seed:** `tests/seed.spec.js`

#### 4.1. Main Navigation Links

**File:** `tests/navigation/main-links.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads
  2. Click About Us link
    - expect: About Us page displays
  3. Navigate to Services
    - expect: Services page displays
  4. Click Contact in footer
    - expect: Contact page loads
  5. Verify content displays
    - expect: All pages load correctly

#### 4.2. Logo Navigation

**File:** `tests/navigation/logo.spec.ts`

**Steps:**
  1. Navigate to Services page
    - expect: On different page like Services
  2. Click ParaBank logo
    - expect: Returns to home page
  3. Verify home page content
    - expect: Home page displays correctly

#### 4.3. Home Page Content

**File:** `tests/content/home-page.spec.ts`

**Steps:**
  1. Navigate to home page and verify content
    - expect: All sections display
  2. Check login section
    - expect: Customer Login section with fields present
  3. Verify ATM services listed
    - expect: ATM Services: Withdraw, Transfer, Check Balance, Deposits
  4. Verify Online services listed
    - expect: Online Services: Bill Pay, Account History, Transfer Funds
  5. Check news section with date 04/13/2026
    - expect: Latest News section visible

#### 4.4. About Page Content

**File:** `tests/content/about-page.spec.ts`

**Steps:**
  1. Navigate to About Us
    - expect: About page loads
  2. Verify all content present
    - expect: Content displays: ParaSoft Demo Website, demo site disclaimer, contact info

#### 4.5. Services Page Content

**File:** `tests/content/services-page.spec.ts`

**Steps:**
  1. Navigate to Services
    - expect: Services page loads
  2. Verify service listings display correctly
    - expect: Bookstore services listed with descriptions and WSDL links

### 5. Security & Error Handling

**Seed:** `tests/seed.spec.js`

#### 5.1. XSS Attack Prevention

**File:** `tests/security/xss-prevention.spec.ts`

**Steps:**
  1. Navigate to Registration
    - expect: Registration page loads
  2. Enter <script>alert(XSS)</script> in First Name field
    - expect: XSS payload entered without execution
  3. Complete form and submit
    - expect: No script executed, no alert appears
  4. Verify no malicious code ran
    - expect: Data treated as plain text

#### 5.2. Network Error Handling

**File:** `tests/error-handling/network-errors.spec.ts`

**Steps:**
  1. Enable offline in browser
    - expect: Offline mode enabled
  2. Try to navigate to ParaBank
    - expect: Offline error displayed
  3. Disable offline and reload
    - expect: Reconnects and loads successfully

#### 5.3. Long Input Handling

**File:** `tests/error-handling/long-input.spec.ts`

**Steps:**
  1. Navigate to Registration
    - expect: Form loads
  2. Enter very long string in First Name field
    - expect: 1000+ characters handled gracefully
  3. Verify stable behavior
    - expect: Either truncated or validation error shown, no crash

#### 5.4. Special Characters Handling

**File:** `tests/error-handling/special-chars.spec.ts`

**Steps:**
  1. Navigate to Registration
    - expect: Form loads
  2. Enter special characters in various fields
    - expect: Special chars accepted: O'Brien, 123 Main St. #456, Saint-Jean
  3. Submit form
    - expect: Data stored correctly, no corruption
  4. Test potential injection chars
    - expect: HTML/SQL chars like <, >, &, ', ", ;, -- handled safely
  5. Verify safety
    - expect: No injection possible, data integrity maintained
