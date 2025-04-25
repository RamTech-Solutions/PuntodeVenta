import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { useProductContext } from '../context/ProductContext.js';
import { useEffect } from "react";

const SalesComponent = () => {
  const { wholeSales, fetchAllSales } = useProductContext();

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[3]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, wholeSales.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const unsubscribe = fetchAllSales();
    return () => unsubscribe && unsubscribe();
}, []);

  return (
    <DataTable>
      {/* Cabecera de la tabla */}
      <DataTable.Header>
        <DataTable.Title style={{ flex: 1 }}>Ticket</DataTable.Title>
        <DataTable.Title style={{ flex: 3 }}>Fecha de venta</DataTable.Title>
        <DataTable.Title style={{ flex: 2 }}>Total</DataTable.Title>
        <DataTable.Title style={{ flex: 2 }}>Método de pago</DataTable.Title>
      </DataTable.Header>

      {/* Filas de la tabla */}
      {wholeSales.slice(from, to).map((sale, index) => (
        <DataTable.Row key={sale.id}>
          <DataTable.Cell style={{ flex: 1 }}>{index + 1}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            {sale.timestamp ? new Date(sale.timestamp.seconds * 1000).toLocaleDateString() : "N/A"}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>${sale.total}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{sale.paymentMethod}</DataTable.Cell>
        </DataTable.Row>
      ))}

      {/* Paginación */}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(wholeSales.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} de ${wholeSales.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Filas por página'}
      />
    </DataTable>
  );
};

export default SalesComponent;
