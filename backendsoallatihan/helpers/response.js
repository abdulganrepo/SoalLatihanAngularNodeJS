async function ok(values, message, reply) {
    return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(
            values
        );
}

module.exports = {
    ok,
};