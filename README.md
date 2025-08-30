# LigifyDB

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The web interface for [LigifyDB](https://ligify.groov.bio) - a database of predicted transcription factor biosensors for synthetic biology applications.

## About LigifyDB

LigifyDB is an open-source database of bacterial transcription factor-ligand associations predicted from genome context. Bacterial transcription factors are core "sensor" components that power synthetic biology applications, such as high-throughput chemical screening, diagnostics, dynamic feedback regulation, cellular logic, and live cell therapeutics.

### Key Features

- **Large Dataset**: Contains 3,164 unique sensors and 1,667 unique ligands
- **Rich Visualizations**: React app enables viewing 3D protein structures, chemical structures, genome context
- **Search & Filter**: Query the database via chemical similarity or filtering by sensor properties
- **Plasmid Designer**: Custom tool to build fluorescent reporter circuits with modular parts
- **Fast**: Instantly fetch sensor records from a static DB, which users can also download

## Live Demo

Visit the live application at [https://ligify.groov.bio](https://ligify.groov.bio)

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/groov-bio/ligify-ui.git
cd ligify-ui

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Technology Stack

### Frontend Framework

- **React 18** - Modern React with hooks and functional components
- **Material-UI v5** - Comprehensive React UI component library
- **React Router v6** - Client-side routing

### Data Visualization

- **Nightingale Structure** - 3D protein structure visualization using Mol\*
- **SMILES Drawer** - Chemical structure visualization
- **Konva/React-Konva** - 2D canvas library for custom visualizations

### State Management

- **Zustand** - Lightweight state management
- **React Query** - Data fetching library

### Development Tools

- **Webpack 5** - Module bundler
- **Babel** - JavaScript compiler
- **Prettier** - Code formatting

## Project Structure

```
src/
├── Components/           # React components
│   ├── AboutPage/           # About pages and documentation
│   ├── BrowsePage.js        # Browse page
│   ├── RegulatorPage/       # Biosensor data visualization
│   └── NavigationBar.js     # Nav bar
├── lib/                 # Utility libraries and validation
├── utils/               # Helper functions
├── stores/              # State stores
└── css/                 # Stylesheets
```

## Key Components

### Biosensor Visualization

- **Structure.js** - 3D protein structure viewer using Nightingale
- **LigandViewer.js** - Chemical structure visualization
- **ProteinSeq.js** - Protein sequence display
- **PlasmidDesigner.js** - Interface for building reporter circuits
- **GenomeContext.js** - Genetic context visualization

### Data Management

- **Search.js** - Main search interface
- **BrowsePage.js** - Biosensor data table with filtering

## Database

All data is accessed from a 12MB file located here

```
public/
├── ligifyDB.json
```

## Citation

If you use ligifyDB in your research, please cite:

> d'Oelsnitz, S., Love, J.D., et al. "Ligify: Automated Genome Mining for Ligand-Inducible Transcription Factors" _ACS Synthetic Biology_ (2024). DOI: [10.1021/acssynbio.4c00372](https://doi.org/10.1021/acssynbio.4c00372)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Simon d'Oelsnitz** - _Lead developer_ - [simondoelsnitz.com](https://simondoelsnitz.com)
- **Joshua D. Love** - _Co-developer_

## Acknowledgments

- The Rhea team at the Swiss Institute of Bioinformatics
- The open source libraries that make this project possible

## Support

- 📖 Documentation: [ligify.groov.bio/about](https://ligify.groov.bio/about)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/groov-bio/ligify-ui/issues)
- 💬 Contact: Use the contact form at [ligify.groov.bio/about](https://ligify.groov.bio/about)

---
