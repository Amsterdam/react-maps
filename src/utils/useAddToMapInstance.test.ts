import { renderHook } from '@testing-library/react-hooks'
import useAddToMapInstance from './useAddToMapInstance'
import * as useMapInstance from './useMapInstance'

jest.mock('leaflet')

describe('useAddToMapInstance', () => {
  const mockedMapInstance = { hasLayer: jest.fn().mockReturnValue(true) } as any
  const removeFromMock = jest.fn()
  const addToMock = jest.fn(() => ({ removeFrom: removeFromMock }))
  const setInstanceMock = jest.fn()
  const customAddMock = jest.fn(() => ({ removeFrom: removeFromMock }))
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
    expect(setInstanceMock).toHaveBeenCalled()
  })

  it('should not call the addTo method, but call the customAdd function instead', () => {
    renderHook(() =>
      useAddToMapInstance(instanceMock as any, setInstanceMock, customAddMock),
    )

    expect(addToMock).not.toHaveBeenCalledWith(mockedMapInstance)
    expect(customAddMock).toHaveBeenCalledWith(instanceMock, mockedMapInstance)
    expect(setInstanceMock).toHaveBeenCalled()
  })

  it('should only call setInstance once', () => {
    const { rerender } = renderHook(() =>
      useAddToMapInstance(instanceMock as any, setInstanceMock),
    )

    rerender()
    rerender()

    expect(setInstanceMock).toHaveBeenCalledTimes(1)
  })

  it('should call removeFrom method when component will unmount', () => {
    const { unmount } = renderHook(() =>
      useAddToMapInstance(instanceMock as any, setInstanceMock),
    )

    unmount()

    expect(removeFromMock).toHaveBeenCalled()
  })
})
