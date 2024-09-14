# Email Verification Code Notification Service

## Overview

This project is an Email Verification Code Notification Service. It reads email configurations from a `config.yml` file, connects to the specified email services, and sends notifications for verification codes using the Bark server.

## Features

- Connects to multiple email services.
- Reads configuration from a YAML file.
- Sends verification code notifications using the Bark server.
- Supports multiple platforms including Linux, macOS, and Windows.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/emailforwarder.git
    cd emailforwarder
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `config.yml` file in the root directory with the following structure:
    ```yaml
    barkServer: "your_bark_server_url"
    emailConfigs:
      - host: "imap.example.com"
        port: 993
        user: "your-email@example.com"
        password: "your-email-password"
    ```

## Usage

### Development

To start the service in development mode with automatic restarts on file changes:

```sh
npm run dev
```

### Production

To build the application for production:

```sh
npm run build
```

To run the application in production mode:

```sh
npm run start
```

### Package

```sh
npm run pkg
```

## Docker

### Build and Run

For x64 architecture:

```sh
docker build -t emailforwarder-x64 -f Dockerfile .
docker run -d --name emailforwarder-x64 emailforwarder-x64
```

For arm64 architecture:

```sh
docker build -t emailforwarder-arm64 -f Dockerfile-arm .
docker run -d --name emailforwarder-arm64 emailforwarder-arm64
```

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International Public License. See the [LICENSE](./LICENSE) file for details.

## Author

- **helsonlin** - [helsonlin@163.com](mailto:helsonlin@163.com)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgements

- [axios](https://github.com/axios/axios)
- [imap](https://github.com/mscdex/node-imap)
- [js-yaml](https://github.com/nodeca/js-yaml)
- [mailparser](https://github.com/nodemailer/mailparser)
- [pkg](https://github.com/vercel/pkg)

