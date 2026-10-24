'use client';

import React from 'react';
import { CalendarX, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, Button } from '@/components/shared';
import { motion, AnimatePresence } from 'framer-motion';
import { usePartnerDateRequests } from './hooks/usePartnerDateRequests';
import { DateRequestsFilterBar } from './DateRequestsFilterBar';
import { DateRequestCard } from './DateRequestCard';
import { AddDateToTripModal } from './AddDateToTripModal';

interface TripPartnerDateRequestsViewProps {
  username: string;
}

export const TripPartnerDateRequestsView: React.FC<TripPartnerDateRequestsViewProps> = ({
  username,
}) => {
  const {
    filteredRequests,
    filters,
    hasActiveFilters,
    toastMessage,
    isAddDateModalOpen,
    selectedRequestForDateModal,
    openAddDateModal,
    closeAddDateModal,
    handleAddDateToTrip,
    setSearchQuery,
    setStatusFilter,
    setSortBy,
    resetFilters,
    handleAcceptRequest,
    handleDeclineRequest,
  } = usePartnerDateRequests();

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trip Partner', href: `/trip-partner/${username}` },
    { label: 'Date Requests' },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0 px-2.5 sm:px-4 md:px-6 pt-3.5 sm:pt-5 md:pt-6 pb-12 sm:pb-16 font-jakarta">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2.5 bg-[#0b132b] text-white px-4 py-3 rounded-2xl shadow-xl border border-amber-400/30 text-xs sm:text-sm font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="mb-5 sm:mb-6 w-full min-w-0">
        <div className="overflow-x-auto whitespace-nowrap max-w-full scrollbar-hide">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="mt-2">
          <h1 className="text-2xl min-[400px]:text-[1.75rem] sm:text-3xl font-black text-gray-900 tracking-tight uppercase break-words">
            Date <span className="text-amber-500">Requests</span>
          </h1>
          <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Custom date inquiries and private group slot requests
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <DateRequestsFilterBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
        onReset={resetFilters}
      />

      {/* Requests List */}
      {filteredRequests.length > 0 ? (
        <div className="space-y-3.5 sm:space-y-4">
          {filteredRequests.map((request) => (
            <DateRequestCard
              key={request.id}
              request={request}
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
              onAddDate={openAddDateModal}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl py-14 px-6 text-center flex flex-col items-center justify-center gap-3">
          <CalendarX className="w-12 h-12 text-gray-300 stroke-[1.5]" />
          <h3 className="text-lg font-bold text-gray-900">No Date Requests Found</h3>
          <p className="text-sm text-gray-500 max-w-md">
            {hasActiveFilters
              ? 'No custom date inquiries matched your current filter criteria.'
              : 'You do not have any custom date inquiries at the moment.'}
          </p>
          {hasActiveFilters && (
            <div className="mt-3">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={resetFilters}
                showArrow={false}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Add Date to Trip Modal */}
      <AddDateToTripModal
        isOpen={isAddDateModalOpen}
        onClose={closeAddDateModal}
        request={selectedRequestForDateModal}
        onConfirm={handleAddDateToTrip}
      />
    </div>
  );
};
