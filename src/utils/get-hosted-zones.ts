import {
  ListHostedZonesCommand,
  type Route53Client
} from '@aws-sdk/client-route-53'

type HostedZone = {
  id: string
  name: string
}

export async function getHostedZones(
  client: Route53Client
): Promise<HostedZone[]> {
  const {HostedZones} = await client.send(new ListHostedZonesCommand({}))

  return (
    HostedZones?.map(({Id, Name}) => ({
      id: Id,
      name: Name
    })) || []
  ).filter((zone): zone is HostedZone => !!(zone.id && zone.name))
}
