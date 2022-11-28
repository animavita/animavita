import { useNavigation } from "@react-navigation/native";
import { Avatar, Headline, Title } from "react-native-paper";
import RegisterAdoptionForm from "../../components/register-adoption-form/adoption-form.component";
import Container from "../../shared/components/container/container.component";
import useLocale from "../../shared/hooks/use-locale";

export default function RegisterAdoption() {
  const { t } = useLocale();

  const navigation = useNavigation();

  return (
    <Container>
      <Title>
        <Headline style={{ fontWeight: 'bold' }}>{t('REGISTER_ADOPTION.TITLE')}</Headline>
        <Avatar.Image
          size={38}
          source={{
            uri: 'https://i.pinimg.com/originals/97/a8/09/97a8096f32ad5bd41de2c54f5949a06d.jpg',
          }}
        />
      </Title>
      <RegisterAdoptionForm />
    </Container>
  );
}
