import { useState, useEffect } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `
function ProfileSidebar(props) {
  return(
    <Box as="aside">
      <img src={`http://github.com/${props.githubUser}.png`} style={{ borderRadius: '70px'}}/>
      <hr />

      <p>
        <a className="boxLink" href={`http://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
        <hr />
      </p>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
   <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.items.length})</h2>

      {/* <ul>
        {seguidores.map((imagemDoUsuario) => {
          return(
           <li key={imagemDoUsuario.id}>
              <a href={`/users/${imagemDoUsuario}`} >
                <img src={`http://github.com/${imagemDoUsuario}.png`} />
                <span>{imagemDoUsuario}</span>
              </a>
            </li>
          )
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const UsuarioAleatorio = 'ChristanDaniel'
  const [comunidades, setComunidades ] = useState([]);
  
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'diego3g', 'felipefialho']


  const [seguidores, setSeguidores] = useState([]);
  useEffect(function() {
    fetch('https://api.github.com/users/ChristanDaniel/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function(respostaCompleta) {
        setSeguidores(respostaCompleta)
      })

      // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '5a76ebb66ef94135cc8b0c27bc0ec6',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega retorno do response.json() já retorna
    .then((respostaCompleta) => {
      const comunidadesVindaDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindaDoDato)
    })
  }, [])


  return (
    <>
     <AlurakutMenu githubUser={UsuarioAleatorio}/>

      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={UsuarioAleatorio}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>

          <Box>
            <h1 className="title">
            Bem Vindo(a)
            </h1>

           <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCriarComunidade(event) {
              event.preventDefault();
              const dadosDoForm = new FormData(event.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa?"
                name="image"
                aria-label="Coloque uma URL para usarmos de capa?"
                type="text"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>

        </div>
      
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

        <ProfileRelationsBox title="Seguidores" items={seguidores} />

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">comunidade ({comunidades.length})</h2>

          <ul>
            {comunidades.map((itemAtual) => {
              return(
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidades ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return(
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`} style={{ borderRadius: '25px'}}>
                    <img src={`http://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>
   </>
  )
}

{/* <Box> Comunidades </Box> */}