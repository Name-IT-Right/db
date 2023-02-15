import { rawDB } from "../../../../db"

export const BucketName = rawDB["AWS::S3::Bucket"].properties.BucketName.validation;