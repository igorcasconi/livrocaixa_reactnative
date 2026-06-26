import styled from 'styled-components/native'
import { Text } from '../Text'

type ButtonTextVariant = 'default' | 'cancel' | 'destructive'

export const CenteredView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
})

export const ModalView = styled.View({
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 0,
  alignItems: 'stretch',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
})

export const ContentContainer = styled.View({
  paddingHorizontal: 20,
  paddingVertical: 20,
  minWidth: 280
})

export const TitleText = styled(Text)({
  fontSize: 18,
  fontWeight: '700',
  color: '#21262c',
  marginBottom: 8
})

export const MessageText = styled(Text)({
  fontSize: 14,
  color: '#555',
  lineHeight: 20
})

export const ButtonsContainer = styled.View({
  flexDirection: 'row',
  borderTopWidth: 1,
  borderTopColor: '#e0e0e0',
  minHeight: 44
})

export const ButtonWrapper = styled.View<{ $isLast?: boolean }>(({ $isLast }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 12,
  borderRightWidth: $isLast ? 0 : 1,
  borderRightColor: '#e0e0e0'
}))

export const ActionText = styled(Text)<{ $variant?: ButtonTextVariant }>(({ $variant }) => ({
  fontSize: 14,
  fontWeight: '600',
  color: $variant === 'destructive' ? 'red' : 'secondary'
}))
