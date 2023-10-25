import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { AnimatedFAB, Text, useTheme, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
// spacing variables
import helpers from '../Helper';
import ExpenseCard from '../components/ExpenseCard';
import NoDataFound from '../components/NoDataFound';

const _spacing = 20;
const _size = 20;
const _FABSpacing = 20;

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const currentUser = auth().currentUser;
  const [data, setData] = useState([])
  const [isExtended, setIsExtended] = React.useState(false);
  //FAB animation below on scroll
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition > 0);
  };

  //runs the code whenver the screen gets focused
  useFocusEffect(
    React.useCallback(() => {
      helpers.getData(currentUser).then(dataFromFirebase => setData(dataFromFirebase))
    }, [])
  );
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>

      <AnimatedFAB
        icon={'plus'}
        label={'Add record'}
        onPress={() => navigation.navigate("AddInfoScreen")}
        visible={true}
        animateFrom={'right'}
        extended={isExtended}
        style={{ position: 'absolute', bottom: _FABSpacing, right: _FABSpacing, zIndex: 12 }}
      />

      <View style={{ flex: 1 }}>
        {
          data.length > 0 ?
            <FlatList onScroll={onScroll}
              data={data}
              renderItem={({ item }) => <ExpenseCard item={item} theme={theme} />}
            /> :
            <NoDataFound />
        }
      </View>
    </View >
  );
}
