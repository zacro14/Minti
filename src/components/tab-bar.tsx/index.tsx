import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <BlurView
      tint="dark"
      intensity={20}
      className="absolute inset-x-0 bottom-0 h-28 flex-row overflow-hidden rounded-t-3xl border-0 bg-charcoal-900/45 px-5 py-2"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;
        const tabBarIcon = options.tabBarIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            className={`flex-1 items-center justify-center gap-1 rounded-xl `}
          >
            <View
              className={`rounded-3xl p-5 ${isFocused ? 'bg-slate-50' : 'text-neutral-200 dark:text-neutral-500'}`}
            >
              {tabBarIcon &&
                tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? '#2C8707' : '',
                  size: 24,
                })}
            </View>
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
}
