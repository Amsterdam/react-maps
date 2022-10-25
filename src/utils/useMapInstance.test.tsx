import { renderHook } from '@testing-library/react'
import { Map } from 'leaflet'
import React, { FunctionComponent } from 'react'
import MapContext from '../MapContext'
import useMapInstance from './useMapInstance'

describe('useMapInstance', () => {
  it('should use the map instance', () => {
    const mockInstance = { foo: 'bar' } as unknown as Map
    //@ts-ignore
    const wrapper: FunctionComponent = ({ children }) => (
      <MapContext.Provider
        value={{
          mapInstance: mockInstance,-ignore
        }}
      >
        {children}
      </MapContext.Provider>
    )

    const { result } = renderHook(() => useMapInstance(), { wrapper })
    expect(result.current).toEqual(mockInstance)
  })

  it.skip("should throw an exception if the provider doesn't exist", () => {
    const { result } = renderHook(() => useMapInstance())

    expect(result).not.toBeDefined()
  })
})
