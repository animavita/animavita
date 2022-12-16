import { useNavigation } from "@react-navigation/native";
import { Box, Heading } from 'native-base';
import { Avatar } from "react-native-paper";
import RegisterAdoptionForm from "../../components/register-adoption-form/adoption-form.component";

import useLocale from "../../shared/hooks/use-locale";
import theme from "../../theme";

export default function RegisterAdoption() {
  const { t } = useLocale();

  const navigation = useNavigation();

  return (
    <Box marginX="8">
      <Box display='flex' flexDirection="row" justifyContent="space-between" alignItems='center' marginY="8">
        <Heading color={theme.colors.primary[600]}>
          {t("REGISTER_ADOPTION.TITLE")}
        </Heading>
        <Avatar.Image
          size={38}
          source={{
            uri: "https://i.pinimg.com/originals/97/a8/09/97a8096f32ad5bd41de2c54f5949a06d.jpg",
          }}
        />
      </Box>
      <RegisterAdoptionForm />
    </Box>
  );
}
