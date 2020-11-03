import React from 'react';
import {StatusBar, View, Text} from 'react-native';
import StackNavigator from './src/navigations/StackNavigator';
// import BottomTab from './src/components/BottomTab';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Loader from './src/components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyling from './src/constants/globalStyling';
import colors from './src/constants/colors';

export default class App extends React.Component {
  state = {showBottomTab: false, appContainerColor: 'white'};

  componentDidMount() {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    global.showBottomTab = async (showBottomTabState) => {
      this.setState({showBottomTab: showBottomTabState}, () => {
        return;
      });
    };
    global.setAppContainerColor = (appContainerColor) => {
      this.setState({
        appContainerColor,
      });
    };
  }

  render() {
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
            this.state.appContainerColor === 'white'
              ? globalStyling.appContainerWhite
              : globalStyling.appContainerThemeColor
          }>
          <View style={globalStyling.appContainerView}>
            <StackNavigator />
            {this.state.showBottomTab ? <BottomTab /> : null}
            <Loader />
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}
