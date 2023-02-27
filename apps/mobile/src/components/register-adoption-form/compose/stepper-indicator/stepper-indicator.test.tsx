import StepperIndicator from './stepper-indicator';
import { renderWithProviders } from '../../../../test/test-utils';
import { stepsLibrary } from '../../adoption-form.constants';
import { AdoptionSteps } from '../../adoption-form.types';

const stepKeys = Object.keys(stepsLibrary);

describe('StepperIndicator', () => {
  it('renders the correct label', () => {
    const { getByText } = renderWithProviders(
      <StepperIndicator activeStep={AdoptionSteps.PetGender} />
    );

    expect(getByText(/sexo do pet/i)).toBeOnTheScreen();
  });

  describe.each(stepKeys)('when the current step is %s', (step) => {
    const currentStepNumber = stepKeys.findIndex((s) => s === step) + 1;

    it(`renders ${currentStepNumber}/8`, () => {
      const { getByText } = renderWithProviders(
        <StepperIndicator activeStep={step as AdoptionSteps} />
      );

      expect(getByText(`${currentStepNumber}/8`)).toBeOnTheScreen();
    });
  });
});
