import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import { Bolt, Layers2, SwatchBook } from 'lucide-react-native';
import React, { useCallback, useEffect } from 'react';

import TabBar from '@/components/tab-bar.tsx';
import { Pressable, Text } from '@/components/ui';
import { useAuth, useIsFirstTime } from '@/lib';

// eslint-disable-next-line max-lines-per-function
export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'rgba(44,44,44,0.7)', // semi-transparent dark grey
          position: 'absolute',
          borderTopWidth: 0,
          borderTopEndRadius: 40,
          borderTopLeftRadius: 40,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <Layers2
              color={focused ? color : undefined}
              className={
                focused ? color : 'text-neutral-200 dark:text-neutral-500'
              }
            />
          ),
          headerRight: () => <CreateNewPostLink />,
        }}
      />

      <Tabs.Screen
        name="style"
        options={{
          title: 'Themes',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <SwatchBook
              color={focused ? color : undefined}
              className={
                focused ? '' : 'text-neutral-200 dark:text-neutral-500'
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Bolt
              color={focused ? color : undefined}
              className={
                focused ? '' : 'text-neutral-200 dark:text-neutral-500'
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        <Text className="px-3 text-primary-300">Create</Text>
      </Pressable>
    </Link>
  );
};
