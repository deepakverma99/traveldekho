'use client';

import React from 'react';
import {
  Check,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Building2,
  BadgeCheck,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerKycData } from '../types';

interface KycStatusTracklineProps {
  kyc: PartnerKycData;
}

export const KycStatusTrackline: React.FC<KycStatusTracklineProps> = ({ kyc }) => {
  const status = kyc.verificationStatus || 'verified';
  const isVerified = status === 'verified';
  const isInReview = status === 'in_review';
  const isCompany = kyc.registrationType === 'company';

  // 4 Verification Milestones
  const steps = [
    {
      id: 'step-type',
      number: 1,
      title: 'Registration Type',
      subtitle: isCompany ? 'Company (Entity)' : 'Trip Partner (Individual)',
      timestamp: kyc.verifiedDate || '12 Oct 2025',
      state: 'completed' as const,
      icon: isCompany ? <Building2 className="w-3.5 h-3.5" /> : <BadgeCheck className="w-3.5 h-3.5" />,
    },
    {
      id: 'step-docs',
      number: 2,
      title: 'Documents Uploaded',
      subtitle: isCompany ? 'COI, PAN, GST, Founder ID' : 'Aadhaar, PAN, Bank Proof',
      timestamp: kyc.verifiedDate || '12 Oct 2025',
      state: 'completed' as const,
      icon: <FileCheck className="w-3.5 h-3.5" />,
    },
    {
      id: 'step-audit',
      number: 3,
      title: 'Compliance Review',
      subtitle: isVerified
        ? 'Verified by Compliance Desk'
        : isInReview
        ? 'Under Review by Safety Team'
        : 'Pending Document Submission',
      timestamp: isVerified ? kyc.verifiedDate || '12 Oct 2025' : isInReview ? 'In Progress' : 'Pending',
      state: isVerified ? ('completed' as const) : isInReview ? ('current' as const) : ('upcoming' as const),
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    {
      id: 'step-verified',
      number: 4,
      title: 'Verified & Active',
      subtitle: isVerified
        ? 'Full Tier Approval & Escrow Enabled'
        : 'Public Verified Seal Pending',
      timestamp: isVerified ? kyc.verifiedDate || '12 Oct 2025' : 'Pending Approval',
      state: isVerified ? ('completed' as const) : ('upcoming' as const),
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div
      className="rounded-2xl p-3.5 sm:p-4.5 md:p-5 border shadow-2xs transition-all space-y-3.5 sm:space-y-4 font-jakarta"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
    >
      {/* Top Header Row with Status Tag */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b gap-2 sm:gap-3"
        style={{ borderColor: partnerColors.borderLight }}
      >
        <div className="space-y-0.5 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3
              className="text-sm sm:text-[15px] font-black tracking-tight"
              style={{ color: partnerColors.dark }}
            >
              KYC Verification Trackline
            </h3>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border shrink-0"
              style={{
                backgroundColor: isVerified
                  ? partnerColors.verifiedBg
                  : isInReview
                  ? '#fffbeb'
                  : partnerColors.surfaceMuted,
                borderColor: isVerified
                  ? partnerColors.verifiedBorder
                  : isInReview
                  ? '#fde68a'
                  : partnerColors.border,
                color: isVerified
                  ? partnerColors.verifiedText
                  : isInReview
                  ? '#b45309'
                  : partnerColors.textSecondary,
              }}
            >
              {isVerified ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified & Active</span>
                </>
              ) : isInReview ? (
                <>
                  <Clock className="w-3 h-3 text-amber-600 animate-spin" />
                  <span>Under Review</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-slate-500" />
                  <span>Pending Submission</span>
                </>
              )}
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-500">
            Real-time compliance stages and identity audit progress for automated payouts.
          </p>
        </div>

        {kyc.verifiedDate && isVerified && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-bold text-slate-700 self-start sm:self-auto shrink-0 mt-1 sm:mt-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">Audited & Cleared on {kyc.verifiedDate}</span>
          </div>
        )}
      </div>

      {/* Responsive Trackline Container */}
      {/* Desktop / Tablet Stepper (Horizontal) */}
      <div className="hidden md:block pt-1 pb-0.5">
        <div className="grid grid-cols-4 relative">
          {steps.map((step, idx) => {
            const isCompleted = step.state === 'completed';
            const isCurrent = step.state === 'current';
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.id} className="relative flex flex-col items-center text-center px-1.5">
                {/* Connecting Trackline Segment */}
                {!isLast && (
                  <div
                    className="absolute top-3.5 left-1/2 w-full h-[2px] -z-0 transition-colors duration-300"
                    style={{
                      backgroundColor: isCompleted ? '#10b981' : '#e2e8f0',
                    }}
                  />
                )}

                {/* Node Circle */}
                <div className="relative z-10 mb-1.5">
                  <div
                    className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center font-bold text-[11px] transition-all duration-200 border-2 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xs'
                        : isCurrent
                        ? 'bg-amber-500 text-white border-amber-500 shadow-[0_0_10px_rgba(244,140,6,0.35)] ring-3 ring-amber-100'
                        : 'bg-white text-slate-400 border-slate-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.75]" />
                    ) : isCurrent ? (
                      <span className="animate-pulse">{step.icon}</span>
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-0.5 max-w-[150px]">
                  <h4
                    className={`text-xs tracking-tight leading-tight ${
                      isCompleted || isCurrent ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-400'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 leading-tight truncate">
                    {step.subtitle}
                  </p>
                  <span
                    className={`inline-block text-[9px] font-mono font-bold mt-0.5 px-1.5 py-0.5 rounded ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700'
                        : isCurrent
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {step.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stepper (Vertical Connected Timeline < 768px) */}
      <div className="block md:hidden space-y-3 pt-0.5">
        {steps.map((step, idx) => {
          const isCompleted = step.state === 'completed';
          const isCurrent = step.state === 'current';
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.id} className="flex items-start gap-2.5 relative">
              {/* Vertical connecting line */}
              {!isLast && (
                <div
                  className="absolute left-[14px] -translate-x-1/2 top-7 w-[2px] h-[calc(100%+0.5rem)] -z-0"
                  style={{
                    backgroundColor: isCompleted ? '#10b981' : '#e2e8f0',
                  }}
                />
              )}

              {/* Circle Node */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 border-2 font-bold text-[10px] ${
                  isCompleted
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xs'
                    : isCurrent
                    ? 'bg-amber-500 text-white border-amber-500 shadow-[0_0_8px_rgba(244,140,6,0.35)] ring-2 ring-amber-100'
                    : 'bg-white text-slate-400 border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3 stroke-[2.75]" />
                ) : isCurrent ? (
                  <span className="animate-pulse">{step.icon}</span>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              {/* Step info */}
              <div className="flex-1 min-w-0 pb-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-xs font-extrabold tracking-tight ${
                      isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700'
                        : isCurrent
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {step.timestamp}
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-500 mt-0.5 truncate">
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
