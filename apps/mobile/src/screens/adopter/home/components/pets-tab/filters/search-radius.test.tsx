import React from 'react';

import { SearchRadius } from './search-radius';

import { screen, fireEvent, renderWithProviders } from '@/test/test-utils';

describe('SearchRadius', () => {
  it('renders label and current radius value', () => {
    renderWithProviders(<SearchRadius currentRadius={20} onChange={jest.fn()} />);

    expect(screen.getByText('Raio de busca')).toBeVisible();
    expect(screen.getByText('20 km')).toBeVisible();
    expect(screen.getByText('5 km')).toBeVisible();
    expect(screen.getByText('100 km')).toBeVisible();
  });

  it('calls onChange and updates displayed value when slider changes', () => {
    const onChange = jest.fn();
    renderWithProviders(<SearchRadius currentRadius={20} onChange={onChange} />);

    const slider = screen.getByLabelText('Raio de busca');
    fireEvent(slider, 'valueChange', 50);

    expect(onChange).toHaveBeenCalledWith(50);
    expect(screen.getByText('50 km')).toBeVisible();
  });

  it('updates displayed value when currentRadius prop changes', () => {
    const onChange = jest.fn();
    renderWithProviders(<SearchRadius currentRadius={20} onChange={onChange} />);

    expect(screen.getByText('20 km')).toBeVisible();

    renderWithProviders(<SearchRadius currentRadius={35} onChange={onChange} />);

    expect(screen.getByText('35 km')).toBeVisible();
  });
});
