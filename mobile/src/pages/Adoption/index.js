import React, { useState } from 'react';
import Profile from '~/components/Profile';
import { Container } from './styles';

import AdoptionForm from './components/AdoptionForm';
import PhotoContainer from './components/PhotoContainer';

const Adoption = () => {
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);

  const hooksProps = {
    setData,
    data,
    setStep,
  };

  return (
    <Container>
      <Profile title="Cadastrar Adoção" />
      {step === 0 ? <AdoptionForm {...hooksProps} /> : <PhotoContainer {...hooksProps} />}
    </Container>
  );
};
export default Adoption;
