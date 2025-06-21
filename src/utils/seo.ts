// SEO utility functions for Printer.tools

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  article?: boolean;
  noindex?: boolean;
  canonical?: string;
}

export const defaultSEO: SEOData = {
  title: "Printer.tools - 3D Printing Tools & Resources",
  description: "Your one-stop resource for 3D printing software tools, guides, and optimization resources",
  keywords: ["3D printing", "3D printer tools", "slicing software", "3D printing guides", "FDM printing", "3D printing resources"],
  image: "/icons/social-preview.svg"
};

export function generateSEOFromResource(resource: any): SEOData {
  return {
    title: `${resource.name} - ${resource.category} Tool | Printer.tools`,
    description: resource.description.length > 160 
      ? resource.description.substring(0, 157) + "..."
      : resource.description,
    keywords: [
      resource.name.toLowerCase(),
      resource.category.toLowerCase(),
      ...resource.tags.map((tag: string) => tag.toLowerCase()),
      ...resource.platforms.map((platform: string) => platform.toLowerCase()),
      "3D printing",
      "3D printer tools"
    ],
    image: resource.screenshot || resource.icon || "/icons/social-preview.svg",
    article: true
  };
}

export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + "...";
}

export function generateKeywords(base: string[], additional: string[] = []): string[] {
  const allKeywords = [...base, ...additional];
  // Remove duplicates and convert to lowercase
  return [...new Set(allKeywords.map(keyword => keyword.toLowerCase()))];
}
