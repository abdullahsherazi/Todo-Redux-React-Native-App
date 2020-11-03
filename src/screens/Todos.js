import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";
import colors from "../constants/colors";
import fontSizes from "../constants/fontSizes";
import globalStyling from "../constants/globalStyling";
import { bindActionCreators } from "redux";
import * as reduxActions from "../redux/actions/actions";
import { connect } from "react-redux";
const screenWidth = Dimensions.get("window").width;
import i18n from "../constants/languages";
import ProductCard from "../components/ProductCard";
import GlobalHeader from "../components/GlobalHeader";
import { RTL } from "react-native-easy-localization-and-rtl";

class SubCat extends Component {
  state = {
    selected: 0,
  };
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      global.showBottomTab(true).then(() => {
        global.setFocused("false");
      });
    });
    this.props.reduxActions.getSubCategoryProducts(
      this.props.reduxState.subCategories[0]
    );
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
      image={item.images.length > 0 ? item.images[0].src : null}
      regularPrices={item.regular_price}
      price={item.price}
      name={item.name}
      item={item}
      navigation={this.props.navigation}
    />
  );

  renderSubCategories = ({ item, index, separators }) => (
    <Text
      style={
        index === this.state.selected
          ? styles.selectedSubCategory
          : styles.unSelectedSubCategory
      }
      onPress={() => {
        if (this.state.selected !== index) {
          this.setState({ selected: index }, () => {
            this.props.reduxActions.getSubCategoryProducts(
              this.props.reduxState.subCategories[index]
            );
          });
          this.refs.scrollRefs.scrollToIndex({
            animated: true,
            index: index,
          });
        }
      }}
    >
      {item.name.replace("&amp;", "&")}
    </Text>
  );

  render() {
    const RTLStyles = RTL.getSheet(i18n);
    return (
      <View style={globalStyling.container}>
        <GlobalHeader
          navigation={this.props.navigation}
          backArrow={true}
          appIcon={true}
          cart={true}
          // menu={true}
        />

        <TouchableOpacity
          style={styles.searchView}
          onPress={() => this.props.navigation.navigate("Search")}
        >
          <TextInput
            placeholder="Search"
            style={styles.textInput}
            editable={false}
          />
          <TouchableOpacity style={styles.imageView}>
            <Image
              source={require("../assets/images/search.png")}
              resizeMode="contain"
              style={globalStyling.imageStyle}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderSubCategories}
            data={this.props.reduxState.subCategories}
            removeClippedSubviews={true}
            keyExtractor={(item) => item.id.toString()}
            inverted={RTL.isRTL(i18n) ? true : false}
            style={styles.subCategoryFlatlist}
            ref="scrollRefs"
          />
        </View>

        {this.props.reduxState.subCategoryProducts.length === 0 &&
        this.props.reduxState.loading === false ? (
          <View style={styles.containerView}>
            <Text style={globalStyling.errorText}>
              {i18n.productsDoesntExistSubCategory}
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
            renderItem={this.renderItem}
            data={this.props.reduxState.subCategoryProducts}
            // numColumns={screenWidth < 500 ? 3 : 4}
            numColumns={2}
            removeClippedSubviews={true}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  searchView: {
    paddingVertical: Platform.OS === "ios" ? 10 : null,
    borderRadius: 10,
    borderColor: colors.greyTextColor,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  textInput: { width: "90%" },
  imageView: { height: 25, width: 25, overflow: "hidden" },
  containerView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  columnWrapperStyleFlatlist: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  selectedSubCategory: {
    margin: 10,
    fontSize: fontSizes.normal,
    color: colors.blackColor,
    fontWeight: "bold",
    borderColor: colors.blackColor,
    borderBottomWidth: 3,
    marginBottom: 0,
  },
  unSelectedSubCategory: {
    margin: 10,
    marginBottom: 0,
    fontSize: fontSizes.normal,
    color: colors.greyColor,
  },
  subCategoryFlatlist: { width: "90%", alignSelf: "center" },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubCat);
