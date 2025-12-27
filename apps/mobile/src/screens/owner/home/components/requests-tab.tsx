import { AdoptionRequestResponse, AdoptionRequestStatus } from '@animavita/types';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Box, Center, HStack, Icon, Spinner, Text, VStack, Badge, Pressable } from 'native-base';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { useNavigation } from '@/navigation/use-navigation';
import { getMyAdoptionRequests } from '@/services/adoptions';
import { QUERY_KEYS } from '@/services/query-keys';

const RequestsTab = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS.getMyAdoptionRequests],
    queryFn: getMyAdoptionRequests,
  });

  const requests = data?.data;
  const { navigate } = useNavigation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case AdoptionRequestStatus.ACCEPTED:
        return 'success';
      case AdoptionRequestStatus.DENIED:
        return 'danger';
      default:
        return 'warning';
    }
  };

  const getStatusLabel = (status: string) => {
    return t(`ADOPTION_REQUESTS.OWNER.CARD.STATUS_${status.toUpperCase()}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleRequestPress = (request: AdoptionRequestResponse) => {
    navigate('AdoptionRequestDetail', { request });
  };

  const renderRequestCard = ({ item }: { item: AdoptionRequestResponse }) => (
    <Pressable onPress={() => handleRequestPress(item)}>
      <Box
        bg="white"
        borderRadius="xl"
        shadow={2}
        overflow="hidden"
        borderWidth={1}
        borderColor="coolGray.200"
        mb={3}
      >
        <VStack space={3} p={4}>
          <HStack justifyContent="space-between" alignItems="flex-start">
            <VStack flex={1} space={1}>
              <Text fontSize="lg" fontWeight="bold" color="primary.600">
                {item.pet.name}
              </Text>
              <Text fontSize="sm" color="coolGray.500">
                {item.pet.breed}
              </Text>
              <HStack space={2} alignItems="center" mt={1}>
                <Icon as={Ionicons} name="person-outline" size="xs" color="coolGray.400" />
                <Text fontSize="xs" color="coolGray.600">
                  {t('ADOPTION_REQUESTS.OWNER.CARD.REQUESTED_BY')}: {item.adopter.name}
                </Text>
              </HStack>
            </VStack>
            <Badge colorScheme={getStatusColor(item.status)} variant="solid" borderRadius="md">
              {getStatusLabel(item.status)}
            </Badge>
          </HStack>

          <HStack space={2} alignItems="center">
            <Icon as={Ionicons} name="paw" size="xs" color="coolGray.400" />
            <Text fontSize="xs" color="coolGray.500">
              {t(`MY_PETS_SCREEN.PET_TYPE.${item.pet.type.toUpperCase()}`)}
            </Text>
          </HStack>

          <HStack space={2} alignItems="center">
            <Icon as={Ionicons} name="calendar-outline" size="xs" color="coolGray.400" />
            <Text fontSize="xs" color="coolGray.500">
              {t('ADOPTION_REQUESTS.OWNER.CARD.REQUESTED_ON')}: {formatDate(item.createdAt)}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="primary.500" />
        <Text mt={4} color="coolGray.500">
          {t('ADOPTION_REQUESTS.LOADING')}
        </Text>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center flex={1} px={6}>
        <Icon as={Ionicons} name="alert-circle-outline" size="xl" color="danger.500" mb={4} />
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={2}>
          {t('ADOPTION_REQUESTS.ERROR')}
        </Text>
        <Pressable onPress={() => refetch()}>
          <Text color="primary.600" fontWeight="medium">
            {t('ADOPTION_REQUESTS.RETRY')}
          </Text>
        </Pressable>
      </Center>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <Center flex={1} px={6}>
        <Icon as={Ionicons} name="document-text-outline" size="xl" color="coolGray.400" mb={4} />
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={2}>
          {t('ADOPTION_REQUESTS.OWNER.EMPTY_LIST')}
        </Text>
        <Text fontSize="sm" color="coolGray.500" textAlign="center">
          {t('ADOPTION_REQUESTS.OWNER.EMPTY_LIST_DESCRIPTION')}
        </Text>
      </Center>
    );
  }

  return (
    <Box flex={1}>
      <FlatList
        data={requests}
        renderItem={renderRequestCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default RequestsTab;
