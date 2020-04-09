import http from './http'
import i18n from '../../i18n'

const config = require('@/assets/config.json')

export const getIndexData = function () {
  return http.get('IndexData.php', {
      params: {
        lang: i18n.locale.toUpperCase(),
      },
    },
  )
}

export const getDishesList = function (onlyActive = false) {
  return http.get('Dishes.php', { params: { lang: i18n.locale.toUpperCase(), onlyActive: onlyActive } })
}

const uploadConfig = {
  headers: {
    post: {
      'Content-Type': 'multipart/form-data',
    },
  },
}

export const addDishes = function (file, params, allergenGroup) {
  var formData = new FormData()
  formData.append('file', file)
  formData.append('params', JSON.stringify(params))
  formData.append('allergenGroup', allergenGroup)

  return http.post('Dishes.php?op=add', formData, {
    ...uploadConfig,
    showLoading: true,
  })
}

export const updateDishes = function (params, file, allergenGroup) {
  var formData = new FormData()
  if (file) {
    formData.append('file', file)
    params.imageExt = file.name.split('.')[1]
  }
  formData.append('params', JSON.stringify(params))
  formData.append('allergenGroup', allergenGroup)
  return http.post('Dishes.php?op=update', formData,
    {
      ...uploadConfig,
      showLoading: true,
    })
}

export const deleteDish = function (id) {
  return http.post('Dishes.php?op=delete', {
    id: id,
  })
}

export const getDish = function (id) {
  return http.get('Dishes.php', { params: { id: id } })
}
export const updateActiveStatus = function (id, isActive) {
  return http.post('Dishes.php?op=updateActiveStatus', {
    id: id,
    isActive: isActive,
  })
}
// Category
export const getCategoryList = function (allLanguage = false) {
  if (allLanguage) {
    return http.get('Category.php')
  }
  return http.get('Category.php', { params: { lang: i18n.locale.toUpperCase() } })
}

export const getCategoryType = function () {
  return http.get('CategoryType.php', { params: { lang: i18n.locale.toUpperCase() } })
}

export const addCategory = function (catTypeId, langs, appliedAttributeGroup) {
  return http.post('Category.php?op=add', {
    catTypeId: catTypeId,
    langs: JSON.stringify(langs),
    appliedAttributeGroup: appliedAttributeGroup,
  })
}

export const deleteCategory = function (id) {
  return http.post('Category.php?op=delete', {
    id: id,
  })
}

export const updateCategory = function (catTypeId, langs, id, appliedAttributeGroup) {
  return http.post('Category.php?op=update', {
    catTypeId: catTypeId,
    langs: JSON.stringify(langs),
    id: id,
    appliedAttributeGroup: appliedAttributeGroup,
  })
}
// 弃用
// export const getPrintCategory = function () {
//   return http.get('Printer.php', {
//     params: {
//       op: 'showPrintCategory',
//       lang: i18n.locale.toUpperCase(),
//     },
//   })
// }

export const getPrinterGroups = function () {
  return http.get('Printer.php', {
    params: {
      op: 'showPrinterGroups',
      lang: i18n.locale.toUpperCase(),
    },
  })
}

export const getDishInfo = function (code) {
  return http.get('Dishes.php', {
    params: {
      lang: i18n.locale.toUpperCase(),
      op: 'simpleInfo',
      code: code,
    },
  })
}
export const getTableTypeList = function (tableId) {
  return http.get('Category.php', {
    params: {
      lang: i18n.locale.toUpperCase(),
      op: 'withTableType',
      tableId: tableId,
    },
  })
}
export const getSectionList = function () {
  return http.get('Section.php', { params: { op: 'view' } })
}
export const addSection = function (servantId, name) {
  return http.post('Section.php?op=add', {
    servantId: servantId,
    name: name,
  })
}
export const updateSection = function (servantId, name, id) {
  return http.post('Section.php?op=update', {
    servantId: servantId,
    name: name,
    id: id,
  })
}
export const deleteSection = function (id) {
  return http.post('Section.php?op=delete', {
    id: id,
  })
}
export const getTablesList = function () {
  return http.get('Restaurant.php', { params: { lang: i18n.locale.toUpperCase() } })
}
export const addTable = function (sectionId, name, seatCount) {
  return http.post('Restaurant.php?op=add', {
    sectionId: sectionId,
    name: name,
    seatCount: seatCount,
  })
}
export const updateTable = function (sectionId, name, seatCount, id) {
  return http.post('Restaurant.php?op=update', {
    sectionId: sectionId,
    name: name,
    seatCount: seatCount,
    id: id,
  })
}
export const deleteTable = function (id) {
  return http.post('Restaurant.php?op=delete', {
    id: id,
  })
}

export const getDetailTable = function (id) {
  return http.get('BackendData.php', {
    params: {
      op: 'tableDetail',
      lang: i18n.locale.toUpperCase(),
      id: id,
    },
  })
}
export const getActiveTable = function () {
  return http.get('Restaurant.php', { params: { op: 'active' } })
}
export const getCurrentTableInfo = function (id) {
  return http.get('Restaurant.php', {
    params: {
      op: 'currentInfo',
      id: id,
    },
  })
}
export const getAllTablesInfo = function () {
  return http.get('Restaurant.php', { params: { op: 'currentInfos' } })
}
export const openJpBuffetTable = function (tableId, pw, adultDishId, adultCount, childCount) {
  return http.post('Complex.php', {
    op: 'openJapanBuffetTable',
    tableId: tableId,
    pw: pw,
    adultDishId: adultDishId,
    adultCount: adultCount,
    childCount: childCount,
  })
}
export const checkDishesInTable = function (tableId) {
  return http.post('Complex.php', {
    op: 'dishesInTable',
    tableId: tableId,
    lang: i18n.locale.toUpperCase(),
  })
}

export const openTable = function (tableId, pw, personCount) {
  return http.post('Complex.php', {
    op: 'openTable',
    tableId: this.tableId,
    pw: this.pw,
    personCount: this.personCount,
  })
}

export const openTakeAwayTable = function (personCount, pw) {
  return http.post('Complex.php', {
    op: 'openTakeawayTable',
    personCount: personCount,
    pw: pw,
  })
}
export const rejectTakeAwayOrder = function (reason, tableId) {
  return http.post('Complex.php', {
    op: 'rejectTakeAwayOrder',
    reason: reason,
    tableId: tableId,
  })
}
export const addDishesToTable = function (orderInfo, tableId) {
  return http.post('Complex.php', {
    op: 'addDishesToTable',
    params: JSON.stringify(orderInfo),
    tableId: tableId,
  })
}
export const splitOrder = function (payMethod, tableId, tipIncome, withTitle, printCount, discountStr, dishes) {
  return http.post('Complex.php', {
    op: 'splitOrder',
    payMethod: payMethod,
    tableId: tableId,
    tipIncome: tipIncome,
    withTitle: withTitle,
    printCount: printCount,
    discountStr: discountStr,
    dishes: JSON.stringify(dishes),
  })
}

export const addPrinter = function (sn, name, key, identity, groupIds, printerTypeId) {
  return http.post('Printer.php?op=add', {
    sn: sn,
    name: name,
    key: key,
    identifier: identity,
    groupIds: JSON.stringify(groupIds),
    printerTypeId: printerTypeId,
  })
}

export const updatePrinter = function (name, groupIds,
                                       printerTypeId, id) {
  return http.post('Printer.php?op=edit', {
    name: name,
    groupIds: JSON.stringify(groupIds),
    printerTypeId: printerTypeId,
    id: id,
  })
}

export const removePrinter = function (id) {
  return http.post('Printer.php?op=remove', {
    id: id,
  })
}
export const getAllPrinter = function () {
  return http.get('Printer.php', { params: { op: 'showAllPrinterStatus' } })
}
export const getAllPrinterCategory = function () {
  return http.get('Printer.php', { params: { op: 'showPrinterType' } })
}
export const getSectionPrinter = function () {
  return http.get('Printer.php', { params: { op: 'showPrinterGroups' } })
}
export const addSectionPrinter = function (name, isSingleLinePrint, isSingleOrderPrint) {
  return http.post('Printer.php?op=addPrinterGroups', {
    name: name,
    isSingleLinePrint: isSingleLinePrint,
    isSingleOrderPrint: isSingleOrderPrint,
  })
}
export const updateSectionPrinter = function (name, isSingleLinePrint, isSingleOrderPrint, id) {
  return http.post('Printer.php?op=updatePrinterGroups', {
    name: name,
    isSingleLinePrint: isSingleLinePrint,
    isSingleOrderPrint: isSingleOrderPrint,
    id: id,
  })
}
export const deleteSectionPrinter = function (id) {
  return http.post('Printer.php?op=deletePrinterGroup', {
    id: id,
  })
}
export const getAllPrintedBill = function () {
  return http.get('PrintRecord.php', { params: { op: 'getAllRecords' } })
}
export const printServantBill = function (id) {
  return http.get('Servant.php', {
    params: {
      op: 'printSummaryBon',
      id: id,
    },
  })
}
export const printAllBill = function () {
  http.get('Printer.php', { params: { op: 'printAll' } })
}
export const PrinterAllSummary = function () {
  return http.post('Complex.php?op=printSummary')
}
export const PrinterAllZbon = function () {
  return http.post('ZBon.php?op=printZbon')
}

export const getDishStatistic = function () {
  return http.get('BackendData.php', {
    params: {
      op: 'dishStatistic',
      lang: i18n.locale.toUpperCase(),
    },
  })
}
export const getDetailOrder = function (id) {
  return http.get('BackendData.php', {
    params: {
      op: 'billDetail',
      lang: i18n.locale.toUpperCase(),
      id: id,
    },
  })
}

export const getServantList = function () {
  return http.get('Servant.php', { params: { lang: i18n.locale.toUpperCase() } })
}
export const addOneServant = function (name, pass, isPartTime, permission, file) {
  var formData = new FormData()
  formData.append('name', name)
  formData.append('pass', pass)
  formData.append('isPartTime', isPartTime)
  formData.append('permission', permission)
  formData.append('file', file)

  return http.post('Servant.php?op=add', formData, {
    ...uploadConfig,
    showLoading: true,
  })
}
export const updateOneServant = function (file, name, pass, isPartTime, permission, id) {
  var formData = new FormData()
  if (file) {
    formData.append('file', file)
    formData.append('imageExt', file.name.split('.')[1])
  }
  formData.append('name', name)
  formData.append('password', pass)
  formData.append('isPartTime', isPartTime)
  formData.append('permission', permission)
  formData.append('id', id)
  return http.post('Servant.php?op=update', formData,
    {
      ...uploadConfig,
      showLoading: true,
    })
}
export const deleteOneServant = function (id) {
  return http.post('Servant.php?op=delete', {
    id: id,
  })
}
export const getServantInfo = function (pw) {
  return http.get('Servant.php', { params: { pw: pw } })
}
export const getAllOrderings = function () {
  return http.get('AccessLog.php', { params: { op: 'getAllRecords' } })
}
export const printOperation = function () {
  return http.get('AccessLog.php', { params: { op: 'printToday' } })
}
export const checkServant = function (pw, tableId) {
  return http.get('Servant.php', {
    params: {
      op: 'checkServant',
      pw: pw,
      tableId: tableId,
    },
  })
}

export const changeMethod = function (payMethodId, id) {
  return http.post('Complex.php?op=changeMethod', {
    payMethod: payMethodId,
    id: id,
  })
}

export const removeAllData = function (payMethod, id) {
  return http.post('Complex.php', {
    op: 'removeAllData',
    payMethod: payMethod,
    id: id,
  })
}

export const getTodayBills = function () {
  return http.get('BackendData.php', { params: { op: 'todaySumInfo' } })
}

export const getAllBillsList = function (timespan) {
  return http.get('Orders.php', {
    params: {
      op: 'withSortAndFilter',
      timespan: timespan || '',
    },
  })
}

export const getZBonList = function () {
  return http.get('ZBon.php', { params: { lang: i18n.locale.toUpperCase() } })
}

export const getServantDetail = function (id) {
  return http.get('BackendData.php', { params: { op: 'servantDetail', id: id } })
}

export const Login = function (password) {
  return http.get(config.companyRoot, { params: { op: 'logIn', password: password } })
}

export const findBestIp = function (id) {
  return http.get(config.companyRoot, { params: { op: 'findBestIp', deviceId: id } })
}

export const getAllAttribute = function () {
  return http.get('Category.php', { params: { op: 'showAttribute' } })
}
export const getAllAttributeGroup = function () {
  return http.get('Category.php', { params: { op: 'showAttributeGroup' } })
}
export const addAttributeGroup = function (name, required, multiSelect, printTitle) {
  return http.post('Category.php?op=addAttributeGroup', {
    name: name,
    required: required,
    multiSelect: multiSelect,
    printTitle: printTitle,
  })
}
export const updateAttributeGroup = function (id, name, required, multiSelect, printTitle) {
  return http.post('Category.php?op=updateAttributeGroup', {
    id: id,
    name: name,
    required: required,
    multiSelect: multiSelect,
    printTitle: printTitle,
  })
}
export const deleteAttributeGroup = function (id) {
  return http.post('Category.php?op=deleteAttributeGroup', {
    id: id,
  })
}
export const addAttribute = function (name, value, printMod, priceMod, attributeGroupId) {
  return http.post('Category.php?op=addAttribute', {
    name: name,
    value: value,
    printMod: printMod,
    priceMod: priceMod,
    attributeGroupId: attributeGroupId,
  })
}
export const updateAttribute = function (name, value, printMod, priceMod, attributeGroupId, id) {
  return http.post('Category.php?op=updateAttribute', {
    name: name,
    value: value,
    printMod: printMod,
    priceMod: priceMod,
    attributeGroupId: attributeGroupId,
    id: id,
  })
}
export const removeAttribute = function (id) {
  return http.post('Category.php?op=deleteAttribute', {
    id: id,
  })
}
export const getAllAllergen = function () {
  return http.get('Dishes.php?op=showAllAllergen')
}
export const addAllergen = function (name, icon, shortName, displayText) {
  return http.post('Dishes.php?op=addAllergen', {
    name: name,
    icon: icon,
    shortName: shortName,
    displayText: displayText,
  })
}
export const updateAllergen = function (name, icon, shortName, displayText, id) {
  return http.post('Dishes.php?op=updateAllergen', {
    name: name,
    icon: icon,
    shortName: shortName,
    displayText: displayText,
    id: id,
  })
}
export const deleteAllergen = function (id) {
  return http.post('Dishes.php?op=deleteAllergen', {
    id: id,
  })
}
export const getAllPayment = function () {
  return http.get('PayMethod.php')
}
export const addPayment = function (langs, isOnline, apiKey) {
  return http.post('PayMethod.php?op=add', {
    langs: JSON.stringify(langs),
    isOnline: isOnline,
    apiKey: apiKey,
  })
}
export const updatePayment = function (langs, isOnline, apiKey, id) {
  return http.post('PayMethod.php?op=update', {
    langs: JSON.stringify(langs),
    isOnline: isOnline,
    apiKey: apiKey,
    id: id,
  })
}
export const deletePayment = function (id) {
  return http.post('PayMethod.php?op=delete', {
    id: id,
  })
}
export const getAllOpeningTime = function () {
  return http.get('Takeaway.php?op=showAllOpeningTime')
}
export const addOpeningTime = function (weekday, startTime, endTime) {
  return http.post('Takeaway.php?op=addOpeningTime', {
    weekday: weekday,
    startTime: startTime,
    endTime: endTime,
  })
}
export const updateOpeningTime = function (weekday, startTime, endTime, id) {
  return http.post('Takeaway.php?op=updateOpeningTime', {
    weekday: weekday,
    startTime: startTime,
    endTime: endTime,
    id: id,
  })
}
export const deleteOpeningTime = function (id) {
  return http.post('Takeaway.php?op=deleteOpeningTime', {
    id: id,
  })
}
export const getAllDeliveryArea = function () {
  return http.get('Takeaway.php?op=showAllDeliveryArea')
}
export const addDeliveryArea = function (name, plzArea, priceMod, freePrice, startPrice) {
  return http.post('Takeaway.php?op=addDeliveryArea', {
    name: name,
    plzArea: plzArea,
    priceMod: priceMod,
    freePrice: freePrice,
    startPrice: startPrice,
  })
}
export const updateDeliveryArea = function (name, plzArea, priceMod, freePrice, startPrice, id) {
  return http.post('Takeaway.php?op=updateDeliveryArea', {
    name: name,
    plzArea: plzArea,
    priceMod: priceMod,
    freePrice: freePrice,
    startPrice: startPrice,
    id: id,
  })
}
export const deleteDeliveryArea = function (id) {
  return http.post('Takeaway.php?op=deleteDeliveryArea', {
    id: id,
  })
}
export const getAllUser = function () {
  return http.get('Takeaway.php?op=showAllUsers')
}
export const addUser = function (email, password, rawInfo) {
  return http.post('Takeaway.php?op=addUsers', {
    email: email,
    password: password,
    rawInfo: rawInfo,
  })
}
export const updateUser = function (email, password, rawInfo, id) {
  return http.post('Takeaway.php?op=updateUsers', {
    email: email,
    password: password,
    rawInfo: rawInfo,
    id: id,
  })
}
export const getTakeawayOrder = function () {
  return http.get('Takeaway.php?op=showAllOrders', {
    params: {
      lang: i18n.locale.toUpperCase(),
    },
  })
}
export const deleteUser = function (id) {
  return http.post('Takeaway.php?op=deleteUsers', {
    id: id,
  })
}
export const getConsumeTypeStatusList = function () {
  return http.get('Orders.php?op=showConsumeTypeStatusList')
}
export const getRestaurantInfo = function () {
  return http.get('Restaurant.php?op=view')
}
export const updateRestaurantInfo = function (name, adress1, adress2, postCode, city, state, taxNumber, telephone, inhalterName, inhalterLastName, inhalterTitle, emailAddress, totalRound, maxDineTime, roundTime, roundDishCount, takeawayPriceModification) {
  return http.post('Restaurant.php?op=update', {
    name: name,
    adress1: adress1,
    adress2: adress2,
    postCode: postCode,
    city: city,
    state: state,
    taxNumber: taxNumber,
    telephone: telephone,
    inhalterName: inhalterName,
    inhalterLastName: inhalterLastName,
    inhalterTitle: inhalterTitle,
    emailAddress: emailAddress,
    totalRound: totalRound,
    maxDineTime: maxDineTime,
    roundTime: roundTime,
    roundDishCount: roundDishCount,
    takeawayPriceModification: takeawayPriceModification,
  })
}
export const sendMsg = function (title, content) {
  return http.post('Complex.php?op=sendEmailToUS', {
    title: title,
    content: content,
  })
}

export const getOneRestaurantInfo = function (id) {
  return http.post('RestaurantEditor.php?op=overview', {
    id: id,
  })
}

export const getAllRestaurantInfo = function () {
  return http.get('RestaurantEditor.php?op=getAll')
}

export const getHomepageRestaurantInfo = function () {
  return http.get('RestaurantEditor.php?op=getIndex')
}

export const addRestaurant = function (name, addressID, flag) {
  return http.post('RestaurantEditor.php?op=add', {
    name: name,
    addressID: addressID,
    flag: flag,
  })
}

export const updateRestaurant = function (name, addressID, flag, id) {
  return http.post('RestaurantEditor.php?op=change', {
    name: name,
    addressID: addressID,
    flag: flag,
    id: id,
  })
}
export const deleteRestaurant = function (id) {
  return http.post('RestaurantEditor.php?op=delete', {
    id: id,
  })
}

export const getOneAddress = function (id) {
  return http.post('address.php?op=overview', {
    id: id,
  })
}

export const getSpecifiedAddress = function (id) {
  return http.post('address.php?op=getById', {
    id: id,
  })
}

export const addAddress = function (addressLine, city, state, postcode, country, adjustSign) {
  return http.post('address.php?op=add', {
    addressLine: addressLine,
    city: city,
    state: state,
    postcode: postcode,
    country: country,
    adjustSign: adjustSign,
  })
}

export const updateAddress = function (addressLine, city, state, postcode, country, adjustSign, id) {
  return http.post('address.php?op=change', {
    addressLine: addressLine,
    city: city,
    state: state,
    postcode: postcode,
    country: country,
    adjustSign: adjustSign,
    id: id,
  })
}
export const deleteAddress = function (id) {
  return http.post('address.php?op=delete', {
    id: id,
  })
}

export const getGroupEditor = function (restaurantID) {
  return http.post('GroupsEditor.php?op=overview', {
    restaurantID: restaurantID,
  })
}

export const getAllGroupMember = function (id) {
  return http.post('GroupsEditor.php?op=detail', {
    id: id,
  })
}

export const addGroup = function (restaurantID, name) {
  return http.post('GroupsEditor.php?op=add', {
    restaurantID: restaurantID,
    name: name,
  })
}

export const changeGroup = function (restaurantID, name, id) {
  return http.post('GroupsEditor.php?op=change', {
    restaurantID: restaurantID,
    name: name,
    id: id,
  })
}

export const deleteGroup = function (id) {
  return http.post('GroupsEditor.php?op=delete', {
    id: id,
  })
}

export const getAllPostion = function (restaurantID) {
  return http.post('PositionEditor.php?op=overview', {
    restaurantID: restaurantID,
  })
}

export const addPosition = function (restaurantID, name, payRate) {
  return http.post('PositionEditor.php?op=add', {
    restaurantID: restaurantID,
    name: name,
    payRate: payRate,
  })
}

export const updatePosition = function (restaurantID, name, payRate, id) {
  return http.post('PositionEditor.php?op=change', {
    restaurantID: restaurantID,
    name: name,
    payRate: payRate,
    id: id,
  })
}
export const deletePosition = function (id) {
  return http.post('PositionEditor.php?op=delete', {
    id: id,
  })
}

export const getEmployeeByResId = function (restaurantID) {
  return http.post('EmployeeEditor.php?op=overview', {
    restaurantID: restaurantID,
  })
}

export const getbriefEmployeeByResId = function (restaurantID) {
  return http.post('EmployeeEditor.php?op=briefView', {
    restaurantID: restaurantID,
  })
}
export const getOneEmployee = function (id) {
  return http.get('EmployeeEditor.php', {
    params: {
      op: 'getByID',
      id: id,
    },
  })
}

export const getCheckInRecordByStaff = function (id) {
  return http.get('EmployeeEditor.php', {
    params: {
      op: 'getCheckInRecordByID',
      id: id,
    },
  })
}

export const addEmpolyee = function (restaurantID, powerBW, groupID, workNumber, addressID, firstName,
                                     lastName, gender, birthday, email, phone, positionID, pin, type, noteFileOperations,
                                     driverLicense, w4Form, social, note) {
  const rawData = {
    restaurantID: restaurantID,
    powerBW: powerBW,
    groupID: groupID,
    workNumber: workNumber,
    addressID: addressID,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    birthday: birthday,
    email: email,
    phone: phone,
    positionID: positionID,
    pin: pin,
    type: type,
    noteFileOperations: noteFileOperations,
    driverLicense: driverLicense,
    w4Form: w4Form,
    social: social,
    ...note,
  }

  const formData = new FormData()

  Object.keys(rawData).forEach(key => {
    formData.append(key, rawData[key])
  })

  return http.post('EmployeeEditor.php?op=add', formData, {
    ...uploadConfig,
    showLoading: true,
  })
}

export const updateEmpolyee = function (employeeID, restaurantID, powerID, powerBW, groupID, workNumber, addressID, firstName, lastName, gender, birthday, email, phone, positionID, pin, type, noteFileOperations, driverLicense, w4Form, social, note) {
  const rawData = {
    employeeID: employeeID,
    restaurantID: restaurantID,
    powerID: powerID,
    powerBW: powerBW,
    groupID: groupID,
    workNumber: workNumber,
    addressID: addressID,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    birthday: birthday,
    email: email,
    phone: phone,
    positionID: positionID,
    pin: pin,
    type: type,
    noteFileOperations: noteFileOperations,
    driverLicense: driverLicense,
    w4Form: w4Form,
    social: social,
    ...note,
  }

  const formData = new FormData()

  Object.keys(rawData).forEach(key => {
    formData.append(key, rawData[key])
  })

  return http.post('EmployeeEditor.php?op=change', formData, {
    ...uploadConfig,
    showLoading: true,
  })
}
export const deleteEmpolyee = function (id) {
  return http.post('EmployeeEditor.php?op=delete', {
    id: id,
  })
}

export const sign = function (pin, restaurantID) {
  return http.post('Check.php?op=sign', {
    pin: pin,
    restaurantID: restaurantID,
  })
}
export const checkIn = function (pin, restaurantID) {
  return http.post('Check.php?op=checkIn', {
    pin: pin,
    restaurantID: restaurantID,
  })
}
export const checkOut = function (pin, restaurantID) {
  return http.post('Check.php?op=checkOut', {
    pin: pin,
    restaurantID: restaurantID,
  })
}
export const supplement = function (id, workStart, workEnd) {
  return http.post('Check.php?op=supplement', {
    id: id,
    workStart: workStart,
    workEnd: workEnd,
  })
}
export const updateCheck = function (id, startTime, endTime) {
  return http.post('Check.php?op=updateCheck', {
    id: id,
    startTime: startTime,
    endTime: endTime,
  })
}
export const getWorkCheckByTimespan = function (startDate, endDate, employeeID) {
  return http.get('Complex.php', {
    params: {
      op: 'getWorkCheckByTimespan',
      startDate: startDate,
      endDate: endDate,
      employeeID: employeeID,
    },
  })
}
export const getWorkCheckByTimespanOnRestaurant = function (restaurantID, startDate, endDate) {
  return http.get('Complex.php', {
    params: {
      op: 'getWorkCheckByTimespanOnRestaurant',
      restaurantID: restaurantID,
      startDate: startDate,
      endDate: endDate,
    },
  })
}
