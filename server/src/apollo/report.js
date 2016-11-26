
export const Geometry = `
  type Geometry {
    type: String,
    coordinates: [Int],
  }
`;

export const Properties = `
  type Properties {
    date: String,
    description: String,
    identification: Int,
  }
`;

const Report = `
  type Report {
    type: String,
    geometry: Geometry,
    properties: Properties,
  }
`;

export default() => [Geometry, Properties, Report];
