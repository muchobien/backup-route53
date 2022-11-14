import {Route53Client} from '@aws-sdk/client-route-53'
import type {Input} from './input'
import type {Output} from './output'
import {getHostedZones} from './utils/get-hosted-zones'
import {getRecords} from './utils/get-records'

export const action = async (input: Input, output: Output): Promise<void> => {
  const {excludes} = input

  // Used for testing
  const endpoint = process.env['AWS_ENDPOINT_URL']
  const region = process.env['AWS_REGION']
  output.debug('Initializing Route53 client')
  output.debug(`AWS endpoint override: ${endpoint}`)
  const client = new Route53Client({endpoint, region})

  output.startGroup('Getting hosted zones')
  const hostedZones = await getHostedZones(client)
  output.debug(JSON.stringify(hostedZones, null, 2))
  output.endGroup()

  const included = hostedZones.filter(({name}) => !excludes.includes(name))

  output.startGroup('Getting records')
  for await (const zone of included) {
    const records = await getRecords(client, zone.id)
    output.debug(`Zone: ${zone.name}`)
    output.debug(JSON.stringify(records, null, 2))
    await output.saveToPath(`${zone.name}.json`.replace('..', '.'), records)
  }
  output.endGroup()
}
