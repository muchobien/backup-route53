import {
  ListResourceRecordSetsCommand,
  type Route53Client,
  type ResourceRecordSet
} from '@aws-sdk/client-route-53'

export async function getRecords(
  client: Route53Client,
  hostedZoneId: string
): Promise<ResourceRecordSet[]> {
  const {ResourceRecordSets} = await client.send(
    new ListResourceRecordSetsCommand({
      HostedZoneId: hostedZoneId
    })
  )

  return ResourceRecordSets || []
}
