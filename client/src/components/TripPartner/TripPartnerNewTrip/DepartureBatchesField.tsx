'use client';

import React from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { DepartureBatch } from './types';

export interface DepartureBatchesFieldProps {
  datesOnRequest: boolean;
  onToggleDatesOnRequest: (val: boolean) => void;
  batches: DepartureBatch[];
  onChangeBatches: (batches: DepartureBatch[]) => void;
  className?: string;
}

export const DepartureBatchesField: React.FC<DepartureBatchesFieldProps> = ({
  datesOnRequest = false,
  onToggleDatesOnRequest,
  batches = [],
  onChangeBatches,
  className = '',
}) => {
  const activeBatches =
    batches && batches.length > 0
      ? batches
      : [{ id: 'batch-1', startDate: '', endDate: '' }];

  const handleAddBatch = () => {
    const newBatch: DepartureBatch = {
      id: `batch-${Date.now()}`,
      startDate: '',
      endDate: '',
    };
    onChangeBatches([...activeBatches, newBatch]);
  };

  const handleUpdateBatch = (
    id: string,
    partial: Partial<DepartureBatch>
  ) => {
    const updated = activeBatches.map((b) =>
      b.id === id ? { ...b, ...partial } : b
    );
    onChangeBatches(updated);
  };

  const handleRemoveBatch = (id: string) => {
    if (activeBatches.length <= 1) {
      onChangeBatches([{ id: 'batch-1', startDate: '', endDate: '' }]);
      return;
    }
    onChangeBatches(activeBatches.filter((b) => b.id !== id));
  };

  return (
    <div className={`flex flex-col gap-2 w-full font-jakarta ${className}`}>
      {/* Dates on Request Toggle */}
      <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between select-none pb-1">
        <label
          htmlFor="dates-on-request-toggle"
          className="flex items-center gap-1.5 text-gray-800 cursor-pointer text-xs font-black uppercase tracking-wider"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          Dates on Request
        </label>
        <button
          id="dates-on-request-toggle"
          type="button"
          role="switch"
          aria-checked={datesOnRequest}
          onClick={(e) => {
            e.preventDefault();
            onToggleDatesOnRequest(!datesOnRequest);
          }}
          title="Toggle dates on request"
          className={`relative inline-flex items-center w-8.5 h-4.75 rounded-full p-0.5 cursor-pointer transition-colors duration-200 outline-none shrink-0 ${
            datesOnRequest ? 'bg-amber-500' : 'bg-gray-300'
          } focus-visible:ring-2 focus-visible:ring-amber-500`}
        >
          <span
            className={`block w-3.75 h-3.75 rounded-full bg-white shadow-xs transition-transform duration-200 ${
              datesOnRequest ? 'translate-x-3.75' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Departure Dates Header with + ADD BATCH */}
      <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between select-none pt-2">
        <span className="flex items-center gap-1.5 text-gray-800 text-xs font-black uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          Departure Dates
        </span>
        <button
          type="button"
          onClick={handleAddBatch}
          disabled={datesOnRequest}
          style={{ opacity: datesOnRequest ? 0.35 : 1 }}
          title="Add another departure batch"
          className="inline-flex items-center gap-1.5 bg-transparent border-none text-amber-500 hover:text-amber-600 text-xs font-black tracking-wider uppercase cursor-pointer transition-all duration-150 hover:-translate-y-0.5 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:stroke-[2.5]"
        >
          <Plus />
          <span>Add Batch</span>
        </button>
      </div>

      {/* Batches Container Card */}
      <div
        className={`rounded-3xl bg-white border border-gray-100 shadow-2xs p-4 sm:p-6 space-y-4 transition-all duration-200 ${
          datesOnRequest ? 'opacity-40 pointer-events-none select-none bg-gray-50' : ''
        }`}
      >
        {activeBatches.map((batch, index) => (
          <div
            key={batch.id || index}
            className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] items-end gap-3 sm:gap-4 p-1"
          >
            {/* Start Date */}
            <div className="min-w-0">
              <label
                htmlFor={`batch-start-${batch.id}`}
                className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5"
              >
                Start Date
              </label>
              <div className="relative flex items-center">
                <input
                  id={`batch-start-${batch.id}`}
                  type="date"
                  value={batch.startDate || ''}
                  onChange={(e) =>
                    handleUpdateBatch(batch.id, { startDate: e.target.value })
                  }
                  className="w-full bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition-all shadow-2xs cursor-pointer"
                />
              </div>
            </div>

            {/* End Date with integrated remove button on mobile */}
            <div className="min-w-0 flex items-end gap-2 sm:block">
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`batch-end-${batch.id}`}
                  className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5"
                >
                  End Date
                </label>
                <div className="relative flex items-center">
                  <input
                    id={`batch-end-${batch.id}`}
                    type="date"
                    value={batch.endDate || ''}
                    onChange={(e) =>
                      handleUpdateBatch(batch.id, { endDate: e.target.value })
                    }
                    className="w-full bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition-all shadow-2xs cursor-pointer"
                  />
                </div>
              </div>

              {/* Remove Batch Button (inline on mobile) */}
              {activeBatches.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveBatch(batch.id)}
                  className="sm:hidden w-11 h-11 rounded-2xl bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
                  title="Remove batch"
                >
                  <Trash2 className="w-4 h-4 stroke-[2.2]" />
                </button>
              )}
            </div>

            {/* Remove Batch Button (tablet/desktop) */}
            {activeBatches.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveBatch(batch.id)}
                className="hidden sm:flex w-12 h-12 rounded-2xl bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors items-center justify-center shrink-0 cursor-pointer mb-0.5"
                title="Remove batch"
              >
                <Trash2 className="w-4 h-4 stroke-[2.2]" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
