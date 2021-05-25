import {renderHook, act} from '@testing-library/react-hooks';

import {changeShowBottomBar} from '../../../utils/bottomBar';
import useAuth from '../useAuth';

jest.mock('@react-navigation/native');
jest.mock('../../../utils/bottomBar');

describe('useAuth hook', () => {
  it('calls changeShowBottomBar with facebook login loading', () => {
    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.changeFbLoginLoadingTo(true);
    });

    expect(changeShowBottomBar).toHaveBeenCalledWith(true);
  });
});
