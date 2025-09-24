import { FlashList } from '@shopify/flash-list';
import React from 'react';
import {
  ImageBackground,
  type ImageSourcePropType,
  type ImageURISource,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';

const SampleData: ThemeItemProps[] = [
  {
    name: 'Beach',
    description: 'a beach',
    category: 'Travel',
    display: 'Beach',
    isItalics: false,
    theme: {
      uri: 'https://images.unsplash.com/photo-1757482270431-a17f90bad2ce?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
    },
  },
  {
    name: 'Mountains',
    description: 'a mountain',
    category: 'Travel',
    display: 'Mountains',
    isItalics: false,
    theme: '#ECFAE5',
  },
  {
    name: 'City',
    description: 'a city',
    category: 'Travel',
    display: 'City',
    isItalics: false,
    theme: '#ECFAE5',
  },
  {
    name: 'City',
    description: 'a city',
    category: 'Travel',
    display: 'Road',
    isItalics: false,
    theme: '#ECFAE5',
  },
];
interface ThemeItemProps {
  name?: string;
  description?: string;
  category: string;
  isItalics?: boolean;
  display: string;
  theme: string | Pick<ImageURISource, 'uri'>;
}

function renderItem({ item }: { item: ThemeItemProps }) {
  const isImage = typeof item.theme === 'object' && 'uri' in item.theme;

  return (
    <View className=" h-52 w-full flex-1 rounded-2xl p-4">
      {isImage ? (
        <ImageBackground
          source={item.theme as ImageSourcePropType}
          className="size-full flex-1 items-center justify-center overflow-hidden rounded-2xl"
        >
          <Text className="font-extrabold text-white">{item.display}</Text>
        </ImageBackground>
      ) : (
        <View
          className="size-full flex-1 items-center justify-center rounded-2xl"
          style={{ backgroundColor: item.theme as string }}
        >
          <Text className="font-extrabold">{item.display}</Text>
        </View>
      )}
    </View>
  );
}

export default function Theme() {
  const { top } = useSafeAreaInsets();
  return (
    <View className="mx-2 flex-1" style={{ paddingTop: top }}>
      <FlashList
        data={SampleData}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        estimatedItemSize={50}
        ItemSeparatorComponent={() => <View className="h-1" />}
        renderItem={({ item }) => renderItem({ item })}
      />
    </View>
  );
}
