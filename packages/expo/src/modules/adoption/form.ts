type TextData = {
  type: 'text';
  placeholder: string;
  value: string;
};

type SliderData = {
  type: 'slider';
  minimum: number;
  maximum: number;
  suffix: string;
  defaultValue: number;
  value: number;
};

type ButtonGroupData = {
  type: 'buttonGroup';
  data: {
    label: string;
    value: string;
  }[];
  value: string;
};

export type InputData = (TextData | SliderData | ButtonGroupData) & {
  label: string;
  name: string;
  defaultValue: string;
  rules?: {
    required: boolean;
  };
};

export type Fields = {
  name: string;
  breed: string;
  observations: string;
  type: string;
  age: number;
  gender: string;
  size: string;
};

const getForm = (t: (string) => string) =>
  [
    {
      label: t('inputs.name.label'),
      placeholder: t('inputs.name.placeholder'),
      type: 'text',
      name: 'name',
      defaultValue: '',
      rules: {
        required: true,
      },
    },
    {
      label: t('inputs.breed.label'),
      placeholder: t('inputs.breed.placeholder'),
      type: 'text',
      name: 'breed',
      defaultValue: '',
      rules: {
        required: true,
      },
    },
    {
      label: t('inputs.observations.label'),
      placeholder: t('inputs.observations.placeholder'),
      type: 'text',
      name: 'observations',
      defaultValue: '',
    },
    {
      label: t('inputs.type.label'),
      type: 'buttonGroup',
      data: [
        {
          label: t('inputs.type.options.dog'),
          value: 'dog',
        },
        {
          label: t('inputs.type.options.cat'),
          value: 'cat',
        },
        {
          label: t('inputs.type.options.other'),
          value: 'other',
        },
      ],
      name: 'type',
      defaultValue: 'dog',
      rules: {
        required: true,
      },
    },
    {
      label: t('inputs.age.label'),
      type: 'slider',
      name: 'age',
      minimum: 1,
      maximum: 20,
      suffix: t('inputs.age.suffix.plural'),
      defaultValue: 10,
      rules: {
        required: true,
      },
    },
    {
      label: t('inputs.gender.label'),
      type: 'buttonGroup',
      data: [
        {
          label: t('inputs.gender.options.male'),
          value: 'male',
        },
        {
          label: t('inputs.gender.options.female'),
          value: 'female',
        },
      ],
      name: 'gender',
      defaultValue: 'male',
      rules: {
        required: true,
      },
    },
    {
      label: t('inputs.size.label'),
      type: 'buttonGroup',
      data: [
        {
          label: t('inputs.size.options.small'),
          value: 'small',
        },
        {
          label: t('inputs.size.options.medium'),
          value: 'medium',
        },
        {
          label: t('inputs.size.options.large'),
          value: 'bigger',
        },
      ],
      name: 'size',
      defaultValue: 'small',
      rules: {
        required: true,
      },
    },
  ] as InputData[];

export {getForm};
