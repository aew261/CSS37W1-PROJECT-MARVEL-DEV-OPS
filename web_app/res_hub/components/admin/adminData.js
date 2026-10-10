// TODO(backend): SAMPLE DATA ONLY. Replace with real data from app_api.js
// (e.g. GET /admin/analytics and GET /residences) once those endpoints exist.
// Note: ResHub is a REVIEW platform - students do not pay for accommodation
// (NSFAS does), so nothing here deals with prices or rent.

export const SAMPLE_RESIDENCES = [
  {
    id: 1,
    name: 'Bolitha Residence',
    address: '10 Kingfisher str, Southernwood, Mthatha',
    status: 'Verified',
    rating: 4.5,
    reviews: 15,
    openIssues: 2,
  },
  {
    id: 2,
    name: 'Amaxesibe 4 Residence',
    address: '198 1st avenue, Ncambedlana, Mthatha',
    status: 'Verified',
    rating: 4.5,
    reviews: 15,
    openIssues: 1,
  },
  {
    id: 3,
    name: 'Nkosinathi Residence',
    address: '68 4th Avenue, Norwood, Mthatha',
    status: 'Under Review',
    rating: 4.5,
    reviews: 15,
    openIssues: 3,
  },
];

// Platform-wide average per review category (1-5 stars).
export const SAMPLE_CATEGORY_RATINGS = [
  { label: 'Infrastructure', score: 4.2 },
  { label: 'Service', score: 3.6 },
  { label: 'Landlord Behaviour', score: 4.0 },
  
];