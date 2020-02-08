import {commitLocalUpdate, Environment} from '@animavita/relay';

export function changeShowBottomBar(value: boolean) {
  commitLocalUpdate(Environment, store => {
    store.getRoot().setValue(value, 'showBottomBar');
  });
}
