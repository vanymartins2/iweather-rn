import { mockWeatherAPIResponse } from '@__tests__/mocks/api/mockWeatherAPIResponse'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@__tests__/utils/customRender'
import { api } from '@services/api'
import { Dashboard } from '@screens/Dashboard'
import { saveStorageCity } from '@libs/asyncStorage/cityStorage'
import { mockCityAPIResponse } from '@__tests__/mocks/api/mockCityAPIResponse'

describe('Screen: Dashboard', () => {
  beforeAll(async () => {
    const city = {
      id: '1',
      name: 'Rio do Sul, BR',
      latitude: 123,
      longitude: 456,
    }

    await saveStorageCity(city)
  })

  it('should be able to show weather info from selected city', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse })

    render(<Dashboard />)

    const cityName = await waitFor(() => screen.findByText(/rio do sul/i))
    expect(cityName).toBeTruthy()
  })

  it('should be able to show another weather info from selected city', async () => {
    jest
      .spyOn(api, 'get')
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityAPIResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })

    render(<Dashboard />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'))

    const cityName = 'São Paulo'

    await waitFor(() =>
      act(() => {
        const searchInput = screen.getByTestId('search-input')
        fireEvent.changeText(searchInput, cityName)
      }),
    )

    await waitFor(() =>
      act(() => {
        fireEvent.press(screen.getByText(cityName, { exact: false }))
      }),
    )

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy()
  })
})
