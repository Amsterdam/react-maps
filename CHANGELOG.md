# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Prefix the change with one of these keywords:

- _Added_: for new features.
- _Changed_: for changes in existing functionality.
- _Deprecated_: for soon-to-be removed features.
- _Removed_: for now removed features.
- _Fixed_: for any bug fixes.
- _Security_: in case of vulnerabilities.


## [0.12.0]
- Changed: **BREAKING** Dropped support for React version 16

## 0.11.0

- Changed: `MapProps` for the `Map` component are now exported publicly.

## 0.10.0

- Changed: Moved packages to @amsterdam organization on NPM.

## 0.9.1

- Fixed: `Map` component no longer throws an exception.

## 0.9.0

- Changed: **BREAKING** `useMapInstance` will no longer return null values and throw an exception if no provider for `MapContext` was found.
- Changed: **BREAKING** `useEvents` must be provided with a non-null value.

## 0.8.3

- Added: `CircleMarker` component export

## 0.8.1

- Fixed: events are now only set when the mapInstance exists

## 0.8.0

- Added: setInstance callback on the Map component

## 0.6.0

- Fixed: remove layer from mapInstance when component will unmount

## 0.5.0

- Added: useEvents and useMapEvents hook
- Added: customAdd prop to leaflet components

## 0.4.0

- Changed: removed L (leaflet) from mapInstance, export mapInstance directly
