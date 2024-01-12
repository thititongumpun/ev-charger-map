export interface ApiResponse {
  summary: Summary;
  results: Result[];
}

export interface Result {
  type: ResultType;
  id: string;
  score: number;
  dist: number;
  info: string;
  poi: Poi;
  address: Address;
  position: GeoBias;
  viewport: Viewport;
  entryPoints: EntryPoint[];
  chargingPark: ChargingPark;
}

export interface Address {
  streetNumber?: string;
  streetName?: string;
  municipalitySubdivision?: string;
  municipality: Municipality;
  countrySecondarySubdivision: CountrySecondarySubdivision;
  countrySubdivision: CountrySubdivision;
  countrySubdivisionName: CountrySubdivision;
  countrySubdivisionCode: string;
  postalCode: string;
  countryCode: CountryCode;
  country: Country;
  countryCodeISO3: CountryCodeISO3;
  freeformAddress: string;
  localName: CountrySecondarySubdivision;
}

export enum Country {
  ประเทศไทย = "ประเทศไทย",
}

export enum CountryCode {
  Th = "TH",
}

export enum CountryCodeISO3 {
  Tha = "THA",
}

export enum CountrySecondarySubdivision {
  อำเภอปากเกร็ด = "อำเภอ ปากเกร็ด",
  อำเภอเมืองนนทบุรี = "อำเภอ เมืองนนทบุรี",
}

export enum CountrySubdivision {
  จังหวัดนนทบุรี = "จังหวัด นนทบุรี",
}

export enum Municipality {
  นนทบุรี = "นนทบุรี",
  ปากเกร็ด = "ปากเกร็ด",
}

export interface ChargingPark {
  connectors: Connector[];
}

export interface Connector {
  connectorType: ConnectorType;
  ratedPowerKW: number;
  voltageV: number;
  currentA: number;
  currentType: CurrentType;
}

export enum ConnectorType {
  Chademo = "Chademo",
  IEC62196Type2CCS = "IEC62196Type2CCS",
  IEC62196Type2Outlet = "IEC62196Type2Outlet",
}

export enum CurrentType {
  Ac1 = "AC1",
  Ac3 = "AC3",
  Dc = "DC",
}

export interface EntryPoint {
  type: EntryPointType;
  position: GeoBias;
}

export interface GeoBias {
  lat: number;
  lon: number;
}

export enum EntryPointType {
  Main = "main",
}

export interface Poi {
  name: string;
  phone?: string;
  brands?: Brand[];
  categorySet: CategorySet[];
  categories: Category[];
  classifications: Classification[];
}

export interface Brand {
  name: string;
}

export enum Category {
  ElectricVehicleStation = "electric vehicle station",
}

export interface CategorySet {
  id: number;
}

export interface Classification {
  code: Code;
  names: Name[];
}

export enum Code {
  ElectricVehicleStation = "ELECTRIC_VEHICLE_STATION",
}

export interface Name {
  nameLocale: NameLocale;
  name: Category;
}

export enum NameLocale {
  EnUS = "en-US",
}

export enum ResultType {
  Poi = "POI",
}

export interface Viewport {
  topLeftPoint: GeoBias;
  btmRightPoint: GeoBias;
}

export interface Summary {
  queryType: string;
  queryTime: number;
  numResults: number;
  offset: number;
  totalResults: number;
  fuzzyLevel: number;
  geoBias: GeoBias;
}