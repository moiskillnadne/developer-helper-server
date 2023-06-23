import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AWSError, CognitoIdentityServiceProvider, Credentials } from 'aws-sdk'
import { Environment } from '../../core/constants/environment'
import { CognitoSignupPayloadDTO } from './dto'

@Injectable()
export class CognitoService {
  private config: CognitoIdentityServiceProvider.Types.ClientConfiguration = {
    region: this.configService.get(Environment.CognitoRegion),
    credentials: new Credentials(
      this.configService.get(Environment.AwsAccessKey),
      this.configService.get(Environment.AwsSecretAccessKey),
    ),
  }

  private clientId = this.configService.get(Environment.CognitoClientId)
  private authFlow = 'USER_PASSWORD_AUTH'
  private refreshFlow = 'REFRESH_TOKEN_AUTH'

  cognitoIdentity: CognitoIdentityServiceProvider

  constructor(protected configService: ConfigService) {
    this.cognitoIdentity = new CognitoIdentityServiceProvider(this.config)
  }

  async signUp(userInfo: CognitoSignupPayloadDTO): Promise<CognitoIdentityServiceProvider.SignUpResponse | AWSError> {
    const { password, email } = userInfo

    const params: CognitoIdentityServiceProvider.SignUpRequest = {
      ClientId: this.clientId,
      Password: password,
      Username: email,
    }

    try {
      const result = await this.cognitoIdentity.signUp(params).promise()
      return result
    } catch (e) {
      throw e
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<CognitoIdentityServiceProvider.InitiateAuthResponse | AWSError> {
    const params = {
      AuthFlow: this.authFlow,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    }

    try {
      const result = await this.cognitoIdentity.initiateAuth(params).promise()
      return result
    } catch (e) {
      throw e
    }
  }

  async refresh(refreshToken: string): Promise<CognitoIdentityServiceProvider.InitiateAuthResponse | AWSError> {
    const params = {
      AuthFlow: this.refreshFlow,
      ClientId: this.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    }

    try {
      const result = await this.cognitoIdentity.initiateAuth(params).promise()
      return result
    } catch (e) {
      throw e
    }
  }

  async logout(token: string): Promise<CognitoIdentityServiceProvider.Types.GlobalSignOutResponse | AWSError> {
    const params = {
      AccessToken: token,
    }

    try {
      const result = await this.cognitoIdentity.globalSignOut(params).promise()
      return result
    } catch (e) {
      throw e
    }
  }

  async getUser(AccessToken: string): Promise<CognitoIdentityServiceProvider.Types.GetUserResponse | AWSError> {
    const params: CognitoIdentityServiceProvider.Types.GetUserRequest = { AccessToken }

    try {
      const cognitoUser = await this.cognitoIdentity.getUser(params).promise()
      return cognitoUser
    } catch (e) {
      throw e
    }
  }

  public getCognitoUserAttribute(cognitoUser, attribute: string): string | undefined {
    const attributeObject = cognitoUser['UserAttributes'].find((attr) => attr['Name'] === attribute)

    if (!attributeObject) {
      return undefined
    }

    const searchedAttribute = attributeObject['Value']

    if (!searchedAttribute) {
      return undefined
    }

    return searchedAttribute
  }
}
