import { VariantProp } from "../interfaces/VariantProp";

export const getSelectedProductId = (selectedColor: string, selectedSize: string, variants: VariantProp[]) => {

    const product = variants.find(variant => variant.color === selectedColor && variant.size === selectedSize);

    return product;
}