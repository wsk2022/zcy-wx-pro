const http = require('../utils/request.js').request

// 
function getHotList(data) {
  return http({
    url: '/mpProjectDeclare/api/fe/policy/searchListTop',
    method: 'GET',
    data
  })
}




module.exports = {
  getHotList,
}