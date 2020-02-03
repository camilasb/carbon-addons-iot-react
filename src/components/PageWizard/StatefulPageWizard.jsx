import React, { useState } from 'react';

import PageWizard, { PageWizardPropTypes, defaultProps } from './PageWizard';

const StatefulPageWizard = ({
  currentStepId: currentStepIdProp,
  children,
  onNext,
  onBack,
  setStep,
  ...other
}) => {
  const steps = React.Children.map(children, step => step.props);
  const [currentStepId, setCurrentStepId] = useState(currentStepIdProp || (steps && steps[0].id));
  const currentStepIndex = steps.findIndex(i => i.id === currentStepId);
  const nextStep = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : undefined;
  const prevStep = currentStepIndex > 0 ? steps[currentStepIndex - 1] : undefined;
  const handleNext = id => {
    setCurrentStepId(id);
    onNext(id);
  };
  const handleBack = id => {
    setCurrentStepId(id);
    onBack(id);
  };

  return (
    <PageWizard
      {...other}
      onBack={() => handleBack(prevStep.id)}
      onNext={() => handleNext(nextStep.id)}
      currentStepId={currentStepId}
      setStep={id => {
        setCurrentStepId(id);
        setStep(id);
      }}
    >
      {children}
    </PageWizard>
  );
};

StatefulPageWizard.propTypes = PageWizardPropTypes;
StatefulPageWizard.defaultProps = defaultProps;
export default StatefulPageWizard;
