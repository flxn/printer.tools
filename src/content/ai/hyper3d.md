## Hyper3D - Rodin AI Workspace

**Hyper3D** (formerly Rodin AI) delivers a suite of tools for building avatars, props, and full-scene assets from text prompts, multiview image sets, or reference photos. The browser interface leans on WebGPU for real-time previews, while OmniCraft and Remix pipelines help you iterate on materials and lighting before exporting.

### Core Workflow
- **Text, image, and multiview generators** turn storyboard art or selfies into rig-ready models with optional T/A pose alignment
- **Remix mode** lets you swap outfits, restyle characters, or bake normal maps without recreating geometry from scratch
- **Credits-based plans** start with a 7-day Creator trial (30 credits/month at $24) and scale up to discounted business tiers with priority processing
- **API and asset marketplace** provide programmatic access plus community-sourced showcases you can fork for new iterations

### Implementation Tips
Hyper3D outputs rigged meshes and baked texture packs ideal for games, animation, or stylized 3D prints. For printing, download the mesh variant, inspect for thin features, and consider using the baked normals as a guide for painting post-processing detail.
