import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const GOOGLE_PLACES_API_KEY = "AIzaSyDgFGS91BvviXh_f-nmvtEggUHJcaGyUwA";
export const EndPoints = {
  signup: '/register',
  Login: 'auth/login-with-otp?trueCaller=true',
 VerifyOtp :'auth/verify-login-otp',
 getCategories :'main-categories/view-all?page=1&limit&isActive=true',
  getSubCategories : 'sub-categories/view-all?page=1&limit=100&parentId=',
  getSuperSubCategories : '/super-sub-categories/view-all?page=1&limit=20&parentId=',
  getFaq : 'faqs/view-all-faqs?page=1&limit=10',
  getHomeTab:'modules/view-all',
  getSliders:'general/view-all-sliders',
  getProfile:'profile/view-profile',
  createProfile:'profile/create-profile',
  uploadFile:'upload/file',
  getBrand:'super-sub-attributes/view-super-sub-attribute/',
  createProduct:'product/create-product',
  updateProduct:'product/edit-product/',
  getProduct:'product/view-products',
  getLanguage:'languages/view-languages?target=vendo',
  getPlans:"subscription-plans/plans",
  addverification:'vendor-verification/apply-for-verification',
  getVerification:'vendor-verification/check-my-verification',
  getLinkedDevices:'devices/view-devices',
  logoutFromDevice:'devices/logout-device/',
  getNotification:"notifications/",
  deleteNotification:'notifications/delete/',
  getYoutubeLink :'general/view-all-youtube-links',
  addSuggestion:'',
  mainProfile:'/profile/view-profile',

};
