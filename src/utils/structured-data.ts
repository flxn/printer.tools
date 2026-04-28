const siteUrl = 'https://printer.tools';

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  };
}

export function itemListSchema(name: string, description: string, url: string, resources: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url: absoluteUrl(url),
    numberOfItems: resources.length,
    itemListElement: resources.map((resource, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/tools/${resource.slug}`),
      name: resource.name
    }))
  };
}

export function resourceSchema(resource: any) {
  const isWebOnly = (resource.platforms || []).length === 1 && resource.platforms[0] === 'Web';

  return {
    '@context': 'https://schema.org',
    '@type': isWebOnly ? 'WebApplication' : 'SoftwareApplication',
    name: resource.name,
    description: resource.description,
    url: absoluteUrl(`/tools/${resource.slug}`),
    image: resource.screenshot ? absoluteUrl(resource.screenshot) : undefined,
    applicationCategory: resource.category,
    operatingSystem: (resource.platforms || []).join(', '),
    offers: {
      '@type': 'Offer',
      price: resource.price === 'Free' ? '0' : undefined,
      priceCurrency: resource.price === 'Free' ? 'USD' : undefined,
      category: resource.price
    },
    sameAs: resource.website,
    keywords: (resource.tags || []).join(', ')
  };
}

export function faqSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}
