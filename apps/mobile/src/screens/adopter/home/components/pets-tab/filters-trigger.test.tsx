import React from 'react';

import { FiltersTrigger } from './filters-trigger';

import { screen, renderWithProviders } from '@/test/test-utils';

describe('FiltersTrigger', () => {
  it('renders filter button with translated label', () => {
    const onPress = jest.fn();
    renderWithProviders(<FiltersTrigger onPress={onPress} appliedCount={0} />);

    const button = screen.getByRole('button', { name: 'Filtrar' });
    expect(button).toBeVisible();
  });

  it('shows badge when there are applied filters', () => {
    const onPress = jest.fn();
    renderWithProviders(<FiltersTrigger onPress={onPress} appliedCount={3} />);

    expect(screen.getByText('3')).toBeVisible();
  });

  it('does not show badge when appliedCount is 0', () => {
    const onPress = jest.fn();
    renderWithProviders(<FiltersTrigger onPress={onPress} appliedCount={0} />);

    expect(screen.queryByText('0')).not.toBeOnTheScreen();
  });

  it('calls onPress when the button is pressed', async () => {
    const onPress = jest.fn();
    const { user } = renderWithProviders(<FiltersTrigger onPress={onPress} appliedCount={2} />);

    const button = screen.getByRole('button', { name: 'Filtrar' });
    await user.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
