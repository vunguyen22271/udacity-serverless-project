import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('auth')

const certificate = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJEk0FWvC2tRFWMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi1sbXAzOHlraGptbGVydnp4LnVzLmF1dGgwLmNvbTAeFw0yNDAyMDkx
NTI2NDZaFw0zNzEwMTgxNTI2NDZaMCwxKjAoBgNVBAMTIWRldi1sbXAzOHlraGpt
bGVydnp4LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAJ1mNO4N2By3BAzXe3usEI4ZQ1Kx8VpAwYwhkcNDpPLxZKbpLbQtfJU3v7HK
ZjqBAxf3/2RzgTeBbWFvnqZ58ZRuIYt/RLI9iFihhxkaiDYZwZJRHjJxefHxW0gi
5E+xYXnY9w1Zh/Ppr+jFAZNAt4lXjuDtpjTIfq/le2eOPKT7fsn/TIhT5k9mGMhh
jNWiAti0e5ZB0jP5VxNVeJOxzokbTBTz2xwsBMLP0ZvPmsXRdOUwBjvc3BEdMFhL
8q+FVEXkkjYJHN57VNnJ3qMDWj8+hzgxMMUASPAkydzveb8seAMz9/7t3yQvzfUZ
wy86MOZ5kHwfYaL77RNOyK14N3kCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQU5T3ZCK5ex/jS3W4z5Xmnkd6WRogwDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQBfUnbFiPFEwHqmw3B8lBZUBlFpfYS1XpTmvSO/vJft
RMXjFUG35guGAWkkD69pN+dTxjof97Erk4Szhu98oXV4Vzdb3PC+CTtS8lKyBxxJ
4cBoEFlmd3F7fV4zSiPKvovB9XeDcVxXlNT3RDaNb0S232zXiczn77XVM/PgXkLK
AkLgw5UW2eSZHTMbcc6x7V3h4VttAClcmBKyDOJskAYouS2sB8iD96ZXt7+8qkM8
TgB2XuZiiqX/FA2cG3Og8gCFUPTMpZPJ6ArTbsAiZRr8efDZtONmzCgorcTRiDiV
AqrnkAptbT+SRYaOFXHMiOfkDZWFF6rtNihoYuMQygbo
-----END CERTIFICATE-----`

const jwksUrl = 'https://test-endpoint.auth0.com/.well-known/jwks.json'

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User valid authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader) {
  if (!authHeader) throw new Error('No authorization header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authorization header')

  const split = authHeader.split(' ')
  const token = split[1]

  return jsonwebtoken.verify(token, certificate, { algorithms: ['RS256'] })
}