import React, {useState, useEffect} from 'react';
import {StatusBar, View, Text} from 'react-native';
import StackNavigator from './src/navigations/StackNavigator';
import BottomTab from './src/components/BottomTab';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Loader from './src/components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyling from './src/constants/globalStyling';
import colors from './src/constants/colors';

export default ({}) => {
  const [showBottomTab, setBottomTab] = useState(false);
  const [appContainerColor, setAppContainerColor] = useState('white');

  useEffect(() => {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    global.showBottomTab = async (showBottomTabState) => {
      setBottomTab(showBottomTabState);
    };
    global.setAppContainerColor = (appContainerColor) => {
      setAppContainerColor(appContainerColor);
    };
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.themeColor}
        translucent={true}
      />
      <SafeAreaView
        style={
          appContainerColor === 'white'
            ? globalStyling.appContainerWhite
            : globalStyling.appContainerThemeColor
        }>
        <View style={globalStyling.appContainerView}>
          <StackNavigator />
          {showBottomTab ? <BottomTab /> : null}
          <Loader />
        </View>
      </SafeAreaView>
    </Provider>
  );
};
