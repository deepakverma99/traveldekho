'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  User,
  CheckCircle2,
  FileText,
  Lock,
  Save,
  RotateCcw,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerKycData, KycRegistrationType, KycUploadFile } from '../types';
import { KycFileUploadField } from './KycFileUploadField';
import { KycStatusTrackline } from './KycStatusTrackline';


interface KycStatusSectionProps {
  kyc: PartnerKycData;
  onUpdateRegistrationType?: (type: KycRegistrationType) => void;
  onUpdateFile?: (field: keyof PartnerKycData, file: KycUploadFile | null) => void;
  onUpdateCompanyGst?: (gst: string) => void;
}

export const KycStatusSection: React.FC<KycStatusSectionProps> = ({
  kyc,
  onUpdateRegistrationType,
  onUpdateFile,
  onUpdateCompanyGst,
}) => {
  const [localRegType, setLocalRegType] = useState<KycRegistrationType>(kyc.registrationType || 'company');
  const [localGst, setLocalGst] = useState<string>(kyc.companyGst || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const activeRegistrationType = kyc.registrationType || localRegType;

  const handleTypeChange = (type: KycRegistrationType) => {
    setLocalRegType(type);
    if (onUpdateRegistrationType) {
      onUpdateRegistrationType(type);
    }
  };

  const handleFileChange = (field: keyof PartnerKycData, file: KycUploadFile | null) => {
    if (onUpdateFile) {
      onUpdateFile(field, file);
    }
  };

  const handleGstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().slice(0, 15);
    setLocalGst(val);
    if (onUpdateCompanyGst) {
      onUpdateCompanyGst(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3500);
    }, 500);
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 font-jakarta">
      {/* 1. KYC Verification Status Trackline */}
      <KycStatusTrackline kyc={kyc} />

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
        {/* 2. Step 1: Registration Type Selection */}
        <div
          className="rounded-2xl p-4 sm:p-6 md:p-7 border shadow-xs transition-all space-y-3.5 sm:space-y-4"
          style={{
            backgroundColor: partnerColors.surface,
            borderColor: partnerColors.border,
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 text-white"
                style={{ backgroundColor: partnerColors.dark }}
              >
                1
              </span>
              <h4
                className="text-sm sm:text-base font-black tracking-tight"
                style={{ color: partnerColors.dark }}
              >
                Your registration type
              </h4>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1 pl-7">
              Select whether you are operating as a registered corporate entity or an individual trip host.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {/* Option 1: Company */}
            <label
              onClick={() => handleTypeChange('company')}
              className={`p-3.5 sm:p-4 rounded-xl border flex items-start justify-between gap-2.5 sm:gap-3 cursor-pointer transition-all duration-200 select-none ${
                activeRegistrationType === 'company'
                  ? 'border-amber-400 bg-amber-50/20 shadow-xs'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <div
                  className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    activeRegistrationType === 'company'
                      ? 'bg-amber-100/80 border-amber-300 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <Building2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Company
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      (Entity)
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                    Registered Private Limited, LLP, Partnership, or Sole Proprietorship firm.
                  </p>
                </div>
              </div>

              {/* Radio Circle */}
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  activeRegistrationType === 'company'
                    ? 'border-amber-500 bg-amber-500'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {activeRegistrationType === 'company' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </label>

            {/* Option 2: Trip Partner */}
            <label
              onClick={() => handleTypeChange('trip_partner')}
              className={`p-3.5 sm:p-4 rounded-xl border flex items-start justify-between gap-2.5 sm:gap-3 cursor-pointer transition-all duration-200 select-none ${
                activeRegistrationType === 'trip_partner'
                  ? 'border-amber-400 bg-amber-50/20 shadow-xs'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <div
                  className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    activeRegistrationType === 'trip_partner'
                      ? 'bg-amber-100/80 border-amber-300 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                      Trip Partner
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      (Individual)
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                    Independent Tour Host, Certified Trek Leader, or Freelance Mountain Guide.
                  </p>
                </div>
              </div>

              {/* Radio Circle */}
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  activeRegistrationType === 'trip_partner'
                    ? 'border-amber-500 bg-amber-500'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {activeRegistrationType === 'trip_partner' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </label>
          </div>
        </div>

        {/* 3. Conditional Documents Form */}
        <AnimatePresence mode="wait">
          {activeRegistrationType === 'company' ? (
            /* ================= COMPANY DOCUMENTS ================= */
            <motion.div
              key="company-documents-form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              <div className="pb-1">
                <h4 className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-700">
                  Company Legal & Registration Documents
                </h4>
                <p className="text-[11px] font-medium text-slate-400">
                  Upload official entity records and founder identification.
                </p>
              </div>

              {/* Two fields per row in a 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 2. upload Company incorporation certificate */}
                <KycFileUploadField
                  stepNumber={2}
                  label="Company incorporation certificate"
                  description="Certificate of Incorporation (COI) issued by MCA / Ministry of Corporate Affairs."
                  file={kyc.companyIncorporation}
                  onUpload={(file) => handleFileChange('companyIncorporation', file)}
                  onRemove={() => handleFileChange('companyIncorporation', null)}
                />

                {/* 3. upload Company pancard */}
                <KycFileUploadField
                  stepNumber={3}
                  label="Company pancard"
                  description="Permanent Account Number (PAN) card registered under company's legal name."
                  file={kyc.companyPan}
                  onUpload={(file) => handleFileChange('companyPan', file)}
                  onRemove={() => handleFileChange('companyPan', null)}
                />

                {/* 4. Enter Company GST */}
                <div
                  className="p-3.5 sm:p-4.5 md:p-5 rounded-2xl border transition-all flex flex-col justify-between h-full space-y-3 font-jakarta"
                  style={{
                    backgroundColor: localGst.length === 15 ? partnerColors.surface : partnerColors.surfaceMuted,
                    borderColor: localGst.length === 15 ? '#cbd5e1' : partnerColors.border,
                  }}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 text-white"
                          style={{ backgroundColor: partnerColors.dark }}
                        >
                          4
                        </span>
                        <h4
                          className="text-xs sm:text-[13px] font-extrabold tracking-tight truncate"
                          style={{ color: partnerColors.dark }}
                        >
                          Company GST Number
                          <span className="text-amber-500 ml-1">*</span>
                        </h4>
                      </div>

                      {localGst.length === 15 && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black shrink-0 border"
                          style={{
                            backgroundColor: partnerColors.verifiedBg,
                            borderColor: partnerColors.verifiedBorder,
                            color: partnerColors.verifiedText,
                          }}
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          Valid GST
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 pl-7 leading-relaxed">
                      15-digit Goods & Services Tax Identification Number (GSTIN) of your registered firm.
                    </p>
                  </div>

                  <div className="pt-2 mt-auto">
                    <div className="relative w-full">
                      <input
                        type="text"
                        required
                        value={localGst}
                        onChange={handleGstChange}
                        placeholder="e.g. 02AAACW1234F1Z5"
                        maxLength={15}
                        className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 font-mono font-bold text-xs sm:text-sm text-slate-800 tracking-wider uppercase outline-none focus:border-amber-500 focus:bg-white transition-all shadow-2xs"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 font-bold">
                        {localGst.length}/15
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. upload Founder Adhaar Card */}
                <KycFileUploadField
                  stepNumber={5}
                  label="Founder Adhaar Card"
                  description="Government-issued Aadhaar Card of the Founder or Director (Front & Back)."
                  file={kyc.founderAadhaar}
                  onUpload={(file) => handleFileChange('founderAadhaar', file)}
                  onRemove={() => handleFileChange('founderAadhaar', null)}
                />

                {/* 6. upload Founder PAN Card */}
                <KycFileUploadField
                  stepNumber={6}
                  label="Founder PAN Card"
                  description="Individual PAN card of the Founder or authorized signatory for identity cross-verification."
                  file={kyc.founderPan}
                  onUpload={(file) => handleFileChange('founderPan', file)}
                  onRemove={() => handleFileChange('founderPan', null)}
                />

                {/* 7. upload Cancelled Check */}
                <KycFileUploadField
                  stepNumber={7}
                  label="Cancelled Check"
                  description="Official bank cancelled cheque showing company account title, account number, and IFSC code."
                  file={kyc.companyCancelledCheck}
                  onUpload={(file) => handleFileChange('companyCancelledCheck', file)}
                  onRemove={() => handleFileChange('companyCancelledCheck', null)}
                />
              </div>
            </motion.div>
          ) : (
            /* ================= TRIP PARTNER DOCUMENTS ================= */
            <motion.div
              key="partner-documents-form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              <div className="pb-1">
                <div>
                  <h4 className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-700">
                    Trip Partner Individual Credentials
                  </h4>
                  <p className="text-[11px] font-medium text-slate-400">
                    Upload your personal identity, bank proof, and residential verification records.
                  </p>
                </div>
              </div>

              {/* Two fields per row in a 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 2. Upload Trip Partner Adhaar Card */}
                <KycFileUploadField
                  stepNumber={2}
                  label="Trip Partner Adhaar Card"
                  description="Aadhaar Card of the host/trip partner with clear photograph and address details."
                  file={kyc.partnerAadhaar}
                  onUpload={(file) => handleFileChange('partnerAadhaar', file)}
                  onRemove={() => handleFileChange('partnerAadhaar', null)}
                />

                {/* 3. Upload Trip Partner PAN Card */}
                <KycFileUploadField
                  stepNumber={3}
                  label="Trip Partner PAN Card"
                  description="Individual Income Tax PAN Card for TDS compliance and direct bank settlement."
                  file={kyc.partnerPan}
                  onUpload={(file) => handleFileChange('partnerPan', file)}
                  onRemove={() => handleFileChange('partnerPan', null)}
                />

                {/* 4. Upload Cancelled Check */}
                <KycFileUploadField
                  stepNumber={4}
                  label="Cancelled Check"
                  description="Bank cancelled cheque or first page of bank passbook displaying your name and IFSC."
                  file={kyc.partnerCancelledCheck}
                  onUpload={(file) => handleFileChange('partnerCancelledCheck', file)}
                  onRemove={() => handleFileChange('partnerCancelledCheck', null)}
                />

                {/* 5. Upload Electricity bill */}
                <KycFileUploadField
                  stepNumber={5}
                  label="Electricity bill"
                  description="Recent residential electricity bill (issued within the last 3 months) as address proof."
                  file={kyc.partnerElectricityBill}
                  onUpload={(file) => handleFileChange('partnerElectricityBill', file)}
                  onRemove={() => handleFileChange('partnerElectricityBill', null)}
                />

                {/* 6. Supporting documents */}
                <KycFileUploadField
                  stepNumber={6}
                  label="Supporting documents"
                  description="Tour guide license, Mountaineering/Trek leader diploma, Wilderness First Aid, or Police clearance."
                  file={kyc.partnerSupportingDocs}
                  onUpload={(file) => handleFileChange('partnerSupportingDocs', file)}
                  onRemove={() => handleFileChange('partnerSupportingDocs', null)}
                  required={false}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Security & Encryption Guarantee Notice */}
        <div
          className="rounded-2xl p-4 sm:p-5 border flex items-start gap-3 sm:gap-3.5"
          style={{
            backgroundColor: partnerColors.surfaceMuted,
            borderColor: partnerColors.border,
          }}
        >
          <Lock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs font-medium text-slate-500 leading-relaxed">
            <p className="font-bold text-slate-700">
              Bank-Grade 256-Bit Document Encryption & Privacy Safeguards
            </p>
            <p>
              All submitted Aadhaar, PAN, and banking documents are encrypted using AES-256 and verified through certified government identity gateways under the DPDP Act guidelines.
            </p>
          </div>
        </div>

        {/* 5. Bottom Save / Submission Action Bar */}
        <div
          className="rounded-2xl p-4 sm:p-6 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 transition-all"
          style={{
            backgroundColor: partnerColors.surface,
            borderColor: partnerColors.border,
          }}
        >
          <div className="text-center sm:text-left space-y-0.5">
            <h4 className="text-sm font-black" style={{ color: partnerColors.dark }}>
              Submit KYC for Compliance Audit?
            </h4>
            <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
              Our compliance desk typically reviews and clears submitted records within 24 hours.
            </p>
          </div>

          <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-4 sm:px-5.5 rounded-xl text-xs sm:text-[13px] font-bold sm:font-extrabold tracking-tight font-jakarta cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 w-full min-[480px]:w-auto group border"
              style={{
                backgroundColor: partnerColors.dark,
                borderColor: partnerColors.accentBorder,
                color: partnerColors.textInverse,
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <span className="text-amber-300">Submitting Documents...</span>
                </>
              ) : (
                <>
                  <Save
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.25] transition-colors group-hover:scale-105"
                    style={{ color: partnerColors.accent }}
                  />
                  <span className="group-hover:text-amber-300 transition-colors">
                    Submit KYC Documents
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Floating Success Toast */}
      {showSuccessToast && (
        <div
          className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-2xl border text-xs sm:text-sm font-bold max-w-md mx-auto sm:mx-0"
          style={{
            backgroundColor: partnerColors.dark,
            borderColor: partnerColors.borderFocus,
            color: partnerColors.textInverse,
          }}
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>KYC documents submitted successfully for compliance review!</span>
        </div>
      )}
    </div>
  );
};
