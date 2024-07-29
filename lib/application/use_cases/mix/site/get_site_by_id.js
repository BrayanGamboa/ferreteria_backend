'use strict';

module.exports = (id, { mixSiteRepository }) => {
  return mixSiteRepository.getByFilter({ id });
};
