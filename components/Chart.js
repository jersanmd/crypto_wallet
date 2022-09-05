import React from 'react'
import {
    View,
    Text
} from 'react-native'

import { COLORS } from '../constants'

// import {
//     ChartDart,
//     ChartPath,
//     ChartPathProvider,
//     ChartXLabel,
//     ChartYLabel,
//     monotoneCubicInterpolation
// } from '@rainbow-me/animated-charts'

const Chart = ({containerStyle, chartPrices}) => {
  return (
    <View>
        <Text   
            style={{
                color: COLORS.white,
            }}
        >Chart</Text>
    </View>
  )
}

export default Chart