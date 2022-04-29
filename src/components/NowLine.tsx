import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function NowLine({style, left, width, calculateTopOffset}: any) {
  const [now, setNow] = React.useState(new Date());

  // move current time line every minute
  React.useEffect(() => {
    let timeout: any = null;

    const update = () => {
      timeout = setTimeout(() => {
        setNow(new Date());
        update();
      }, 60000);
    };
    update();

    return () => clearTimeout(timeout);
  }, []);

  const size = Math.max(style?.dot?.width || 0, style?.dot?.height || 0) || 10;
  const styleDot = {
    backgroundColor: style?.dot?.backgroundColor || 'black',
    height: size,
    width: size,
    borderRadius: style?.dot?.hasOwnProperty('borderRadius')
      ? style?.dot?.borderRadius
      : size * 2,
    zIndex: style?.dot?.hasOwnProperty('zIndex') ? style?.dot?.zIndex : 6,
    elevation: style?.dot?.hasOwnProperty('elevation')
      ? style?.dot?.elevation
      : 2,
  };

  const styleLine = {
    backgroundColor: style?.line?.backgroundColor || 'black',
    zIndex: style?.line?.hasOwnProperty('zIndex') ? style?.line?.zIndex : 6,
    elevation: style?.line?.hasOwnProperty('elevation')
      ? style?.line?.elevation
      : 2,
    height: style?.line?.height || 2,
    width: '100%',
  };

  return (
    <View
      style={{
        top: calculateTopOffset(now),
        left: left - size / 2 + 0.5,
        width,
        ...styles.contentView,
      }}>
      {/* Dot */}
      <View style={styleDot} />
      {/* Line */}
      <View style={styleLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3,
    elevation: 5,
  },
});
