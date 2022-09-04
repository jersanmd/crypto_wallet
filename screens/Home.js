import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants';

import MainLayout  from './MainLayout'
import { BalanceInfo, IconTextButton } from '../components';
import holdings from '../constants/dummy';

import { connect } from 'react-redux'
import { getHoldings, getCoinMarket } from '../stores/market/marketActions'

import { useFocusEffect } from '@react-navigation/native'

const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {

    useFocusEffect(
        React.useCallback(() => {
            getHoldings(dummyData.holdings)
            getCoinMarket()
        }, [])
    )

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)
    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
    let percChange = valueChange / (totalWallet - valueChange) * 100

    function renderWalletInfoSection() {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: COLORS.gray
                }}
            > 
                <BalanceInfo
                    title="Your Wallet"
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle = {{
                        marginTop: 50
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginBottom: -15,
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <IconTextButton 
                        label="Transfer"
                        icon={icons.send}
                        containerStyle = {{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.base
                        }}
                    />

                    <IconTextButton 
                        label="Withdraw"
                        icon={icons.withdraw}
                        containerStyle = {{
                            flex: 1,
                            height: 40,
                        }}
                    />
                </View>
            </View>
        )
    }

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black,
                }}    
            >
                {renderWalletInfoSection()}
            </View>
        </MainLayout>
    )
}

function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))
        },
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);