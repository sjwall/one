import { Tabs } from 'vxs'
import { HomeIcons } from '~/features/icons'
import { useTheme } from 'tamagui'

export function HomeLayoutNative() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.accentColor.val,
        tabBarInactiveTintColor: theme.gray9.val,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <HomeIcons.Home size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <HomeIcons.Notifications size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <HomeIcons.User size={20} color={color} />,
        }}
      />
    </Tabs>
  )
}