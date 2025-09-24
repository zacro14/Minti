import { ImageBackground } from 'expo-image';
import { Stack } from 'expo-router';
import { View } from 'moti';
import React from 'react';

import { images } from '@/components/card';
import { Text } from '@/components/ui';

export default function Feed() {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ImageBackground
        source={images[0]}
        contentFit="cover"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text className="text-wrap font-medium shadow-black">Feed Screen</Text>
      </ImageBackground>
    </View>
  );
}
