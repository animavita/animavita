import React from 'react';

import AdoptionForm from './AdoptionForm';
import PictureUpload from './PictureUpload';
import {AdoptionProvider, useAdoptionRegister} from './Controller';

const RegisterAdoption: React.FC = () => {
  const {step} = useAdoptionRegister();

  return step === 0 ? <AdoptionForm /> : <PictureUpload />;
};

const RegisterAdoptionWithController: React.FC = () => {
  return (
    <AdoptionProvider>
      <RegisterAdoption />
    </AdoptionProvider>
  );
};

export default RegisterAdoptionWithController;
