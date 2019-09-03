import React from 'react';

import {
  FormContainer, Input, Wrapper, Field,
} from '~/components';

import Slider from '~/components/Slider';

const Distance = () => (
  <FormContainer>
    <Input>
      <Wrapper>
        <Field>Distância máxima para receber alertas.</Field>
        <Slider
          minimum={0}
          maximum={500}
          value={50}
          valueText="km"
          onChange={value => console.log(value)}
        />
      </Wrapper>
    </Input>
  </FormContainer>
);

export default Distance;
