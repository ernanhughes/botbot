# botbot

A chrome extension for detecting, highlighting and filtering AI generated content.


## Setup Instructions

1. Download and install [Chrome Dev channel](https://www.google.com/chrome/dev/) (
   or [Canary channel](https://www.google.com/chrome/canary/)).

- Ensure your Chrome version is equal to or newer than 127.0.6512.0.

2. Enable required Chrome flags:
    - Open a new tab and go to `chrome://flags/#optimization-guide-on-device-model`
    - Select "`Enabled BypassPerfRequirement`"

- This bypasses performance checks which might prevent Gemini Nano from downloading on your device.
    - Go to `chrome://flags/#prompt-api-for-gemini-nano`
    - Select "`Enabled`"
    - Go to `chrome://components/` - You'll want to see the "`Optimization Guide On Device Model`" - Click
      on "`Check for update`" and update the component.

3. Relaunch Chrome for the changes to take effect.

4. Install the Gemini Chrome AI - Offline extension (installation instructions to be added).

## Current Status

This project is still in development. Features and functionality may change as the project evolves.

## Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull
requests.

## To Set Up the Project Locally

1. Clone the repository:

```bash
git clone 
```

2. Install the dependencies:

```bash
npm install
npm run build
```

4. Load the extension in Chrome: Open Chrome and go to `chrome://extensions/` and enable Developer mode. Click on "Load
   unpacked" and select the `build/chrome` folder in the project directory.
5. The extension should now be loaded in Chrome.

## License

This project is licensed under the MIT License. For more information, please see the [LICENSE](LICENSE) file.