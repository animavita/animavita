import { act, fireEvent, renderHook } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { useGeolocation } from '.';
import { getLocationModuleMock } from './fixtures/mocks/location';
import GetLocation from '../../screens/get-location/get-location.screen';
import { renderWithProviders } from '../../test/test-utils';

jest.mock('expo-location');

describe('useGeolocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when something goes wrong when trying to get the user's location", () => {
    it('shows error alert when user do not grant location permission', async () => {
      const { denyPermissions, enableGPS } = getLocationModuleMock();

      denyPermissions();
      enableGPS();

      const errorMessageText =
        'A sua localização é realmente necessária para uma melhor experiência no app.';
      const alertTitle = 'Error';

      jest.spyOn(Alert, 'alert');

      const { getByText } = renderWithProviders(<GetLocation />);

      const button = getByText(/compartilhar minha localização/i);

      await act(() => {
        fireEvent.press(button);
      });

      expect(Alert.alert).toHaveBeenCalledWith(alertTitle, errorMessageText, [
        { onPress: expect.any(Function), style: 'cancel', text: 'Go to settings' },
      ]);
    });

    it('shows error alert when user do not have the GPS turned on', async () => {
      const { grantPermissions, disableGPS } = getLocationModuleMock();

      disableGPS();
      grantPermissions();

      const errorMessageText = 'Por favor, verifique se o seu GPS está habilitado!';
      const alertTitle = 'Error';

      jest.spyOn(Alert, 'alert');

      const { getByText } = renderWithProviders(<GetLocation />);

      const button = getByText(/compartilhar minha localização/i);

      await act(() => {
        fireEvent.press(button);
      });

      expect(Alert.alert).toHaveBeenCalledWith(alertTitle, errorMessageText, [
        { onPress: expect.any(Function), style: 'cancel' },
      ]);
    });
  });

  describe('when permistions are granted and GPS is turned on ', () => {
    it('returns the current location of the user', async () => {
      const { result } = renderHook(() => useGeolocation());
      const { mockedAddress, responseWithAddress, grantPermissions, enableGPS } =
        getLocationModuleMock();

      enableGPS();
      grantPermissions();
      responseWithAddress();

      await act(() => {
        result.current.getLocation();
      });

      expect(result.current.address).toEqual(mockedAddress);
      expect(result.current.address).not.toBeFalsy();
    });

    it('returns a undefined value if there is no address', async () => {
      const { result } = renderHook(() => useGeolocation());
      const { responseWithoutAddress, grantPermissions, enableGPS } = getLocationModuleMock();

      enableGPS();
      grantPermissions();
      responseWithoutAddress();

      await act(() => {
        result.current.getLocation();
      });

      expect(result.current.address).toBeFalsy();
    });
  });
});
