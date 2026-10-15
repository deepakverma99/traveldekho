'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import {
  Plane,
  Sparkles,
  Send,
  Phone,
  Mail,
  Lock,
} from 'lucide-react';
import { FOOTER_POLICIES, PAYMENT_METHODS, CURRENT_YEAR } from './footerData';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 20;
  width: 100%;
  background-color: ${colors.darkBg};
  color: ${colors.white};
  font-family: ${typography.fonts.sans};
  margin-top: 0;
  border-top: 1px solid ${colors.gray[800]};
  isolation: isolate;
`;

const AppDownloadBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: ${colors.darkCard};
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid ${colors.gray[800]};
  height: 100%;
  justify-content: center;
`;

const NewsletterInput = styled.input`
  width: 100%;
  height: 3.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding-left: 1.25rem;
  padding-right: 6.5rem;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.white};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[600]};
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: ${colors.amber[400]};
  }
`;

const NewsletterSubmitButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  height: 2.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 10px;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 10px 15px -3px rgba(251, 191, 36, 0.2);

  &:hover {
    background-color: ${colors.white};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ContactIconBox = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.amber[500]};
  flex-shrink: 0;
  transition: all 0.2s ease;

  svg {
    width: 1rem;
    height: 1rem;
    display: block;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid ${colors.gray[800]};
  background-color: ${colors.black};
  width: 100%;
  padding: 1.25rem 1.5rem;
`;

const FooterContent: React.FC = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (pathname?.startsWith('/trip-partner')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <FooterWrapper className="isolate">
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
              <AppDownloadBox>
                <div>
                  <h4 className="text-white font-bold text-lg leading-tight">Get the TravelDekho App</h4>
                  <p className="text-gray-400 text-xs mt-1">Book trips seamlessly on the go.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    aria-label="Download on the App Store"
                    className="w-full bg-white hover:bg-gray-200 text-black rounded-lg h-10 flex items-center justify-center transition-colors shadow-sm"
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
                    className="w-full bg-white hover:bg-gray-200 text-black rounded-lg h-10 flex items-center justify-center transition-colors shadow-sm"
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
              </AppDownloadBox>
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
                  <NewsletterInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    aria-label="Email address for exclusive deals"
                    required
                  />
                  <NewsletterSubmitButton type="submit" disabled={!email.trim()}>
                    <div className="flex items-center gap-2">
                      Join
                      <Send className="w-3 h-3" aria-hidden="true" />
                    </div>
                  </NewsletterSubmitButton>
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
              <h2
                className="font-bold text-sm tracking-wide uppercase mb-2"
                style={{ color: colors.brandYellow }}
              >
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
                  <ContactIconBox className="group-hover:bg-amber-500 group-hover:text-black">
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </ContactIconBox>
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
                  <ContactIconBox className="group-hover:bg-amber-500 group-hover:text-black">
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </ContactIconBox>
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
      <BottomBar>
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
      </BottomBar>
    </FooterWrapper>
  );
};

export const Footer: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <FooterContent />
    </Suspense>
  );
};
