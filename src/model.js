const fetch = require('node-fetch')

const store = {
  data: [],
  byEva: {},
  byRil100: {},
  szentralen: {},
  managements: {}
}

function readData() {
  const newStore = {
    data: [],
    byEva: {},
    byRil100: {},
    szentralen: {},
    managements: {}
  }
  fetch('https://api.deutschebahn.com/stada/v2/stations', {headers: {Accept: 'application/json', Authorization: 'Bearer 3c21a4c77e97bc7faf8562c177d67f2e'}})
    .then(response => response.json())
    .then(data => {
      newStore.data = data.result
      data.result.forEach(entry => {
        entry.evaNumbers.forEach(eva => {
          newStore.byEva[eva.number] = entry
        })
        entry.ril100Identifiers.forEach(ril => {
          newStore.byRil100[ril.rilIdentifier] = entry
        })
        if (entry.szentrale && entry.szentrale.number && !newStore.szentralen[entry.szentrale.number]) {
          newStore.szentralen[entry.szentrale.number] = entry.szentrale
        }
        if (entry.stationManagement && entry.stationManagement.number && !newStore.managements[entry.stationManagement.number]) {
          newStore.managements[entry.stationManagement.number] = entry.stationManagement
        }
      })
    })
    .then(() => {
      store.data = newStore.data
      store.byEva = newStore.byEva
      store.byRil100 = newStore.byRil100
      store.szentralen = newStore.szentralen
      store.managements = newStore.managements
      setTimeout(readData, 60 * 60 * 1000)
    })
    .catch(console.error)
}

readData()

module.exports = {
  getAll() {
    return store.data
  },

  getByEva(eva) {
    return store.byEva[eva]
  },

  getByRil100(ril100) {
    return store.byRil100[ril100]
  },

  getSZentralen() {
    return Object.values(store.szentralen)
  },

  getSZentrale(id) {
    return store.szentralen[id]
  },

  getBySZentrale(id) {
    return store.data.filter(station => station.szentrale.number === +id)
  },

  getManagements() {
    return Object.values(store.managements)
  },

  getManagement(id) {
    return store.managements[id]
  },

  getByManagement(id) {
    return store.data.filter(station => station.stationManagement.number === +id)
  }
}
