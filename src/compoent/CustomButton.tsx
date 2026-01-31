// import React from 'react';
// import {
//   TouchableOpacity,
//   Text,
//   View,
//   StyleSheet,
//   StyleProp,
//   ViewStyle,
//   TextStyle,
//   GestureResponderEvent,
//   Image,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { color } from '../constant';
// import font from '../theme/font';
// import imageIndex from '../assets/imageIndex';

// type AlignType = 'left' | 'center' | 'right';

// interface CustomButtonProps {
//   title: string;
//   txtcolor?: string;
//   bgColor?: string;
//   leftIcon?: React.ReactNode;
//   alignItm?: AlignType;
//   style?: StyleProp<ViewStyle>;
//   textStyle?: StyleProp<TextStyle>;
//   height?: number;
//   onPress?: (event: GestureResponderEvent) => void;
//   disabled?: boolean;
//   button1?:any
// }

// const CustomButton: React.FC<CustomButtonProps> = ({
//   title,
//   txtcolor = '#FFFFFF',
//   bgColor = color.primary,
//   leftIcon,
//   alignItm = 'center',
//   style,
//   button1,
//   textStyle,
//   height = 54,
//   onPress,
//   disabled = false,
// }) => {
//   const alignment = {
//     left: 'flex-start',
//     center: 'center',
//     right: 'flex-end',
//   } as const;

//   return (
//     // <LinearGradient
//     //   colors={['#F58D17', '#F58D17', '#09BFCD']}
//     //   start={{ x: 0, y: 0 }}
//     //   end={{ x: 0.83, y: 0 }}
//     //   style={[
//     //     styles.gradient,
//     //     { height: height, borderRadius: 9 },
//     //     style,
//     //   ]}
//     // >
//       <TouchableOpacity
//         onPress={onPress}
//         disabled={disabled}
// style={[
//   styles.button,
//   { height: height },
//   button1
// ]}
//         activeOpacity={0.7}
//       >
//         <View style={[styles.content, { justifyContent: alignment[alignItm] }]}>
//           {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

//           <Text
//             allowFontScaling={false}
//             style={[styles.text, { color: txtcolor }, textStyle]}
//           >
//             {title}
//           </Text>
//         </View>
                

//       </TouchableOpacity>
//     // </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     width: '100%',
//   },
//   button: {
//     width: '100%',
//     paddingHorizontal: 20,
//     backgroundColor:color.primary,
//     height:50,
//     borderRadius:25,
//     alignSelf:'center'
    
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: '100%',
//     width: '100%',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   text: {
//     fontSize: 16,
//      color:"white",
//     fontWeight:"bold"
//   },
// });

// export default CustomButton;
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../constant';

type AlignType = 'left' | 'center' | 'right';

interface CustomButtonProps {
  title: string;
  txtcolor?: string;
  leftIcon?: React.ReactNode;
  alignItm?: AlignType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  txtcolor = '#FFFFFF',
  leftIcon,
  alignItm = 'center',
  style,
  textStyle,
  height = 54,
  onPress,
  disabled = false,
}) => {
  const alignment = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  } as const;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.container, style]}
    >
   <LinearGradient
  colors={[ '#FF007C', '#310071']}
//  start={{ x: 0.15, y: 0 }}
// end={{ x: 0.85, y: 1 }}
// start={{ x: 0, y: 0.2 }}
// end={{ x: 1, y: 0.8 }}
start={{ x: 0, y: 0.45 }}
end={{ x: 1, y: 0.55 }}

  style={[
    styles.gradient,
    { height: height, borderRadius: height / 2 },
  ]}
>
        <View style={[styles.content, { justifyContent: alignment[alignItm] }]}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

          <Text
            allowFontScaling={false}
            style={[styles.text, { color: txtcolor }, textStyle]}
          >
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  // gradient: {
  //   width: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  gradient: {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',

  // Android glow
  // elevation: 6,

  // iOS glow
  // shadowColor: '#FF007C',
  // shadowOffset: { width: 0, height: 6 },
  // shadowOpacity: 0.35,
  // shadowRadius: 12,
},

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CustomButton;