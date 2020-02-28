import React from 'react';

import {useLazyLoadQuery, graphql} from '@animavita/relay';
import {LoadingBottomBar} from '@animavita/ui/core';

import {BottomBarQuery} from './__generated__/BottomBarQuery.graphql';

const BottomBar: React.FC = () => {
  const {showBottomBar} = useLazyLoadQuery<BottomBarQuery>(
    graphql`
      query BottomBarQuery {
        __typename
        showBottomBar
      }
    `,
    {},
    {fetchPolicy: 'store-only'},
  );

  return <LoadingBottomBar show={showBottomBar} />;
};

export default BottomBar;
