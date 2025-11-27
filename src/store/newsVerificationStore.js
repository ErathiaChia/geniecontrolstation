import { create } from 'zustand';

// Initial data
const initialNewsLeadsData = [
  {
    id: 0,
    title: 'IRS Announces New Direct Deposit Relief Payments - $1,200 Stimulus Checks Coming This Week',
    submissionDate: '2025-11-26',
    currentStatus: 'Unverified',
    statusColor: 'error',
    sources: 'Blog News',
    assignedTo: 'John Doe'
  },
  {
    id: 1,
    title: 'Breaking news: Singapore birthrate in 2024 exceeds 2.0',
    submissionDate: '2024-11-25',
    currentStatus: 'Unverified',
    statusColor: 'error',
    sources: 'Social Media',
    assignedTo: 'John Doe'
  },
  {
    id: 2,
    title: 'Local Community Event Draws Large Crowd',
    submissionDate: '2024-11-24',
    currentStatus: 'Approval',
    statusColor: 'warning',
    sources: 'Social Media',
    assignedTo: 'Jane Smith'
  },
  {
    id: 3,
    title: 'Government Policy Update on Healthcare',
    submissionDate: '2024-11-23',
    currentStatus: 'Schedule',
    statusColor: 'info',
    sources: 'Other Media Outlet',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 4,
    title: 'Sports Team Wins Championship',
    submissionDate: '2024-11-22',
    currentStatus: 'Published',
    statusColor: 'success',
    sources: 'Blog News',
    assignedTo: 'Sarah Williams'
  },
  {
    id: 5,
    title: 'Weather Alert: Storm Warning Issued',
    submissionDate: '2024-11-25',
    currentStatus: 'Unverified',
    statusColor: 'error',
    sources: 'Other Media Outlet',
    assignedTo: 'John Doe'
  },
  {
    id: 6,
    title: 'Celebrity Spotted at Local Restaurant',
    submissionDate: '2024-11-24',
    currentStatus: 'Rejected',
    statusColor: 'default',
    sources: 'TikTok',
    assignedTo: 'Jane Smith'
  },
  {
    id: 7,
    title: 'New Study Reveals Health Benefits',
    submissionDate: '2024-11-23',
    currentStatus: 'Approval',
    statusColor: 'warning',
    sources: 'Reporter',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 8,
    title: 'Traffic Accident on Main Highway',
    submissionDate: '2024-11-25',
    currentStatus: 'Rejected',
    statusColor: 'default',
    sources: 'Social Media',
    assignedTo: 'John Doe'
  },
  {
    id: 9,
    title: 'School District Announces New Program',
    submissionDate: '2024-11-22',
    currentStatus: 'Published',
    statusColor: 'success',
    sources: 'Other Media Outlet',
    assignedTo: 'Sarah Williams'
  },
  {
    id: 10,
    title: 'Local Business Opens New Location',
    submissionDate: '2024-11-24',
    currentStatus: 'Schedule',
    statusColor: 'info',
    sources: 'Blog News',
    assignedTo: 'Jane Smith'
  }
];

const useNewsVerificationStore = create((set, get) => ({
  newsLeads: initialNewsLeadsData,
  selected: [],
  page: 0,
  rowsPerPage: 10,

  // Actions
  setNewsLeads: (newsLeads) => set({ newsLeads }),
  updateNewsLead: (id, updates) =>
    set((state) => ({
      newsLeads: state.newsLeads.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    })),
  setSelected: (selected) => set({ selected }),
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage, page: 0 }),
  addNewsLead: (newsLead) =>
    set((state) => ({
      newsLeads: [...state.newsLeads, newsLead]
    })),
  removeNewsLead: (id) =>
    set((state) => ({
      newsLeads: state.newsLeads.filter((lead) => lead.id !== id)
    }))
}));

// Selectors for computed values
export const useStatusCounts = () => {
  const newsLeads = useNewsVerificationStore((state) => state.newsLeads);
  return {
    Unverified: newsLeads.filter((news) => news.currentStatus === 'Unverified').length,
    Approval: newsLeads.filter((news) => news.currentStatus === 'Approval').length,
    Schedule: newsLeads.filter((news) => news.currentStatus === 'Schedule').length,
    Published: newsLeads.filter((news) => news.currentStatus === 'Published').length
  };
};

export default useNewsVerificationStore;
