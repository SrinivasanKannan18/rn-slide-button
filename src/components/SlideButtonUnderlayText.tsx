import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { SlideButtonCommonProps } from './SlideButton';

const DEFAULT_TEXT_COLOR = '#FAFAFA';

export interface SlideButtonUnderlayTextProps
  extends Omit<SlideButtonCommonProps, 
  'autoReset' | 'autoResetDelay' | 'animation'| 'animationDuration' | 'endReached'> {
  underlayTitle: string;
  underlayTitleStyle?: StyleProp<TextStyle>;
  underlayTitleContainerStyle?: StyleProp<ViewStyle>;
}

const SlideButtonUnderlayText = ({
  underlayTitle,
  underlayTitleStyle,
  underlayTitleContainerStyle,
  height,
  borderRadius,
  padding,
  translateX,
  scrollDistance
}: SlideButtonUnderlayTextProps) => {
  const textAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, scrollDistance],
        [0, 0.99],
        Extrapolate.CLAMP,
      ),
    };
  })
  return (
    <View
      testID="TitleContainer"
      style={[styles.titleContainer, { height, margin: padding, borderRadius }, underlayTitleContainerStyle]}
    >
      <Animated.Text
        testID="Title"
        numberOfLines={2}
        allowFontScaling={false}
        style={[styles.title, underlayTitleStyle, textAnimStyle]}
      >
        {underlayTitle}
      </Animated.Text>
    </View>
  );
};

export default React.memo(SlideButtonUnderlayText);

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    maxWidth: '60%',
    textAlign: 'center',
    color: DEFAULT_TEXT_COLOR,
  },
});
