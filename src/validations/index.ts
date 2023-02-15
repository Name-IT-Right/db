import { Rule } from "@name-it-right/types";
import { rawDB } from "../db";
import { extractTextAfterLastColonPair, extractTextBetweenPairsOfColons } from "./utils";

type ValidationsDB = Record<string, ServiceRecord>;
type ServiceRecord = Record<string, ResourceRecord>;
type ResourceRecord = Record<string, Property>;
type Property = {
  errors: Rule[],
  warnings: Rule[],
}

// validationsDB object is not exported directly, because
// validations (utility) object is built * IN RUNTIME * in a more convenient format
// for the sake of DEMONSTRATION:
//
// instead of rawDB[AWS::S3::Bucket].properties.BucketName.validations
// validations can be accessed like this: validations.S3.Bucket.BucketName
// In the future, this data (and corresponding types!) MUST be generated * IN A BUILD STEP *
//
// TODO: Parse raw DB in build time and generate typings for a more convenient usage
const validationsDB: ValidationsDB = {};

Object.entries(rawDB).forEach(([cloudFormationTypeName, serviceValue]) => {
  const serviceName = extractTextBetweenPairsOfColons(cloudFormationTypeName);
  const resourceName = extractTextAfterLastColonPair(cloudFormationTypeName);

  if (serviceName && resourceName) {
    Object.entries(serviceValue.properties).forEach(([propertyName, propertyValue]) => {
      validationsDB[serviceName] = {
        ...validationsDB[serviceName],
        [resourceName]: {
          ...validationsDB[serviceName]?.[resourceName],
          [propertyName]: {
            errors: propertyValue.validation.errors,
            warnings: propertyValue.validation.warnings
          }
        }
      }
    })
  }
});

export { validationsDB as validations };
