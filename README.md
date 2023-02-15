# @name-it-right/db

This is a DB of Name IT Right rules compatible with TypeScript software projects.

## Available exports

### `rawDB`
This format preserves the structure of the [CloudFormation resource provider schemas](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-type-schemas.html).

You can use `rawDB` like this:
```ts
import { rawDB } form "@name-it-right/db";

// access services/resources/properties like this:
const bucketNameValidations = rawDB[AWS::S3::Bucket].properties.BucketName.validations;
```

### `validations-safe`

This is a more convenient way to use validations. It currently requires manual work when new services/resources/properties are added. In the future, this should be automated in build-time to get a well-typed library for validations.

```ts
import { validationsSafe as validations } from "@name-it-right/db"

// access services/resources/properties like this:
const bucketNameValidations = validations.S3.Bucket.BucketName;
```


### `validations-unsafe`

This is an automated, but currently **a bit unsafe** way to use validations saved here to be a proof of concept how to  automatically generate TypeScript objects form JSON database. This automation results in getting less specific types that are based on TypeScript's [Record utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type). Currently `validations-unsafe` are generated **IN RUNTIME**. They are here just to show one of the ways how the validation data may be used some day, if developed further.

Because validations are based in the `Record<string, Service|Resource|Property>` indexed type, the IDE support is currently limited.

```ts
import { validationsUnsafe as validations } from "@name-it-right/db"

// access services/resources/properties like this:
const bucketNameValidations = validations.S3?.Bucket?.BucketName;
```

**Best practice when working with validations-unsafe**
```json
"noUncheckedIndexedAccess": true
```
should be added to the `compilerOptions` in the tsconfig of your application. This way, accessing `validations` object (generated in runtime, based currently on `Record<string, Service|Resource|Property>`) will force you to check for `undefined` when accessing the properties.