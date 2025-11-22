# Admin Role Protection Documentation

## Overview
This document describes the implementation of admin role support and comprehensive role-based access control for the FreelanceNest platform.

## Changes Made

### 1. AuthContext (`src/contexts/AuthContext.tsx`)

**Updated Type Definitions:**
- Changed `userRole` type from `'client' | 'freelancer' | null` to `'client' | 'freelancer' | 'admin' | null`
- Now supports three distinct user roles: client, freelancer, and admin

**Key Features:**
- Fetches user role from Firestore on authentication
- Supports both `accountType` and `userType` fields for backward compatibility
- Automatically detects admin users and sets their role

### 2. LoginPage (`src/pages/LoginPage.tsx`)

**Login Navigation Logic:**
Admin users now navigate to `/admin/dashboard` upon successful login.

**Priority Order:**
1. If user was redirected from a protected route → navigate back to that route
2. If accountType is 'admin' → navigate to `/admin/dashboard`
3. If accountType is 'freelancer' → navigate to `/freelancer/dashboard`
4. If accountType is 'client' → navigate to `/client/dashboard`
5. Fallback → navigate to `/dashboard`

**Applied to Both:**
- Email/Password sign-in
- Google sign-in

### 3. ProtectedRoute (`src/components/common/ProtectedRoute.tsx`)

**Enhanced Role Protection:**

The component now enforces strict role-based access control:

#### Admin Role Protection:
- Admin trying to access freelancer routes → Redirect to `/admin/dashboard`
- Admin trying to access client routes → Redirect to `/admin/dashboard`

#### Client Role Protection:
- Client trying to access freelancer routes → Redirect to `/client/dashboard`
- Client trying to access admin routes → Redirect to `/client/dashboard`

#### Freelancer Role Protection:
- Freelancer trying to access client routes → Redirect to `/freelancer/dashboard`
- Freelancer trying to access admin routes → Redirect to `/freelancer/dashboard`

#### No Role (Incomplete Onboarding):
- User with no role trying to access protected routes → Redirect to `/onboarding`

## Route Protection Matrix

| User Role  | Can Access          | Cannot Access                | Redirects To          |
|-----------|---------------------|------------------------------|----------------------|
| Admin     | `/admin/*`          | `/client/*`, `/freelancer/*` | `/admin/dashboard`   |
| Client    | `/client/*`         | `/admin/*`, `/freelancer/*`  | `/client/dashboard`  |
| Freelancer| `/freelancer/*`     | `/admin/*`, `/client/*`      | `/freelancer/dashboard` |
| No Role   | Public routes only  | All protected routes         | `/onboarding`        |

## Usage in Routes

### Example: Admin Routes
```tsx
<Route path="/admin/*" element={
  <ProtectedRoute requiredRole="admin">
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* More admin routes */}
      </Routes>
    </AdminLayout>
  </ProtectedRoute>
} />
```

### Example: Client Routes
```tsx
<Route path="/client/*" element={
  <ProtectedRoute requiredRole="client">
    <ClientLayout>
      <Routes>
        <Route path="dashboard" element={<ClientDashboard />} />
        {/* More client routes */}
      </Routes>
    </ClientLayout>
  </ProtectedRoute>
} />
```

### Example: Freelancer Routes
```tsx
<Route path="/freelancer/*" element={
  <ProtectedRoute requiredRole="freelancer">
    <FreelancerLayout>
      <Routes>
        <Route path="dashboard" element={<FreelancerDashboard />} />
        {/* More freelancer routes */}
      </Routes>
    </FreelancerLayout>
  </ProtectedRoute>
} />
```

## Security Features

1. **Authentication Check:** Users must be logged in to access any protected route
2. **Role Verification:** User's role is fetched from Firestore and verified
3. **Automatic Redirection:** Unauthorized access attempts are automatically redirected
4. **Console Logging:** All access attempts and redirections are logged for debugging
5. **Loading States:** Shows loading spinner while verifying authentication

## Firebase Data Structure

The system expects user documents in Firestore with the following structure:

```typescript
{
  uid: string,
  accountType: 'client' | 'freelancer' | 'admin', // Primary field
  userType: 'client' | 'freelancer' | 'admin',    // Fallback field
  // ... other user fields
}
```

## Testing Scenarios

### Scenario 1: Admin Login
1. Admin logs in with credentials
2. System fetches user profile from Firestore
3. Detects `accountType: 'admin'`
4. Navigates to `/admin/dashboard`

### Scenario 2: Admin Tries to Access Client Dashboard
1. Admin is logged in
2. Admin tries to navigate to `/client/dashboard`
3. ProtectedRoute detects role mismatch
4. Automatically redirects to `/admin/dashboard`
5. Console logs the unauthorized attempt

### Scenario 3: Client Tries to Access Freelancer Page
1. Client is logged in
2. Client tries to navigate to `/freelancer/job-feed`
3. ProtectedRoute detects role mismatch
4. Automatically redirects to `/client/dashboard`

### Scenario 4: Freelancer Tries to Access Admin Page
1. Freelancer is logged in
2. Freelancer tries to navigate to `/admin/users`
3. ProtectedRoute detects role mismatch
4. Automatically redirects to `/freelancer/dashboard`

## Implementation Notes

- All role checks are performed server-side via Firestore
- Role is cached in AuthContext for performance
- Role is re-fetched on every authentication state change
- Logging provides visibility into all access control decisions
- System gracefully handles edge cases (no role, missing data, etc.)

## Future Enhancements

1. **Fine-grained Permissions:** Add permission levels within each role
2. **Multi-role Support:** Allow users to have multiple roles
3. **Role Change Notification:** Notify users when their role changes
4. **Audit Trail:** Log all role-based access attempts to Firestore
5. **Admin Role Management:** UI for admins to manage user roles

## Troubleshooting

### User redirected unexpectedly
- Check console logs for role detection
- Verify `accountType` field in Firestore user document
- Ensure ProtectedRoute has correct `requiredRole` prop

### Role not detected
- Check if user document exists in Firestore
- Verify `accountType` or `userType` field is set
- Check AuthContext console logs

### Infinite redirect loop
- Ensure dashboard routes don't have `requiredRole` prop or have correct role
- Check that redirect target exists and is accessible

## Support

For issues or questions about role-based access control, please refer to:
- Firebase Authentication documentation
- Firestore security rules
- React Router documentation for route protection
