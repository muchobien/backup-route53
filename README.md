<p align="center">
  <a href="https://github.com/muchobien/backup-route53/actions/workflows/codeql-analysis.yml"><img src="https://github.com/muchobien/backup-route53/actions/workflows/codeql-analysis.yml/badge.svg?branch=main" alt="CodeQL"></a>
<a href="https://github.com/muchobien/backup-route53/actions/workflows/test.yml"><img src="https://github.com/muchobien/backup-route53/actions/workflows/test.yml/badge.svg?branch=main" alt="build-test"></a>
</p>

# "Backup Route53" Action For GitHub Actions

A Github action to backup Route53 DNS records.

## Usage

Add the following step to your workflow:

```yaml
- name: Backup Route53
  uses: muchobien/backup-route53@v1
  with:
    excludes: 'example.com' # optional
    path: ./muchobien-backup-route53 # optional, default ./muchobien-backup-route53
```

## License Summary

This code is made available under the MIT license.
