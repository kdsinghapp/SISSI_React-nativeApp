   import OnboardingScreen from "../screen/auth/Onboarding/Onboarding";
  import ScreenNameEnum from "./screenName.enum";
 import TabNavigator from "../navigators/TabNavigation";
 import NotificationsScreen from "../screen/Notification/Notification";
  import ChangePassword from "../screen/Profile/ChangePassword/ChangePassword";
import HelpScreen from "../screen/Profile/Help/Helps";
import Splash from "../screen/auth/Splash/Splash";
  import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
import ProfileSetup from "../screen/auth/ProfileSetup/ProfileSetup";
import LegalPoliciesScreen from "../screen/Profile/LegalPoliciesScreen";
import PrivacyPolicy from "../screen/Profile/PrivacyPolicy";
import EditProfile from "../screen/Profile/EditProfile/EditProfile";
 import ChatScreen from "../screen/BottomTab/ChatScreen/ChatScreen";
import OrdersPrfile from "../screen/Profile/OrdersPrfile/OrdersPrfile";
 import Tab2Navigator from "../navigators/Tab2Navigator";
  
 import ChooseRole from "../screen/auth/ChooseRole/ChooseRole";
   import Login from "../screen/auth/login/Login";
import SignUp from "../screen/auth/signUp/SignUp";
import CreateNewPassword from "../screen/auth/login/createNewPassword/CreateNewPassword";
import PasswordReset from "../screen/auth/passwordReset/PasswordReset";
 import FavoriteScreen from "../screen/BottomTab/Favorite/FavoriteScreen";
import BrowseShifts from "../screen/BottomTab/BrowseShifts/BrowseShifts";
import CreateNewShift from "../screen/InstitutionTab/CreateNewShift/CreateNewShift";
import NotificationsSetting from "../screen/InstitutionTab/NotificationsSetting/NotificationsSetting";
import PostedShifts from "../screen/InstitutionTab/PostedShifts/PostedShifts";
import BookedShifts from "../screen/InstitutionTab/BookedShifts/BookedShifts";
import PastShifts from "../screen/InstitutionTab/PastShifts/PastShifts";
import ShiftBooking from "../screen/InstitutionTab/ShiftBooking/ShiftBooking";
import AboutUS from "../screen/Profile/AboutUS";
import ShiftDetailScreen from "../screen/BottomTab/Favorite/ShiftDetailScreen";
   const _routes: any = {
  REGISTRATION_ROUTE: [
       {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },

      
    
        {
      name: ScreenNameEnum.BrowseShifts,
      Component: BrowseShifts,
    },
      
        {
      name: ScreenNameEnum.FavoriteScreen,
      Component: FavoriteScreen,
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
      name: ScreenNameEnum.NotificationsSetting,
      Component: NotificationsSetting,
    },
       
    {
      name: ScreenNameEnum.ShiftBooking,
      Component: ShiftBooking,
    },
       
   
    {
      name: ScreenNameEnum.PastShifts,
      Component: PastShifts,
    },
       
 
   
    {
      name: ScreenNameEnum.BookedShifts,
      Component: BookedShifts,
    },
       
 
   
    {
      name: ScreenNameEnum.PostedShifts,
      Component: PostedShifts,
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
      name: ScreenNameEnum.AboutUS,
      Component: AboutUS,
    },
       {
      name: ScreenNameEnum.LegalPoliciesScreen,
      Component: LegalPoliciesScreen,
    },
       {
      name: ScreenNameEnum.CreateNewShift,
      Component: CreateNewShift,
    },
       {
      name: ScreenNameEnum.ShiftDetailScreen,
      Component: ShiftDetailScreen,
    },

     {
      name: ScreenNameEnum.NotificationsScreen,
      Component: NotificationsScreen,
    },
 
   
    
    
     {
      name: ScreenNameEnum.Tab2Navigator,
      Component: Tab2Navigator,
    },
 
 
    
    
    
  ],


};

export default _routes;
