import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

// Pages
import LandingPage from './pages/LandingPage'
import TalentMarketplacePage from './pages/TalentMarketplacePage'
import ProjectCatalogPage from './pages/ProjectCatalogPage'
import EnterpriseSolutionsPage from './pages/EnterpriseSolutionsPage'
import TrustAndSafetyPage from './pages/TrustAndSafetyPage'
import CommunityGuidelinesPage from './pages/CommunityGuidelinesPage'
import ReportProblemPage from './pages/ReportProblemPage'
import HowToHirePage from './pages/HowToHirePage'
import TalkToSalesPage from './pages/TalkToSalesPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OnboardingPage from './pages/onboarding/OnboardingPage'
import DashboardPage from './pages/DashboardPage'

// Guidelines Pages

// Freelancer Pages
import HowToFindWorkPage from './pages/HowToFindWorkPage'
import DirectContractsPage from './pages/DirectContractsPage'
import WaysToEarnPage from './pages/WaysToEarnPage'
import FreelancerPlusPage from './pages/FreelancerPlusPage'

// Resource Pages
import HelpCenterPage from './pages/resources/HelpCenterPage'
import ResourcesPage from './pages/resources/ResourcesPage'
import FirebaseTestPage from './pages/FirebaseTestPage'

// Company Pages
import AboutUsPage from './pages/company/AboutUsPage'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'
import BrowseFreelancersPage from './pages/client/BrowseFreelancersPage'
import FreelancerProfilePage from './pages/client/FreelancerProfilePage'
import PostJobPage from './pages/client/PostJobPage'
import MyJobsPage from './pages/client/MyJobsPage'
import ShortlistComparePage from './pages/client/ShortlistComparePage'
import CandidateProfilePage from './pages/client/CandidateProfilePage'
import JobDetailsPage from './pages/client/JobDetailsPage'
import ContractSetupPage from './pages/client/ContractSetupPage'
import EscrowPaymentsPage from './pages/client/EscrowPaymentsPage'
import ProjectWorkspacePage from './pages/client/ProjectWorkspacePage'
import MessagesPage from './pages/client/MessagesPage'
import MeetingsPage from './pages/client/MeetingsPage'
import ReviewsApprovalsPage from './pages/client/ReviewsApprovalsPage'
import ClientProfilePage from './pages/client/ClientProfilePage'
import ClientSettingsPage from './pages/client/ClientSettingsPage'
import InvoicesTaxCenterPage from './pages/client/InvoicesTaxCenterPage'

// Freelancer Pages
import FreelancerDashboard from './pages/freelancer/FreelancerDashboard'
import JobFeed from './pages/freelancer/JobFeed'
import FreelancerJobDetails from './pages/freelancer/JobDetails'
import MyProposals from './pages/freelancer/MyProposals'
import Orders from './pages/freelancer/Orders'
import Earnings from './pages/freelancer/Earnings'
import FreelancerProfile from './pages/freelancer/Profile'
import Portfolio from './pages/freelancer/Portfolio'
import ProjectDetails from './pages/freelancer/ProjectDetails'
import FreelancerMessages from './pages/freelancer/Messages'
import FreelancerNotifications from './pages/freelancer/Notifications'
import FreelancerSettings from './pages/freelancer/Settings'
import AIMatches from './pages/freelancer/AIMatches'

import FreelancerProjectWorkspace from './pages/freelancer/ProjectWorkspace'
import ProposalComposer from './pages/freelancer/ProposalComposer'
import Gigs from './pages/freelancer/Gigs'
import CreateEditGig from './pages/freelancer/CreateEditGig'
import GigDetails from './pages/freelancer/GigDetails'
import AddProject from './pages/freelancer/AddProject'
import Analytics from './pages/freelancer/Analytics'
import TimeTracker from './pages/freelancer/TimeTracker'
import Wallet from './pages/freelancer/Wallet'
import DisputeCenter from './pages/freelancer/DisputeCenter'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import ProjectOversight from './pages/admin/ProjectOversight'
import ReportsMonitoring from './pages/admin/ReportsMonitoring'
import AnalyticsReporting from './pages/admin/AnalyticsReporting'

// Components
import AppLayout from './components/common/AppLayout'
import ClientLayout from './components/common/ClientLayout'
import FreelancerLayout from './components/common/FreelancerLayout'
import AdminLayout from './components/common/AdminLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        {/* Admin Routes with AdminLayout */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="projects" element={<ProjectOversight />} />
                <Route path="reports" element={<ReportsMonitoring />} />
                <Route path="analytics" element={<AnalyticsReporting />} />
                <Route path="settings" element={<AdminDashboard />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* Client Routes with ClientLayout */}
        <Route path="/client/*" element={
          <ProtectedRoute requiredRole="client">
            <ClientLayout>
              <Routes>
                <Route path="dashboard" element={<ClientDashboard />} />
                <Route path="browse-freelancers" element={<BrowseFreelancersPage />} />
                <Route path="freelancer/:id" element={<FreelancerProfilePage />} />
                <Route path="post-job" element={<PostJobPage />} />
                <Route path="my-jobs" element={<MyJobsPage />} />
                <Route path="shortlist-compare" element={<ShortlistComparePage />} />
                <Route path="candidate/:id" element={<CandidateProfilePage />} />
                <Route path="job/:id" element={<JobDetailsPage />} />
                <Route path="contract-setup" element={<ContractSetupPage />} />
                <Route path="escrow-payments" element={<EscrowPaymentsPage />} />
                <Route path="project-workspace/:id" element={<ProjectWorkspacePage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="meetings" element={<MeetingsPage />} />
                <Route path="reviews-approvals" element={<ReviewsApprovalsPage />} />
                <Route path="profile" element={<ClientProfilePage />} />
                <Route path="settings" element={<ClientSettingsPage />} />
                <Route path="invoices-tax" element={<InvoicesTaxCenterPage />} />
              </Routes>
            </ClientLayout>
          </ProtectedRoute>
        } />

        {/* Freelancer Routes with FreelancerLayout */}
        <Route path="/freelancer/*" element={
          <ProtectedRoute requiredRole="freelancer">
            <FreelancerLayout>
              <Routes>
                <Route path="dashboard" element={<FreelancerDashboard />} />
                <Route path="job-feed" element={<JobFeed />} />
                <Route path="job-details/:id" element={<FreelancerJobDetails />} />
                <Route path="ai-matches" element={<AIMatches />} />
                <Route path="my-proposals" element={<MyProposals />} />
                <Route path="orders" element={<Orders />} />
                <Route path="projects" element={<Orders />} />
                <Route path="project-workspace/:id" element={<FreelancerProjectWorkspace />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="profile" element={<FreelancerProfile />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="portfolio/:id" element={<ProjectDetails />} />
                <Route path="portfolio/add" element={<AddProject />} />
                <Route path="portfolio/edit/:id" element={<AddProject />} />
                <Route path="gigs" element={<Gigs />} />
                <Route path="gigs/create" element={<CreateEditGig />} />
                <Route path="gigs/edit/:id" element={<CreateEditGig />} />
                <Route path="gigs/details/:id" element={<GigDetails />} />
                <Route path="messages" element={<FreelancerMessages />} />
                <Route path="notifications" element={<FreelancerNotifications />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="time-tracker" element={<TimeTracker />} />

                <Route path="settings" element={<FreelancerSettings />} />
                <Route path="proposal-composer/:jobId" element={<ProposalComposer />} />
                <Route path="dispute-center" element={<DisputeCenter />} />
              </Routes>
            </FreelancerLayout>
          </ProtectedRoute>
        } />

        {/* General Routes with AppLayout */}
        <Route path="/*" element={
          <AppLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/talent-marketplace" element={<TalentMarketplacePage />} />
              <Route path="/project-catalog" element={<ProjectCatalogPage />} />
              <Route path="/enterprise" element={<EnterpriseSolutionsPage />} />
              <Route path="/trust-safety" element={<TrustAndSafetyPage />} />
              <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />
              <Route path="/report-problem" element={<ReportProblemPage />} />
              <Route path="/how-to-hire" element={<HowToHirePage />} />
              <Route path="/talk-to-sales" element={<TalkToSalesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/firebase-test" element={<FirebaseTestPage />} />
              
              {/* Guidelines Routes */}
              
              {/* Freelancer Routes */}
              <Route path="/how-to-find-work" element={<HowToFindWorkPage />} />
              <Route path="/direct-contracts" element={<DirectContractsPage />} />
              <Route path="/ways-to-earn" element={<WaysToEarnPage />} />
              <Route path="/freelancer-plus" element={<FreelancerPlusPage />} />
              
              {/* Resource Routes */}
              <Route path="/resources/help-center" element={<HelpCenterPage />} />
              <Route path="/resources/library" element={<ResourcesPage />} />
              
              {/* Company Routes */}
              <Route path="/company/about" element={<AboutUsPage />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App






