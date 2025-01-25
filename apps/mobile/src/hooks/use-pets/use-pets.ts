import { useQuery } from '@tanstack/react-query';

import { getMyPets } from '@/services/pets';
import { QUERY_KEYS } from '@/services/query-keys';

const usePets = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.getMyPets],
    queryFn: getMyPets,
  });

  return {
    loading: query.isFetching,
    myPets: query.data?.data || [],
  };
};

export default usePets;
