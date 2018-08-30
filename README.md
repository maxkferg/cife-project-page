# Max Ferguson - Research

Research website for work at Stanford University

## Quick Start
Update npm and node. Then:
```sh
npm run dev
```

## Deployment
Files can be automatically uploaded to S3 for deployment.
The script assumes that the AWS credentials are available in ~/.aws/credentials. To check for the credentials:
```sh
cat ~/.aws/credentials
```

To deploy the website:
```sh
npm run deploy
```

## Useful links (Material Compnent Library)

- [Getting Started Guide](docs/getting-started.md)
- [Contributing](CONTRIBUTING.md)
- [Material.io](https://www.material.io) (external site)
- [Material Design Guidelines](https://material.io/guidelines) (external site)

## Browser support

We officially support the last two versions of every major browser. Specifically, we test on the following browsers:

- **Chrome** on Android, Windows, macOS, and Linux
- **Firefox** on Windows, macOS, and Linux
- **Safari** on iOS and macOS
- **Edge** on Windows
- **IE 11** on Windows

## Thank you

Fast, reliable [automated screenshot testing](test/screenshot/) is generously provided by:

[![CrossBrowserTesting logo](test/screenshot/static/images/cbt-logo.png)](https://crossbrowsertesting.com/)

Free for open source projects!

Additional continuous integration services courtesy of:

- [Travis CI](https://travis-ci.com/)
- [Sauce Labs](https://saucelabs.com/)
