export type ProductData = typeof import("./__fixtures__/productData.json");

export type ImageGroup = ProductData["image_groups"][number];
export type Variant = ProductData["variants"][number];
export type VariationAttribute = ProductData["variation_attributes"][number];
export type VariationAttributeValue = VariationAttribute["values"][number];