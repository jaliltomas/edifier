export const isValidUmbral = function({ zipCode, dataProduct }) {
  if (dataProduct.store.out_stock == true) {
    return 0;
  }
  const userZipCode = parseInt(zipCode);
  const productWarehouse = dataProduct.product?.product_warehouse;
  const threshold = dataProduct.threshold;

  if (!productWarehouse.length) {
    return 0;
  }

  if (userZipCode === 2000) {
    const warehouse = userFindWarehouse({
      cp_central: 5,
      cp_regional: 10,
      productWarehouse
    });
    return validateStock({
      warehouse,
      threshold,
      cp_regional: 10,
      productWarehouse
    });
  }

  if (userZipCode === 5000) {
    const warehouse = userFindWarehouse({
      cp_central: 5,
      cp_regional: 3,
      productWarehouse
    });
    return validateStock({
      warehouse,
      threshold,
      cp_regional: 3,
      productWarehouse
    });
  }

  return defaultStock({ productWarehouse, threshold });
};

const userFindWarehouse = function({
  cp_central,
  cp_regional,
  productWarehouse
}) {
  return productWarehouse.filter(
    whr =>
      (whr.warehouse_id === cp_regional && whr.current_stock > 0) ||
      (whr.warehouse_id === cp_central && whr.current_stock > 0)
  );
};

const validateStock = function({
  warehouse,
  threshold,
  cp_regional,
  productWarehouse
}) {
  if (warehouse.length > 1) {
    const userWarehouse = warehouse.find(
      whr => whr.warehouse_id == cp_regional
    );

    if (userWarehouse?.current_stock > threshold)
      return userWarehouse.current_stock - threshold;
    return defaultStock({ productWarehouse, threshold });
  }

  const warehouseThreshold = warehouse.some(
    whr => whr.current_stock > threshold
  );

  if (warehouseThreshold) {
    return warehouse[0].current_stock - threshold;
  }
  return 0;
};

const defaultStock = function({ productWarehouse, threshold }) {
  const warehouse = productWarehouse.filter(
    whr => whr.warehouse_id == 5 && whr.current_stock > 0
  );

  if (warehouse.length) {
    const warehouseThreshold = warehouse.some(
      whr => whr.current_stock > threshold
    );
    if (warehouseThreshold) return warehouse[0].current_stock - threshold;
    return 0;
  }
  return 0;
};
