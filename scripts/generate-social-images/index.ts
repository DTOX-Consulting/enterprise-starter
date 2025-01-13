import fs from 'node:fs/promises';
import path from 'node:path';

import { G } from '@mobily/ts-belt';
import { Command } from 'commander';
import JSZip from 'jszip';
import sharp, { type Sharp } from 'sharp';

import { type ImageConfig, SOCIAL_CONFIGS } from './config';

type ProcessedImage = {
  config: ImageConfig;
  outputPath: string;
};

type ImageProcessingOptions = {
  backgroundColor: RGBAColor;
  paddingX?: number;
  paddingY?: number;
};

type RGBAColor = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

type ProgramOptions = {
  background: string;
  paddingX: string;
  paddingY: string;
  verbose?: boolean;
  zip?: boolean;
};

async function validateImage(inputPath: string) {
  try {
    const metadata = await sharp(inputPath).metadata();

    if (
      !G.isNotNullable(metadata.width) ||
      !G.isNotNullable(metadata.height) ||
      metadata.width <= 0 ||
      metadata.height <= 0
    ) {
      throw new Error('Invalid image dimensions');
    }

    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    throw new Error(
      `Failed to process input image: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

async function ensureOutputDirectory(directory: string): Promise<string> {
  const outputDir = path.join('public', 'images', 'social', directory);
  await fs.mkdir(outputDir, { recursive: true });
  return outputDir;
}

function parseHexColor(hex: string): RGBAColor {
  const normalized = hex.replace('#', '').padStart(6, '0');

  if (!/^[0-9A-Fa-f]{6}$/.test(normalized)) {
    throw new Error('Invalid hex color format. Expected 6 hexadecimal characters with optional #');
  }

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return { red, green, blue, alpha: 1 };
}

async function processImage(
  inputImage: Sharp,
  sourceWidth: number,
  sourceHeight: number,
  config: ImageConfig,
  options: ImageProcessingOptions
): Promise<ProcessedImage> {
  try {
    const scale = Math.min(config.width / sourceWidth, config.height / sourceHeight);
    const scaledWidth = Math.round(sourceWidth * scale);
    const scaledHeight = Math.round(sourceHeight * scale);

    const paddingX = Math.round((config.width - scaledWidth) / 2) + (options.paddingX ?? 0);
    const paddingY = Math.round((config.height - scaledHeight) / 2) + (options.paddingY ?? 0);

    const outputDir = await ensureOutputDirectory(config.directory);
    const outputPath = path.join(outputDir, `${config.name}.png`);

    await inputImage
      .clone()
      .resize(scaledWidth, scaledHeight, {
        fit: 'contain',
        background: options.backgroundColor
      })
      .flatten({ background: options.backgroundColor })
      .extend({
        top: paddingY,
        bottom: paddingY,
        left: paddingX,
        right: paddingX,
        background: options.backgroundColor
      })
      .png()
      .toFile(outputPath);

    return { config, outputPath };
  } catch (error) {
    throw new Error(
      `Failed to process ${config.name}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

async function generateSocialImages(
  inputPath: string,
  options: ImageProcessingOptions
): Promise<ProcessedImage[]> {
  const { width, height } = await validateImage(inputPath);
  const inputImage = sharp(inputPath);
  const errors: string[] = [];

  const results = await Promise.all(
    SOCIAL_CONFIGS.map(async (config) => {
      try {
        return await processImage(inputImage, width, height, config, options);
      } catch (error) {
        const errorMessage = `Failed to generate ${config.name}: ${formatError(error)}`;
        errors.push(errorMessage);
        console.error(errorMessage);
        return null;
      }
    })
  );

  if (G.isNotNullable(errors) && errors.length > 0) {
    console.error(`\n❌ ${errors.length} errors occurred during generation`);
  }

  return results.filter(G.isNotNullable);
}

async function createZipArchive(images: ProcessedImage[]): Promise<string> {
  const zip = new JSZip();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const zipPath = path.join('public', 'images', 'social', `social-images-${timestamp}.zip`);

  await Promise.all(
    images.map(async (image) => {
      const fileName = path.basename(image.outputPath);
      const fileContent = await fs.readFile(image.outputPath);
      zip.file(fileName, Uint8Array.from(fileContent));
    })
  );

  const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
  await fs.writeFile(zipPath, Uint8Array.from(zipContent));

  return zipPath;
}

function formatError(error: unknown): string {
  if (G.isNullable(error)) return 'Unknown error';
  if (error instanceof Error) return error.message;
  return String(error);
}

async function main() {
  const program = new Command()
    .version('1.0.0')
    .name('generate-social-images')
    .description('Generate social media images with customizable background and padding')
    .argument('[inputPath]', 'Path to input image', 'src/assets/images/logo.png')
    .option('-b, --background <color>', 'Background color in hex', '#FFFFFF')
    .option('-x, --padding-x <pixels>', 'Additional horizontal padding in pixels', '0')
    .option('-y, --padding-y <pixels>', 'Additional vertical padding in pixels', '0')
    .option('-v, --verbose', 'Show detailed processing information')
    .option('-z, --zip', 'Create a zip archive of generated images')
    .action(async (inputPath: string, cmdOptions: ProgramOptions) => {
      try {
        const processingOptions: ImageProcessingOptions = {
          backgroundColor: parseHexColor(cmdOptions.background),
          paddingX: Number.parseInt(cmdOptions.paddingX, 10),
          paddingY: Number.parseInt(cmdOptions.paddingY, 10)
        };

        if (G.isNotNullable(cmdOptions.verbose)) {
          console.log('Processing with options:', {
            ...processingOptions,
            inputPath
          });
        }

        const results = await generateSocialImages(inputPath, processingOptions);

        if (G.isNotNullable(cmdOptions.zip)) {
          const zipPath = await createZipArchive(results);
          console.log(`Created zip archive at: ${zipPath}`);
        }

        if (G.isNotNullable(cmdOptions.verbose)) {
          console.log(
            'Generated images:',
            results.map((result) => result.outputPath)
          );
        } else {
          console.log(`Successfully generated ${results.length} images`);
        }
      } catch (error) {
        const errorMessage = formatError(error);
        console.error('Error:', errorMessage);
        throw error;
      }
    });

  await program.parseAsync();
}

// Script execution
void (async () => {
  try {
    await main();
  } catch (error) {
    console.error(formatError(error));
  }
})();
