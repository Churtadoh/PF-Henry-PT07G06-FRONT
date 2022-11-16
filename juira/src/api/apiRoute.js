// product
export const getAllProductsApi = 'products/'
export const getAllPublicatesProductsApi = 'products?status=publicado'
export const getProductsDetailsApi = '/product-detail/'
export const getCategoriesNameApi = "categories/names"
export const getCategoriesIdApi = "categories/"
export const postUser= 'sessionLogin'
export const putCartApi = "cart/addProductToCart/byToken/"
export const deleteCartApi = "cart/removeProductFromCart/byToken/"
export const cartApi = "cart/byToken"
export const putFavApi = "favorites/addProductToFavList/byToken/"
export const deleteFavApi = "favorites/removeProductFromFavList/byToken/"
export const favApi = "favorites/byToken"
export const getUserData= 'users/unique'




export const API_URL_BACKEND = process.env.REACT_APP_API ||  'http://localhost:3001/'


// 'https://pf-henry-pt07g06-back-production.up.railway.app/'


//'https://containers-us-west-65.railway.app'
//https://pf-henry-pt07g06-back-production.up.railway.app/

