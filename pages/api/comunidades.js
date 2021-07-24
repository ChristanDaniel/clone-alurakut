import { SiteClient } from 'datocms-client';


export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '5a76ebb66ef94135cc8b0c27bc0ec6';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "980120",
            ...request.body,
        })

        response.json({
            dados: 'teste',
            registroCriado: registroCriado,
        })

        return;

    }

    response.status(404).json({
        message: 'Ainda não temos nada de GET, mas no POST tem!'
    })
}