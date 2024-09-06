import { rm as fsRm, copyFile as fsCopy, mkdir as fsMkdir } from 'node:fs/promises';

import { each } from 'already';
import { build as bunBuild, type BuildConfig } from 'bun';
import { glob } from 'glob';
import fsWatch from 'node-watch';

import { isDev } from '@Root/config/env.config.mjs';

const options = (): BuildConfig => ({
    minify: !isDev,
    format: 'esm',
    target: 'browser',
    outdir: 'public/iframe/',
    entrypoints: ['src/iframe/widget.js', 'src/iframe/app.js']
  });

const clean = async () => {
  const opts = options();
  const files = await glob([`${opts.outdir}/*`]);

  await each(files, async (file) => {
    await fsRm(file, { force: true, recursive: true });
  });
};

const copy = async () => {
  const opts = options();
  const outDir = opts.outdir;
  const files = await glob(['src/iframe/*.html', 'src/iframe/*.css']);

  if (!outDir) return;

  await fsMkdir(outDir, { recursive: true });

  await each(files, async (file) => {
    await fsCopy(file, file.replace('src/iframe/', outDir));
  });
};

const build = async () => {
  try {
    await clean();
    await copy();
    const opts = options();
    const response = await bunBuild(opts);

    if (!response.success) {
      const error = `\n${response.logs.join('\n')}`;
      throw new Error(error);
    }

    console.info('Build Public Iframe success');
  } catch (e) {
    console.error('Build Public Iframe error', e);
  }
};

const watch = async () => {
  try {
    await build();
    console.info('Watching Public Iframe Build...');
    const toWatch = ['src/iframe', 'src/app', 'src/components', 'src/lib', 'src/config'];
    fsWatch(toWatch, { recursive: true }, async (_, file) => {
      console.info(`File ${file} changed. Rebuilding...`);
      await build();
    });
  } catch (e) {
    console.error('Build Public Iframe error', e);
  }
};

const args = process.argv.slice(2);
if (args.includes('--watch')) {
  await watch();
} else {
  await build();
}
