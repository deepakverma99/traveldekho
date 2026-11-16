'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { EditableProfileField } from '../types';
import { Button } from '@/components/shared';

interface EditProfileModalProps {
  isOpen: boolean;
  field: EditableProfileField | null;
  currentValue: string;
  onClose: () => void;
  onSave: (field: EditableProfileField, value: string) => void;
}

const FIELD_METADATA: Record<
  EditableProfileField,
  { label: string; placeholder: string; type: string }
> = {
  fullName: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    type: 'text',
  },
  nickname: {
    label: 'Nickname',
    placeholder: 'Enter your nickname or display name',
    type: 'text',
  },
  dateOfBirth: {
    label: 'Date of Birth',
    placeholder: 'DD/MM/YYYY or YYYY-MM-DD',
    type: 'date',
  },
  gender: {
    label: 'Gender',
    placeholder: 'e.g. Male, Female, Other',
    type: 'text',
  },
  location: {
    label: 'I Am From',
    placeholder: 'City, Country (e.g. Mumbai, India)',
    type: 'text',
  },
  email: {
    label: 'Email Address',
    placeholder: 'name@example.com',
    type: 'email',
  },
};

interface EditProfileFormProps {
  field: EditableProfileField;
  initialValue: string;
  onClose: () => void;
  onSave: (field: EditableProfileField, value: string) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  field,
  initialValue,
  onClose,
  onSave,
}) => {
  const [val, setVal] = useState(initialValue);
  const meta = FIELD_METADATA[field];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(field, val.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-100 z-10 font-jakarta"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
          Update {meta.label}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="profile-field-input"
            className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2"
          >
            {meta.label}
          </label>
          <input
            id="profile-field-input"
            type={meta.type}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={meta.placeholder}
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-semibold text-gray-900 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <Button type="submit" size="sm" rounded="xl">
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  field,
  currentValue,
  onClose,
  onSave,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && field && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          <EditProfileForm
            key={field}
            field={field}
            initialValue={currentValue}
            onClose={onClose}
            onSave={onSave}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
