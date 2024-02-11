import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('utils')
/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken) {
  console.log('jwtToken', jwtToken)
  const decodedJwt = jsonwebtoken.decode(jwtToken)
  return decodedJwt.sub
}
// export function getUserId(authorizationHeader) {
//   console.log(authorizationHeader)
//   const split = authorizationHeader.split(' ')
//   const jwtToken = split[1]

//   const decodedJwt = jsonwebtoken.decode(jwtToken)
//   return decodedJwt.sub
// }