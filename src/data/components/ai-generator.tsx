import { props } from 'already';
import { useCallback } from 'react';

import { useAbilities } from '@/config/permissions/use-abilities';
import { useDBData, useDBDataExtras, useDBDataExtrasMutation } from '@/data';
import { type AIUpdate, processor } from '@/data/components/ai-updates-processor';
import { useLocalData } from '@/lib/hooks/use-data';
import { api } from '@/trpc/react';

import type {
  NewBusinessFormType,
  NewBusinessFormMutationArgs,
  NewBusinessFormResponseType
} from '@/data/forms';
import type { BusinessChangeKeys } from '@/data/guards';
import type { Option } from '@/data/option';
import type { Business } from '@/lib/db/rxdb/schemas/business';
import type { DCS } from '@/lib/db/rxdb/utils/schema';

import { formatConfig } from '@/app/(authenticated)/businesses/utils/formatters';
import { stringifyValue } from '@/app/(authenticated)/businesses/utils/handlers';

export type MutateFn = ReturnType<typeof api.ai.generator.useMutation>['mutateAsync'];

export function useAIGenerator() {
  const { mutateAsync: mutate } = api.ai.generator.useMutation();

  const callNew = useCallback(
    async ({
      topicData,
      retrieveKey
    }: {
      topicData: NewBusinessFormType;
      retrieveKey: BusinessChangeKeys;
    }) => {
      const { document, fn } = formatConfig[retrieveKey];
      const topic = generateTopic(topicData);

      const { success, data } = await mutate({
        document,
        topic
      });

      if (!success || !data) {
        return;
      }

      return fn(data);
    },
    [mutate]
  );

  const callCurrent = useCallback(
    async ({
      value,
      retrieveKey,
      retrievedValue,
      currentBusiness,
      returnList = true
    }: {
      value?: string;
      returnList?: false | true;
      currentBusiness: DCS<Business>;
      retrieveKey: BusinessChangeKeys;
      retrievedValue: string | Option[];
    }) => {
      const changeParameters = value;
      const { document, fn } = formatConfig[retrieveKey];

      const generalTopic = generateTopic({
        businessName: currentBusiness?.name,
        businessVision: currentBusiness?.data.vision,
        businessMission: currentBusiness?.data.mission,
        businessTagline: currentBusiness?.data.tagline,
        businessProblem: currentBusiness?.data.problem,
        businessIndustry: currentBusiness?.data.industry,
        businessDescription: currentBusiness?.description
      });

      const topicExtras = [
        'You now have all the current information about the business.',
        'And need the current value below to be changed using the parameters provided.',
        `Current Value To be changed for ${retrieveKey}: ${stringifyValue(retrievedValue)}`,
        `Change the value from current value with these parameters: ${
          changeParameters ?? 'Whatever you think is best'
        }`
      ].join('\n');

      const topic = `${generalTopic}\n\n${topicExtras}`;

      const { success, data } = await mutate({
        document,
        topic
      });

      if (!success || !data) {
        return;
      }

      // @ts-expect-error - TS doesn't know that returnList is a boolean
      return fn(data, returnList);
    },
    [mutate]
  );

  return { callNew, callCurrent };
}

export function generateTopic(
  data: Partial<NewBusinessFormType> & Partial<NewBusinessFormResponseType>
) {
  const businessIndustry = data.businessIndustry
    ? `\nMy business is in these industries currently: ${data.businessIndustry
        .map(({ value }) => value)
        .join(', ')}.`
    : '';

  const businessName = data.businessName
    ? `\nMy current business name is ${data.businessName}.`
    : '';
  const businessDescription = data.businessDescription
    ? `\nMy current business description is ${data.businessDescription}.`
    : '';

  const topic = `${businessName}${businessDescription}${businessIndustry}`.trim();

  const secondaryTopics = [
    data.businessVision ? `\nMy current vision is ${data.businessVision}.` : '',
    data.businessMission ? `\nMy current mission is ${data.businessMission}.` : '',
    data.businessTagline ? `\nMy current tagline is ${data.businessTagline}.` : '',
    data.businessProblem ? `\nMy current problem statement is ${data.businessProblem}.` : ''
  ].join('');

  const finalTopic = `\n${topic}\n${secondaryTopics}`.trim();

  return finalTopic;
}

export async function runMutations(
  data: NewBusinessFormType,
  mutateArgs: NewBusinessFormMutationArgs,
  checkedSwitches: Record<keyof NewBusinessFormType, boolean>
) {
  const { mutateOne, mutateTwo, mutateThree, mutateFour, mutateFive, mutateSix, mutateSeven } =
    mutateArgs;

  let topic = generateTopic(data);

  let businessName: Promise<unknown> | undefined;
  let businessIndustry: Promise<unknown> | undefined;
  let businessDescription: Promise<unknown> | undefined;

  if (!data.businessName || checkedSwitches.businessName) {
    businessName = mutateFive({
      topic,
      document: formatConfig.name.document
    });
  }

  if (checkedSwitches.businessIndustry) {
    businessIndustry = mutateTwo({
      topic,
      document: formatConfig.industry.document
    });
  }

  if (checkedSwitches.businessDescription) {
    businessDescription = mutateSix({
      topic,
      document: formatConfig.description.document
    });
  }

  if (
    !data.businessName ||
    checkedSwitches.businessName ||
    checkedSwitches.businessIndustry ||
    checkedSwitches.businessDescription
  ) {
    const initialResponse = (await props({
      businessName,
      businessIndustry,
      businessDescription
    })) as {
      businessName?: { data: string };
      businessIndustry?: { data: string };
      businessDescription?: { data: string };
    };

    const newData = {
      businessName: initialResponse.businessName?.data
        ? formatConfig.name.fn(initialResponse.businessName.data)
        : data.businessName,
      businessIndustry: initialResponse.businessIndustry?.data
        ? formatConfig.industry.fn(initialResponse.businessIndustry.data)
        : data.businessIndustry,
      businessDescription: initialResponse.businessDescription?.data
        ? formatConfig.description.fn(initialResponse.businessDescription.data)
        : data.businessDescription
    };

    if (!data.businessName || checkedSwitches.businessName) {
      Object.assign(data, newData);
      Object.assign(checkedSwitches, { businessName: false });
      return runMutations(data, mutateArgs, checkedSwitches);
    }

    topic = generateTopic(newData);
  }

  const visionStatement = mutateOne({
    topic,
    document: formatConfig.vision.document
  });

  const missionStatement = mutateSeven({
    topic,
    document: formatConfig.mission.document
  });

  const problemStatement = mutateThree({
    topic,
    document: formatConfig.problem.document
  });

  const tagline = mutateFour({
    topic,
    document: formatConfig.tagline.document
  });

  const response = (await props({
    tagline,
    businessName,
    visionStatement,
    missionStatement,
    problemStatement,
    businessIndustry,
    businessDescription
  })) as {
    tagline?: { data: string };
    businessName?: { data: string };
    visionStatement?: { data: string };
    missionStatement?: { data: string };
    problemStatement?: { data: string };
    businessIndustry?: { data: string };
    businessDescription?: { data: string };
  };

  return {
    tagline: response.tagline?.data ?? '',
    businessName: response.businessName?.data ?? '',
    visionStatement: response.visionStatement?.data ?? '',
    missionStatement: response.missionStatement?.data ?? '',
    problemStatement: response.problemStatement?.data ?? '',
    businessIndustry: response.businessIndustry?.data ?? '',
    businessDescription: response.businessDescription?.data ?? ''
  };
}

export function useAIUpdates() {
  const { abilities } = useAbilities();
  const { getHistory } = useDBDataExtras();
  const { callCurrent } = useAIGenerator();
  const { currentBusinesses } = useDBData();
  const { createNotification } = useDBDataExtrasMutation();
  const { getLocalItems, setLocalItems, storageKey } = useLocalData<AIUpdate>('ai-updates');

  if (!abilities.can('suggest', 'AIChanges')) {
    return;
  }

  processor({
    storageKey,
    getHistory,
    callCurrent,
    getLocalItems,
    setLocalItems,
    currentBusinesses,
    createNotification
  });
}
