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

### `validations`

This is our more convenient way to use validations.

Currently `validations` are generated **IN RUNTIME**. They are here just to show one of the ways how the validation data may be used some day, if developed further.

Because validations are based in the `Record<string, Service|Resource|Property>` indexed type, the IDE support is currently limited.

```ts
import { validations } from "@name-it-right/db"

// access services/resources/properties like this:
const bucketNameValidations = validations.S3?.Bucket?.BucketName;
```

**Best practices for working with validations**
```json
"noUncheckedIndexedAccess": true
```
should be added to the `compilerOptions` in the tsconfig of your application. This way, accessing `validations` object (generated in runtime, based currently on `Record<string, Service|Resource|Property>`) will force you to check for `undefined` when accessing the properties.