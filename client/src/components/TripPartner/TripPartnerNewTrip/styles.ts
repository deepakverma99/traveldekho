'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export const FormRoot = styled.div`
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem 1rem 4rem;
  font-family: ${typography.fonts.jakarta};
  min-width: 0;

  @media (min-width: 640px) {
    padding: 2rem 1.5rem 5rem;
  }
`;

export const BackNavButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 9999px;
  color: ${colors.gray[600]};
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.gray[50]};
    color: ${colors.gray[900]};
    border-color: ${colors.gray[300]};
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 2.25rem;
`;

export const MainTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  letter-spacing: -0.025em;
  line-height: 1.2;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const AmberText = styled.span`
  color: ${colors.amber[500]};
`;

export const Subtitle = styled.p`
  margin-top: 0.375rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${colors.gray[500]};
  letter-spacing: -0.01em;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 0.9375rem;
  }
`;

/* Stepper Progress Bar */
export const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 38rem;
  margin: 0 auto 2.5rem auto;
  position: relative;
  padding: 0 0.5rem;
`;

export const StepTrackLine = styled.div<{ $isCompleted: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ $isCompleted }) =>
    $isCompleted ? colors.gold : colors.gray[200]};
  margin: 0 0.5rem;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
`;

export const StepNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
`;

export const StepCircle = styled.div<{
  $isActive: boolean;
  $isCompleted: boolean;
}>`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.8125rem;
  transition: all 0.25s ease;
  background-color: ${({ $isActive, $isCompleted }) =>
    $isActive
      ? colors.gold
      : $isCompleted
      ? colors.gray[900]
      : colors.white};
  color: ${({ $isActive, $isCompleted }) =>
    $isActive
      ? colors.black
      : $isCompleted
      ? colors.white
      : colors.gray[300]};
  border: 1px solid
    ${({ $isActive, $isCompleted }) =>
      $isActive
        ? colors.gold
        : $isCompleted
        ? colors.gray[900]
        : colors.gray[200]};
  box-shadow: ${({ $isActive }) =>
    $isActive
      ? '0 6px 16px -2px rgba(250, 203, 43, 0.45)'
      : '0 1px 3px rgba(0, 0, 0, 0.05)'};

  @media (min-width: 640px) {
    width: 2.625rem;
    height: 2.625rem;
    font-size: 0.9375rem;
  }
`;

export const StepNodeLabel = styled.span<{ $isActive: boolean }>`
  margin-top: 0.5rem;
  font-size: 0.625rem;
  font-weight: ${({ $isActive }) => ($isActive ? '900' : '700')};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $isActive }) => ($isActive ? colors.gray[900] : colors.gray[500])};
  transition: color 0.25s ease;

  @media (min-width: 640px) {
    font-size: 0.6875rem;
  }
`;

/* Form Card */
export const CardContainer = styled(motion.div)`
  background-color: ${colors.white};
  border-radius: 1.5rem;
  border: 1px solid rgba(245, 158, 11, 0.12);
  box-shadow: 0 8px 30px -4px rgba(115, 92, 0, 0.06),
    0 1px 4px 0 rgba(0, 0, 0, 0.02);
  padding: 1.75rem 1.25rem;
  min-height: 26rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 640px) {
    border-radius: 2rem;
    padding: 2.5rem 2.25rem;
  }

  @media (min-width: 768px) {
    border-radius: 2.25rem;
    padding: 3rem 2.75rem;
  }
`;

export const StepContentArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 640px) {
    gap: 1.75rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const FieldLabel = styled.label`
  font-size: 0.71875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.gray[700]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FieldLabelRow = styled.div`
  font-size: 0.71875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.gray[700]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

export const FieldHint = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${colors.gray[400]};
  text-transform: none;
  letter-spacing: normal;
`;

export const RequiredAsterisk = styled.span`
  color: ${colors.red[500]};
  margin-left: 0.2rem;
  font-weight: 700;
  display: inline;
`;

export const FieldInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  background-color: ${({ $hasError }) => ($hasError ? '#fef2f2' : '#f8fafc')};
  border: 2px solid ${({ $hasError }) => ($hasError ? colors.red[400] : 'transparent')};
  border-radius: 1rem;
  padding: 0.9375rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${colors.gray[900]};
  font-family: ${typography.fonts.jakarta};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
    font-weight: 500;
  }

  &:hover {
    background-color: ${({ $hasError }) => ($hasError ? '#fee2e2' : '#f1f5f9')};
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${({ $hasError }) => ($hasError ? colors.red[500] : colors.gold)};
    box-shadow: 0 0 0 4px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(250, 203, 43, 0.2)'};
  }
`;

export const FieldErrorText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.red[500]};
  letter-spacing: -0.01em;

  svg {
    width: 0.8125rem;
    height: 0.8125rem;
    flex-shrink: 0;
  }
`;

export const ToggleSwitch = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 2.125rem;
  height: 1.1875rem;
  border-radius: 9999px;
  background-color: ${({ $isActive }) => ($isActive ? colors.gold : colors.gray[300])};
  border: none;
  cursor: pointer;
  padding: 0.125rem;
  transition: background-color 0.25s ease;
  outline: none;
  flex-shrink: 0;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${colors.gold};
  }

  span {
    display: block;
    width: 0.9375rem;
    height: 0.9375rem;
    border-radius: 9999px;
    background-color: ${colors.white};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    transform: ${({ $isActive }) =>
      $isActive ? 'translateX(0.9375rem)' : 'translateX(0)'};
    transition: transform 0.25s ease;
  }
`;

export const RemovableInputWrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ $hasError }) => ($hasError ? '#fef2f2' : '#f8fafc')};
  border: 2px solid ${({ $hasError }) => ($hasError ? colors.red[400] : 'transparent')};
  border-radius: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $hasError }) => ($hasError ? '#fee2e2' : '#f1f5f9')};
  }

  &:focus-within {
    background-color: ${colors.white};
    border-color: ${({ $hasError }) => ($hasError ? colors.red[500] : colors.gold)};
    box-shadow: 0 0 0 4px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(250, 203, 43, 0.2)'};
  }

  input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 0.9375rem 3.5rem 0.9375rem 1.25rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${colors.gray[900]};
    font-family: ${typography.fonts.jakarta};

    &::placeholder {
      color: ${colors.gray[400]};
      font-weight: 500;
    }
  }
`;

export const DeleteIconButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background-color: #fee2e2;
  color: ${colors.red[500]};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fecaca;
    color: ${colors.red[700]};
    transform: translateY(-50%) scale(1.04);
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const AddItemLinkButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  color: ${colors.amber[500]};
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: ${colors.amber[600]};
    transform: translateY(-1px);
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
    stroke-width: 2.5;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.125rem;
    height: 1.125rem;
    color: ${colors.gray[500]};
    pointer-events: none;
    transition: transform 0.2s ease;
  }
`;

export const FieldSelect = styled.select`
  width: 100%;
  background-color: #f8fafc;
  border: 2px solid transparent;
  border-radius: 1rem;
  padding: 0.9375rem 2.75rem 0.9375rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${colors.gray[900]};
  font-family: ${typography.fonts.jakarta};
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${colors.gold};
    box-shadow: 0 0 0 4px rgba(250, 203, 43, 0.2);
  }
`;

export const FieldTextarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  background-color: ${({ $hasError }) => ($hasError ? '#fef2f2' : '#f8fafc')};
  border: 2px solid ${({ $hasError }) => ($hasError ? colors.red[400] : 'transparent')};
  border-radius: 1.125rem;
  padding: 1.125rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.6;
  color: ${colors.gray[900]};
  font-family: ${typography.fonts.jakarta};
  outline: none;
  min-height: 8.5rem;
  resize: vertical;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
    font-weight: 500;
  }

  &:hover {
    background-color: ${({ $hasError }) => ($hasError ? '#fee2e2' : '#f1f5f9')};
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${({ $hasError }) => ($hasError ? colors.red[500] : colors.gold)};
    box-shadow: 0 0 0 4px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(250, 203, 43, 0.2)'};
`;

export const ActionFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${colors.gray[100]};
  flex-wrap: wrap;
`;

export const ContinueButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background-color: ${colors.gold};
  color: ${colors.black};
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: ${typography.fonts.jakarta};
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px -4px rgba(250, 203, 43, 0.45);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${colors.amber[400]};
    transform: translateY(-1px);
    box-shadow: 0 10px 24px -4px rgba(250, 203, 43, 0.6);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 2.5;
  }
`;

export const SecondaryActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background-color: #f4f5f7;
  color: ${colors.gray[700]};
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: ${typography.fonts.jakarta};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.gray[200]};
    color: ${colors.black};
  }

  svg {
    width: 0.9375rem;
    height: 0.9375rem;
  }
`;

export const ChipBadge = styled.span<{ $selected?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ $selected }) =>
    $selected ? colors.amber[100] : colors.gray[100]};
  color: ${({ $selected }) =>
    $selected ? colors.amber[900] : colors.gray[700]};
  border: 1px solid
    ${({ $selected }) =>
      $selected ? colors.amber[400] : 'transparent'};

  &:hover {
    background-color: ${colors.amber[50]};
    border-color: ${colors.amber[300]};
  }
`;

export const SuggestionChip = styled.button<{
  $selected?: boolean;
  $variant?: 'inclusion' | 'exclusion' | 'default';
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.25;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;

  ${({ $selected, $variant }) => {
    if ($variant === 'inclusion') {
      return $selected
        ? `
          background-color: ${colors.green[100]};
          color: ${colors.green[900]};
          border: 1px solid ${colors.green[500]};
          box-shadow: 0 1px 2px rgba(22, 163, 74, 0.1);
          &:hover {
            background-color: ${colors.green[200]};
          }
        `
        : `
          background-color: ${colors.white};
          color: ${colors.gray[700]};
          border: 1px solid ${colors.gray[200]};
          &:hover {
            background-color: ${colors.green[50]};
            border-color: ${colors.green[300]};
            color: ${colors.green[800]};
          }
        `;
    }
    if ($variant === 'exclusion') {
      return $selected
        ? `
          background-color: ${colors.red[100]};
          color: ${colors.red[900]};
          border: 1px solid ${colors.red[400]};
          box-shadow: 0 1px 2px rgba(220, 38, 38, 0.1);
          &:hover {
            background-color: ${colors.red[200]};
          }
        `
        : `
          background-color: ${colors.white};
          color: ${colors.gray[700]};
          border: 1px solid ${colors.gray[200]};
          &:hover {
            background-color: ${colors.red[50]};
            border-color: ${colors.red[300]};
            color: ${colors.red[800]};
          }
        `;
    }
    return $selected
      ? `
        background-color: ${colors.amber[100]};
        color: ${colors.amber[900]};
        border: 1px solid ${colors.amber[400]};
      `
      : `
        background-color: ${colors.gray[100]};
        color: ${colors.gray[700]};
        border: 1px solid transparent;
        &:hover {
          background-color: ${colors.amber[50]};
          border-color: ${colors.amber[300]};
        }
      `;
  }}
`;

export const SuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const SuggestionsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${colors.gray[500]};
`;

export const ValidationAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${colors.red[50]};
  border: 1px solid ${colors.red[200]};
  border-radius: 0.875rem;
  color: ${colors.red[700]};
  font-size: 0.8125rem;
  font-weight: 700;
  margin-bottom: 1rem;

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;

/* Input with inline action button (FILL button) */
export const InputWithButtonWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const FillButtonWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 10;
`;

export const FillButton = styled(motion.button)`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.375rem 0.875rem;
  background-color: ${colors.gold};
  color: ${colors.black};
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: ${typography.fonts.jakarta};
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(250, 203, 43, 0.45);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: ${colors.amber[400]};
    box-shadow: 0 4px 12px rgba(250, 203, 43, 0.6);
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
    stroke-width: 2.5;
  }
`;

/* Category Multiselect Styled Components */
export const MultiselectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const MultiselectBox = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 3.375rem;
  background-color: ${({ $isOpen }) => ($isOpen ? colors.white : '#f8fafc')};
  border: 2px solid ${({ $isOpen }) => ($isOpen ? colors.gold : 'transparent')};
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? '0 0 0 4px rgba(250, 203, 43, 0.2)' : 'none'};
  border-radius: 1rem;
  padding: 0 2.5rem 0 0.875rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isOpen }) => ($isOpen ? colors.white : '#f1f5f9')};
  }
`;

export const CategoryChipsScroll = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100%;
  padding-right: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MultiselectPlaceholder = styled.span`
  color: ${colors.gray[400]};
  font-size: 0.9375rem;
  font-weight: 500;
  user-select: none;
  white-space: nowrap;
`;

export const CategoryPill = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.625rem;
  background-color: ${colors.amber[100]};
  color: ${colors.amber[900]};
  border: 1px solid ${colors.amber[300]};
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  transition: all 0.15s ease;
  user-select: none;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${colors.amber[800]};
    cursor: pointer;
    padding: 0;
    transition: color 0.15s ease;

    &:hover {
      color: ${colors.red[600]};
    }

    svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
`;

export const MultiselectDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.375rem);
  left: 0;
  right: 0;
  z-index: 50;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 1rem;
  box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.15),
    0 8px 10px -6px rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
  max-height: 17rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MultiselectList = styled.div`
  overflow-y: auto;
  max-height: 12.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding-right: 0.25rem;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray[300]};
    border-radius: 9999px;
  }
`;

export const MultiselectOption = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5625rem 0.875rem;
  border-radius: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ $selected }) => ($selected ? colors.amber[900] : colors.gray[800])};
  background-color: ${({ $selected }) =>
    $selected ? colors.amber[50] : 'transparent'};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${colors.amber[100]};
    color: ${colors.amber[900]};
  }
`;

export const DayExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.5rem;
`;

export const DayExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.25rem;
`;

export const DayExperienceTitle = styled.label`
  font-size: 0.71875rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.gray[700]};
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const AddDayTextButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${colors.amber[500]};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.amber[600]};
    transform: translateY(-1px);
  }
`;

export const DayCardBox = styled.div`
  background-color: ${colors.gray[50]}B3;
  border: 1px solid ${colors.gray[200]};
  border-radius: 1.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.amber[300]};
  }

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

export const DayBadgeSquircle = styled.div`
  min-width: 4.5rem;
  height: 2.75rem;
  padding: 0 0.875rem;
  border-radius: 0.875rem;
  background-color: ${colors.gold};
  color: ${colors.black};
  font-weight: 900;
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(250, 203, 43, 0.35);
`;

export const DaySectionLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.gray[700]};
  margin-bottom: 0.375rem;
`;

export const MealPillButton = styled.button<{ $selected: boolean }>`
  padding: 0.375rem 0.875rem;
  border-radius: 0.75rem;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease;
  background-color: ${({ $selected }) =>
    $selected ? colors.gold : colors.white};
  color: ${({ $selected }) =>
    $selected ? colors.black : colors.gray[400]};
  border: 1px solid
    ${({ $selected }) =>
      $selected ? colors.gold : colors.gray[200]};
  box-shadow: ${({ $selected }) =>
    $selected ? '0 1px 3px rgba(250, 203, 43, 0.35)' : 'none'};

  &:hover {
    border-color: ${({ $selected }) =>
      $selected ? colors.gold : colors.gray[300]};
    color: ${({ $selected }) =>
      $selected ? colors.black : colors.gray[600]};
  }
`;

/* Thumbnail Image URL Field in Step 1 */
export const ThumbnailInputArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  background-color: #f8fafc;
  border: 2px solid transparent;
  border-radius: 1.25rem;
  padding: 1.125rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${colors.gray[900]};
  font-family: ${typography.fonts.jakarta};
  min-height: 5.5rem;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
    font-weight: 500;
  }

  &:hover {
    background-color: #f1f5f9;
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${colors.gold};
    box-shadow: 0 0 0 4px rgba(250, 203, 43, 0.2);
  }
`;

export const CatchphraseTextarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  background-color: ${({ $hasError }) => ($hasError ? '#fef2f2' : '#f8fafc')};
  border: 2px solid ${({ $hasError }) => ($hasError ? colors.red[400] : 'transparent')};
  border-radius: 1.25rem;
  padding: 1.125rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.gray[900]};
  font-family: ${typography.fonts.jakarta};
  min-height: 5.5rem;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
    font-weight: 500;
  }

  &:hover {
    background-color: ${({ $hasError }) => ($hasError ? '#fee2e2' : '#f1f5f9')};
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${({ $hasError }) => ($hasError ? colors.red[500] : colors.gold)};
    box-shadow: 0 0 0 4px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(250, 203, 43, 0.2)'};
  }
`;

export const ThumbnailButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;

  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

export const ThumbnailActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9375rem 1rem;
  background-color: ${colors.gold};
  color: ${colors.black};
  border-radius: 1.125rem;
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  font-family: ${typography.fonts.jakarta};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(250, 203, 43, 0.35);

  &:hover:not(:disabled) {
    background-color: ${colors.amber[400]};
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(250, 203, 43, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

export const ThumbnailPreviewCard = styled.div`
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid ${colors.gray[200]};
  background-color: ${colors.gray[50]};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.875rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    padding: 0.75rem 1rem;
  }
`;

/* Gallery & Reels Styled Components for Step 1 */
export const AddMediaActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.875rem 1.375rem;
  background-color: ${colors.gold};
  color: ${colors.black};
  border-radius: 1rem;
  font-size: 0.8125rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: ${typography.fonts.jakarta};
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(250, 203, 43, 0.35);

  &:hover:not(:disabled) {
    background-color: ${colors.amber[400]};
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(250, 203, 43, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  svg {
    width: 0.9375rem;
    height: 0.9375rem;
  }
`;

export const GalleryGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const GalleryThumbnailCard = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 0.875rem;
  overflow: hidden;
  border: 1px solid ${colors.gray[200]};
  background-color: ${colors.gray[100]};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.amber[400]};
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;

export const AddMediaCardButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  aspect-ratio: 4 / 3;
  border-radius: 0.875rem;
  border: 2px dashed ${colors.amber[400]};
  background-color: ${colors.amber[50]}80;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.amber[100]}80;
    border-color: ${colors.amber[500]};
    transform: translateY(-1px);
  }
`;

export const ReelsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const ReelCardItem = styled.div`
  position: relative;
  aspect-ratio: 9 / 16;
  border-radius: 0.875rem;
  overflow: hidden;
  border: 1px solid ${colors.gray[200]};
  background-color: ${colors.gray[900]};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.amber[400]};
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  }
`;

export const AddReelCardButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  aspect-ratio: 9 / 16;
  border-radius: 0.875rem;
  border: 2px dashed ${colors.amber[400]};
  background-color: ${colors.amber[50]}80;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.amber[100]}80;
    border-color: ${colors.amber[500]};
    transform: translateY(-1px);
  }
`;



