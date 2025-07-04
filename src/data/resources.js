export const resources = [
  // Slicers
  {
    id: 'cura',
    name: 'Ultimaker Cura',
    slug: 'cura',
    category: 'Slicers',
    description: 'The world\'s most popular 3D printing slicer, trusted by millions of users worldwide for its ease of use and powerful features.',
    shortDescription: 'Most popular 3D printing slicer by Ultimaker',
    icon: '/icons/cura.png',
    screenshot: '/screenshots/cura.webp',
    website: 'https://ultimaker.com/software/ultimaker-cura',
    price: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    tags: ['Slicer', 'Open Source', 'Beginner Friendly', 'Popular'],
    level: 'beginner'
  },
  {
    id: 'prusa-slicer',
    name: 'PrusaSlicer',
    slug: 'prusa-slicer',
    category: 'Slicers',
    description: 'Powerful, feature-rich slicer with professional-grade capabilities and advanced control over every aspect of printing.',
    shortDescription: 'Advanced 3D printing slicer by Prusa Research',
    icon: '/icons/prusaslicer.png',
    screenshot: '/screenshots/prusaslicer.png',
    website: 'https://www.prusa3d.com/prusaslicer/',
    price: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    tags: ['Slicer', 'Advanced', 'Professional', 'Open Source'],
    level: 'intermediate'
  },
  {
    id: 'bambu-studio',
    name: 'Bambu Studio',
    slug: 'bambu-studio',
    category: 'Slicers',
    description: 'Next-generation slicer with AI-powered features and advanced automation for exceptional print quality.',
    shortDescription: '3D slicer by Bambu Lab',
    icon: '/icons/bambustudio.png',
    screenshot: '/screenshots/bambu-studio.png',
    website: 'https://bambulab.com/en/download/studio',
    price: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    tags: ['Slicer', 'AI', 'Modern', 'Automation'],
    level: 'intermediate'
  },
  {
    id: 'orcaslicer',
    name: 'OrcaSlicer',
    slug: 'orcaslicer',
    category: 'Slicers',
    description: 'Advanced slicer for power users with cutting-edge features and rapid development cycle.',
    shortDescription: 'Advanced slicer for power users with rapid development',
    icon: '/icons/OrcaSlicer.ico',
    screenshot: '/screenshots/orca.png.avif',
    website: 'https://github.com/SoftFever/OrcaSlicer',
    price: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    tags: ['Slicer', 'Advanced', 'Open Source', 'Customizable'],
    level: 'advanced'
  },

  // Tools
  {
    id: 'qrcode2stl',
    name: 'QRcode2stl',
    slug: 'qrcode2stl',
    category: 'Tools',
    description: 'Create custom 3D-printable tags from QR codes and Spotify codes with customizable 3D models.',
    shortDescription: 'Create QR codes, Spotify codes, and Text tags for 3D printing',
    icon: '/icons/qr2stl-icon.png',
    screenshot: '/screenshots/qr2stl.png',
    website: 'https://printer.tools/qrcode2stl',
    price: 'Free',
    platforms: ['Web'],
    tags: ['QR Code', 'Spotify', 'NFC', 'Functional', 'Tags'],
    madeByMe: true,
  },
  {
    id: 'bento3d',
    name: 'Bento3D',
    slug: 'bento3d',
    category: 'Tools',
    description: 'Elegant online generator for creating custom 3D printable boxes and partitions for organization.',
    shortDescription: 'Custom box generator',
    icon: '/icons/bento3d.png',
    screenshot: '/screenshots/bento3d.png',
    website: 'https://bento3d.design',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Generator', 'Boxes', 'Organization', 'Parametric']
  },
  {
    id: 'gridfinity-generator',
    name: 'Gridfinity Generator',
    slug: 'gridfinity-generator',
    category: 'Tools',
    description: 'Generate custom Gridfinity base plates and bins for the popular modular organization system.',
    shortDescription: 'Modular organization system',
    icon: '/icons/gridfinitygenerator.png',
    screenshot: '/screenshots/gridfinitygenerator.png',
    website: 'https://gridfinity.xyz',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Gridfinity', 'Organization', 'Modular', 'Workshop']
  },
  {
    id: 'perplexing-labs-gridfinity',
    name: 'Perplexing Labs Gridfinity',
    slug: 'perplexing-labs-gridfinity',
    category: 'Tools',
    description: 'The most comprehensive Gridfinity generator with advanced features and professional-grade customization.',
    shortDescription: 'Advanced Gridfinity generator',
    icon: '/icons/gridfinity-perplexinglabs-icon.png',
    screenshot: '/screenshots/gridfinity-perplexinglabs-screenshot.png',
    website: 'https://gridfinity.perplexinglabs.com',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Gridfinity', 'Advanced', 'Professional', 'CAD']
  },
  {
    id: 'stlgears',
    name: 'STL Gears',
    slug: 'stlgears',
    category: 'Tools',
    description: 'Generate custom 3D printable gears with precise specifications for mechanical projects and repairs.',
    shortDescription: 'Parametric gear generator',
    icon: '/icons/stlgears.png',
    screenshot: '/screenshots/stlgears.png',
    website: 'https://stlgears.com',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Gears', 'Mechanical', 'Engineering', 'Functional']
  },
  {
    id: 'itslitho',
    name: 'ItsLitho',
    slug: 'itslitho',
    category: 'Tools',
    description: 'Transform your photos into stunning 3D printable lithophanes with easy-to-use online converter.',
    shortDescription: 'Photo to lithophane converter',
    icon: '/icons/itslitho.png',
    screenshot: '/screenshots/itslitho.png',
    website: 'https://itslitho.com',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Lithophane', 'Photos', 'Art', 'Gifts']
  },
  {
    id: 'fullcontrol',
    name: 'FullControl Design Library',
    slug: 'fullcontrol',
    category: 'Tools',
    description: 'Revolutionary tool for generating GCode for non-planar 3D printing and complex geometries.',
    shortDescription: 'Non-planar printing GCode generator',
    icon: '/icons/fullcontrol-favicon.png',
    screenshot: '/screenshots/fullcontrol.png',
    website: 'https://fullcontrol.xyz',
    price: 'Free',
    platforms: ['Web'],
    tags: ['GCode', 'Non-planar', 'Advanced', 'Research']
  },
  {
    id: 'octoeverywhere',
    name: 'OctoEverywhere',
    slug: 'octoeverywhere',
    category: 'Tools',
    description: 'Remote access and control for OctoPrint, allowing you to monitor and manage your 3D printer from anywhere.',
    shortDescription: 'Remote OctoPrint access and control',
    icon: '/icons/octoeverywhere.png',
    screenshot: '/screenshots/octoeverywhere.png',
    website: 'https://octoeverywhere.com',
    price: 'Free',
    platforms: ['Web', 'Android', 'iOS'],
    tags: ['Remote Control', 'OctoPrint', 'Monitoring', 'Mobile'],
  },

  // Online Guides
  {
    id: '3d-sourced-troubleshooting',
    name: '44 Common 3D Print Problems',
    slug: '3d-sourced-troubleshooting',
    category: 'Online Guides',
    description: 'Comprehensive troubleshooting guide covering virtually every 3D printing problem with detailed solutions.',
    shortDescription: 'Ultimate troubleshooting guide',
    icon: '/icons/3dsourced.png',
    screenshot: '/screenshots/3dsourced-guide.png',
    website: 'https://www.3dsourced.com/rigid-ink/ultimate-3d-printing-troubleshooting-guide/',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Troubleshooting', 'Problems', 'Solutions', 'Guide']
  },
  {
    id: 'teaching-tech-calibration',
    name: 'Teaching Tech 3D Printer Calibration',
    slug: 'teaching-tech-calibration',
    category: 'Online Guides',
    description: 'The most comprehensive systematic approach to 3D printer calibration for perfect print quality.',
    shortDescription: 'Complete calibration guide series',
    icon: '/icons/tt.png',
    screenshot: '/screenshots/teachingtech-guide.jpeg',
    website: 'https://teachingtechyt.github.io/calibration.html',
    price: 'Free',
    platforms: ['Web', 'YouTube'],
    tags: ['Calibration', 'Education', 'Video Series', 'Setup']
  },
  {
    id: 'r3dprinting-beginners-guide',
    name: '/r/3Dprinting Beginner\'s Guide',
    slug: 'r3dprinting-beginners-guide',
    category: 'Online Guides',
    description: 'A beginner-friendly guide by the /r/3Dprinting community helping new users get started with 3D printing.',
    shortDescription: 'Beginner\'s guide by the /r/3Dprinting Reddit community',
    icon: '/icons/r3dprinting.png',
    screenshot: '/screenshots/r3dprinting.png',
    website: 'https://www.reddit.com/r/3Dprinting/wiki/gettingstarted/',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Beginner', 'Guide', 'Community', 'Reddit']
  },
  {
    id: 'simplify3d-print-quality',
    name: 'Simplify3D Print Quality Guide',
    slug: 'simplify3d-print-quality',
    category: 'Online Guides',
    description: 'In-depth guide to understanding and improving 3D print quality with practical tips and troubleshooting techniques.',
    shortDescription: 'In-depth print quality guide',
    icon: '/icons/simplify3d.ico',
    screenshot: '/screenshots/simplify3d.jpeg',
    website: 'https://www.simplify3d.com/resources/print-quality-troubleshooting/',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Print Quality', 'Troubleshooting', 'Guide', 'Professional']
  },

  // CAD Software
  {
    id: 'fusion-360',
    name: 'Autodesk Fusion 360',
    slug: 'fusion-360',
    category: 'CAD Software',
    description: 'Professional 3D CAD, CAM, CAE, and PCB software platform that brings together design, engineering, and manufacturing.',
    shortDescription: 'Professional 3D CAD software',
    icon: '/icons/fusion360.webp',
    screenshot: '/screenshots/fusion.png.avif',
    website: 'https://www.autodesk.com/products/fusion-360',
    price: 'Free for personal use',
    platforms: ['Windows', 'macOS', 'Web'],
    tags: ['CAD', 'Professional', 'Parametric', 'Design', 'Engineering']
  },
  {
    id: 'freecad',
    name: 'FreeCAD',
    slug: 'freecad',
    category: 'CAD Software',
    description: 'Open-source parametric 3D CAD modeler designed for mechanical engineering and product design.',
    shortDescription: 'Open-source parametric CAD',
    icon: '/icons/freecad.ico',
    screenshot: '/screenshots/freecad.avif',
    website: 'https://www.freecad.org',
    price: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    tags: ['CAD', 'Open Source', 'Parametric', 'Engineering']
  },
  {
    id: 'tinkercad',
    name: 'Tinkercad',
    slug: 'tinkercad',
    category: 'CAD Software',
    description: 'Beginner-friendly online CAD tool for creating 3D models, electronics, and coding projects.',
    shortDescription: 'Beginner-friendly online CAD',
    icon: '/icons/tinkercad-logo.png',
    screenshot: '/screenshots/tinkercad.webp',
    website: 'https://www.tinkercad.com',
    price: 'Free',
    platforms: ['Web'],
    tags: ['CAD', 'Beginner', 'Online', 'Education']
  },
  {
    id: 'openscad',
    name: 'OpenSCAD',
    slug: 'openscad',
    category: 'CAD Software',
    description: 'Script-based 3D CAD modeler that allows you to create complex models using a programming language.',
    shortDescription: 'Script-based 3D CAD',
    icon: '/icons/openscad.png',
    screenshot: '/screenshots/openscad.png',
    website: 'https://www.openscad.org',
    price: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    tags: ['CAD', 'Scripting', 'Programming', 'Advanced']
  },
  {
    id: 'blender',
    name: 'Blender',
    slug: 'blender',
    category: 'CAD Software',
    description: 'Powerful open-source 3D creation suite for modeling, animation, rendering, and more.',
    shortDescription: 'Open-source 3D creation suite',
    icon: '/icons/blender.png',
    screenshot: '/screenshots/blender.png',
    website: 'https://www.blender.org',
    price: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    tags: ['3D Modeling', 'Animation', 'Open Source', 'Professional']
  },
  {
    id: 'onshape',
    name: 'Onshape',
    slug: 'onshape',
    category: 'CAD Software',
    description: 'Cloud-based CAD platform that allows teams to collaborate on 3D designs in real-time from anywhere.',
    shortDescription: 'Cloud-based collaborative CAD',
    icon: '/icons/onshape.png',
    screenshot: '/screenshots/onshape.webp',
    website: 'https://www.onshape.com',
    price: 'Free for public projects',
    platforms: ['Web', 'iOS', 'Android'],
    tags: ['CAD', 'Cloud', 'Collaboration', 'Real-time']
  },
  {
    id: 'solidworks',
    name: 'SolidWorks',
    slug: 'solidworks',
    category: 'CAD Software',
    description: 'Industry-leading 3D CAD software for product design and engineering with advanced simulation capabilities.',
    shortDescription: 'Industry-leading 3D CAD',
    icon: '/icons/solidworks.ico',
    screenshot: '/screenshots/solidworks.jpg.webp',
    website: 'https://www.solidworks.com',
    price: 'Paid (trial available)',
    platforms: ['Windows'],
    tags: ['CAD', 'Professional', 'Engineering', 'Simulation']
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    slug: 'autocad',
    category: 'CAD Software',
    description: 'Professional 2D and 3D CAD software for drafting, design, and documentation in various industries.',
    shortDescription: 'Professional drafting and design software',
    icon: '/icons/autocad.png.avif',
    screenshot: '/screenshots/autocad.jpg.avif',
    website: 'https://www.autodesk.com/products/autocad',
    price: 'Paid',
    platforms: ['Windows', 'macOS'],
    tags: ['CAD', 'Drafting', 'Design', 'Documentation']
  },

  // Model Libraries
  {
    id: 'thingiverse',
    name: 'Thingiverse',
    slug: 'thingiverse',
    category: 'Model Libraries',
    description: 'The world\'s largest collection of free 3D printable designs with millions of models from the global maker community.',
    shortDescription: 'Probably the largest free 3D model repository. Owned by UltiMaker.',
    icon: '/icons/thingiverse.png',
    screenshot: '/screenshots/thingiverse-screen.jpeg',
    website: 'https://www.thingiverse.com',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Models', 'Community', 'Free', 'STL', 'Designs']
  },
  {
    id: 'printables',
    name: 'Printables',
    slug: 'printables',
    category: 'Model Libraries',
    description: 'Prusa\'s premium platform for high-quality 3D printing projects with detailed documentation and curated content.',
    shortDescription: '3D model platform by 3D printing experts Prusa Research',
    icon: '/icons/printables.webp',
    screenshot: '/screenshots/printables.jpeg',
    website: 'https://www.printables.com',
    price: 'Free',
    platforms: ['Web'],
    tags: ['Models', 'Quality', 'Projects', 'Prusa', 'Community']
  },
  {
    id: 'grabcad',
    name: 'GrabCAD',
    slug: 'grabcad',
    category: 'Model Libraries',
    description: 'Professional-grade CAD model library with millions of high-quality models for engineering and design.',
    shortDescription: 'Professional CAD model library',
    icon: '/icons/grabcad.ico',
    screenshot: '/screenshots/grabcad.jpeg',
    website: 'https://grabcad.com/library',
    price: 'Free',
    platforms: ['Web'],
    tags: ['CAD', 'Models', 'Engineering', 'Professional', 'Library']
  },
  {
    id: 'myminifactory',
    name: 'MyMiniFactory',
    slug: 'myminifactory',
    category: 'Model Libraries',
    description: 'Curated platform for high-quality 3D printable models with a focus on design and community engagement where users can also sell their designs.',
    shortDescription: '3D model platform with creator marketplace',
    icon: '/icons/myminifactory.png',
    screenshot: '/screenshots/myminifactory.jpeg',
    website: 'https://www.myminifactory.com',
    price: 'Free (paid models available)',
    platforms: ['Web'],
    tags: ['Models', 'Community', 'Curated', 'Design', '3D Printing']
  },
  {
    id: 'cults3d',
    name: 'Cults3D',
    slug: 'cults3d',
    category: 'Model Libraries',
    description: 'Marketplace for 3D models with a wide range of categories and high-quality assets.',
    shortDescription: '3D model marketplace with a wide range of categories',
    icon: '/icons/cults3d.png',
    screenshot: '/screenshots/cults3d.jpeg',
    website: 'https://cults3d.com',
    price: 'Free (paid models available)',
    platforms: ['Web'],
    tags: ['Models', 'Marketplace', '3D Assets', 'Community', 'Design']
  },
  {
    id: 'cgtrader',
    name: 'CGTrader',
    slug: 'cgtrader',
    category: 'Model Libraries',
    description: 'Marketplace for 3D models with a wide range of categories and professional-grade assets for various industries.',
    shortDescription: 'Professional 3D model marketplace',
    icon: '/icons/cgtrader.jpg',
    screenshot: '/screenshots/cgtrader.jpeg',
    website: 'https://www.cgtrader.com',
    price: 'Free (paid models available)',
    platforms: ['Web'],
    tags: ['Models', 'Marketplace', 'Professional', '3D Assets']
  },

  // Other
  {
    id: 'octoprint',
    name: 'OctoPrint',
    slug: 'octoprint',
    category: 'Other',
    description: 'Premier web-based interface for controlling and monitoring 3D printers remotely with advanced features.',
    shortDescription: 'Remote printer control and monitoring web interface',
    icon: '/icons/octoprint.png',
    screenshot: '/screenshots/octoprint.png',
    website: 'https://octoprint.org',
    price: 'Free',
    platforms: ['Raspberry Pi', 'Linux', 'Windows', 'macOS'],
    tags: ['Remote Control', 'Monitoring', 'Web Interface', 'Raspberry Pi']
  }
];

export const categories = [
  'Tools',
  'Slicers',
  'Online Guides',
  'Books',
  'Model Libraries',
  'CAD Software',
  'Other'
];

export const getResourceBySlug = (slug) => {
  return resources.find(resource => resource.slug === slug);
};

export const getResourcesByCategory = (category) => {
  return resources.filter(resource => resource.category === category);
};
