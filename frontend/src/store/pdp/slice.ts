import { createSlice } from "@reduxjs/toolkit";
import { Image } from "../../interfaces/ImageProps";
import { VariantProp } from "../../interfaces/VariantProp";

interface differentColorImagesProp {
    color: string,
    colorImage: string,
    productId: string
}

export interface initialStateProp {
    product: {
        id: string,
        name: string,
        images: Image[],
        smallImage: string,
        description: string,
        price: number,
        differentColorImages: differentColorImagesProp[],
        sizes: Record<string, string>,
        colors: Record<string, string>,
        isMasterOrVariationProduct: boolean,
        variants: VariantProp[]
    },
    productOptions: {
        selectedColorId: string,
        selectedSizeId: string,
        selectedColorName: string,
        selectedSizeName: string
    }
}

const initialState: initialStateProp = {
    product: {
        id: '',
        name: '',
        images: [],
        smallImage: '',
        description: '',
        price: 0,
        differentColorImages: [],
        sizes: {},
        colors: {},
        isMasterOrVariationProduct: false,
        variants: []
    },
    productOptions: {
        selectedColorId: '',
        selectedSizeId: '',
        selectedColorName: '',
        selectedSizeName: ''
    }
}

const pdpSlice = createSlice({
    name: 'pdpSlice',
    initialState,
    reducers: {
        setProduct(state, action) {
            const product = action.payload;
            let updatedVariants: string[] = [];

            if (product.isMasterOrVariationProduct) {
                updatedVariants = product.variants.map((variant: VariantProp) => ({
                    ...variant,
                    productId: variant.productId
                }));
            }

            state.product = {
                ...product,
                variants: updatedVariants
            };

            if (product.differentColorImages?.length === 1) {
                state.productOptions.selectedColorId = product.differentColorImages[0].color;
                state.productOptions.selectedColorName = product.colors[product.differentColorImages[0].color];
            }
        },
        setSelectedColor(state, action) {
            state.productOptions.selectedColorId = action.payload.colorId;
            state.productOptions.selectedColorName = action.payload.colorName;
        },
        setSelectedSize(state, action) {
            state.productOptions.selectedSizeId = action.payload.sizeId;
            state.productOptions.selectedSizeName = action.payload.sizeName;
        }
    }
});

export const pdpAction = pdpSlice.actions;
export default pdpSlice.reducer;