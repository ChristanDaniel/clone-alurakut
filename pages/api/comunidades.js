import { SiteClient } from 'datocms-client'


export default async function recebedorDeRequest(resquest, response) {
    const TOKEN = '5a76ebb66ef94135cc8b0c27bc0ec6'
    const client = new SiteClient(TOKEN)

    const registroCriado = client.items.create({
        itemType: "980120",
        title: "",
        id: "",
        imageUrl: "",
        creatorSlug: "",

    })

    response.json({
        dados: 'teste',
        registroCriado: registroCriado,
    })
}