import { SiteClient } from 'datocms-client';


export default async function recebedorDeRequests(resquest, response) {
    const TOKEN = '5a76ebb66ef94135cc8b0c27bc0ec6'
    const client = new SiteClient(TOKEN)

    const registroCriado = await client.items.create({
        itemType: "980120",
        title: "teste",
        imageUrl: "http://github.com/ChristanDaniel.png",
        creatorSlug: "ChristanDaniel",

    })
    console.log(registroCriado)

    response.json({
        dados: 'teste',
        registroCriado: registroCriado,
    })
}