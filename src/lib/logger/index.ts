import { Roarr as log, ROARR } from 'roarr';

ROARR.write = (message) => {
  console.log(JSON.parse(message));
};

export const logger = log.child({
  package: 'web'
});
