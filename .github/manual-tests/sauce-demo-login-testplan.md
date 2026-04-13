# Test Plan: Sauce Demo Login & Registration

## Overview
The Sauce Demo Shopify store is a demo e-commerce site featuring user authentication workflows. This test plan covers the login page, registration/sign-up flow, and password recovery functionality. The plan includes happy path scenarios, edge cases, validation testing, error handling, and accessibility checks for all user authentication features.

## Test Suites

### 1. Login Page - UI & Navigation

#### Test 1.1: Login page loads with correct elements
**Steps:**
- Navigate to the login page
- Verify page URL is https://sauce-demo.myshopify.com/account/login
- Verify page title is 'Account – Sauce Demo'

**Verification:**
- Heading 'Customer Login' is visible
- Email Address input field is present
- Password input field is present
- Sign In button is present
- Forgot your password link is present
- All form elements are visible and properly aligned
- Header navigation includes Log In, Sign up, Search, About Us, Cart links

---

#### Test 1.2: Navigation between pages and login link
**Steps:**
- Navigate to https://sauce-demo.myshopify.com/ homepage
- Verify homepage loads with product listings
- Click on Log In link in navigation

**Verification:**
- Log In link is visible in navigation
- Login page loads
- URL changes to /account/login
- Click on Sauce Demo logo to return to homepage
- Homepage loads and cart still shows '(0)' items

---

#### Test 1.3: Sign up link navigation from login page
**Steps:**
- Navigate to login page
- Verify login page is displayed
- Click on Sign up link in the header

**Verification:**
- User is directed to /account/register page
- Page title is 'Create Account – Sauce Demo'
- Create Account form is displayed

---

### 2. Login Form - Input Validation & Error Handling

#### Test 2.1: Empty form submission shows validation errors
**Steps:**
- Navigate to login page
- Verify Sign In button is enabled
- Click Sign In button without entering any data

**Verification:**
- Form submission is prevented or error message appears
- User remains on login page
- Form fields are still empty

---

#### Test 2.2: Email field validation with invalid formats
**Steps:**
- Navigate to login page
- Verify Email field is ready for input
- Enter 'invalid-email' (no @ symbol) in Email field
- Enter 'password123' in Password field

**Verification:**
- Email field accepts the text entry
- Both fields show entered values
- Click Sign In button
- Either validation error appears for invalid email format or server returns authentication error
- User remains on login page

---

#### Test 2.3: Invalid credentials authentication
**Steps:**
- Navigate to login page
- Verify Sign In button and form fields are visible
- Enter 'nonexistent@example.com' in Email field
- Enter 'wrongpassword' in Password field

**Verification:**
- Both fields contain entered values
- Click Sign In button
- Error message appears indicating invalid email or password
- User remains on login page
- Password field is cleared for security

---

#### Test 2.4: Password field masking
**Steps:**
- Navigate to login page
- Verify Password input field is visible
- Click on Password field and type 'testpassword123'

**Verification:**
- Password field displays masked characters (dots/asterisks) instead of actual text

---

### 3. Login Form - Successful Login & Session

#### Test 3.1: Successful login with valid credentials
**Steps:**
- Navigate to login page
- Verify login form is displayed
- Enter valid test credentials (if available in test environment)

**Verification:**
- If valid account exists: User is redirected to account dashboard or homepage
- If no valid test account: Note that this test requires credentials

---

#### Test 3.2: Login form remembers email field after validation error
**Steps:**
- Navigate to login page
- Verify login form is empty
- Enter 'test@example.com' in Email field
- Verify Email field contains entered value
- Leave Password field empty and click Sign In

**Verification:**
- Error message appears or form rejects submission
- Email field still contains 'test@example.com'

---

### 4. Password Recovery & Account Management

#### Test 4.1: Forgot password link functionality
**Steps:**
- Navigate to login page
- Verify 'Forgot your password?' link is visible below password field
- Click on 'Forgot your password?' link

**Verification:**
- Page navigates to password recovery page
- URL contains 'reset' or 'recover' in path
- Email input field for account recovery is displayed

---

#### Test 4.2: Password recovery form behavior
**Steps:**
- Navigate to password recovery page (via Forgot password link)
- Verify recovery form is displayed with email field and Submit/Send button
- Enter valid email address and click Submit

**Verification:**
- Success message appears indicating recovery email was sent
- OR form remains ready for additional attempts

---

### 5. Sign Up / Registration Flow

#### Test 5.1: Registration page loads with correct form fields
**Steps:**
- Navigate to /account/register page by clicking Sign up from login page
- Verify page URL is https://sauce-demo.myshopify.com/account/register

**Verification:**
- Page title is 'Create Account – Sauce Demo'
- Heading 'Create Account' is visible
- First Name field is present
- Last Name field is present
- Email Address field is present
- Password field is present
- Create Account or Sign Up button is present

---

#### Test 5.2: Registration form empty submission
**Steps:**
- Navigate to registration page
- Verify registration form is displayed with all fields empty
- Click Create Account button without entering data

**Verification:**
- Form submission is prevented
- Validation errors appear or user remains on registration page

---

#### Test 5.3: Registration with partial information
**Steps:**
- Navigate to registration page
- Verify registration form is empty
- Enter First Name: 'John', Last Name: 'Doe'
- Leave Email and Password empty
- Verify form accepts partial data entry
- Click Create Account button

**Verification:**
- Form shows validation errors for missing Email and Password fields
- User remains on registration page

---

#### Test 5.4: Registration with invalid email format
**Steps:**
- Navigate to registration page
- Verify registration form is displayed
- Enter First Name: 'Jane', Last Name: 'Smith'
- Enter Email: 'invalid-email', Password: 'Pass123!'
- Verify all fields accept input values
- Click Create Account button

**Verification:**
- Validation error appears for invalid email format
- User remains on registration page with data preserved

---

#### Test 5.5: Registration with weak password
**Steps:**
- Navigate to registration page
- Verify registration form is displayed
- Enter First Name: 'Bob', Last Name: 'Wilson'
- Enter Email: 'bob@example.com', Password: '123'
- Click Create Account button

**Verification:**
- Either password requirement error appears or account is created
- If error appears, user remains on registration page with data preserved

---

#### Test 5.6: Successful registration creates account
**Steps:**
- Navigate to registration page
- Verify registration form is displayed
- Enter First Name: 'Test', Last Name: 'User'
- Enter Email: 'testuser@example.com', Password: 'SecurePass123!'
- Verify all fields contain entered values
- Click Create Account button

**Verification:**
- Account is created and user is logged in
- User is redirected to account dashboard or homepage
- Success message appears indicating account creation

---

#### Test 5.7: Duplicate email registration attempt
**Steps:**
- Assume a test account exists with email 'existing@example.com'
- Verify test account email is available
- Navigate to registration page
- Verify registration form is displayed
- Enter First Name: 'Another', Last Name: 'User'
- Enter Email: 'existing@example.com', Password: 'SecurePass123!'
- Verify all fields contain the entered values
- Click Create Account button

**Verification:**
- Email must be unique; error message appears indicating email already exists
- User remains on registration page with data preserved (except password)

---

### 6. Cross-Browser & Accessibility Testing

#### Test 6.1: Login page keyboard navigation
**Steps:**
- Navigate to login page
- Verify login page is visible
- Press Tab key to navigate through form elements
- Enter email and password using keyboard

**Verification:**
- Tab navigation focuses on Email field
- Tab navigates to Password field
- Tab navigates to Sign In button
- Tab order is logical and sequential
- Press Enter while Sign In button is focused
- Form submission is triggered by Enter key when button is focused
- OR error message appears if credentials invalid

---

#### Test 6.2: Form labels and accessibility attributes
**Steps:**
- Navigate to login page
- Inspect form elements using accessibility inspection tools

**Verification:**
- Email input has associated label 'Email Address'
- Password input has associated label 'Password'
- All form controls have proper semantic HTML and ARIA roles where needed

---

#### Test 6.3: Login page responsive layout at mobile viewport
**Steps:**
- Set viewport to 375x667 (mobile)
- Navigate to login page
- Verify login form is fully visible without horizontal scrolling
- Attempt to enter email and password

**Verification:**
- All input fields and buttons are easily tappable
- Text is readable at mobile size
- Form fields are accessible and functional on mobile
- Keyboard appears and does not hide form

---

#### Test 6.4: Login page responsive layout at tablet viewport
**Steps:**
- Set viewport to 768x1024 (tablet)
- Navigate to login page

**Verification:**
- Login form is properly formatted for tablet
- All elements are properly aligned
- Form is centered and easy to use

---

### 7. Shopping Features & Integration Tests

#### Test 7.1: Browse products without login
**Steps:**
- Navigate to homepage /collections/all to view products
- Click on a product to view details

**Verification:**
- Products are displayed without requiring login
- Product detail page loads without authentication

---

#### Test 7.2: Add to cart without login
**Steps:**
- Navigate to product detail page
- Verify product is displayed with Add to Cart button
- Click Add to Cart without being logged in

**Verification:**
- Product is added to cart
- Cart count updates in header
- No login required for adding items

---

#### Test 7.3: Checkout prompts login
**Steps:**
- Add item to cart without logging in
- Verify item is added to cart
- Click Check Out button

**Verification:**
- User is prompted to log in
- OR login is required to proceed with checkout
- User is directed to login page

---

#### Test 7.4: Login link from checkout page
**Steps:**
- Add item to cart and navigate to checkout (if accessible without login)
- Verify checkout page is displayed or login prompt appears
- If login prompt available, click Log In link

**Verification:**
- User is directed to login page
- User can log in and return to checkout

---

## Test Execution Summary

**Total Test Cases:** 28
**Test Coverage Areas:**
- UI & Navigation
- Input Validation & Error Handling
- Authentication Flow
- Password Recovery
- User Registration
- Accessibility & Responsive Design
- E-commerce Integration

**Recommended Test Environment:**
- Browsers: Chrome, Firefox, Safari, Edge
- Viewports: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
- Network: Normal conditions, slow network simulation
- Devices: Desktop, Tablet, Mobile
