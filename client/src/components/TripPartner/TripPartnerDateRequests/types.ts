export type DateRequestStatus = 'pending' | 'accepted' | 'declined';

export interface DateRequestItem {
  id: string;
  tripId: string;
  tripTitle: string;
  tripImage: string;
  tripLocation: string;
  tripDuration: string;
  travelerName: string;
  travelerEmail: string;
  travelerPhone: string;
  guestsCount: number;
  requestedStartDate: string;
  requestedEndDate: string;
  flexibleDates?: boolean;
  budgetPerPerson?: number;
  totalEstimatedRevenue: number;
  specialNotes?: string;
  status: DateRequestStatus;
  createdAt: string;
  responseNote?: string;
  dateAddedToTrip?: boolean;
  addedDateRange?: string;
}

export interface AddDateToTripFormValues {
  startDate: string;
  endDate: string;
  batchType?: 'private' | 'public';
  batchName?: string;
  seats?: number;
  pricePerPerson?: number;
}

export type DateRequestsSortBy =
  | 'newest'
  | 'oldest'
  | 'travelDate'
  | 'guests'
  | 'revenue';

export interface DateRequestsFilterState {
  searchQuery: string;
  statusFilter: string;
  sortBy: DateRequestsSortBy;
}

export interface DateRequestsStatsData {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  potentialRevenue: number;
}
