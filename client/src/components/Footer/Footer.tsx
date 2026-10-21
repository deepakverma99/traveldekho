'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Plane,
  Sparkles,
  Send,
  Phone,
  Mail,
  Lock,
} from 'lucide-react';
import {
  useAppDispatch,
  useAppSelector,
  selectNewsletterEmail,
  selectIsNewsletterSubscribed,
  selectNewsletterLoading,
  selectCanSubmitNewsletter,
  setNewsletterEmail,
  subscribeStart,
  subscribeSuccess,
} from '@/redux';
import { FOOTER_POLICIES, PAYMENT_METHODS, CURRENT_YEAR } from './footerData';

const FooterContent: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectNewsletterEmail);
  const isSubscribed = useAppSelector(selectIsNewsletterSubscribed);
  const isLoading = useAppSelector(selectNewsletterLoading);
  const canSubmit = useAppSelector(selectCanSubmitNewsletter);

  if (pathname?.startsWith('/trip-partner')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      dispatch(subscribeStart());
      dispatch(subscribeSuccess());
    }
  };

  return (
    <footer className="relative z-20 w-full bg-dark-bg text-white font-sans mt-0 border-t border-gray-800 isolate">
      <div className="w-full px-6 md:px-12 pt-10 md:pt-12 pb-12 md:pb-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-4">
          {/* Column 1: Brand & App Download */}
          <div className="lg:col-span-4 flex flex-col items-start lg:pr-8 space-y-8">
            <div>
              <Link
                href="/"
                title="Go to Homepage"
                className="flex items-center gap-2 group/logo mb-5 transition-all hover:scale-[1.02] active:scale-95 duration-300 w-fit"
              >
                <div className="relative h-12 w-36 invert brightness-0 filter drop-shadow-sm group-hover/logo:drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)] transition-all duration-300">
                  <Image
                    src="/TravelDekho-logo.png"
                    alt="TravelDekho"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 150px, 200px"
                  />
                </div>
                <Plane
                  className="w-4 h-4 text-amber-500 opacity-0 -translate-x-4 group-hover/logo:opacity-100 group-hover/logo:translate-x-0 transition-all duration-500 ease-out"
                  aria-hidden="true"
                />
              </Link>
              <p className="text-[#888888] text-sm leading-relaxed mb-6 max-w-[280px]">
                Find your dream trip, explore beautiful destinations, and book premium experiences with ease. Your modern travel companion.
              </p>
              <div className="flex items-center gap-3" />
            </div>

            <div className="w-full max-w-[320px]">
              <div className="flex flex-col gap-5 bg-dark-card p-6 rounded-2xl border border-gray-800 h-full justify-center">
                <div>
                  <h4 className="text-white font-bold text-lg leading-tight">Get the TravelDekho App</h4>
                  <p className="text-gray-400 text-xs mt-1">Book trips seamlessly on the go.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    aria-label="Download on the App Store"
                    className="w-full bg-white hover:bg-gray-200 text-black rounded-lg h-10 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="black" className="mr-1">
                      <path d="M15.4 12.3 c 0 -2.4 2 -3.3 2 -3.3 c -1.1 -1.6 -2.8 -1.8 -3.4 -1.9 c -1.5 -0.1 -2.9 0.9 -3.7 0.9 c -0.7 0 -1.9 -0.9 -3.1 -0.9 c -1.6 0 -3.1 0.9 -3.9 2.3 c -1.7 3 -0.4 7.4 1.2 9.8 c 0.8 1.2 1.7 2.5 3 2.5 c 1.2 -0.1 1.7 -0.8 3.1 -0.8 c 1.4 0 1.9 0.8 3.2 0.8 c 1.3 0 2.2 -1.4 2.9 -2.5 c 0.9 -1.3 1.2 -2.5 1.2 -2.5 c -0.1 0 -2.3 -0.9 -2.3 -3.4" />
                      <path d="M12.6 7.6 c 0.1 -0.1 0.1 -0.1 0.1 -0.2 c 0.7 -0.9 1 -2 0.8 -3.2 c -1 0.1 -2.3 0.7 -3 1.6 c -0.6 0.7 -1.2 1.9 -1 2.9 c 1 0.1 2.3 -0.4 3.1 -1.1" />
                    </svg>
                    <span className="font-semibold text-xs sm:text-sm">App Store</span>
                  </button>

                  <button
                    type="button"
                    aria-label="Download on Google Play Store"
                    className="w-full bg-white hover:bg-gray-200 text-black rounded-lg h-10 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-1 -ml-1">
                      <path d="M3 4l10 10L3 24V4z" fill="#4CAF50" />
                      <path d="M3 4l12 7-2 3L3 4z" fill="#FFC107" />
                      <path d="M13 11l4 2.5-4 2.5v-5z" fill="#F44336" />
                      <path d="M3 24l12-7-2-3L3 24z" fill="#2196F3" />
                    </svg>
                    <span className="font-semibold text-xs sm:text-sm">Play Store</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Exclusive Deals */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" aria-hidden="true" />
                <h2 className="text-sm font-black text-white uppercase tracking-widest">Exclusive Deals</h2>
              </div>
              <p className="text-[#888888] text-xs font-medium leading-relaxed max-w-[280px]">
                Get the most beautiful travel stories and deals delivered to your inbox every week.
              </p>
              <form noValidate onSubmit={handleSubscribe} className="max-w-sm">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => dispatch(setNewsletterEmail(e.target.value))}
                    placeholder="ENTER YOUR EMAIL"
                    aria-label="Email address for exclusive deals"
                    required
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-5 pr-26 text-xs font-black uppercase tracking-wider text-white outline-none transition-all placeholder:text-gray-600 focus:bg-white/10 focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    disabled={!canSubmit || isLoading}
                    className="absolute right-2 top-2 h-10 px-6 bg-amber-400 hover:bg-black text-white font-black uppercase tracking-wider text-[10px] rounded-xl border-0 cursor-pointer transition-all shadow-[0_10px_15px_-3px_rgba(251,191,36,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-2">
                      {isLoading ? 'Joining...' : 'Join'}
                      <Send className="w-3 h-3" aria-hidden="true" />
                    </div>
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-amber-400 text-xs font-semibold mt-2">
                    Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Column 3: Policies */}
          <div className="lg:col-span-2 lg:pl-4">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-sm tracking-wide uppercase mb-2 text-primary">
                Policies
              </h2>
              <ul className="flex flex-col gap-3">
                {FOOTER_POLICIES.map((policy) => (
                  <li key={policy.href}>
                    <Link
                      href={policy.href}
                      className="text-[#999999] hover:text-white transition-colors text-sm"
                    >
                      {policy.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-black text-white uppercase tracking-tighter mb-6">Contact</h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919899558944"
                  className="flex items-center gap-3.5 group transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-amber-500 shrink-0 transition-all group-hover:bg-amber-500 group-hover:text-black [&>svg]:w-4 [&>svg]:h-4">
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </div>
                  <span className="text-[#888888] text-xs font-bold group-hover:text-white transition-colors flex-1 break-all">
                    +91 9899558944
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:business.traveldekho@gmail.com"
                  className="flex items-center gap-3.5 group transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-amber-500 shrink-0 transition-all group-hover:bg-amber-500 group-hover:text-black [&>svg]:w-4 [&>svg]:h-4">
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </div>
                  <span className="text-[#888888] text-xs font-bold group-hover:text-white transition-colors flex-1 break-all">
                    business.traveldekho@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Bottom Badges Row: 100% Encrypted & Payment Methods */}
          <div className="col-span-1 md:col-span-2 lg:col-span-12 flex flex-col md:flex-row w-full items-center justify-center md:justify-between gap-5 pt-8">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-green-500/30 rounded-lg shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <Lock className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
              <span className="text-green-500 text-xs font-black tracking-widest uppercase">
                100% Encrypted
              </span>
            </div>

            <div className="flex items-center gap-5">
              {PAYMENT_METHODS.map((method) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={method.name}
                  alt={method.name}
                  loading="lazy"
                  width={40}
                  height={20}
                  decoding="async"
                  className="h-4 w-auto object-contain md:h-5"
                  src={method.src}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Sub-footer */}
      <div className="border-t border-gray-800 bg-black w-full py-5 px-6">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs text-center md:text-left">
            TravelDekho &copy; <span>{CURRENT_YEAR}</span> All Rights Reserved
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link
              href="/admin-login"
              className="hover:text-amber-400 text-gray-400 transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <FooterContent />
    </Suspense>
  );
};
