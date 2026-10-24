'use client';

import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileCheck2,
  FileText,
  Trash2,
  Eye,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  X,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { KycUploadFile } from '../types';

interface KycFileUploadFieldProps {
  label: string;
  stepNumber: number;
  description?: string;
  file: KycUploadFile | null | undefined;
  onUpload: (file: KycUploadFile) => void;
  onRemove: () => void;
  accept?: string;
  required?: boolean;
}

export const KycFileUploadField: React.FC<KycFileUploadFieldProps> = ({
  label,
  stepNumber,
  description,
  file,
  onUpload,
  onRemove,
  accept = '.pdf,.jpg,.jpeg,.png',
  required = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const sizeInMb = (selectedFile.size / (1024 * 1024)).toFixed(1);
    const formattedSize = selectedFile.size > 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(selectedFile.size / 1024)} KB`;

    onUpload({
      fileName: selectedFile.name,
      fileSize: formattedSize,
      uploadedAt: 'Today, Just now',
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    const sizeInMb = (droppedFile.size / (1024 * 1024)).toFixed(1);
    const formattedSize = droppedFile.size > 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(droppedFile.size / 1024)} KB`;

    onUpload({
      fileName: droppedFile.name,
      fileSize: formattedSize,
      uploadedAt: 'Today, Just now',
    });
  };

  return (
    <div
      className="p-4 sm:p-5 rounded-2xl border transition-all space-y-3 font-jakarta flex flex-col justify-between h-full"
      style={{
        backgroundColor: file ? partnerColors.surface : partnerColors.surfaceMuted,
        borderColor: file ? '#cbd5e1' : partnerColors.border,
      }}
    >
      {/* Title & Step Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
              style={{
                backgroundColor: file ? partnerColors.verifiedBg : partnerColors.dark,
                color: file ? partnerColors.verifiedText : partnerColors.textInverse,
              }}
            >
              {stepNumber}
            </span>
            <h4
              className="text-xs sm:text-[13px] font-extrabold tracking-tight"
              style={{ color: partnerColors.dark }}
            >
              {label}
              {required && <span className="text-amber-500 ml-1">*</span>}
            </h4>
          </div>
          {description && (
            <p className="text-[11px] font-medium text-slate-500 pl-7 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {file && (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black shrink-0 border"
            style={{
              backgroundColor: partnerColors.verifiedBg,
              borderColor: partnerColors.verifiedBorder,
              color: partnerColors.verifiedText,
            }}
          >
            <CheckCircle2 className="w-3 h-3" />
            Uploaded
          </span>
        )}
      </div>

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Uploaded State Box */}
      {file ? (
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 bg-slate-50/80 mt-auto">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 basis-[150px]">
            <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs font-bold text-slate-900 truncate font-mono">
                {file.fileName}
              </p>
              <p className="text-[10px] font-medium text-slate-400">
                {file.fileSize} • {file.uploadedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-amber-600 transition-colors cursor-pointer"
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Replace</span>
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Remove file"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-3.5 sm:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200 text-center mt-auto min-h-[90px] sm:min-h-[96px] ${
            isDragging
              ? 'border-amber-500 bg-amber-50/50 scale-[1.005]'
              : 'border-slate-200 hover:border-amber-400 hover:bg-slate-50/70'
          }`}
        >
          <div className="w-8.5 h-8.5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <UploadCloud className="w-4.5 h-4.5 text-amber-500" />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-800">
              <span className="text-amber-600 hover:underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-[10px] font-medium text-slate-400">
              Supports PDF, PNG, JPG (up to 10 MB)
            </p>
          </div>
        </div>
      )}

      {/* Simple Document Preview Modal */}
      {showPreviewModal && file && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="w-full max-w-md rounded-2xl p-4 sm:p-6 border shadow-2xl space-y-3.5 sm:space-y-4 max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: partnerColors.surface,
              borderColor: partnerColors.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <h4 className="text-sm font-black text-slate-900 truncate">
                  {label}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">File Name:</span>
                <span className="font-mono font-bold text-slate-800 truncate max-w-[220px]">
                  {file.fileName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">File Size:</span>
                <span className="font-bold text-slate-800">{file.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Status:</span>
                <span className="text-emerald-700 font-bold">Uploaded & Verified</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
