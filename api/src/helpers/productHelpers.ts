import demandwareClient from '../modules/demandwareClient';
import { ProductData, ImageGroup, VariationAttribute, VariationAttributeValue, Variant } from '../types';

const ocapiUrl = `${process.env.OCAPI_INSTANCE_HOST}${process.env.OCAPI_SITE}/dw/shop/${process.env.OCAPI_VERSION}`;

export const getProductsData = (query: string) => {

    return fetchSearchProductsData(query);
}

export const getProductData = async (productId: string) => {
    const productData: any = {};

    try {
        const data = await fetchProductData(productId);

        productData.id = data.id;
        productData.name = data.name;
        productData.description = data.page_description;
        productData.images = getImages(data);
        productData.smallImage = getSmallImage(data);
        productData.isMasterOrVariationProduct = false;
        productData.price = Number(data.price).toFixed(2);

        if (data.type.master || data.type.variant) {
            productData.differentColorVariationIds = getDifferentColorVariationIds(data);
            productData.differentColorImages = await getDifferentColorImages(productData.differentColorVariationIds);
            productData.colors = getColors(data);
            productData.sizes = getSizes(data);
            productData.variants = getVariants(data);
            productData.isMasterOrVariationProduct = true;
        }
    } catch (error: any) {
        throw new Error(error.message);
    }

    return productData;
}

const fetchSearchProductsData = async (query: string) => {
    const url = `${ocapiUrl}/product_search?q=${query}&expand=images`;

    const response = await demandwareClient.get(url);

    return await response.json();
}

const fetchProductData = async (productIds: string) => {
    const url = `${ocapiUrl}/products/${productIds}?expand=images,variations,prices`;

    const response = await demandwareClient.get(url);

    return await response.json();
}

function getImages(data: ProductData) {
    let imageGroup = data.image_groups.find((group: ImageGroup) => group.view_type === "medium");

    if (!imageGroup) {
        imageGroup = data.image_groups.find((group: ImageGroup) => group.view_type === "small");
    }

    return imageGroup?.images;
}

function getSmallImage(data: ProductData) {
    let imageGroup = data.image_groups.find((group: ImageGroup) => group.view_type === "small");

    return imageGroup?.images[0].link;
}

function getDifferentColorVariationIds(data: ProductData) {
    const productIds: string[] = [];
    const differentColors: string[] = [];

    data.variants.map((variant: Variant) => {
        const productId = variant.product_id;
        const color = variant.variation_values.color;

        if (!differentColors.includes(color)) {
            differentColors.push(color);
            productIds.push(productId);
        }
    });

    return productIds;
}

async function getDifferentColorImages(differentColorVariationIds: string[]) {
    if (!differentColorVariationIds.length) {
        return [];
    }

    const productIds = `(${differentColorVariationIds})`
    const fetchData = await fetchProductData(productIds);

    return fetchData.data.map((variationProduct: any) => ({
        productId: variationProduct.id,
        colorImage: variationProduct.image_groups[3]?.images[0]?.link,
        color: variationProduct.c_color
    }));
}

function getColors(data: ProductData) {
    let colors: Record<string, string> = {};

    data.variation_attributes.map((colorVariation: VariationAttribute) => {
        if (colorVariation.id === 'color') {
            colorVariation.values.map((color: VariationAttributeValue) => {
                colors[color.value] = color.name;
            })
        }
    });

    return colors;
}

function getSizes(data: ProductData) {
    let sizes: Record<string, string> = {};

    data.variation_attributes.map((sizeVariation: VariationAttribute) => {
        if (sizeVariation.id === 'size') {
            sizeVariation.values.map((size: VariationAttributeValue) => {
                sizes[size.value] = size.name;
            })
        }
    });

    return sizes;
}

function getVariants(data: ProductData) {

    return data.variants.map((product: Variant) => ({
        productId: product.product_id,
        color: product.variation_values.color,
        size: product.variation_values.size,
        price: product.price
    }));
}