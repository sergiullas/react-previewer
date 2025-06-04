// constants/mockData.ts

export const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'city', headerName: 'City', width: 130 },
];

export const rows1 = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, city: 'Winterfell' },
  {
    id: 2,
    lastName: 'Lannister',
    firstName: 'Cersei',
    age: 42,
    city: "King's Landing",
  },
  { id: 3, lastName: 'Stark', firstName: 'Arya', age: 16, city: 'Winterfell' },
];

export const rows2 = [
  {
    id: 4,
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    age: 29,
    city: 'Dragonstone',
  },
  { id: 5, lastName: 'Melisandre', firstName: '', age: 150, city: 'Asshai' },
];

export const cityMap: Record<number, string> = {
  1: 'Winterfell',
  2: "King's Landing",
  3: 'Winterfell',
  4: 'Dragonstone',
  5: 'Asshai',
};
