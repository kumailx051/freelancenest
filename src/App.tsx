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
import WatchDemoPage from './pages/WatchDemoPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OnboardingPage from './pages/onboarding/OnboardingPage'
import DashboardPage from './pages/DashboardPage'

// Guidelines Pages
import ConductGuidelinesPage from './pages/guidelines/ConductGuidelinesPage'
import WorkQualityGuidelinesPage from './pages/guidelines/WorkQualityGuidelinesPage'
import PaymentGuidelinesPage from './pages/guidelines/PaymentGuidelinesPage'
import PrivacyGuidelinesPage from './pages/guidelines/PrivacyGuidelinesPage'
import DisputeResolutionGuidelinesPage from './pages/guidelines/DisputeResolutionGuidelinesPage'

// Freelancer Pages
import HowToFindWorkPage from './pages/HowToFindWorkPage'
import DirectContractsPage from './pages/DirectContractsPage'
import FindFreelanceJobsPage from './pages/FindFreelanceJobsPage'
import WaysToEarnPage from './pages/WaysToEarnPage'
import FreelancerPlusPage from './pages/FreelancerPlusPage'

// Ways To Earn Pages
import ProjectBiddingPage from './pages/ways-to-earn/ProjectBiddingPage'
import ServicePackagesPage from './pages/ways-to-earn/ServicePackagesPage'
import ProjectCollaborationPage from './pages/ways-to-earn/ProjectCollaborationPage'
import SkillCertificationPage from './pages/ways-to-earn/SkillCertificationPage'
import ReferralProgramPage from './pages/ways-to-earn/ReferralProgramPage'
import CommunityContributionsPage from './pages/ways-to-earn/CommunityContributionsPage'
import EnterpriseFreelancingPage from './pages/ways-to-earn/EnterpriseFreelancingPage'
import FreelancerCompetitionsPage from './pages/ways-to-earn/FreelancerCompetitionsPage'

// Resource Pages
import HelpCenterPage from './pages/resources/HelpCenterPage'
import SuccessStoriesPage from './pages/resources/SuccessStoriesPage'
import ReviewsPage from './pages/resources/ReviewsPage'
import ResourcesPage from './pages/resources/ResourcesPage'
import BlogPage from './pages/resources/BlogPage'
import FirebaseTestPage from './pages/FirebaseTestPage'

// Help Center Pages
import GettingStartedHelpPage from './pages/resources/help/GettingStartedHelpPage'
import AccountProfileHelpPage from './pages/resources/help/AccountProfileHelpPage'
import PaymentsFinancesHelpPage from './pages/resources/help/PaymentsFinancesHelpPage'
import PlatformSettingsHelpPage from './pages/resources/help/PlatformSettingsHelpPage'
import SecurityPrivacyHelpPage from './pages/resources/help/SecurityPrivacyHelpPage'
import ContactSupportHelpPage from './pages/resources/help/ContactSupportHelpPage'

// Company Pages
import AboutUsPage from './pages/company/AboutUsPage'
import LeadershipPage from './pages/company/LeadershipPage'
import InvestorRelationsPage from './pages/company/InvestorRelationsPage'
import CareersPage from './pages/company/CareersPage'
import PressPage from './pages/company/PressPage'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'
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
import FreelancerMessages from './pages/freelancer/Messages'
import FreelancerNotifications from './pages/freelancer/Notifications'
import FreelancerSettings from './pages/freelancer/Settings'
import AIMatches from './pages/freelancer/AIMatches'
import LearningCertifications from './pages/freelancer/LearningCertifications'
import FreelancerProjectWorkspace from './pages/freelancer/ProjectWorkspace'
import ProposalComposer from './pages/freelancer/ProposalComposer'
import Gigs from './pages/freelancer/Gigs'
import Calendar from './pages/freelancer/Calendar'
import Analytics from './pages/freelancer/Analytics'
import TimeTracker from './pages/freelancer/TimeTracker'
import Wallet from './pages/freelancer/Wallet'
import DisputeCenter from './pages/freelancer/DisputeCenter'

// Components
import AppLayout from './components/common/AppLayout'
import ClientLayout from './components/common/ClientLayout'
import FreelancerLayout from './components/common/FreelancerLayout'

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        {/* Client Routes with ClientLayout */}
        <Route path="/client/*" element={
          <ClientLayout>
            <Routes>
              <Route path="dashboard" element={<ClientDashboard />} />
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
        } />

        {/* Freelancer Routes with FreelancerLayout */}
        <Route path="/freelancer/*" element={
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
              <Route path="gigs" element={<Gigs />} />
              <Route path="messages" element={<FreelancerMessages />} />
              <Route path="notifications" element={<FreelancerNotifications />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="time-tracker" element={<TimeTracker />} />
              <Route path="learning" element={<LearningCertifications />} />
              <Route path="settings" element={<FreelancerSettings />} />
              <Route path="proposal-composer/:jobId" element={<ProposalComposer />} />
              <Route path="dispute-center" element={<DisputeCenter />} />
            </Routes>
          </FreelancerLayout>
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
              <Route path="/watch-demo" element={<WatchDemoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/firebase-test" element={<FirebaseTestPage />} />
              
              {/* Guidelines Routes */}
              <Route path="/guidelines/conduct" element={<ConductGuidelinesPage />} />
              <Route path="/guidelines/work-quality" element={<WorkQualityGuidelinesPage />} />
              <Route path="/guidelines/payment" element={<PaymentGuidelinesPage />} />
              <Route path="/guidelines/privacy" element={<PrivacyGuidelinesPage />} />
              <Route path="/guidelines/dispute-resolution" element={<DisputeResolutionGuidelinesPage />} />
              
              {/* Freelancer Routes */}
              <Route path="/how-to-find-work" element={<HowToFindWorkPage />} />
              <Route path="/direct-contracts" element={<DirectContractsPage />} />
              <Route path="/find-freelance-jobs" element={<FindFreelanceJobsPage />} />
              <Route path="/ways-to-earn" element={<WaysToEarnPage />} />
              <Route path="/freelancer-plus" element={<FreelancerPlusPage />} />
              
              {/* Ways To Earn Routes */}
              <Route path="/ways-to-earn/project-bidding" element={<ProjectBiddingPage />} />
              <Route path="/ways-to-earn/service-packages" element={<ServicePackagesPage />} />
              <Route path="/ways-to-earn/project-collaboration" element={<ProjectCollaborationPage />} />
              <Route path="/ways-to-earn/skill-certification" element={<SkillCertificationPage />} />
              <Route path="/ways-to-earn/referral-program" element={<ReferralProgramPage />} />
              <Route path="/ways-to-earn/community-contributions" element={<CommunityContributionsPage />} />
              <Route path="/ways-to-earn/enterprise-freelancing" element={<EnterpriseFreelancingPage />} />
              <Route path="/ways-to-earn/freelancer-competitions" element={<FreelancerCompetitionsPage />} />
              
              {/* Resource Routes */}
              <Route path="/resources/help-center" element={<HelpCenterPage />} />
              <Route path="/resources/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/resources/reviews" element={<ReviewsPage />} />
              <Route path="/resources/library" element={<ResourcesPage />} />
              <Route path="/resources/blog" element={<BlogPage />} />
              
              {/* Help Center Detail Routes */}
              <Route path="/resources/help/getting-started" element={<GettingStartedHelpPage />} />
              <Route path="/resources/help/account-profile" element={<AccountProfileHelpPage />} />
              <Route path="/resources/help/payments-finances" element={<PaymentsFinancesHelpPage />} />
              <Route path="/resources/help/platform-settings" element={<PlatformSettingsHelpPage />} />
              <Route path="/resources/help/security-privacy" element={<SecurityPrivacyHelpPage />} />
              <Route path="/resources/help/contact-support" element={<ContactSupportHelpPage />} />
              
              {/* Company Routes */}
              <Route path="/company/about" element={<AboutUsPage />} />
              <Route path="/company/leadership" element={<LeadershipPage />} />
              <Route path="/company/investors" element={<InvestorRelationsPage />} />
              <Route path="/company/careers" element={<CareersPage />} />
              <Route path="/company/press" element={<PressPage />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App






