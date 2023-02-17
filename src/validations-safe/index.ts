// This is manual approach to validations.
// When services, resources or properties in the rawDB are changed,
// appropriate directories and files must be created here as well.

// The benefit of this approach is a well-typed library. Thanks to service/resource/property-specific objects,
// it is more convenient and generally safer to use than indexed objects.

import { S3 } from './S3';
import { SageMaker } from './SageMaker';
export const validationsSafe = {
  S3,
  SageMaker,
}