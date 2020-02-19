import React from 'react';

import {useQuery, graphql} from '@animavita/relay';
import {LoadingBottomBar} from '@animavita/ui/core';

import {BottomBarQuery} from './__generated__/BottomBarQuery.graphql';

const BottomBar: React.FC = () => {
  const {props} = useQuery<BottomBarQuery>(
    graphql`
      query BottomBarQuery {
        __typename
        showBottomBar
      }
    `,
    {},
    {fetchPolicy: 'store-only'},
  );

  if (!props || !props.showBottomBar) return null;

  return <LoadingBottomBar show={props.showBottomBar} />;
};

export default BottomBar;
