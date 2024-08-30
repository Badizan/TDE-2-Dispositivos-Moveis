// app/_layout.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import NewsList from '../components/NewsList';

const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NewsList />
    </SafeAreaView>
  );
};

export default Layout;
