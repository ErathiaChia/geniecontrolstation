import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import FullScreenLayout from 'layout/FullScreen';

// render - process pages (full screen)
const DocumentAssessment = Loadable(lazy(() => import('pages/apprenticeship-process/document-assessment')));
const CandidateScreening = Loadable(lazy(() => import('pages/apprenticeship-process/candidate-screening')));
const Approval = Loadable(lazy(() => import('pages/apprenticeship-process/pending-approval')));

// render - news verification detail pages (full screen)
const UnverifiedNewsLeads = Loadable(lazy(() => import('pages/media/news-verification/unverified')));
const ApprovalNewsLeads = Loadable(lazy(() => import('pages/media/news-verification/approval')));
const ScheduleNewsLeads = Loadable(lazy(() => import('pages/media/news-verification/schedule')));
const PublishedNewsLeads = Loadable(lazy(() => import('pages/media/news-verification/published')));

// ==============================|| FULL SCREEN ROUTING ||============================== //

const FullScreenRoutes = {
  element: <FullScreenLayout />,
  children: [
    {
      path: 'process/document-assessment/:candidateId',
      element: <DocumentAssessment />
    },
    {
      path: 'process/candidate-screening/:candidateId',
      element: <CandidateScreening />
    },
    {
      path: 'process/approval/:candidateId',
      element: <Approval />
    },
    {
      path: 'media/news-verification/unverified/:newsId',
      element: <UnverifiedNewsLeads />
    },
    {
      path: 'media/news-verification/approval/:newsId',
      element: <ApprovalNewsLeads />
    },
    {
      path: 'media/news-verification/schedule/:newsId',
      element: <ScheduleNewsLeads />
    },
    {
      path: 'media/news-verification/published/:newsId',
      element: <PublishedNewsLeads />
    }
  ]
};

export default FullScreenRoutes;

