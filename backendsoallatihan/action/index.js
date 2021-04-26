const response = require('../helpers/response');

async function beranda(request, reply) {
    let data = { 'isi': 'beranda' }
    return response.ok(data, "berhasil", reply)
}

async function getData(request, reply) {
    const pool = await this.pg.connect();
    let nama = request.body.extrParam.nama;
    let alamat = request.body.extrParam.alamat;
    if (!nama || nama === 'null') {
        nama = '';
    }
    if (!alamat || alamat === 'null') {
        alamat = '';
    }
    const orderby = parseInt(request.body.sortCol) + 1;
    const sql = "SELECT id, nama, alamat, kota, pendapatan FROM tb_customer where nama ilike '%'||$3||'%' AND alamat ilike '%'||$4||'%' order by "
        + orderby
        + ' '
        + request.body.sortDir + " limit $1 offset $2";
    console.log(sql);
    const res = await pool.query(sql, [request.body.length, request.body.start, nama, alamat]);
    console.log(res);
    const sqlcount = `SELECT COUNT(id) FROM tb_customer where nama ilike '%'||$1||'%' AND alamat ilike '%'||$2||'%' `;
    const recordstotal = await pool.query(sqlcount, [nama, alamat]);
    let total = recordstotal.rows[0].count;
    let draw = request.body.draw;


    await pool.release();
    return response.datatable(draw, total, res.rows, "berhasil", reply)
}

async function saveData(request, reply) {
    console.log(request.body);

    const pool = await this.pg.connect();
    let nama = request.body.nama;
    let alamat = request.body.alamat;
    let kota = request.body.kota;
    let pendapatan = request.body.pendapatan;
    const sql = 'INSERT INTO public.tb_customer (nama, alamat, kota, pendapatan) VALUES ($1, $2, $3, $4 ) RETURNING id'
    const res = await pool.query(sql, [nama, alamat, kota, pendapatan]);
    await pool.release();
    let hasil = {};
    hasil['key'] = res.rows[0].id;
    hasil['kode'] = 200;
    hasil['deskripsi'] = 'insert data berhasil';
    return response.ok(hasil, "Ok", reply);
}

async function getDatabyId(request, reply) {

    let sql = 'SELECT id, nama, alamat, kota, pendapatan FROM tb_customer WHERE id = $1';
    console.log(request.params.id);
    const id = request.params.id;
    const pool = await this.pg.connect();
    const res = await pool.query(sql, [id]);
    await pool.release();
    return response.ok(res.rows, "Ok", reply);
}

module.exports = {
    beranda, getData, saveData, getDatabyId
}