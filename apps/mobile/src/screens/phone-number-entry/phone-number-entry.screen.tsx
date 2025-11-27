import { Button, Heading, HStack, Input, Text, View } from 'native-base';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import PhoneInput, { isValidPhoneNumber } from 'react-native-international-phone-number';

import SafeArea from '@/components/safe-area/safe-area';
import AppStatusBar from '@/components/status-bar/status-bar.component';
import useLocale from '@/hooks/use-locale';
import useProfile from '@/hooks/use-profile';

type Step = 'phone' | 'otp';

const PhoneNumberEntryScreen = () => {
  const { t } = useLocale();
  const { role } = useProfile();
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleSendOtp = async () => {
    setIsLoading(true);
    // TODO: Integrate with backend to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    // TODO: Verify OTP with backend
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value) {
      focusNextInput(index);
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index]) {
      focusPreviousInput(index);
    }
  };

  const focusNextInput = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const focusPreviousInput = (currentIndex: number) => {
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      inputRefs.current[previousIndex]?.focus();
    }
  };

  const isPhoneValid = isValidPhoneNumber(phoneNumber, selectedCountry);
  const isOtpValid = otp.every((digit) => digit.length === 1);

  return (
    <View flex="1" bg="white">
      <AppStatusBar />

      <SafeArea>
        <View flex="1" paddingX={6} paddingTop={8}>
          {step === 'phone' ? (
            <>
              <Heading fontSize={32} fontWeight="bold" marginBottom={2}>
                {t('PHONE_NUMBER_ENTRY.TITLE')}
              </Heading>
              <Text fontSize={14} color="gray.400" marginBottom={8}>
                {t('PHONE_NUMBER_ENTRY.SUBTITLE')}
              </Text>

              <View
                bg="blue.50"
                borderLeftWidth={3}
                borderLeftColor="primary.500"
                padding={3}
                borderRadius="md"
                marginBottom={6}
              >
                <Text fontSize={13} color="gray.600" lineHeight={20}>
                  {role === 'owner'
                    ? t('PHONE_NUMBER_ENTRY.INFO_OWNER')
                    : t('PHONE_NUMBER_ENTRY.INFO_ADOPTER')}
                </Text>
              </View>

              <View width="100%" marginBottom={4}>
                <PhoneInput
                  value={phoneNumber}
                  onChangePhoneNumber={setPhoneNumber}
                  selectedCountry={selectedCountry}
                  onChangeSelectedCountry={setSelectedCountry}
                  defaultCountry="BR"
                  placeholder={t('PHONE_NUMBER_ENTRY.PHONE_PLACEHOLDER')}
                />
              </View>

              <Button
                width="100%"
                onPress={handleSendOtp}
                isDisabled={!isPhoneValid}
                isLoading={isLoading}
                isLoadingText={t('PHONE_NUMBER_ENTRY.SEND_OTP_BUTTON')}
                size="lg"
                borderRadius="xl"
              >
                {t('PHONE_NUMBER_ENTRY.SEND_OTP_BUTTON')}
              </Button>
            </>
          ) : (
            <>
              <Heading fontSize={32} fontWeight="bold" marginBottom={3}>
                {t('PHONE_NUMBER_ENTRY.VERIFY_TITLE')}
              </Heading>
              <Text fontSize={16} color="gray.500" marginBottom={12}>
                {t('PHONE_NUMBER_ENTRY.VERIFY_SUBTITLE', {
                  phone: `${selectedCountry?.idd?.root || ''}${
                    selectedCountry?.idd?.suffixes?.[0] || ''
                  } ${phoneNumber}`,
                })}
              </Text>

              <HStack space={3} marginBottom={10} justifyContent="center">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    fontSize={28}
                    fontWeight="bold"
                    width={50}
                    height={60}
                    borderRadius="xl"
                    borderWidth={2}
                    borderColor={digit ? 'primary.500' : 'gray.300'}
                    bg="white"
                    _focus={{
                      borderColor: 'primary.500',
                      bg: 'primary.50',
                    }}
                    testID={`otp-input-${index}`}
                  />
                ))}
              </HStack>

              <Button
                width="100%"
                onPress={handleVerifyOtp}
                isDisabled={!isOtpValid}
                isLoading={isLoading}
                isLoadingText={t('PHONE_NUMBER_ENTRY.VERIFY_BUTTON')}
                marginBottom={4}
                size="lg"
                borderRadius="xl"
              >
                {t('PHONE_NUMBER_ENTRY.VERIFY_BUTTON')}
              </Button>

              <Button
                width="100%"
                variant="ghost"
                onPress={() => {
                  setStep('phone');
                  setOtp(['', '', '', '', '', '']);
                }}
                size="lg"
              >
                {t('PHONE_NUMBER_ENTRY.CHANGE_NUMBER')}
              </Button>
            </>
          )}
        </View>
      </SafeArea>
    </View>
  );
};

export default PhoneNumberEntryScreen;
