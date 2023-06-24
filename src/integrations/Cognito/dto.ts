import { AWSError } from 'aws-sdk'

export class CognitoSignupPayloadDTO {
  public email: string
  public password: string
  public username: string
}

export class SuccessAwsReturnDTO<T> {
  isSuccess: true
  result: T
}

export class FailedAwsReturnDTO {
  isSuccess: false
  result: AWSError
}
