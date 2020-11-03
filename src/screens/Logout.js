import React, { Component } from "react";
import { Text, StyleSheet, View, FlatList, Dimensions } from "react-native";
import GlobalHeader from "../components/GlobalHeader";
import globalStyling from "../constants/globalStyling";
import { bindActionCreators } from "redux";
import * as reduxActions from "../redux/actions/actions";
import { connect } from "react-redux";
import i18n from "../constants/languages";
import { RTL } from "react-native-easy-localization-and-rtl";
import ProductCard from "../components/ProductCard";
const screenWidth = Dimensions.get("window").width;

class SpecialOffers extends Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      global.showBottomTab(true).then(() => {
        global.setFocused(false);
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  renderItem = ({ item, index, separators }) => (
    <ProductCard
      onsubmit={() =>
        this.props.navigation.navigate("ProductPage", {
          data: item.id,
        })
      }
      name={item.name.replace("&amp;", "&")}
      // image={item.images[0].src}
      image={item.images.length > 0 ? item.images[0].src : null}
      regularPrices={item.regular_price}
      price={item.price}
      item={item}
      navigation={this.props.navigation}
    />
  );

  render() {
    const RTLStyles = RTL.getSheet(i18n);

    return (
      <View style={globalStyling.container}>
        <GlobalHeader
          navigation={this.props.navigation}
          backArrow={true}
          cart={true}
          appIcon={true}
          cart={true}
          // menu={true}
        />
        {this.props.reduxState.loading &&
        this.props.reduxState.homedata.soffer.length === 0 ? null : this.props
            .reduxState.homedata.soffer.length === 0 ? (
          <View style={styles.containerView}>
            <Text style={globalStyling.errorText}>
              {i18n.specialOffersDoesntExist}
            </Text>
          </View>
        ) : (
          <FlatList
            style={globalStyling.flatlist}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={[
              styles.columnWrapperStyleFlatlist,
              RTLStyles.containerRow,
            ]}
            ListHeaderComponent={
              <Text style={globalStyling.headingText}>
                {i18n.specialOffers}
              </Text>
            }
            renderItem={this.renderItem}
            data={this.props.reduxState.homedata.soffer}
            // numColumns={screenWidth < 500 ? (screenWidth < 330 ? 2 : 3) : 4}
            numColumns={2}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  columnWrapperStyleFlatlist: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialOffers);
