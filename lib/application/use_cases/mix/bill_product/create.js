'use strict';

const BillProduct = require('../../../../domain/mix_bill_product/bill_product');
const { generateCurrentDate } = require('../../../utilities/general_functions');

module.exports = async (
  billId,
  productId,
  numberProducts,
  { mixBillProductRepository, mixBillRepository }
) => {
  //Validate if the client already exists in the database
  const validationBill = await mixBillRepository.getByFilter({
    id: billId
  });
  if (validationBill === null) return 432;
  if (validationBill === false) return false;

  const bill_product = new BillProduct(null, billId, productId, numberProducts, {
    registerDate: generateCurrentDate(),
    updateDate: null
  });

  const resultCreateBill = await mixBillProductRepository.persist(bill_product);
  return resultCreateBill ? resultCreateBill : false;
};
