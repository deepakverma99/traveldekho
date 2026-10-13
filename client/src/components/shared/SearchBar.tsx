'use client';

import styled from 'styled-components';
import { Search } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const SearchContainer = styled.form`
  display: none;
  align-items: center;
  margin-left: 1rem;
  flex: 1;
  max-width: 24rem;

  @media (min-width: 768px) {
    display: flex;
  }

  @media (min-width: 1024px) {
    margin-left: 2rem;
    max-width: 28rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 2.5rem;
  font-size: ${typography.sizes.sm};
  color: ${colors.gray[600]};
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(253, 230, 138, 0.6);
  border-radius: 9999px;
  outline: none;
  transition: all 0.2s;
  font-weight: ${typography.weights.medium};

  &::placeholder {
    color: ${colors.gray[400]};
  }

  &:focus {
    border-color: ${colors.amber[400]};
    box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 9999px;
  transition: background-color 0.2s;
  border: 1px solid rgba(253, 230, 138, 0.4);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: ${colors.amber[400]};
    
    svg {
      color: ${colors.white};
    }
  }
  
  svg {
    transition: color 0.2s;
  }
`;

export const SearchBar = () => {
  return (
    <SearchContainer>
      <InputWrapper>
        <StyledInput placeholder="Search your next Destination" type="text" name="q" autoComplete="off" />
        <SearchButton type="submit">
          <Search className="w-4 h-4 text-gray-400" />
        </SearchButton>
      </InputWrapper>
    </SearchContainer>
  );
};
