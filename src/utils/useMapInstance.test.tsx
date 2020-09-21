import { renderHook } from '@testing-library/react-hooks'
import { Map } from 'leaflet'
import React from 'react'
import MapContext from '../MapContext'
import useMapInstance from './useMapInstance'

describe('useMapInstance', () => {
  it('should use the map instance', () => {
    const mockInstance = ({ foo: 'bar' } as unknown) as Map
    const wrapper: React.FC = ({ children }) => (
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
    const { result } = renderHook(() => useMapInstance())
    expect(result.error).toBeDefined()
  })
})