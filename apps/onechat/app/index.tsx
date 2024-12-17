import { H3, XStack, YStack } from 'tamagui'
import { authClient } from '~/features/auth/authClient'
import { useUserState } from '~/features/state/queries/useUserState'
import { ListItem } from '~/interface/ListItem'
import { Main } from '~/interface/main/Main'
import { ThemeToggleListItem } from '~/interface/settings/ThemeToggleListItem'
import { Sidebar } from '~/interface/sidebar/Sidebar'
import { TopBar } from '~/interface/TopBar'

const hiddenPanelWidth = 300

export default function HomePage() {
  const [userState] = useUserState()

  return (
    <YStack h={0} f={1} x={userState?.showSidePanel ? -hiddenPanelWidth : 0} animation="quicker">
      <TopBar />

      <XStack h={0} ai="stretch" f={1}>
        <Sidebar />
        <Main />
      </XStack>

      <RightSideHiddenPanel />
    </YStack>
  )
}

const RightSideHiddenPanel = () => {
  const [userState] = useUserState()

  if (userState?.showSidePanel === 'settings') {
    return <RightSideSettings />
  }

  return <RightSideAccount />
}

const RightSideSettings = () => {
  return (
    <YStack
      h="100%"
      data-tauri-drag-region
      pos="absolute"
      t={0}
      r={-hiddenPanelWidth}
      w={hiddenPanelWidth}
      p="$4"
      gap="$4"
    >
      <H3>Settings</H3>

      <ThemeToggleListItem />
    </YStack>
  )
}

const RightSideAccount = () => {
  return (
    <YStack
      h="100%"
      data-tauri-drag-region
      pos="absolute"
      t={0}
      r={-hiddenPanelWidth}
      w={hiddenPanelWidth}
      p="$4"
      gap="$4"
    >
      <H3>Account</H3>
      <ListItem
        onPress={() => {
          authClient.signOut()
        }}
      >
        Logout
      </ListItem>
    </YStack>
  )
}

// <a target="_blank" href={window.location.origin + '/login-github'} rel="noreferrer">
// <Button size="$2">Github</Button>
// </a>

// {user?.image && <img src={user.image} style={{ width: 32, height: 32 }} />}

// {user && (
// <Button
//   onPress={() => {
//     authClient.signOut()
//   }}
// >
//   Sign out
// </Button>
// )}

// <ScrollView>
//         <YStack p="$4" pt="$10">
//           <CollapsedChats>
//             <Chat
//               {...{
//                 name: 'test',
//                 contents:
//                   'Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa. Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa. Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa.',
//                 avatar: <Circle size={32} bg="red" mt={4}></Circle>,
//               }}
//             />

//             <Chat
//               {...{
//                 name: 'natew',
//                 contents:
//                   'Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa.',
//                 avatar: (
//                   <Circle size={32} bg="$color9" mt={4}>
//                     <OneBall size={1.3} />
//                   </Circle>
//                 ),
//               }}
//             />
//           </CollapsedChats>

//           <ThreadRow title="Android bug" description="JDK version 9.0 bug building app container" />

//           <DateSeparator />

//           <CollapsedChats>
//             <Chat
//               {...{
//                 name: 'test',
//                 contents:
//                   'Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa. Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa. Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa.',
//                 avatar: <Circle size={32} bg="red" mt={4}></Circle>,
//               }}
//             />

//             <Chat
//               {...{
//                 name: 'natew',
//                 contents:
//                   'Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa.',
//                 avatar: (
//                   <Circle size={32} bg="$color9" mt={4}>
//                     <OneBall size={1.3} />
//                   </Circle>
//                 ),
//               }}
//             />
//           </CollapsedChats>

//           <ThreadRow
//             title="Supertokens Support"
//             description="Requesting official support for supertokens."
//           />

//           <CollapsedChats>
//             <Chat
//               {...{
//                 name: 'test',
//                 contents:
//                   'Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa. Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa. Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa.',
//                 avatar: <Circle size={32} bg="red" mt={4}></Circle>,
//               }}
//             />

//             <Chat
//               {...{
//                 name: 'natew',
//                 contents:
//                   'Irure sunt eu do quis voluptate do nulla deserunt proident laborum culpa.',
//                 avatar: (
//                   <Circle size={32} bg="$color9" mt={4}>
//                     <OneBall size={1.3} />
//                   </Circle>
//                 ),
//               }}
//             />
//           </CollapsedChats>

//           <DateSeparator />

//           <ThreadRow title="Some Thread" />

//           <ThreadRow title="Some Thread" />

//           {/* {chats.map((chat, i) => {
//             return <Chat key={i} {...chat} />
//           })} */}
//         </YStack>
//       </ScrollView>

// const DateSeparator = () => {
//   return (
//     <XStack gap="$6" ai="center" jc="center">
//       <Separator bc="rgba(0,0,0,0.1)" />
//       <SizableText>Dec 2nd, 2024</SizableText>
//       <Separator bc="rgba(0,0,0,0.1)" />
//     </XStack>
//   )
// }

// const ThreadRow = (props: { title: string; description?: string }) => {
//   return (
//     <ThreadButtonFrame size="large">
//       <YStack>
//         <XStack ai="center" jc="center" gap="$2">
//           <Circle size={32} bg="$color9">
//             <OneBall size={1} />
//           </Circle>

//           <SizableText size="$5" userSelect="none" cur="default" f={1} ov="hidden">
//             {props.title}
//           </SizableText>
//         </XStack>

//         {!!props.description && <SizableText o={0.7}>{props.description}</SizableText>}
//       </YStack>
//     </ThreadButtonFrame>
//   )
// }

// const CollapsedChats = (props) => {
//   const [collapsed, setCollapsed] = useState(true)

//   if (collapsed) {
//     return (
//       <YStack
//         p="$3"
//         br="$4"
//         gap="$2"
//         hoverStyle={{
//           bg: '$color3',
//         }}
//         onPress={() => {
//           setCollapsed(!collapsed)
//         }}
//       >
//         <XStack ai="center" gap="$6">
//           {/* <Separator bc="rgba(0,0,0,0.1)" /> */}
//           <SizableText style={{ fontWeight: '500' }} size="$4">
//             25 messages
//           </SizableText>
//           {/* <Separator bc="rgba(0,0,0,0.1)" /> */}
//         </XStack>

//         <XStack>
//           <XStack ai="center" gap="$2">
//             <Circle size={16} bg="$color9" mt={4}>
//               <OneBall size={0.7} />
//             </Circle>
//             <SizableText size="$3">natew</SizableText>
//           </XStack>

//           <SizableText size="$3">
//             {' '}
//             and 3 others talked about supertokens, auth, and the next release.
//           </SizableText>
//         </XStack>
//       </YStack>
//     )
//   }

//   return (
//     <YStack
//       onPress={() => {
//         setCollapsed(!collapsed)
//       }}
//     >
//       {props.children}
//     </YStack>
//   )
// }