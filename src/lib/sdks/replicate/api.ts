import { api } from '@/lib/sdks/replicate/client';

type ModelInput = {
  prompt: string;
  maskUrl?: string;
  imageUrl?: string;
  systemPrompt?: string;
  negativePrompt?: string;
};

export const clarityAI = async ({
  prompt = 'masterpiece, best quality, highres, <lora:more_details:0.5> <lora:SDXLrender_v2.0:1>',
  imageUrl = 'https://replicate.delivery/pbxt/KiDB5iqtTcxiTI17WASotG1Ei0TNJCztdU6J02pnMYAd8B1X/13_before-4.png',
  negativePrompt = '(worst quality, low quality, normal quality:2) JuggernautNegative-neg'
}: ModelInput) => {
  const model = 'philz1337x/clarity-upscaler';
  const input = {
    input: {
      seed: 1337,
      sharpen: 0,
      dynamic: 6,
      pattern: false,
      lora_links: '',
      scale_factor: 2,
      creativity: 0.35,
      resemblance: 0.6,
      tiling_width: 112,
      downscaling: false,
      tiling_height: 144,
      handfix: 'disabled',
      custom_sd_model: '',
      output_format: 'png',
      num_inference_steps: 18,
      downscaling_resolution: 768,
      prompt,
      image: imageUrl,
      negative_prompt: negativePrompt,
      scheduler: 'DPM++ 3M SDE Karras',
      sd_model: 'juggernaut_reborn.safetensors [338b85bc4f]'
    }
  };

  return api({ model, input });
};

export const stabilityDiffusion = async ({
  prompt = 'a photo of vibrant artistic graffiti on a wall saying "SD3 medium"'
}: ModelInput) => {
  const model = 'stability-ai/stable-diffusion-3';
  const input = {
    cfg: 3.5,
    steps: 28,
    prompt,
    output_quality: 90,
    negative_prompt: '',
    aspect_ratio: '3:2',
    output_format: 'webp',
    prompt_strength: 0.85
  };

  return api({ model, input });
};

export const stableDiffusionInPainting = async ({
  prompt = 'a photo of a vibrant cityscape',
  imageUrl = 'https://replicate.delivery/pbxt/KiDB5iqtTcxiTI17WASotG1Ei0TNJCztdU6J02pnMYAd8B1X/13_before-4.png',
  maskUrl
}: ModelInput) => {
  const model = 'andreasjansson/stable-diffusion-inpainting';
  const input = {
    mask: maskUrl,
    num_outputs: 1,
    prompt,
    image: imageUrl,
    invert_mask: false,
    guidance_scale: 7.5,
    negative_prompt: '',
    num_inference_steps: 50
  };

  return api({ model, input });
};

export const metaLlama = async ({
  prompt = 'a photo of a llama in a field',
  systemPrompt = 'You are a helpful assistant.'
}: ModelInput) => {
  const model = 'meta/meta-llama-3.1-405b-instruct';
  const input = {
    top_k: 50,
    top_p: 0.9,
    min_tokens: 0,
    prompt,
    max_tokens: 1024,
    temperature: 0.6,
    presence_penalty: 0,
    frequency_penalty: 0,
    system_prompt: systemPrompt
  };

  return api({ model, input });
};

export const fluxSchnell = async ({ prompt = 'a photo of a vibrant cityscape' }: ModelInput) => {
  const model = 'black-forest-labs/flux-schnell';
  const input = {
    prompt,
    output_quality: 90
  };

  return api({ model, input });
};
