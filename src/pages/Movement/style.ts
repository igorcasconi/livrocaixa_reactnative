import { BottomTabBarOptions } from '@react-navigation/bottom-tabs'

export const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: 'white',
  inactiveTintColor: 'black',
  inactiveBackgroundColor: '#4db476',
  activeBackgroundColor: '#89ac97',
  style: {
    elevation: 0,
    shadowOpacity: 0,
    height: 64,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  tabStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle: {
    flex: 0,
    width: 22,
    height: 40
  },
  labelStyle: {
    fontSize: 14,
    marginLeft: 16
  }
}
