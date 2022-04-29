/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import moment from 'moment';
import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Timetable from './src/Timetable';
import MockupData from './src/data.json';
import {HOUR_HEIGHT} from './src/constants/constants';
import {formatRequester, statusRequester} from './src/helpers/date';
const AvatarAnynomousMale = require('./src/images/avatarAnynomousMale.jpg');

/**
 *
 * @param style Object with pre-calculated values, looks like {position: 'absolute', zIndex: 3, width: Number, height: Number, top: Number, left: Number}
 * @param item One of items supplied to Timetable through 'items' property
 * @param dayIndex For multiday items inicates current day index
 * @param daysTotal For multiday items indicates total amount of days
 */
export function MyItemCard({
  style,
  item,
  dayIndex,
  daysTotal,
  biggestGroupSize,
  node,
}: any) {
  const {color_code, avatar, requester, status} = item || {};
  return (
    <View
      style={{
        ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
        ...styles.contentItem,
        borderLeftColor: color_code,
      }}>
      <TouchableOpacity
        style={styles.vflex}
        onPress={() => {
          Alert.alert(JSON.stringify(item));
        }}>
        <Image
          style={styles.avatar}
          source={avatar ? {uri: avatar} : AvatarAnynomousMale}
        />
        <Text style={styles.text}>
          {formatRequester(requester, biggestGroupSize)}
        </Text>

        <View style={styles.contentStatus}>
          <View
            style={{
              borderColor: statusRequester(status),
              ...styles.status,
            }}></View>
          {biggestGroupSize > 1 ? null : (
            <Text numberOfLines={1}>{item.symptom}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /**
   * By default Timetable renders one column.
   * This sets date for that column, by default equals to new Date().
   * Can be instance of Date or an ISO string.
   * Essentially, a shortcut for range {from: date, till: date}.
   */
  // TODO hardcode
  const [date] = React.useState('2020-10-12');

  /**
   * If you would like to have multiple columns (e.g. from Monday to Sunday),
   * you can specify range of dates. Each day of said range will have its own column.
   *
   * 'from' and 'till', just like 'date', can be instances of Date or an ISO strings.
   *
   * It is safe to keep 'from' and 'till' in separate states if you need to
   * because Timetable only check if 'from' or 'till' had changed and
   * not the object that contains them.
   */
  const [from] = React.useState(moment().subtract(3, 'days').toDate());
  const [till] = React.useState(moment().add(3, 'days').toISOString());
  const range = {from, till};

  const [items, setItems] = React.useState<any>([]);

  useEffect(() => {
    MockupData.data[0].appoitment_calendar.forEach((item: any) => {
      item.start_time = moment(item.start_time).toDate();
      item.end_time = moment(item.end_time).toDate();
    });
    setItems(MockupData.data[0].appoitment_calendar);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        showsVerticalScrollIndicator={false}>
        <Timetable
          contentContainer={styles.contentContainer}
          scrollViewProps={styles.contentView}
          // these two are required
          items={items}
          cardComponent={MyItemCard}
          // provide only one of these if you need to
          date={date} // optional
          range={range} // ptional
          fromHour={0} // 00:00
          toHour={24} // 24:00
          style={styles.dayView}
          hourHeight={HOUR_HEIGHT}
          startProperty={'start_time'}
          endProperty={'end_time'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<any>({
  vflex: {
    flex: 1,
  },
  contentView: {
    backgroundColor: 'white',
  },
  contentContainer: {
    zIndex: 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  dayView: {
    nowLine: {
      line: {
        backgroundColor: '#D62D68',
      },
      dot: {
        backgroundColor: '#D62D68',
      },
    },
  },
  contentItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    borderTopColor: 'gray',
    borderRightColor: 'gray',
    borderBottomColor: 'gray',
    borderWidth: 1,
    borderLeftWidth: 10,
    padding: 5,
  },
  avatar: {
    width: HOUR_HEIGHT / 2 - 15,
    height: HOUR_HEIGHT / 2 - 15,
    borderRadius: 30 / 2,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    alignItems: 'center',
  },
  status: {
    borderWidth: 2,
    borderRadius: 6,
    width: 8,
    height: 8,
    marginRight: 5,
    marginLeft: 2,
  },
  contentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
