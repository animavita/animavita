import { AdoptionRequestResponse, AdoptionRequestStatus } from '@animavita/types';
import { Ionicons } from '@expo/vector-icons';
import { Box, Button, HStack, Icon, Text, VStack, Badge, Divider } from 'native-base';
import { useTranslation } from 'react-i18next';

import PageDelimiter from '@/components/delimiter/delimiter';
import SafeArea from '@/components/safe-area/safe-area';
import Topbar from '@/components/topbar/topbar';
import { useNavigation } from '@/navigation/use-navigation';

type AdoptionRequestDetailProps = {
  route: {
    params: {
      request: AdoptionRequestResponse;
    };
  };
};

export const AdoptionRequestDetail = ({ route }: AdoptionRequestDetailProps) => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const { request } = route.params;

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
    if (status === AdoptionRequestStatus.DENIED && request.denialReason) {
      return t(
        `ADOPTION_REQUESTS.ADOPTER.CARD.STATUS_DENIED_${request.denialReason.toUpperCase()}`
      );
    }

    return t(`ADOPTION_REQUESTS.ADOPTER.CARD.STATUS_${status.toUpperCase()}`);
  };

  const getResolutionMessage = () => {
    if (request.status === AdoptionRequestStatus.ACCEPTED) {
      return t('ADOPTION_REQUESTS.ADOPTER.DETAIL.ALREADY_ACCEPTED');
    }

    if (request.denialReason) {
      return t(`ADOPTION_REQUESTS.ADOPTER.DETAIL.DENIED_${request.denialReason.toUpperCase()}`);
    }

    return t('ADOPTION_REQUESTS.ADOPTER.DETAIL.ALREADY_DENIED');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancelRequest = () => {
    // TODO: Call API to cancel request
    goBack();
  };

  return (
    <SafeArea>
      <PageDelimiter flex={1}>
        <Topbar />
        <VStack space={4} mt={4}>
          <Box bg="white" borderRadius="xl" shadow={2} p={4}>
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="2xl" fontWeight="bold" color="primary.600">
                {request.pet.name}
              </Text>
              <Badge
                colorScheme={getStatusColor(request.status)}
                variant="solid"
                borderRadius="md"
                px={3}
                py={1}
              >
                {getStatusLabel(request.status)}
              </Badge>
            </HStack>

            <VStack space={3}>
              <HStack space={2} alignItems="center">
                <Icon as={Ionicons} name="paw" size="sm" color="primary.500" />
                <Text fontSize="md" color="coolGray.700">
                  {request.pet.breed}
                </Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={Ionicons} name="medical" size="sm" color="primary.500" />
                <Text fontSize="md" color="coolGray.700">
                  {t(`MY_PETS_SCREEN.PET_TYPE.${request.pet.type.toUpperCase()}`)}
                </Text>
              </HStack>

              <HStack space={2} alignItems="center">
                <Icon as={Ionicons} name="calendar-outline" size="sm" color="primary.500" />
                <Text fontSize="sm" color="coolGray.600">
                  {t('ADOPTION_REQUESTS.ADOPTER.DETAIL.REQUESTED_ON')}:{' '}
                  {formatDate(request.createdAt)}
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Box bg="white" borderRadius="xl" shadow={2} p={4}>
            <Text fontSize="lg" fontWeight="bold" color="coolGray.800" mb={3}>
              {t('ADOPTION_REQUESTS.ADOPTER.DETAIL.OWNER_INFO')}
            </Text>

            <VStack space={3}>
              <HStack space={2} alignItems="center">
                <Icon as={Ionicons} name="person" size="sm" color="primary.500" />
                <Text fontSize="md" color="coolGray.700">
                  {request.pet.owner.name}
                </Text>
              </HStack>

              <Divider my={2} />

              <Text fontSize="sm" color="coolGray.500" italic>
                {t('ADOPTION_REQUESTS.ADOPTER.DETAIL.CONTACT_INFO_NOTICE')}
              </Text>
            </VStack>
          </Box>

          {request.status !== AdoptionRequestStatus.PENDING && (
            <Box bg="coolGray.100" borderRadius="lg" p={4}>
              <Text textAlign="center" color="coolGray.600">
                {getResolutionMessage()}
              </Text>
            </Box>
          )}
        </VStack>

        {request.status === AdoptionRequestStatus.PENDING && (
          <VStack space={2} mt="auto">
            <Button
              colorScheme="danger"
              variant="solid"
              size="lg"
              leftIcon={<Icon as={Ionicons} name="close-circle" />}
              onPress={handleCancelRequest}
            >
              {t('ADOPTION_REQUESTS.ADOPTER.DETAIL.CANCEL_REQUEST')}
            </Button>
          </VStack>
        )}
      </PageDelimiter>
    </SafeArea>
  );
};
