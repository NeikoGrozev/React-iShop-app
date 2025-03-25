import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const getProduct = (state: RootState) => state.pdp.product;
export const getProductOptions = (state: RootState) => state.pdp.productOptions;

export const getProductName = createSelector(
    [getProduct],
    (product) => product.name
);

export const getProductId = createSelector(
    [getProduct],
    (product) => product.id
);

export const getProductImages = createSelector(
    [getProduct],
    (product) => product.images
);

export const getProductDescription = createSelector(
    [getProduct],
    (product) => product.description
);

export const getDifferentColorImages = createSelector(
    [getProduct],
    (product) => product.differentColorImages
);

export const getSizeVariation = createSelector(
    [getProduct],
    (product) => product.sizes
);

export const getColorVariation = createSelector(
    [getProduct],
    (product) => product.colors
);

export const getSelectedColorId = createSelector(
    [getProductOptions],
    (productOption) => productOption.selectedColorId
);

export const getSelectedColorName = createSelector(
    [getProductOptions],
    (productOption) => productOption.selectedColorName
);

export const getSelectedSizeId = createSelector(
    [getProductOptions],
    (productOption) => productOption.selectedSizeId
);

export const getSelectedSizeName = createSelector(
    [getProductOptions],
    (productOption) => productOption.selectedSizeName
);

export const getVariants = createSelector(
    [getProduct],
    (product) => product.variants
);

export const getIsMasterOrVariationProduct = createSelector(
    [getProduct],
    (product) => product.isMasterOrVariationProduct
);

export const getProductPrice = createSelector(
    [getProduct],
    (product) => product.price
);