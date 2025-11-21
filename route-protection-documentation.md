# Route Protection Documentation

## Overview
This document describes the role-based access control (RBAC) implementation that prevents clients from accessing freelancer screens and vice versa, ensuring users can only access routes appropriate for their user type.

## Implementation Components

### 1. AuthContext Enhancement (`src/contexts/AuthContext.tsx`)

**Changes Made:**
- Added `userRole` state to track the user's role ('client' or 'freelancer')
- Updated context interface to include `userRole` property
- Fetches user role from Firestore when authentication state changes
- Automatically clears role on logout

**Key Features:**
```typescript
interface AuthContextType {
  currentUser: User | null;
  userRole: 'client' | 'freelancer' | null;
  loading: boolean;
  logout: () => Promise<void>;
}
```

**Flow:**
1. When a user signs in, `onAuthStateChanged` fires
2. User's document is fetched from Firestore using `FirestoreService.getUser()`
3. `userType` field from Firestore is set as `userRole` in context
4. Role is available to all components via `useAuth()` hook

### 2. ProtectedRoute Component (`src/components/common/ProtectedRoute.tsx`)

**Changes Made:**
- Integrated role checking logic
- Redirects users based on role mismatch
- Handles users without roles (incomplete onboarding)

**Role-Based Redirect Logic:**

| User Role  | Attempts to Access | Redirected To          | Reason                          |
|------------|-------------------|------------------------|----------------------------------|
| Client     | Freelancer routes | `/client/dashboard`    | Clients can't access freelancer features |
| Freelancer | Client routes     | `/freelancer/dashboard`| Freelancers can't access client features |
| No Role    | Any protected route| `/onboarding`         | User must complete onboarding first |
| Not Logged In | Any protected route | `/login`           | Authentication required |

**Code Example:**
```typescript
if (requiredRole && userRole !== requiredRole) {
  if (userRole === 'client' && requiredRole === 'freelancer') {
    return <Navigate to="/client/dashboard" replace />;
  }
  if (userRole === 'freelancer' && requiredRole === 'client') {
    return <Navigate to="/freelancer/dashboard" replace />;
  }
  if (!userRole) {
    return <Navigate to="/onboarding" replace />;
  }
}
```

### 3. DashboardPage Router (`src/pages/DashboardPage.tsx`)

**Changes Made:**
- Converted from static dashboard to smart router
- Automatically redirects to appropriate dashboard based on user role
- Shows loading state during redirect

**Redirect Behavior:**
- Client → `/client/dashboard`
- Freelancer → `/freelancer/dashboard`
- No Role → `/onboarding`

This ensures the generic `/dashboard` route always takes users to their correct dashboard.

### 4. App.tsx Route Structure

**Protected Routes:**

#### Client Routes (`/client/*`)
```typescript
<Route path="/client/*" element={
  <ProtectedRoute requiredRole="client">
    <ClientLayout>
      {/* Client-only routes */}
    </ClientLayout>
  </ProtectedRoute>
} />
```

**Protected Pages:**
- Browse Freelancers
- Post Job
- My Jobs
- Client Profile
- Client Settings
- Shortlist/Compare
- Project Workspace
- Messages
- Meetings
- Reviews/Approvals
- Invoices/Tax

#### Freelancer Routes (`/freelancer/*`)
```typescript
<Route path="/freelancer/*" element={
  <ProtectedRoute requiredRole="freelancer">
    <FreelancerLayout>
      {/* Freelancer-only routes */}
    </FreelancerLayout>
  </ProtectedRoute>
} />
```

**Protected Pages:**
- Job Feed
- AI Matches
- My Proposals
- Orders/Projects
- Earnings
- Wallet
- Freelancer Profile
- Portfolio
- Gigs
- Time Tracker
- Analytics
- Calendar
- Messages
- Settings

## Security Features

### 1. Role Verification
- User role is fetched from Firestore (server-side data)
- Role is checked on every protected route access
- Prevents URL manipulation attacks

### 2. Authentication Checks
- All protected routes require authentication
- Unauthenticated users redirected to login
- Login page preserves intended destination

### 3. Onboarding Enforcement
- Users without a role are redirected to onboarding
- Ensures all users complete profile setup
- Prevents access to dashboards before onboarding completion

### 4. Loading States
- Proper loading indicators during auth/role checks
- Prevents flash of incorrect content
- Smooth user experience during redirects

## User Flows

### New User Sign Up
1. User signs up → Firebase Auth creates account
2. Redirected to `/onboarding`
3. Completes onboarding steps (role selection, profile, skills)
4. Role saved to Firestore (`userType` field)
5. Redirected to appropriate dashboard

### Existing User Login
1. User logs in → Firebase Auth
2. AuthContext fetches user role from Firestore
3. Redirected to role-appropriate dashboard
4. Can only access routes matching their role

### Attempting Cross-Role Access
**Example: Client tries to access `/freelancer/dashboard`**
1. Route protection checks role
2. Sees mismatch (client ≠ freelancer)
3. Redirects to `/client/dashboard`
4. Console logs the attempt for debugging

**Example: Freelancer tries to access `/client/post-job`**
1. Route protection checks role
2. Sees mismatch (freelancer ≠ client)
3. Redirects to `/freelancer/dashboard`
4. Console logs the attempt for debugging

## Testing Scenarios

### Test Case 1: Client Access Control
```
✅ Client can access: /client/dashboard, /client/post-job, /client/my-jobs
❌ Client cannot access: /freelancer/dashboard, /freelancer/job-feed
→ Redirects to: /client/dashboard
```

### Test Case 2: Freelancer Access Control
```
✅ Freelancer can access: /freelancer/dashboard, /freelancer/job-feed, /freelancer/proposals
❌ Freelancer cannot access: /client/dashboard, /client/post-job
→ Redirects to: /freelancer/dashboard
```

### Test Case 3: Incomplete Onboarding
```
User with no role tries to access: /client/dashboard
→ Redirects to: /onboarding
```

### Test Case 4: Unauthenticated Access
```
Non-logged-in user tries to access: /client/dashboard
→ Redirects to: /login
After login → Redirects to: originally requested page (if role permits)
```

## Technical Details

### Firestore Data Structure
```typescript
// User document in 'users' collection
{
  uid: "user-uid-here",
  email: "user@example.com",
  userType: "client" | "freelancer",
  fullName: "John Doe",
  // ... other profile fields
}
```

### Context Hook Usage
```typescript
// In any component
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) return <Loading />;
  
  if (userRole === 'client') {
    // Show client-specific content
  } else if (userRole === 'freelancer') {
    // Show freelancer-specific content
  }
};
```

### Navigation Guards
```typescript
// Routes are protected at the top level
<ProtectedRoute requiredRole="client">
  {/* All child routes inherit client-only access */}
</ProtectedRoute>
```

## Benefits

1. **Security**: Prevents unauthorized access to role-specific features
2. **User Experience**: Automatic redirects provide seamless navigation
3. **Data Integrity**: Users can't manipulate URLs to access wrong features
4. **Maintainability**: Centralized protection logic in ProtectedRoute component
5. **Scalability**: Easy to add new protected routes with role requirements

## Future Enhancements

### Potential Improvements:
1. **Permission Levels**: Add granular permissions within roles (e.g., admin client)
2. **Multi-Role Support**: Allow users to switch between client/freelancer modes
3. **Route Middleware**: Add additional checks (email verification, subscription status)
4. **Audit Logging**: Track cross-role access attempts for security monitoring
5. **Role-Based UI**: Conditionally render navigation based on available routes

## Debug Logging

The implementation includes console logs for debugging:
- User authentication status
- Role fetch results
- Redirect reasons
- Access attempt details

**Example Console Output:**
```
User authenticated: abc123 Role: client accessing: /freelancer/dashboard
Client attempting to access freelancer route, redirecting to client dashboard
```

## Troubleshooting

### Issue: User stuck in redirect loop
**Solution**: Check that user has valid `userType` in Firestore

### Issue: Role not updating after onboarding
**Solution**: Ensure onboarding saves `userType` to Firestore. User may need to logout/login.

### Issue: Protected routes not working
**Solution**: Verify AuthProvider wraps entire app in App.tsx

### Issue: Loading state persists
**Solution**: Check Firebase connection and Firestore permissions

## Conclusion

This route protection system ensures that clients and freelancers can only access features appropriate for their role, providing a secure and streamlined user experience. The implementation is scalable, maintainable, and follows React/Firebase best practices.
