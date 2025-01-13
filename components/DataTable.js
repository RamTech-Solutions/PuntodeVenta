import * as React from 'react';
import { DataTable, Provider } from 'react-native-paper';


const MyComponent = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[3]
  );

  const [items] = React.useState([
    { id: 1, name: 'Laptop', price: 15000, performance: 'Alta' },
    { id: 2, name: 'Mouse', price: 500, performance: 'Media' },
    { id: 3, name: 'Teclado', price: 800, performance: 'Media' },
    { id: 4, name: 'Monitor', price: 7000, performance: 'Alta' },
    { id: 5, name: 'Impresora', price: 4000, performance: 'Baja' },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      {/* Cabecera de la tabla */}
      <DataTable.Header>
        <DataTable.Title style={{ flex: 1 }}>ID</DataTable.Title>
        <DataTable.Title style={{ flex: 3 }}>Nombre de artículo</DataTable.Title>
        <DataTable.Title style={{ flex: 2, textAlign: 'right' }}>Precio</DataTable.Title>
        <DataTable.Title style={{ flex: 2 }}>Rendimiento</DataTable.Title>
      </DataTable.Header>

      {/* Filas de la tabla */}
      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell style={{ flex: 1 }}>{item.id}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>{item.name}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2, textAlign: 'right' }}>${item.price}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{item.performance}</DataTable.Cell>
        </DataTable.Row>
      ))}

      {/* Paginación */}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} de ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Filas por página'}
      />
    </DataTable>
  );
};

export default MyComponent;
