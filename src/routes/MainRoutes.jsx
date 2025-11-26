import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// render - ops settings
const OpsSettings = Loadable(lazy(() => import('pages/ops-settings')));

// render - process pages
const Application = Loadable(lazy(() => import('pages/apprenticeship-process/application')));
const DocumentAssessment = Loadable(lazy(() => import('pages/apprenticeship-process/document-assessment')));
const CandidateScreening = Loadable(lazy(() => import('pages/apprenticeship-process/candidate-screening')));
const Approval = Loadable(lazy(() => import('pages/apprenticeship-process/pending-approval')));

// render - media pages
const NewsVerification = Loadable(lazy(() => import('pages/media/news-verification')));
const CommunityManager = Loadable(lazy(() => import('pages/media/community-manager')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'ops-settings',
      element: <OpsSettings />
    },
    {
      path: 'process',
      children: [
        {
          path: 'application',
          element: <Application />
        },
        {
          path: 'document-assessment/:candidateId',
          element: <DocumentAssessment />
        },
        {
          path: 'candidate-screening/:candidateId',
          element: <CandidateScreening />
        },
        {
          path: 'approval/:candidateId',
          element: <Approval />
        }
      ]
    },
    {
      path: 'media',
      children: [
        {
          path: 'news-verification',
          element: <NewsVerification />
        },
        {
          path: 'community-manager',
          element: <CommunityManager />
        }
      ]
    }
  ]
};

export default MainRoutes;
