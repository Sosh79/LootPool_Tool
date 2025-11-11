# Loot Pool Management Tool

A desktop application built with Electron.js for managing game loot pools with an intuitive graphical interface.

![Electron](https://img.shields.io/badge/Electron-28.0.0-47848F?style=flat&logo=electron)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎮 DayZ Mod Integration

This tool is designed to work seamlessly with the **[BS KeyRoom](https://steamcommunity.com/sharedfiles/filedetails/?id=3514469093)** DayZ mod, allowing you to create and manage custom loot pools quickly and efficiently.

The Snafu Loot Pools mod enables server administrators to configure complex loot spawning systems with rewards, attachments, and nested items - all made easier with this graphical tool!

## ✨ Features

- ✅ **Loot Pool Creation**: Create and manage multiple loot pools with custom names
- ✅ **Multiple Rewards**: Add unlimited rewards to each loot pool
- ✅ **Attachments Support**: Add attachments to any reward
- ✅ **Nested Attachments**: Support for attachments within attachments
- ✅ **Random Names**: Add multiple random name options for attachments
- ✅ **Live JSON Preview**: Real-time JSON preview of your configuration
- ✅ **File Operations**: Save and load JSON files
- ✅ **Copy to Clipboard**: Export JSON directly to clipboard
- ✅ **Modern UI**: Clean and intuitive user interface

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/sosh79/lootpool-tool.git
cd lootpool-tool
```

2. Install dependencies:

```bash
npm install
```

3. Run the program:

```bash
npm start
```

## 📖 Usage

### Creating a Loot Pool

1. **Set Loot Pool Name**: Enter a name for your loot pool in the first field
2. **Add Rewards**: Click the "+ Add Reward" button to add a new reward
3. **Configure Reward Properties**:
   - **Name**: Item name (e.g., "Snafu_ScarH_Tan_GUN")
   - **Chance to Spawn**: Probability value (0-1)
   - **Quantity Min/Max**: Minimum and maximum spawn quantities

### Adding Attachments

1. Click "+ Add Attachment" within any reward card
2. Enter the attachment name
3. Set the quantity
4. Optionally add random names by clicking the "+" button
5. Add nested attachments using the "+ Add Nested" button

### File Operations

- **💾 Save File**: Save your loot pool configuration to a JSON file
- **📂 Open File**: Load an existing JSON configuration
- **📋 Copy JSON**: Copy the current configuration to clipboard

## 📁 Project Structure

```
LootPool_Tool/
├── main.js          # Electron main process
├── index.html       # Application UI
├── styles.css       # Styling
├── renderer.js      # Application logic
├── package.json     # Project configuration
└── README.md        # Documentation
```

## 📄 JSON Structure Example

```json
{
  "lootPoolName": "Loot1",
  "rewards": [
    {
      "name": "Snafu_ScarH_Tan_GUN",
      "chanceToSpawn": 1,
      "quantityMin": 1,
      "quantityMax": 1,
      "attachments": [
        {
          "name": "SNAFU_ScarH_100RND_Mag_Tan",
          "random_names": [],
          "quantity": 1,
          "attachments": []
        },
        {
          "name": "SNAFU_FGCR_Grip",
          "random_names": [],
          "quantity": 1,
          "attachments": []
        }
      ]
    }
  ]
}
```

## 🛠️ Built With

- [Electron](https://www.electronjs.org/) - Desktop application framework
- HTML/CSS/JavaScript - UI and functionality
- Node.js - Runtime environment

## ⚙️ Requirements

- Node.js (version 14 or higher)
- npm or yarn

## � Related Links

- **DayZ Mod**: [BS KeyRoom on Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3514469093)
- **Purpose**: Create loot pool configurations for DayZ servers faster and easier

## �🔧 Development

To build the application for distribution:

```bash
npm run build
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Saad

- GitHub: [@sosh79](https://github.com/sosh79)

## ⭐ Show your support

Give a ⭐️ if this project helped you!
