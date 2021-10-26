import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {px2ddp} from '@animavita/theme';

import Button from './Button';

type DataValue = {
  value: string;
  label: string;
};

interface ButtonGroupProps {
  data: DataValue[];
  onChange?: (newValue: string) => void;
  value: string;
}

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: ${px2ddp(3)}px 0 ${px2ddp(4)}px;
`;

const ButtonGroup: React.FC<ButtonGroupProps> = ({data, onChange, value}) => {
  const [active, setActive] = useState(value);

  useEffect(() => {
    onChange && onChange(active);
  }, [active]);

  function renderButton({value, label}: DataValue, index: number) {
    const selected = active === value;

    const additionalStyle = {
      flexGrow: 1,
      marginRight: index !== data.length - 1 ? 10 : 0,
    };

    return (
      <Button
        key={value}
        text={label}
        onPress={() => setActive(value)}
        size="small"
        rounded
        active={selected}
        outline={!selected}
        style={additionalStyle}
      />
    );
  }

  return <Wrapper>{data.map((item, index) => renderButton(item, index))}</Wrapper>;
};

export default ButtonGroup;
