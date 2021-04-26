'use strict'

const host = require('../action/index')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
  fastify.get('/api/beranda', host.beranda);
  fastify.post('/api/getdata', host.getData);
  fastify.post('/api/savedata', host.saveData);
  fastify.get('/api/getdatabyid/:id', host.getDatabyId);
}
