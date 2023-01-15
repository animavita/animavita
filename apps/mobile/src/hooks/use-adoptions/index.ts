import { useQuery } from '@tanstack/react-query';

import { getAllAdoptions } from '../../services/adoptions';
import { QUERY_KEYS } from '../../services/query-keys';

export default function useAdoptions() {
  const queryResult = useQuery({
    queryKey: [QUERY_KEYS.getAllAdoptions],
    queryFn: getAllAdoptions,
  });

  return {
    ...queryResult,
    adoptions: queryResult.data?.data,
  };
}
