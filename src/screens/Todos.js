import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';
import globalStyling from '../constants/globalStyling';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import selectedColors from '../constants/selectedColors';
import GlobalHeader from '../components/GlobalHeader';
import moment from 'moment';
import {Swipeable} from 'react-native-gesture-handler';

class Todos extends Component {
  state = {
    selected: 0,
  };
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      global.showBottomTab(true).then(() => {
        global.setFocused('todos');
      });
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  dateToFromNowDaily = (myDate) => {
    // get from-now for this date
    var fromNow = moment(myDate).fromNow();

    // ensure the date is displayed with today and yesterday
    return moment(myDate).calendar(null, {
      // when the date is closer, specify custom values
      lastWeek: '[Last] dddd',
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      // when the date is further away, use from-now functionality
      sameElse: function () {
        return '[' + fromNow + ']';
      },
    });
  };

  renderItem = ({item, index, separators}) => (
    <Swipeable
      ref={(swipe) => (this.swipeableRef = swipe)}
      renderLeftActions={() => (
        <TouchableOpacity
          style={styles.renderSwipeView}
          onPress={() => {
            let userdata = JSON.parse(
              JSON.stringify(this.props.reduxState.userdata),
            );
            userdata.todos.splice(index, 1);
            this.props.reduxActions.updateTodo(userdata, this.swipeableRef);
          }}>
          <Text style={{color: colors.redErrorColor}}>Tap To Delete</Text>
        </TouchableOpacity>
      )}
      renderRightActions={() => (
        <View style={styles.renderSwipeView}>
          <Text style={{color: colors.themeColor}}>Completed</Text>
        </View>
      )}
      onSwipeableRightOpen={() => {
        let userdata = JSON.parse(
          JSON.stringify(this.props.reduxState.userdata),
        );
        userdata.todos[index].completed = true;
        this.props.reduxActions.updateTodo(userdata, this.swipeableRef);
      }}>
      <View style={styles.containerView}>
        <View
          style={[
            styles.colorView,
            {backgroundColor: selectedColors[item.colorSelected]},
          ]}
        />
        <View>
          <Text
            style={[
              styles.work,
              {
                textDecorationLine: item.completed ? 'line-through' : null,
                color: item.completed
                  ? colors.greyTextColor
                  : colors.blackColor,
              },
            ]}>
            {item.work}
          </Text>
          <Text
            style={[
              styles.date,
              {
                color: item.completed
                  ? colors.greyTextColor
                  : colors.blackColor,
              },
            ]}>
            Due {this.dateToFromNowDaily(item.dueDate)}
          </Text>
        </View>
      </View>
    </Swipeable>
  );

  render() {
    return (
      <View style={globalStyling.container}>
        <GlobalHeader navigation={this.props.navigation} headingText={`Todo`} />
        <FlatList
          style={globalStyling.flatlist}
          ListEmptyComponent={<Text style={styles.noTodos}>No Todos!</Text>}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          data={this.props.reduxState.userdata.todos}
          removeClippedSubviews={true}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  noTodos: {color: colors.redErrorColor, textAlign: 'center'},
  renderSwipeView: {justifyContent: 'center', marginHorizontal: 10},
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  colorView: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  work: {
    fontWeight: 'bold',
    fontSize: fontSizes.large,
  },
  date: {fontSize: fontSizes.normal},
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
