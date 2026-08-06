export type Category = {
  slug: string;
  label: string;
  // La Fake Store API usa la grafia "jewelery" e nomi con apostrofo/spazi
  apiName: string;
};

export const CATEGORIES: Category[] = [
  { slug: "electronics", label: "Electronics", apiName: "electronics" },
  { slug: "jewelery", label: "Jewelry", apiName: "jewelery" },
  {
    slug: "mens-clothing",
    label: "Men's clothing",
    apiName: "men's clothing",
  },
  {
    slug: "womens-clothing",
    label: "Women's clothing",
    apiName: "women's clothing",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
