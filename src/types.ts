export interface ActionLink {
  id: string;
  label: string;
  url: string;
  type: 'google_form' | 'donation' | 'volunteer' | 'registration' | 'external';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  category: 'News' | 'Success Stories' | 'Events' | 'Book Drives';
  status: 'published' | 'scheduled' | 'draft';
  scheduledAt?: string;
  actionLinks?: ActionLink[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  createdAt: string;
}

export interface DonationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookCount: number;
  condition: 'like_new' | 'gently_used' | 'mixed';
  preferredOption: 'drop_off' | 'pickup_request' | 'holding_drive';
  address?: string;
  notes?: string;
  status: 'pending' | 'completed' | 'scheduled';
  createdAt: string;
}

export interface VolunteerSignup {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'book_sorter' | 'drive_host' | 'storyteller' | 'driver' | 'general';
  availability: string;
  notes?: string;
  createdAt: string;
}

export interface AdminStats {
  totalPosts: number;
  booksDonated?: number;
  communitiesServed?: number;
  schoolsSupported?: number;
  volunteersCount: number;
  contactSubmissionsCount: number;
  donationRequestsCount: number;
  monthlyPageViews: number;
}

export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
  token?: string;
}
