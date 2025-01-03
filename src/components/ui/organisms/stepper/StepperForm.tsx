'use client';

import { G } from '@mobily/ts-belt';
import { motion } from 'framer-motion';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

import { useBreakpointBelow } from '@/components/tools/media-breakpoints';
import { Button } from '@/components/ui/atoms/button';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/atoms/drawer';
import { cn } from '@/lib/utils';

type StepperFormProps = {
  steps: {
    id: string;
    title: string;
    mobileOnly?: boolean;
    component: React.ReactNode;
    shouldShow?: boolean | (() => boolean);
  }[];
  currentStep?: number;
  onClose?: () => void;
  onStepChange?: (step: number) => void;
};

// eslint-disable-next-line max-lines-per-function, complexity
export default function StepperForm({
  steps,
  onClose,
  onStepChange,
  currentStep = 0
}: StepperFormProps) {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useBreakpointBelow('md');

  // Helper function to evaluate step visibility
  const isStepVisible = useCallback(
    (step: StepperFormProps['steps'][0]) => {
      if (G.isNotNullable(step.mobileOnly) && !isMobile) return false;
      if (typeof step.shouldShow === 'function') {
        return step.shouldShow();
      }
      return step.shouldShow !== false;
    },
    [isMobile]
  );

  // Helper function to find next visible step index
  const findNextVisibleStep = useCallback(
    (startIndex: number) => {
      let nextStep = startIndex;
      while (nextStep < steps.length) {
        const step = steps[nextStep];
        if (step && isStepVisible(step)) {
          return nextStep;
        }
        nextStep++;
      }
      return -1; // No visible steps found
    },
    [steps, isStepVisible]
  );

  // Helper function to find previous visible step index
  const findPrevVisibleStep = useCallback(
    (startIndex: number) => {
      let prevStep = startIndex;
      while (prevStep >= 0) {
        const step = steps[prevStep];
        if (step && isStepVisible(step)) {
          return prevStep;
        }
        prevStep--;
      }
      return -1; // No visible steps found
    },
    [steps, isStepVisible]
  );

  // Effect to handle step visibility changes
  useEffect(() => {
    const currStep = steps[activeStep];
    if (!currStep || !isStepVisible(currStep)) {
      const nextVisibleStep = findNextVisibleStep(activeStep);
      if (nextVisibleStep !== -1) {
        setActiveStep(nextVisibleStep);
        onStepChange?.(nextVisibleStep);
      } else {
        const prevVisibleStep = findPrevVisibleStep(activeStep);
        if (prevVisibleStep !== -1) {
          setActiveStep(prevVisibleStep);
          onStepChange?.(prevVisibleStep);
        }
      }
    }
  }, [activeStep, steps, isStepVisible, findNextVisibleStep, findPrevVisibleStep, onStepChange]);

  // Memoize visible steps
  const visibleSteps = useMemo(() => steps.filter(isStepVisible), [steps, isStepVisible]);

  // Memoize current visible index
  const currentVisibleIndex = useMemo(
    () => visibleSteps.findIndex((step) => step.id === steps[activeStep]?.id),
    [visibleSteps, steps, activeStep]
  );

  const handleNext = useCallback(() => {
    if (activeStep < steps.length - 1) {
      const nextVisibleStep = findNextVisibleStep(activeStep + 1);
      if (nextVisibleStep !== -1) {
        setActiveStep(nextVisibleStep);
        onStepChange?.(nextVisibleStep);
      } else {
        setIsOpen(false);
        onClose?.();
      }
    } else {
      setIsOpen(false);
      onClose?.();
    }
  }, [activeStep, steps.length, findNextVisibleStep, onStepChange, onClose]);

  const handlePrev = useCallback(() => {
    if (activeStep > 0) {
      const prevVisibleStep = findPrevVisibleStep(activeStep - 1);
      if (prevVisibleStep !== -1) {
        setActiveStep(prevVisibleStep);
        onStepChange?.(prevVisibleStep);
      }
    }
  }, [activeStep, findPrevVisibleStep, onStepChange]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // Memoize step status
  const stepStatus = useMemo(
    () => ({
      isLastStep: currentVisibleIndex === visibleSteps.length - 1,
      isFirstStep: currentVisibleIndex === 0,
      currentStepData: steps[activeStep]
    }),
    [currentVisibleIndex, visibleSteps.length, steps, activeStep]
  );

  // Memoize step indicators - moved before any conditional returns
  const stepIndicators = useMemo(() => {
    const currStep = stepStatus.currentStepData;
    if (G.isNullable(currStep?.id)) return null;

    return visibleSteps.map((step) => (
      <div
        key={step.id}
        className={`size-2 rounded-full ${
          step.id === currStep.id ? 'bg-[#002C5F]' : 'bg-gray-300'
        }`}
      />
    ));
  }, [visibleSteps, stepStatus.currentStepData]);

  const { isLastStep, isFirstStep, currentStepData } = stepStatus;

  if (!currentStepData || !isStepVisible(currentStepData) || !isOpen) return null;

  const content = (
    <div className="flex h-full flex-col">
      {/* Header */}
      {isMobile ? (
        <DrawerTitle className="mb-4 text-white">{currentStepData.title}</DrawerTitle>
      ) : (
        <div className="relative flex items-center justify-center border-b border-gray-200 bg-white p-4">
          <Button
            className="absolute right-3 top-3 rounded-xl bg-[#042c5c] text-white hover:bg-blue-900"
            onClick={handleClose}
          >
            <FaTimes className="size-4" />
          </Button>
          <h2 className="text-lg font-semibold text-gray-900">{currentStepData.title}</h2>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative h-1 w-full bg-gray-200">
        <motion.div
          // className="absolute left-0 top-0 h-full bg-[#042c5c]"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentVisibleIndex + 1) / visibleSteps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div
          key={currentStepData.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStepData.component}
        </motion.div>
      </div>

      {/* Navigation */}
      <div
        className={`flex items-center justify-between border-t border-gray-200 bg-white p-4 ${
          isMobile ? 'flex-col gap-2' : ''
        }`}
      >
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={isFirstStep}
          className={cn(
            'rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 hover:text-white',
            isMobile ? 'w-full' : ''
          )}
        >
          <FaArrowLeft className="mr-2 size-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">{!isMobile && stepIndicators}</div>

        <Button
          onClick={handleNext}
          className={cn(
            'rounded-md bg-[#042c5c] px-4 py-2 text-white hover:bg-blue-900',
            isMobile ? 'w-full' : ''
          )}
        >
          {isLastStep ? (
            'Complete'
          ) : (
            <>
              Next
              <FaArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[calc(100vh-4rem)] min-h-[36rem] rounded-t-3xl border-[#002C5F] bg-[#002C5F] p-4">
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative h-[35rem] w-full max-w-lg rounded-xl bg-white md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
        {content}
      </div>
    </div>
  );
}
