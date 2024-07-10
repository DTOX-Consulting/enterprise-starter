import { z } from 'zod';

import type { MutateFn } from '@/data/components/ai-generator';
import type { Option } from '@/data/option';
import type { DeepReadonlyArray } from '@/lib/utils/object';
import type { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

// =================================== New Business Form =================================== //

export const NewBusinessFormSchema = z.object({
  businessIndustry: z
    .array<z.ZodType<Option>>(
      z.object({
        label: z.string(),
        value: z.string()
      })
    )
    .min(1)
    .max(15),
  businessDescription: z.string().min(3).max(1000),
  businessName: z.string().min(3).max(255).optional().or(z.literal(''))
});

export type NewBusinessForm = UseFormReturn<NewBusinessFormType>;

export type NewBusinessFormType = Omit<
  z.infer<typeof NewBusinessFormSchema>,
  'businessIndustry'
> & {
  businessIndustry: DeepReadonlyArray<Option>;
};

export type NewBusinessFormResponseType = {
  businessVision: string;
  businessMission: string;
  businessTagline: string;
  businessProblem: string;
};

export type NewBusinessFieldType<T extends keyof NewBusinessFormType> = ControllerRenderProps<
  NewBusinessFormType,
  T
>;

export interface NewBusinessFormMutationArgs {
  mutateOne: MutateFn;
  mutateTwo: MutateFn;
  mutateThree: MutateFn;
  mutateFour: MutateFn;
  mutateFive: MutateFn;
  mutateSix: MutateFn;
  mutateSeven: MutateFn;
}

export interface NewBusinessFormGenerateAIArgs<T extends keyof NewBusinessFormType> {
  form: NewBusinessForm;
  field: NewBusinessFieldType<T>;
  args: NewBusinessFormMutationArgs;
  checkedSwitches: Record<T, boolean>;
  setCheckedSwitches: (value: Record<T, boolean>, rerender?: boolean) => void;
}

// =================================== New Business Form =================================== //
// =================================== New Organization Form =================================== //

export const NewOrganizationFormSchema = z.object({
  organizationName: z.string().min(3).max(255),
  organizationType: z.string().min(3).max(255)
});

export type NewOrganizationForm = UseFormReturn<NewOrganizationFormType>;

export type NewOrganizationFormType = z.infer<typeof NewOrganizationFormSchema>;

export type NewOrganizationFieldType<T extends keyof NewOrganizationFormType> =
  ControllerRenderProps<NewOrganizationFormType, T>;

// =================================== New Organization Form =================================== //
