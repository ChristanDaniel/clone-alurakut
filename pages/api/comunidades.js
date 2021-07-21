export default async function recebedorDeRequest(resquest, response) {
    const TOKEN = '5a76ebb66ef94135cc8b0c27bc0ec6'
    console.log(TOKEN)
    response.json({
        dados: 'teste'
    })
}