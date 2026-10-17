'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import {
  StepContentArea,
  FieldLabel,
  FieldHint,
} from './styles';
import { NewTripFormData } from './types';
import { OccupancyPricingField } from './OccupancyPricingField';
import { WhatsAppContactField } from './WhatsAppContactField';
import { DepartureBatchesField } from './DepartureBatchesField';
import { TripCard, TripItem, TripTag } from '@/components/shared';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentPartner } from '@/redux/slices/tripPartnerSlice';

interface StepFinalProps {
  formData: NewTripFormData;
  updateForm: (fields: Partial<NewTripFormData>) => void;
}

export const StepFinal: React.FC<StepFinalProps> = ({
  formData,
  updateForm,
}) => {
  const currentPartner = useAppSelector(selectCurrentPartner);
  const partnerName =
    currentPartner?.displayName ||
    currentPartner?.companyName ||
    'Travel Expert';

  // Compute live starting price from occupancy pricing options if configured
  const pricingInfo = React.useMemo(() => {
    if (formData.occupancyPricing && formData.occupancyPricing.length > 0) {
      const calculated = formData.occupancyPricing.map((opt) => {
        const base = Number(opt.price) || 0;
        const disc = Number(opt.discountPercent) || 0;
        const finalPrice =
          base > 0 ? Math.max(0, Math.round(base * (1 - disc / 100))) : 0;
        return {
          base,
          disc,
          finalPrice,
        };
      });

      const validPrices = calculated.filter((p) => p.finalPrice > 0);
      if (validPrices.length > 0) {
        const minOpt = validPrices.reduce((min, curr) =>
          curr.finalPrice < min.finalPrice ? curr : min
        );
        return {
          price: minOpt.finalPrice,
          originalPrice: minOpt.base,
          discount:
            minOpt.disc > 0
              ? `${minOpt.disc}% OFF`
              : minOpt.base > minOpt.finalPrice
              ? `₹${(minOpt.base - minOpt.finalPrice).toLocaleString()} OFF`
              : '',
        };
      }
    }

    return {
      price: formData.price || 0,
      originalPrice:
        formData.originalPrice > formData.price ? formData.originalPrice : 0,
      discount: formData.discount || '',
    };
  }, [
    formData.occupancyPricing,
    formData.price,
    formData.originalPrice,
    formData.discount,
  ]);

  const dateDisplay = React.useMemo(() => {
    if (formData.datesOnRequest) {
      return 'Date on Request';
    }
    const firstBatch = formData.departureBatches?.[0];
    if (firstBatch?.startDate) {
      return firstBatch.startDate;
    }
    return formData.scheduleDates || 'Every Friday';
  }, [formData.datesOnRequest, formData.departureBatches, formData.scheduleDates]);

  const previewTags = React.useMemo(() => {
    const list: (string | TripTag)[] = [];

    const categories =
      formData.categories && formData.categories.length > 0
        ? formData.categories
        : formData.category
        ? [formData.category]
        : ['Weekend Escapes'];

    categories.forEach((cat) => {
      list.push({ label: cat, variant: 'amber' });
    });

    if (formData.tags && formData.tags.length > 0) {
      formData.tags.forEach((tag) => {
        const clean = tag.replace(/^#/, '');
        if (!categories.includes(clean)) {
          list.push({ label: clean, variant: 'amber' });
        }
      });
    }

    if (formData.difficulty) {
      list.push({ label: formData.difficulty.toLowerCase(), variant: 'blue' });
    }

    return list;
  }, [formData.categories, formData.category, formData.tags, formData.difficulty]);

  const previewTrip: TripItem = React.useMemo(() => {
    const destinationLabel =
      formData.destinationCity && formData.destinationState
        ? `${formData.destinationCity}, ${formData.destinationState}`
        : formData.destination?.trim() || 'Himalayas, India';

    return {
      id: 'preview-trip-id',
      slug: 'preview',
      title: formData.title?.trim() || 'Untitled Journey',
      destination: destinationLabel,
      duration: `${formData.durationNights || 2} nights / ${formData.durationDays || 3} days`,
      image: formData.image || '/trips/zanskar.png',
      price: pricingInfo.price,
      originalPrice:
        pricingInfo.originalPrice > pricingInfo.price
          ? pricingInfo.originalPrice
          : 0,
      discount: pricingInfo.discount,
      date: dateDisplay,
      freeGoodies: true,
      tags: previewTags,
      partner: {
        name: partnerName,
        logo: currentPartner?.avatar || undefined,
        ratingText: '5.0',
      },
    };
  }, [
    formData.destinationCity,
    formData.destinationState,
    formData.destination,
    formData.title,
    formData.durationNights,
    formData.durationDays,
    formData.image,
    pricingInfo,
    dateDisplay,
    previewTags,
    partnerName,
    currentPartner?.avatar,
  ]);

  return (
    <StepContentArea>
      {/* Occupancy & Transportation Pricing (with Per-Option Discount) */}
      <OccupancyPricingField
        options={formData.occupancyPricing || []}
        onChange={(occupancyPricing) => updateForm({ occupancyPricing })}
      />

      {/* WhatsApp Contact Number */}
      <WhatsAppContactField
        value={formData.whatsappNumber || ''}
        onChange={(whatsappNumber) => updateForm({ whatsappNumber })}
      />

      {/* Dates on Request & Departure Dates */}
      <DepartureBatchesField
        datesOnRequest={formData.datesOnRequest ?? false}
        onToggleDatesOnRequest={(datesOnRequest) => updateForm({ datesOnRequest })}
        batches={formData.departureBatches || []}
        onChangeBatches={(departureBatches) => updateForm({ departureBatches })}
      />

      {/* Live Preview Card */}
      <div className="pt-4 border-t border-gray-100">
        <FieldLabel>
          <span className="flex items-center gap-1.5 text-gray-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Live Traveler Preview Card
          </span>
          <FieldHint>How travelers will see your itinerary across TravelDekho</FieldHint>
        </FieldLabel>

        <div
          className="mt-3 inline-block w-full max-w-[280px]"
          onClickCapture={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <TripCard trip={previewTrip} priority={true} />
        </div>
      </div>
    </StepContentArea>
  );
};


