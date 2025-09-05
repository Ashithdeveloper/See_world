import { View, Text } from 'react-native'
import React from 'react'
import { useSignOut } from '@/hooks/useSignOut'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/userUserSync'

export default function Index() {
useUserSync();
  return (
    <View className='flex-1 justify-center items-center flex-row gap-3'>
      <Text className='text-2xl '>Home screen</Text>
      <View>
        <SignOutButton/>
      </View>
    </View>
  )
}