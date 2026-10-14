export interface FooterLink {
  label: string;
  href: string;
}

export interface PaymentPartner {
  name: string;
  src: string;
}

export const FOOTER_POLICIES: FooterLink[] = [
  { label: 'User Agreement', href: '/user-agreement' },
  { label: 'User Privacy Policy', href: '/privacy' },
  { label: 'User Terms & Conditions', href: '/terms' },
  { label: 'Trip Partner Privacy Policy', href: '/trip-partner-privacy' },
  { label: 'Trip Partner Terms & Conditions', href: '/trip-partner-terms' },
];

export const PAYMENT_METHODS: PaymentPartner[] = [
  {
    name: 'Visa',
    src: 'https://v2-statics.s3.ap-south-1.amazonaws.com/corporate-tours/visa.svg',
  },
  {
    name: 'MasterCard',
    src: 'https://v2-statics.s3.ap-south-1.amazonaws.com/corporate-tours/masterCard.svg',
  },
  {
    name: 'RuPay',
    src: 'https://v2-statics.s3.ap-south-1.amazonaws.com/corporate-tours/RuPay+1.svg',
  },
  {
    name: 'UPI',
    src: 'https://v2-statics.s3.ap-south-1.amazonaws.com/corporate-tours/UPI.svg',
  },
];

export const CURRENT_YEAR = '2026';

