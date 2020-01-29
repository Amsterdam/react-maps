import { Map } from 'leaflet'
import { renderHook } from '@testing-library/react-hooks'
import useAddToMapInstance from './useAddToMapInstance'
import * as useMapInstance from './useMapInstance'

jest.mock('leaflet')

describe('useAddToMapInstance', () => {
  const mockedMapInstance = {} as Map
  const addToMock = jest.fn().mockReturnValue('addToResult')
  const setInstanceMock = jest.fn()
  const customAddMock = jest.fn().mockReturnValue('customAddResult')
  const instanceMock = {
    addTo: addToMock,
  }

  beforeEach(() => {
    jest.spyOn(useMapInstance, 'default').mockReturnValue(mockedMapInstance)
  })
  afterEach(() => {
    jest.spyOn(useMapInstance, 'default').mockReset()
    addToMock.mockClear()
    customAddMock.mockClear()
    setInstanceMock.mockClear()
  })

  it('should call the addTo method on the component', () => {
    renderHook(() => useAddToMapInstance(instanceMock as any, setInstanceMock))

    expect(addToMock).toHaveBeenCalledWith(mockedMapInstance)
    expect(setInstanceMock).toHaveBeenCalledWith('addToResult')
  })

  it('should not call the addTo method, but call the customAdd function instead', () => {
    renderHook(() =>
      useAddToMapInstance(instanceMock as any, setInstanceMock, customAddMock),
    )

    expect(addToMock).not.toHaveBeenCalledWith(mockedMapInstance)
    expect(customAddMock).toHaveBeenCalledWith(instanceMock, mockedMapInstance)
    expect(setInstanceMock).toHaveBeenCalledWith('customAddResult')
  })

  it('should only call setInstance once', () => {
    const { rerender } = renderHook(() =>
      useAddToMapInstance(instanceMock as any, setInstanceMock),
    )

    rerender()
    rerender()

    expect(setInstanceMock).toHaveBeenCalledTimes(1)
  })
})
