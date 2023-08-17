import { CityProps } from '@services/getCityByNameService'
import {
  getStorageCity,
  removeStorageCity,
  saveStorageCity,
} from './cityStorage'

const newCity: CityProps = {
  id: '1',
  name: 'São Paulo',
  latitude: 456,
  longitude: 789,
}

describe('Storage: CityStorage', () => {
  it('should return null when city storage does not exists', async () => {
    const response = await getStorageCity()
    expect(response).toBeNull()
  })

  it('should be able return the city storage', async () => {
    await saveStorageCity(newCity)
    const response = await getStorageCity()
    expect(response).toEqual(newCity)
  })

  it('should be able to remove the city storage', async () => {
    await saveStorageCity(newCity)
    await removeStorageCity()

    const response = await getStorageCity()
    expect(response).toBeNull()
  })
})
