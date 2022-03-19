import { BottomTabBarOptions } from '@react-navigation/bottom-tabs'

export const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: 'white',
  inactiveTintColor: 'black',
  inactiveBackgroundColor: '#4db476',
  activeBackgroundColor: '#89ac97',
  style: {
    elevation: 0,
    shadowOpacity: 0,
    height: 64
  },
  tabStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle: {
    flex: 0,
    width: 20,
    height: 20
  },
  labelStyle: {
    fontSize: 14,
    marginLeft: 16
  }
}
