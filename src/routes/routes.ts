   import OnboardingScreen from "../screen/auth/Onboarding/Onboarding";
  import ScreenNameEnum from "./screenName.enum";
 import TabNavigator from "../navigators/TabNavigation";
 import NotificationsScreen from "../screen/Notification/Notification";
  import ChangePassword from "../screen/Profile/ChangePassword/ChangePassword";
import HelpScreen from "../screen/Profile/Help/Helps";
import Splash from "../screen/auth/Splash/Splash";
  import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
import ProfileSetup from "../screen/auth/ProfileSetup/ProfileSetup";
 import OfferOR from "../screen/BottomTab/OfferOR/OfferOR";
import ViewDetails from "../screen/BottomTab/Orders/ViewDetails";
import LegalPoliciesScreen from "../screen/Profile/LegalPoliciesScreen";
import PrivacyPolicy from "../screen/Profile/PrivacyPolicy";
import EditProfile from "../screen/Profile/EditProfile/EditProfile";
import AddressScreen from "../screen/BottomTab/AddressScreen/AddressScreen";
import ChatScreen from "../screen/BottomTab/ChatScreen/ChatScreen";
import OrdersPrfile from "../screen/Profile/OrdersPrfile/OrdersPrfile";
 import DeliveryTabNavigator from "../navigators/DeliveryTabNavigator";
 import WalletScreen from "../screen/DeliveryBottomTab/WalletScreen/WalletScreen";
import EarningsScreen from "../screen/DeliveryBottomTab/EarningsScreen/EarningsScreen";
import HelpSupport from "../screen/DeliveryBottomTab/HelpSupport/HelpSupport";
import NotificationsSetting from "../screen/DeliveryBottomTab/NotificationsSetting/NotificationsSetting";
import ParcelDetails from "../screen/DeliveryBottomTab/ParcelDetails/ParcelDetails";
 import ChooseRole from "../screen/auth/ChooseRole/ChooseRole";
   import Login from "../screen/auth/login/Login";
import SignUp from "../screen/auth/signUp/SignUp";
import CreateNewPassword from "../screen/auth/login/createNewPassword/CreateNewPassword";
import PasswordReset from "../screen/auth/passwordReset/PasswordReset";
import OurServices from "../screen/BottomTab/OurServices/OurServices";
import BookServies from "../screen/BottomTab/BookServies/BookServies";
   const _routes: any = {
  REGISTRATION_ROUTE: [
       {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },

      
        {
      name: ScreenNameEnum.BookServies,
      Component: BookServies,
    },
        {
      name: ScreenNameEnum.OurServices,
      Component: OurServices,
    },
 
     {
      name: ScreenNameEnum.PasswordReset,
      Component: PasswordReset,
    },
    {
      name: ScreenNameEnum.Sinup,
      Component: SignUp,
    },
    {
      name: ScreenNameEnum.CreateNewPassword,
      Component: CreateNewPassword,
    },
    {
      name: ScreenNameEnum.Login,
      Component: Login,
    },
    {
      name: ScreenNameEnum.ChooseRole,
      Component: ChooseRole,
    },
   
    {
      name: ScreenNameEnum.WalletScreen,
      Component: WalletScreen,
    },
   
    {
      name: ScreenNameEnum.NotificationsSetting,
      Component: NotificationsSetting,
    },
       
 
    {
      name: ScreenNameEnum.HelpSupport,
      Component: HelpSupport,
    },
    {
      name: ScreenNameEnum.EarningsScreen,
      Component: EarningsScreen,
    },

    
 
    
    {
      name: ScreenNameEnum.ProfileSetup,
      Component: ProfileSetup,
    },
    
 
    {
      name: ScreenNameEnum.OnboardingScreen,
      Component: OnboardingScreen,
    },
 
    {
      name: ScreenNameEnum.AddressScreen,
      Component: AddressScreen,
    },
    {
      name: ScreenNameEnum.OrdersPrfile,
      Component: OrdersPrfile,
    },
    {
      name: ScreenNameEnum.ChatScreen,
      Component: ChatScreen,
    },
    {
      name: ScreenNameEnum.EditProfile,
      Component: EditProfile,
    },
    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },

   
   
    {
      name: ScreenNameEnum.changePassword,
      Component: ChangePassword,
    },
    
    {
      name: ScreenNameEnum.Help,
      Component: HelpScreen,
    },
       {
      name: ScreenNameEnum.TabNavigator,
      Component: TabNavigator,
    },
     
       {
      name: ScreenNameEnum.PrivacyPolicy,
      Component: PrivacyPolicy,
    },
       {
      name: ScreenNameEnum.LegalPoliciesScreen,
      Component: LegalPoliciesScreen,
    },
 
       {
      name: ScreenNameEnum.ViewDetails,
      Component: ViewDetails,
    },
 
  
     {
      name: ScreenNameEnum.NotificationsScreen,
      Component: NotificationsScreen,
    },
  
     {
      name: ScreenNameEnum.OfferOR,
      Component: OfferOR,
    },
   
    
    
     {
      name: ScreenNameEnum.DeliveryTabNavigator,
      Component: DeliveryTabNavigator,
    },
 
    
     {
      name: ScreenNameEnum.ParcelDetails,
      Component: ParcelDetails,
    },
    
    
    //    {
    //   name: ScreenNameEnum.DocumentShow,
    //   Component: DocumentShow,
    // },
    
  ],


};

export default _routes;
