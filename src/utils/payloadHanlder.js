
export const commonPayload = function () {
    return {

        productCategory: arguments[0],
        productId: this.ebookId || this.videoId || this.paperId || this.mockTestId,
        price: this.price,
        language: this.language,
        description: ""

    }
}

export const cartPayload = function () {
    return {
        id: this.ebookId || this.videoId || this.paperId || this?.id,
        productId: this.productId || arguments[0]
    }
}