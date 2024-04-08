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
          mapInstance: mockInstance,
        }}
      >
        {children}
      </MapContext.Provider>
    )

    const { result } = renderHook(() => useMapInstance(), { wrapper })
    expect(result.current).toEqual(mockInstance)
  })

  it("should throw an exception if the provider doesn't exist", () => {
    expect(() => renderHook(() => useMapInstance())).toThrow(
      new Error('Unable to retrieve map instance, no provider could be found for the MapContext.'),
    )
  })
})
