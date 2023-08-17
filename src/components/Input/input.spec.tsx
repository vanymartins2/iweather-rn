import { render, screen } from '@testing-library/react-native'

import { Input } from '@components/Input'

describe('Component: Input', () => {
  it('should be able to render without activity indicator if isLoading prop is undefined', () => {
    render(<Input />)

    const activityIndicator = screen.queryByTestId('activity-indicator')
    expect(activityIndicator).toBeNull()
  })

  it('should be able to render with activity indicator if isLoading prop is true', () => {
    render(<Input isLoading />)

    const activityIndicator = screen.getByTestId('activity-indicator')
    expect(activityIndicator).toBeTruthy()
  })
})
